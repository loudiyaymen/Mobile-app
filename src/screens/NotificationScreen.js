import { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNotifications } from "../context/NotificationContext";
import { styles } from "../styles/NotificationScreenStyles";

export default function NotificationScreen({ navigation }) {
  const { notifications, markAllAsRead } = useNotifications();

  useEffect(() => {
    markAllAsRead();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon
          name="calendar-blank-outline"
          size={24}
          color="#000"
          style={styles.cardIcon}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardBody}>{item.body}</Text>
      <Text style={styles.cardTime}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSubtitle}>
            {notifications.length} alert{notifications.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
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
  );
}
