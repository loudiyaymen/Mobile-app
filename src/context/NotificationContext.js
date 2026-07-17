import { createContext, useState, useContext, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { title, body } = notification.request.content;
        const data = notification.request.content.data;

        addNotification({
          id: notification.request.identifier,
          title: title || "New Alert",
          body: body || "",
          timestamp: "now",
          type: data?.type || "general",
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "User tapped notification:",
          response.notification.request.content.data,
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Permission for push notifications not granted");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Push token:", token);
    } else {
      alert("Must use physical device for push notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
  }

  const addNotification = (note) => {
    setNotifications((prev) => {
      if (prev.find((n) => n.id === note.id)) return prev;
      setUnreadCount((prevCount) => prevCount + 1);
      return [note, ...prev];
    });
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        unreadCount,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
