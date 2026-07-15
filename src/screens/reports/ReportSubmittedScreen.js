import { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check } from "phosphor-react-native";
import { colors } from "../../themes/color";
import { styles } from "../../themes/styles";

function generateReferenceCode() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100 + Math.random() * 900);
  return `REF-${year}-${suffix}`;
}

export default function ReportSubmittedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reportData } = route.params;
  const insets = useSafeAreaInsets();

  const [referenceCode] = useState(generateReferenceCode);
  const [saved, setSaved] = useState(false);
  const saveStarted = useRef(false);

  const sheetMaxHeight = useMemo(
    () => Math.round(Dimensions.get("window").height * 0.68),
    [],
  );

  useEffect(() => {
    if (saveStarted.current) return;
    saveStarted.current = true;

    const saveReport = async () => {
      try {
        const existingReports = await AsyncStorage.getItem("reports");
        const reports = existingReports ? JSON.parse(existingReports) : [];

        const newReport = {
          ...reportData,
          referenceCode,
          status: "Opened",
          createdAt: new Date().toISOString(),
        };

        reports.unshift(newReport);

        await AsyncStorage.setItem("reports", JSON.stringify(reports));
        setSaved(true);
      } catch (e) {
        console.log("Error saving report:", e);
        setSaved(true);
      }
    };

    saveReport();
  }, [reportData, referenceCode]);

  const handleClose = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.reportSubmittedRoot}>
      <View style={styles.reportSubmittedBackdrop} />
      <View
        style={[
          styles.reportSubmittedSheet,
          {
            maxHeight: sheetMaxHeight,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
          },
        ]}
      >
        <View style={styles.reportSubmittedIconCircle}>
          <Check size={40} color={colors.primary_White} weight="bold" />
        </View>

        <Text style={styles.reportSubmittedTitle}>Report submitted</Text>
        <Text style={styles.reportSubmittedSubtitle}>
          Your report has been received
        </Text>

        <View style={styles.reportSubmittedRefBox}>
          <Text style={styles.reportSubmittedRefLabel}>Reference number</Text>
          <Text style={styles.reportSubmittedRefValue}>{referenceCode}</Text>
        </View>

        <Pressable
          style={styles.reportSubmittedPrimaryButton}
          onPress={handleClose}
          disabled={!saved}
        >
          <Text style={styles.reportSubmittedPrimaryButtonText}>
            Back to Reports
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
