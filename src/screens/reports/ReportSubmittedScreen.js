import { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check } from "phosphor-react-native";
import { colors } from "../../themes/color";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";

function generateReferenceCode() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100 + Math.random() * 900);
  return `REF-${year}-${suffix}`;
}

function getShortReference(referenceCode) {
  const raw = String(referenceCode || "").trim();
  if (!raw) return generateReferenceCode();
  if (/^REF-/i.test(raw)) return raw;
  const compact = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return `REF-${compact.slice(0, 8)}`;
}

export default function ReportSubmittedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reportData } = route.params;
  const insets = useSafeAreaInsets();

  const [referenceCode] = useState(
    getShortReference(reportData?.referenceCode),
  );
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
          name: undefined,
          email: undefined,
          referenceCode,
          status: reportData?.status || "Submitted",
          createdAt: reportData?.createdAt || new Date().toISOString(),
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

        <Text
          style={[
            typography.secondaryH3,
            {
              color: colors.primary_AC_Green,
              marginBottom: 8,
              textAlign: "center",
            },
          ]}
        >
          Report submitted
        </Text>
        <Text
          style={[
            typography.secondaryBody,
            {
              color: colors.Dark_Grey,
              textAlign: "center",
              marginBottom: 20,
            },
          ]}
        >
          Your report has been received
        </Text>

        <View style={styles.reportSubmittedRefBox}>
          <Text
            style={[
              typography.secondaryCaption,
              { color: colors.Grey, marginBottom: 4 },
            ]}
          >
            Reference number
          </Text>
          <Text
            style={[typography.secondaryH5, { color: colors.Primary_Charcoal }]}
          >
            {referenceCode}
          </Text>
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
