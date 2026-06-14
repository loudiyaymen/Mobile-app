import { View, Text, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";

export default function ReportAssaultScreen() {
  const insets = useSafeAreaInsets();

  const openOfficialReport = () => {
    Linking.openURL(
      "https://www.algonquincollege.com/safety-security-services/sexual-assaultviolence-reporting/",
    );
  };

  const openSupportServices = () => {
    Linking.openURL("https://www.algonquincollege.com/projectlighthouse/");
  };

  const policeNumber = () => {
    Linking.openURL("tel:911"); // change to any number
  };

  const campusNumber = () => {
    Linking.openURL("tel:6137274723"); // change to any number
  };

  return (
    <View style={[styles.container, { padding: 16 }]}>
      {/* Disclosure warning */}
      <View style={styles.dangerBanner}>
        <Text>
          We recognize it is difficult to disclose or report incidents of sexual
          violence and sexual assault. The choice to disclose or report is
          entirely yours.
        </Text>
      </View>

      {/* Official report */}
      <Text style={styles.sectionTitle}>Official Report</Text>
      <Pressable style={styles.reportButton} onPress={openOfficialReport}>
        <Text style={{ color: colors.primary_White }}>
          Algonquin College Sexual Violence Report
        </Text>
      </Pressable>

      {/* Support */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
        24/7 Support Services
      </Text>
      <Pressable
        style={[
          styles.reportButton,
          { backgroundColor: colors.Secondary_New_Growth_Green },
        ]}
        onPress={openSupportServices}
      >
        <Text style={{ color: colors.Primary_Charcoal }}>Project Lighthouse</Text>
      </Pressable>

      {/* Emergency contacts */}
      <View
        style={[
          styles.category,
          { flexDirection: "column", alignItems: "flex-start", marginTop: 30 },
        ]}
      >
        <Text style={styles.confirmCardTitle}>Emergency Contacts</Text>

        <Pressable onPress={campusNumber} style={{ marginBottom: 10 }}>
          <Text>
            Campus Security:{" "}
            <Text
              style={{
                color: colors.primary_AC_Green,
                textDecorationLine: "underline",
              }}
            >
              613-727-4723
            </Text>
          </Text>
        </Pressable>

        <Pressable onPress={policeNumber}>
          <Text>
            Emergency Services:{" "}
            <Text
              style={{
                color: colors.primary_AC_Green,
                textDecorationLine: "underline",
              }}
            >
              9-1-1
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
