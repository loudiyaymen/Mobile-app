import { useCallback, useRef } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellSimpleIcon, WarningCircleIcon } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { useNotifications } from "../../context/NotificationContext";
import { styles } from "../../themes/NotificationsScreenStyles";

export default function NotificationScreen() {
  const {
    notifications,
    markAllAsRead,
    unreadCount,
    clearNotifications,
    removeNotification,
  } = useNotifications();
  const navigation = useNavigation();
  const didMarkOnFocus = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!didMarkOnFocus.current && unreadCount > 0) {
        didMarkOnFocus.current = true;
        markAllAsRead();
      }

      return () => {
        didMarkOnFocus.current = false;
      };
    }, [markAllAsRead, unreadCount]),
  );

  const renderItem = ({ item }) => {
    const timeText = item.timestamp || "now";
    const messageText =
      item.body || item.message || item.description || "No details provided.";

    const renderRightActions = () => (
      <Pressable
        onPress={() => removeNotification(item.id)}
        style={styles.deleteAction}
      >
        <Text style={styles.deleteActionText}>Delete</Text>
      </Pressable>
    );

    return (
      <Swipeable
        overshootRight={false}
        renderRightActions={renderRightActions}
        rightThreshold={30}
      >
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate("Notification Details", {
              notification: item,
            })
          }
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <WarningCircleIcon size={36} color="#B91C1C" weight="regular" />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardTime}>{timeText}</Text>
          </View>
          <Text style={styles.cardBody}>{messageText}</Text>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {notifications.length > 0 ? (
        <View style={styles.actionRow}>
          <Pressable onPress={clearNotifications} style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </Pressable>
        </View>
      ) : null}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <BellSimpleIcon size={76} color="#717171" weight="regular" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
