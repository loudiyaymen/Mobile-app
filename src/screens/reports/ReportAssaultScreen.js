import { View, Text, Pressable, Linking, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

export default function ReportAssaultScreen() {
  const insets = useSafeAreaInsets();

  const openExternalUrl = async (url, label) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert(
          "Unable to Open Link",
          `We couldn't open ${label}. Please copy this URL into your browser: ${url}`,
        );
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Unable to Open Link",
        `Please try again. If the issue continues, open this URL manually: ${url}`,
      );
    }
  };

  const openOfficialReport = () => {
    openExternalUrl(
      "https://www.algonquincollege.com/safety-security-services/sexual-assaultviolence-reporting/",
      "the official report form",
    );
  };

  const openSupportServices = () => {
    openExternalUrl(
      "https://www.algonquincollege.com/projectlighthouse/",
      "Project Lighthouse",
    );
  };

  return (
    <View
      style={[styles.container, { paddingBlockEnd: 48, paddingHorizontal: 16 }]}
    >
      <View style={styles.dangerBanner}>
        <Text style={[typography.secondaryBody, styles.label]}>
          We recognize it is difficult to disclose or report incidents of sexual
          violence and sexual assault. The choice to disclose or report is
          entirely yours.
        </Text>
      </View>
      <Text style={[typography.h3, styles.label]}>Official Report Form</Text>
      <Pressable style={styles.reportButton} onPress={openOfficialReport}>
        <Text style={[typography.secondaryH5, { color: colors.primary_White }]}>
          Algonquin College Sexual Violence Report
        </Text>
      </Pressable>
      <Text style={[typography.h3, styles.label]}>
        Access the support you need
      </Text>
      <Pressable
        style={[
          styles.reportButton,
          {
            backgroundColor: colors.primary_White,
            borderColor: colors.primary_AC_Green,
            borderWidth: 1,
          },
        ]}
        onPress={openSupportServices}
      >
        <Text
          style={[typography.secondaryH4, { color: colors.primary_AC_Green }]}
        >
          Project Lighthouse
        </Text>
      </Pressable>
    </View>
  );
}
