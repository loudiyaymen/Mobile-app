import { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../context/NotificationContext";
import { navigate } from "../navigation/navigationRef";
import { startAlertsRealtime } from "../services/alertsRealtimeService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
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

export default function NotificationBridge() {
  const { addNotification } = useNotifications();

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

    Notifications.requestPermissionsAsync().catch(() => {});

    Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        if (!mounted || !response) return;
        const note = toAppNotification(response.notification);
        addNotification(note);
        navigate("Notification Details", { notification: note });
      })
      .catch(() => {});

    const receiveSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        addNotification(toAppNotification(notification));
      },
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
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
    const stopRealtime = startAlertsRealtime(async (note) => {
      addNotification(note);

      try {
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

  return null;
}
