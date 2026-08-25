import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../context/NotificationContext";
import { navigate } from "../navigation/navigationRef";
import { startAlertsRealtime } from "../services/alertsRealtimeService";
import { registerDevicePushToken } from "../services/pushTokenService";
import { fetchAlerts } from "../services/alertService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function toAppNotification(input = {}) {
  const content = input?.request?.content || input;
  const data = content?.data || {};
  const sentAt = data?.sentAt || data?.createdAt || new Date().toISOString();
  const parsedDate = new Date(sentAt);
  const timestamp = Number.isNaN(parsedDate.getTime())
    ? "now"
    : parsedDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

  return {
    id: String(
      data?.id ||
        input?.request?.identifier ||
        content?.messageId ||
        `${Date.now()}-${Math.random()}`,
    ),
    title: content?.title || "Campus alert",
    body:
      content?.body ||
      data?.body ||
      data?.message ||
      data?.description ||
      data?.alert_message ||
      "",
    timestamp,
    createdAt: sentAt,
    read: false,
    type: data?.type || null,
    severity: data?.severity || null,
    alertType: data?.alertType || data?.alert_type || null,
    campusId: data?.campusId || data?.campus_id || null,
    campusName: data?.campusName || data?.campus_name || null,
    buildingId: data?.buildingId || data?.building_id || null,
    buildingName: data?.buildingName || data?.building_name || null,
    buildingCode: data?.buildingCode || data?.building_code || null,
    buildingAffected: data?.buildingAffected || data?.building_affected || null,
    startsAt: data?.startsAt || data?.starts_at || null,
    endsAt: data?.endsAt || data?.ends_at || null,
    sentAt,
  };
}

function toAppNotificationFromAlert(alert = {}) {
  const stableAlertId = String(
    alert?.alert_id || alert?.id || alert?.uuid || "",
  ).trim();
  const sentAt =
    alert?.sent_at ||
    alert?.created_at ||
    alert?.starts_at ||
    new Date().toISOString();
  const parsedDate = new Date(sentAt);
  const timestamp = Number.isNaN(parsedDate.getTime())
    ? "now"
    : parsedDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

  return {
    id:
      stableAlertId ||
      `alert-${String(alert?.message || "")
        .trim()
        .toLowerCase()}-${String(sentAt)}`,
    title: alert?.title || "Campus alert",
    body:
      alert?.message || alert?.body || "A new safety alert has been issued.",
    timestamp,
    createdAt: sentAt,
    read: false,
    type: "ALERT",
    severity: alert?.severity || null,
    alertType: alert?.alert_type || null,
    campusId: alert?.campus_id || null,
    buildingId: alert?.building_id || null,
    startsAt: alert?.starts_at || null,
    endsAt: alert?.ends_at || null,
    sentAt,
  };
}

const RECENT_KEY_LIMIT = 250;
const LAUNCH_STALE_GRACE_MS = 7000;
const NOTIFICATION_DEBUG_ENABLED =
  String(process.env.EXPO_PUBLIC_NOTIFICATION_DEBUG || "")
    .trim()
    .toLowerCase() === "1" ||
  String(process.env.EXPO_PUBLIC_NOTIFICATION_DEBUG || "")
    .trim()
    .toLowerCase() === "true";

const ENABLE_LOCAL_FALLBACK_NOTIFICATIONS =
  String(process.env.EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK_NOTIFICATIONS || "")
    .trim()
    .toLowerCase() === "1" ||
  String(process.env.EXPO_PUBLIC_ENABLE_LOCAL_FALLBACK_NOTIFICATIONS || "")
    .trim()
    .toLowerCase() === "true";

function debugLog(event, details = {}) {
  if (!NOTIFICATION_DEBUG_ENABLED) return;
  console.log("[NotificationBridge]", event, details);
}

function toStableText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function extractIdentityFromNotification(input = {}) {
  const content = input?.request?.content || input;
  const data = content?.data || {};
  const id = String(
    data?.id || input?.id || input?.request?.identifier || "",
  ).trim();
  const title = toStableText(content?.title || input?.title);
  const body = toStableText(
    content?.body || input?.body || data?.message || data?.description,
  );
  const sentAt = String(
    data?.sentAt || data?.createdAt || input?.sentAt || input?.createdAt || "",
  ).trim();

  return { id, title, body, sentAt };
}

function buildDedupeKeys(input = {}) {
  const { id, title, body, sentAt } = extractIdentityFromNotification(input);
  const keys = [];
  if (id) keys.push(`id:${id}`);
  if (title || body) {
    // Coarse fingerprint to match equivalent payloads from push/websocket/poll
    // even when backend IDs or sentAt fields differ between channels.
    keys.push(`fp2:${title}|${body}`);
  }
  if (title || body || sentAt) {
    keys.push(`fp:${title}|${body}|${sentAt}`);
  }
  return keys;
}

function parseNotificationTime(input = {}) {
  const { sentAt } = extractIdentityFromNotification(input);
  const parsed = new Date(sentAt);
  if (!sentAt || Number.isNaN(parsed.getTime())) return null;
  return parsed.getTime();
}

export default function NotificationBridge() {
  const { addNotification, unreadCount } = useNotifications();
  const appStartedAtRef = useRef(Date.now());
  const seenRemoteKeysRef = useRef(new Set());
  const seenRemoteOrderRef = useRef([]);

  const rememberRemoteNotification = (input) => {
    const keys = buildDedupeKeys(input);
    if (!keys.length) return;

    debugLog("remember_remote", {
      id: extractIdentityFromNotification(input).id || null,
      keys,
    });

    keys.forEach((key) => {
      if (seenRemoteKeysRef.current.has(key)) return;
      seenRemoteKeysRef.current.add(key);
      seenRemoteOrderRef.current.push(key);
    });

    while (seenRemoteOrderRef.current.length > RECENT_KEY_LIMIT) {
      const oldest = seenRemoteOrderRef.current.shift();
      if (!oldest) break;
      seenRemoteKeysRef.current.delete(oldest);
    }
  };

  const shouldSuppressLocalSchedule = (note) => {
    const keys = buildDedupeKeys(note);
    if (keys.some((key) => seenRemoteKeysRef.current.has(key))) {
      debugLog("suppress_local_schedule", {
        reason: "matched_remote_key",
        id: extractIdentityFromNotification(note).id || null,
        keys,
      });
      return true;
    }

    const notificationTime = parseNotificationTime(note);
    if (
      notificationTime &&
      notificationTime < appStartedAtRef.current - LAUNCH_STALE_GRACE_MS
    ) {
      debugLog("suppress_local_schedule", {
        reason: "stale_prelaunch_notification",
        id: extractIdentityFromNotification(note).id || null,
        notificationTime,
        appStartedAt: appStartedAtRef.current,
      });
      return true;
    }

    return false;
  };

  useEffect(() => {
    let mounted = true;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "Campus Safety",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 120, 250],
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      }).catch(() => {});
    }

    registerDevicePushToken()
      .then((result) => {
        if (!result?.ok) {
          console.warn(
            "Push token registration skipped:",
            result?.reason || "unknown_reason",
          );
        }
      })
      .catch((error) => {
        console.warn("Failed to register device push token", error);
      });

    Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        if (!mounted || !response) return;
        rememberRemoteNotification(response.notification);
        const note = toAppNotification(response.notification);
        addNotification(note);
        navigate("Notification Details", { notification: note });
      })
      .catch(() => {});

    Notifications.getPresentedNotificationsAsync()
      .then((presentedNotifications) => {
        if (!mounted || !Array.isArray(presentedNotifications)) return;
        presentedNotifications.forEach((notification) => {
          rememberRemoteNotification(notification);
          addNotification(toAppNotification(notification));
        });
      })
      .catch(() => {});

    const receiveSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        debugLog("push_received_listener", {
          source: notification?.request?.content?.data?.source || "push",
          id: extractIdentityFromNotification(notification).id || null,
        });
        rememberRemoteNotification(notification);
        addNotification(toAppNotification(notification));
      },
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        debugLog("push_response_listener", {
          source:
            response?.notification?.request?.content?.data?.source || "push",
          id:
            extractIdentityFromNotification(response?.notification).id || null,
        });
        rememberRemoteNotification(response.notification);
        const note = toAppNotification(response.notification);
        addNotification(note);
        navigate("Notification Details", { notification: note });
      },
    );

    return () => {
      mounted = false;
      receiveSub.remove();
      responseSub.remove();
    };
  }, [addNotification]);

  useEffect(() => {
    Notifications.setBadgeCountAsync(unreadCount).catch(() => {});
  }, [unreadCount]);

  useEffect(() => {
    const stopRealtime = startAlertsRealtime(async (note) => {
      addNotification(note);

      debugLog("realtime_note_received", {
        source: "backend_ws",
        id: extractIdentityFromNotification(note).id || null,
      });

      if (!ENABLE_LOCAL_FALLBACK_NOTIFICATIONS) {
        debugLog("skip_local_schedule", {
          source: "backend_ws",
          reason: "fallback_local_notifications_disabled",
          id: extractIdentityFromNotification(note).id || null,
        });
        return;
      }

      if (shouldSuppressLocalSchedule(note)) {
        return;
      }

      try {
        debugLog("schedule_local_notification", {
          source: "backend_ws",
          id: extractIdentityFromNotification(note).id || null,
        });
        await Notifications.scheduleNotificationAsync({
          content: {
            title: note.title,
            body: note.body,
            data: {
              id: note.id,
              body: note.body,
              message: note.body,
              source: "backend_ws",
              type: note.type,
              severity: note.severity,
              alertType: note.alertType,
              campusId: note.campusId,
              campusName: note.campusName,
              buildingId: note.buildingId,
              buildingName: note.buildingName,
              buildingCode: note.buildingCode,
              startsAt: note.startsAt,
              endsAt: note.endsAt,
              sentAt: note.sentAt || note.createdAt,
            },
          },
          trigger: null,
        });
      } catch {}
    });

    return () => {
      stopRealtime();
    };
  }, [addNotification]);

  useEffect(() => {
    let stopped = false;
    let isInitialSync = true;
    const knownAlertIds = new Set();

    async function syncAlertsFeed() {
      try {
        const alerts = await fetchAlerts({ limit: 30, offset: 0 });
        if (stopped || !Array.isArray(alerts)) return;

        for (const alert of alerts) {
          const note = toAppNotificationFromAlert(alert);
          const isKnown = knownAlertIds.has(note.id);

          addNotification(note);

          debugLog("poll_note_received", {
            source: "alerts_poll",
            id: extractIdentityFromNotification(note).id || null,
            isInitialSync,
            isKnown,
          });

          if (!isInitialSync && !isKnown) {
            if (!ENABLE_LOCAL_FALLBACK_NOTIFICATIONS) {
              debugLog("skip_local_schedule", {
                source: "alerts_poll",
                reason: "fallback_local_notifications_disabled",
                id: extractIdentityFromNotification(note).id || null,
              });
              knownAlertIds.add(note.id);
              continue;
            }

            if (shouldSuppressLocalSchedule(note)) {
              knownAlertIds.add(note.id);
              continue;
            }

            debugLog("schedule_local_notification", {
              source: "alerts_poll",
              id: extractIdentityFromNotification(note).id || null,
            });
            Notifications.scheduleNotificationAsync({
              content: {
                title: note.title,
                body: note.body,
                data: {
                  id: note.id,
                  source: "alerts_poll",
                  sentAt: note.sentAt,
                },
              },
              trigger: null,
            }).catch(() => {});
          }

          knownAlertIds.add(note.id);
        }

        isInitialSync = false;
      } catch {
        // Keep realtime handling active; polling is only a fallback path.
      }
    }

    syncAlertsFeed();
    const intervalId = setInterval(syncAlertsFeed, 15000);

    return () => {
      stopped = true;
      clearInterval(intervalId);
    };
  }, [addNotification]);

  return null;
}
