import { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarBlankIcon } from "phosphor-react-native";
import { useNotifications } from "../../context/NotificationContext";
import { styles } from "../../themes/NotificationsScreenStyles";
import { colors } from "../../themes/color";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function NotificationScreen({ navigation }) {
  const { notifications, markAllAsRead, deleteNotification } =
    useNotifications();

  useEffect(() => {
    markAllAsRead();
  }, []);

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={localStyles.deleteAction}
      onPress={() => deleteNotification(id)}
    >
      <Text style={localStyles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <CalendarBlankIcon
            size={24}
            color={colors.primary_AC_Green}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.cardBody}>{item.body}</Text>
        <Text style={styles.cardTime}>{item.timestamp || "now"}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>
              {notifications.length} alert
              {notifications.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No new notifications</Text>
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
