import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationContext = createContext();
const NOTIFICATIONS_STORAGE_KEY = "campus.notifications.v1";
const DISMISSED_NOTIFICATION_IDS_STORAGE_KEY =
  "campus.notifications.dismissedIds.v1";

function normalizeNotification(note = {}) {
  const createdAt = note.createdAt || note.timestamp || Date.now();
  const parsedDate = new Date(createdAt);
  const isValidDate = !Number.isNaN(parsedDate.getTime());

  return {
    id: String(note.id || `${Date.now()}-${Math.random()}`),
    title: note.title || "Notification",
    body:
      note.body || note.message || note.description || note.alert_message || "",
    timestamp: note.timestamp || (isValidDate ? "now" : ""),
    createdAt: isValidDate
      ? parsedDate.toISOString()
      : new Date().toISOString(),
    read: Boolean(note.read),
    type: note.type || null,
    severity: note.severity || null,
    alertType: note.alertType || note.alert_type || null,
    campusId: note.campusId || note.campus_id || null,
    campusName: note.campusName || note.campus_name || null,
    buildingId: note.buildingId || note.building_id || null,
    buildingName: note.buildingName || note.building_name || null,
    buildingCode: note.buildingCode || note.building_code || null,
    buildingAffected: note.buildingAffected || null,
    startsAt: note.startsAt || note.starts_at || null,
    endsAt: note.endsAt || note.ends_at || null,
    sentAt: note.sentAt || note.sent_at || null,
  };
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(() => new Set());

  useEffect(() => {
    let mounted = true;

    async function loadStoredNotifications() {
      try {
        const [rawNotifications, rawDismissedIds] = await Promise.all([
          AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY),
          AsyncStorage.getItem(DISMISSED_NOTIFICATION_IDS_STORAGE_KEY),
        ]);
        if (!mounted) return;

        const parsedDismissed = rawDismissedIds
          ? JSON.parse(rawDismissedIds)
          : [];
        const dismissedIdSet = Array.isArray(parsedDismissed)
          ? new Set(parsedDismissed.map((id) => String(id)))
          : new Set();
        setDismissedIds(dismissedIdSet);

        if (!rawNotifications) return;
        const parsed = JSON.parse(rawNotifications);
        if (!Array.isArray(parsed)) return;

        const normalized = parsed
          .map((item) => normalizeNotification(item))
          .filter((item) => !dismissedIdSet.has(String(item.id)))
          .sort(
            (first, second) =>
              new Date(second.createdAt).getTime() -
              new Date(first.createdAt).getTime(),
          );

        setNotifications(normalized);
      } catch {
        // Ignore corrupted local cache and continue with an empty in-memory list.
      }
    }

    loadStoredNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications),
    ).catch(() => {});
  }, [notifications]);

  useEffect(() => {
    AsyncStorage.setItem(
      DISMISSED_NOTIFICATION_IDS_STORAGE_KEY,
      JSON.stringify(Array.from(dismissedIds)),
    ).catch(() => {});
  }, [dismissedIds]);

  const addNotification = useCallback(
    (note) => {
      const normalized = normalizeNotification(note);
      if (dismissedIds.has(normalized.id)) return;

      setNotifications((prev) => {
        if (prev.find((n) => n.id === normalized.id)) return prev;

        return [normalized, ...prev].sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime(),
        );
      });
    },
    [dismissedIds],
  );

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      if (!prev.some((n) => !n.read)) return prev;
      return prev.map((n) => (n.read ? n : { ...n, read: true }));
    });
  }, []);

  const removeNotification = useCallback((id) => {
    const idString = String(id);
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(idString);
      return next;
    });
    setNotifications((prev) => prev.filter((n) => n.id !== idString));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => {
      if (prev.length === 0) return prev;

      setDismissedIds((currentDismissed) => {
        const next = new Set(currentDismissed);
        prev.forEach((item) => {
          next.add(String(item.id));
        });
        return next;
      });

      return [];
    });
  }, []);

  const unreadCount = useMemo(
    () => notifications.reduce((count, item) => count + (item.read ? 0 : 1), 0),
    [notifications],
  );

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      unreadCount,
      markAllAsRead,
      removeNotification,
      clearNotifications,
    }),
    [
      notifications,
      addNotification,
      unreadCount,
      markAllAsRead,
      removeNotification,
      clearNotifications,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  return context;
};
