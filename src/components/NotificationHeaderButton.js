import { Pressable, StyleSheet, Text, View } from "react-native";
import { BellSimpleIcon } from "phosphor-react-native";
import { useNotifications } from "../context/NotificationContext";
import { colors } from "../themes/color";

export default function NotificationHeaderButton({ onPress }) {
  const { unreadCount } = useNotifications();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={styles.trigger}
      accessibilityRole="button"
      accessibilityLabel="Open notifications"
    >
      <BellSimpleIcon
        size={24}
        color={colors.Primary_Charcoal}
        weight="regular"
      />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 34,
    height: 34,
    padding: 0,
    margin: 0,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    flexShrink: 0,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.SOS_Red,
    borderWidth: 1,
    borderColor: colors.primary_White,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.primary_White,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 12,
  },
});
