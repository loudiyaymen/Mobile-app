import { Pressable, Text, View } from "react-native";
import { BellSimpleIcon } from "phosphor-react-native";
import { useNotifications } from "../context/NotificationContext";
import { colors } from "../themes/color";

export default function NotificationHeaderButton({ onPress }) {
  const { unreadCount } = useNotifications();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={{
        marginRight: 0,
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityRole="button"
      accessibilityLabel="Open notifications"
    >
      <BellSimpleIcon
        size={24}
        color={colors.Primary_Charcoal}
        weight="regular"
      />
      {unreadCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: 3,
            right: 0,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: colors.SOS_Red,
            borderWidth: 1,
            borderColor: colors.primary_White,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 3,
          }}
        >
          <Text
            style={{
              color: colors.primary_White,
              fontSize: 10,
              fontWeight: "700",
              lineHeight: 12,
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
