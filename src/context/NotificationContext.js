import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (note) => {
    setNotifications((prev) => {
      // Prevent duplicates based on ID (assuming we will be using IDs)
      //TODO: Implement IDs for the notifications
      if (prev.find((n) => n.id === note.id)) return prev;
      setUnreadCount((prevCount) => prevCount + 1);
      return [note, ...prev];
    });
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, unreadCount, markAllAsRead }}
    >
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
