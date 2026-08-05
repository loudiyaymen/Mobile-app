import { View, Text, Pressable } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import {
  NavigationArrowIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationHeaderButton from "../../components/NotificationHeaderButton";

export default function MapScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text
            style={[
              typography.h2,
              {
                color: colors.Primary_Charcoal,
              },
            ]}
          >
            Wayfinder
          </Text>
          <Text
            style={[
              typography.h5,
              {
                color: colors.Dark_Grey,
                marginTop: 6,
              },
            ]}
          >
            Plan your navigation route
          </Text>
        </View>
        <View style={{ paddingTop: 2 }}>
          <NotificationHeaderButton
            onPress={() => navigation.getParent()?.navigate("Notifications")}
          />
        </View>
      </View>

      <View style={{ gap: 20, padding: 16 }}>
        <Pressable
          style={styles.navCategoryButton}
          onPress={() => navigation.navigate("Navigate")}
        >
          <NavigationArrowIcon size={32} color={colors.primary_White} />
          <View style={styles.navCategoryButtonTextContainer}>
            <Text
              style={[typography.secondaryH3, { color: colors.primary_White }]}
            >
              Plan navigation route
            </Text>
            <Text style={[typography.body, { color: colors.primary_White }]}>
              Choose your starting point and destination
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
