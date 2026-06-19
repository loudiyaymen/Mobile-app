import { View, Text, Pressable } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import {
  NavigationArrowIcon,
  CameraIcon,
  QrCodeIcon,
  CaretRightIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ gap: 20, padding: 16, marginTop: 22 }}>
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

        <Pressable
          style={[
            styles.navCategoryButton,
            { backgroundColor: colors.Secondary_Dark_AC_Green },
          ]}
          onPress={() => alert("Scan functionality coming soon!")}
        >
          <CameraIcon size={32} color={colors.primary_White} />
          <View style={styles.navCategoryButtonTextContainer}>
            <Text
              style={[typography.secondaryH3, { color: colors.primary_White }]}
            >
              Scan QR Code
            </Text>
            <Text style={[typography.body, { color: colors.primary_White }]}>
              Scan a starting point and choose your destination
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.buttonContainer}
          onPress={() => alert("Functionality coming soon!")}
        >
          <QrCodeIcon size={32} color={colors.Primary_Charcoal} />
          <Text
            style={[
              typography.body,
              {
                flex: 1,
                color: colors.Primary_Charcoal,
              },
            ]}
          >
            How to identify QR codes?
          </Text>
          <CaretRightIcon size={32} color={colors.Primary_Charcoal} />
        </Pressable>
      </View>
    </View>
  );
}
