import { View, Text, Pressable, Linking } from "react-native";
import { styles, COLORS } from "../../themes/styles";

export default function ReportAssaultScreen() {
  const openOfficialReport = () => {
    Linking.openURL(
      "https://www.algonquincollege.com/sexualviolence/disclosure-and-reporting/",
    );
  };

  const openSupportServices = () => {
    Linking.openURL("https://projectlighthouse.ca/");
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
        <Text style={{ color: COLORS.WHITE }}>
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
          { backgroundColor: COLORS.NEW_GROWTH_GREEN },
        ]}
        onPress={openSupportServices}
      >
        <Text style={{ color: COLORS.CHARCOAL }}>Project Lighthouse</Text>
      </Pressable>

      {/* Emergency contacts */}
      <View
        style={[
          styles.category,
          { flexDirection: "column", alignItems: "flex-start", marginTop: 30 },
        ]}
      >
        <Text style={styles.confirmCardTitle}>Emergency Contacts</Text>

        <Text>Campus Security: 613-727-4723</Text>
        <Text>Emergency Services: 911</Text>
      </View>
    </View>
  );
}
