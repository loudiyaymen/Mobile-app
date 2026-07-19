import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const NotificationContext = createContext();

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

  const addNotification = useCallback((note) => {
    const normalized = normalizeNotification(note);

    setNotifications((prev) => {
      if (prev.find((n) => n.id === normalized.id)) return prev;
      return [normalized, ...prev];
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      if (!prev.some((n) => !n.read)) return prev;
      return prev.map((n) => (n.read ? n : { ...n, read: true }));
    });
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== String(id)));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => (prev.length === 0 ? prev : []));
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
