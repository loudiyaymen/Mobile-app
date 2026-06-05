// Successful report submitted screen

import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, COLORS } from "../../themes/styles";

export default function ReportSubmittedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reportData } = route.params;

  const [referenceCode, setReferenceCode] = useState("");

  useEffect(() => {
    const saveReport = async () => {
      try {
        const code = "RPT-" + Math.floor(100000 + Math.random() * 900000);
        setReferenceCode(code);

        const existingReports = await AsyncStorage.getItem("reports");
        const reports = existingReports ? JSON.parse(existingReports) : [];

        const newReport = {
          ...reportData,
          referenceCode: code,
          createdAt: new Date(),
        };

        reports.unshift(newReport);

        await AsyncStorage.setItem("reports", JSON.stringify(reports));
      } catch (e) {
        console.log("Error saving report:", e);
      }
    };

    saveReport();
  }, []);

  const handleClose = () => {
    navigation.navigate("My Reports");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.homeTitle}>Report Submitted</Text>

      <Text style={styles.subTitle}>
        Thank you. Your report has been recorded.
      </Text>

      <Text style={styles.homeTitle}>Reference Code: {referenceCode}</Text>

      <Pressable style={styles.reportButton} onPress={handleClose}>
        <Text style={{ color: COLORS.WHITE }}>Return to Reports</Text>
      </Pressable>
    </View>
  );
}
