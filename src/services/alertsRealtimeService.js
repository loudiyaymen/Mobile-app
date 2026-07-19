import { Platform } from "react-native";
import Constants from "expo-constants";

const EVENT_COPY = {
  PUSH_ALERT: {
    title: "Campus alert",
    body: "A new safety alert has been issued.",
  },
  ALERT_CREATED: {
    title: "Campus alert",
    body: "A new safety alert has been issued.",
  },
  PUSH_SOS_ACTIVE: {
    title: "SOS active",
    body: "An SOS emergency has been triggered.",
  },
  SOS_ACTIVE: {
    title: "SOS active",
    body: "An SOS emergency has been triggered.",
  },
};

const EVENT_ALIAS = {
  PUSH_ALERT: "ALERT",
  ALERT_CREATED: "ALERT",
  PUSH_SOS_ACTIVE: "SOS",
  SOS_ACTIVE: "SOS",
};

const DEDUPE_WINDOW_MS = 1800;
const LEGACY_DELAY_MS = 320;

function resolveWsUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_BACKEND_WS_URL;
  const fromConfig = Constants.expoConfig?.extra?.backendWsUrl;
  if (fromEnv) return fromEnv;
  if (fromConfig) return fromConfig;

  return Platform.OS === "android"
    ? "ws://10.0.2.2:4001"
    : "ws://localhost:4001";
}

function toAppNotificationFromEvent(eventName) {
  const copy = EVENT_COPY[eventName];
  if (!copy) return null;

  return {
    id: `${EVENT_ALIAS[eventName] || eventName}-${Date.now()}`,
    title: copy.title,
    body: copy.body,
    timestamp: "now",
    createdAt: new Date().toISOString(),
    read: false,
  };
}

function toTimestampLabel(sentAt) {
  if (!sentAt) return "now";
  const date = new Date(sentAt);
  if (Number.isNaN(date.getTime())) return "now";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function parseSocketPayload(raw) {
  if (typeof raw !== "string") return null;

  const trimmed = raw.trim();
  if (!trimmed || trimmed === "connected") return null;

  if (EVENT_COPY[trimmed]) {
    const alias = EVENT_ALIAS[trimmed] || trimmed;
    return {
      note: toAppNotificationFromEvent(trimmed),
      dedupeKeys: [`type:${alias}`],
      eventName: trimmed,
      alias,
      isLegacy: true,
    };
  }

  try {
    const parsed = JSON.parse(trimmed);
    const eventName = parsed?.event || parsed?.type;
    if (!eventName || !EVENT_COPY[eventName]) return null;

    const alias = EVENT_ALIAS[eventName] || eventName;
    const parsedId = String(
      parsed?.id || parsed?.alert_id || parsed?.sosEventId || "",
    ).trim();
    const dedupeKeys = [`type:${alias}`];
    if (parsedId) dedupeKeys.push(`id:${parsedId}`);

    const sentAt =
      parsed?.sentAt ||
      parsed?.createdAt ||
      parsed?.startsAt ||
      new Date().toISOString();
    const title = parsed?.title || EVENT_COPY[eventName].title;
    const body = parsed?.body || parsed?.message || EVENT_COPY[eventName].body;

    return {
      note: {
        id: parsedId || `${eventName}-${Date.now()}`,
        title,
        body,
        timestamp: toTimestampLabel(sentAt),
        createdAt: sentAt,
        read: false,
        type: alias,
        severity: parsed?.severity || null,
        alertType: parsed?.alertType || null,
        campusId: parsed?.campusId || null,
        campusName: parsed?.campusName || null,
        buildingId: parsed?.buildingId || null,
        buildingName: parsed?.buildingName || null,
        buildingCode: parsed?.buildingCode || null,
        startsAt: parsed?.startsAt || null,
        endsAt: parsed?.endsAt || null,
        sentAt,
      },
      dedupeKeys,
      eventName,
      alias,
      isLegacy: false,
    };
  } catch {
    return null;
  }
}

export function startAlertsRealtime(onNotification) {
  const wsUrl = resolveWsUrl();
  let socket;
  let reconnectTimer;
  let reconnectDelay = 1500;
  let stopped = false;
  const recentEvents = new Map();
  const pendingLegacy = new Map();

  const clearReconnect = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = undefined;
    }
  };

  const clearLegacyTimer = (key) => {
    const timer = pendingLegacy.get(key);
    if (timer) {
      clearTimeout(timer);
      pendingLegacy.delete(key);
    }
  };

  const scheduleReconnect = () => {
    if (stopped) return;
    clearReconnect();
    reconnectTimer = setTimeout(() => {
      connect();
      reconnectDelay = Math.min(reconnectDelay * 1.5, 10000);
    }, reconnectDelay);
  };

  const connect = () => {
    if (stopped) return;

    try {
      socket = new WebSocket(wsUrl);
    } catch {
      scheduleReconnect();
      return;
    }

    socket.onopen = () => {
      reconnectDelay = 1500;
    };

    socket.onmessage = (event) => {
      const parsed = parseSocketPayload(event?.data);
      if (!parsed || !parsed.note) return;

      const legacyKey = parsed.alias || parsed.eventName;

      if (parsed.isLegacy && legacyKey) {
        clearLegacyTimer(legacyKey);
        const timer = setTimeout(() => {
          pendingLegacy.delete(legacyKey);

          const now = Date.now();
          const dedupeKeys = Array.isArray(parsed.dedupeKeys)
            ? parsed.dedupeKeys
            : [];

          const hasRecentDuplicate = dedupeKeys.some((key) => {
            const prevTs = recentEvents.get(key) || 0;
            return now - prevTs <= DEDUPE_WINDOW_MS;
          });
          if (hasRecentDuplicate) return;

          dedupeKeys.forEach((key) => {
            recentEvents.set(key, now);
          });
          onNotification(parsed.note);
        }, LEGACY_DELAY_MS);

        pendingLegacy.set(legacyKey, timer);
        return;
      }

      if (!parsed.isLegacy && legacyKey) {
        clearLegacyTimer(legacyKey);
      }

      const now = Date.now();
      const dedupeKeys = Array.isArray(parsed.dedupeKeys)
        ? parsed.dedupeKeys
        : [];

      const hasRecentDuplicate = dedupeKeys.some((key) => {
        const prevTs = recentEvents.get(key) || 0;
        return now - prevTs <= DEDUPE_WINDOW_MS;
      });
      if (hasRecentDuplicate) return;

      dedupeKeys.forEach((key) => {
        recentEvents.set(key, now);
      });
      onNotification(parsed.note);
    };

    socket.onerror = () => {};

    socket.onclose = () => {
      scheduleReconnect();
    };
  };

  connect();

  return () => {
    stopped = true;
    clearReconnect();

    if (socket) {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket.close();
    }

    pendingLegacy.forEach((timer) => clearTimeout(timer));
    pendingLegacy.clear();
  };
}
