import { useState, useCallback } from "react";
import { View, Text, Pressable, FlatList, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FileTextIcon, PlusCircleIcon } from "phosphor-react-native";
import { styles, reportHomeTabBarInset } from "../../themes/styles";
import { colors, reportStatusBackground } from "../../themes/color";
import { typography } from "../../themes/typography";
import { fetchMyReports } from "../../services/reportService";
import NotificationHeaderButton from "../../components/NotificationHeaderButton";

function formatReportDate(isoOrDate) {
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return "";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function getReportTypeLabel(type) {
  if (!type) return "Report";
  const t = String(type);
  if (t === "lostItem") return "Lost Item";
  if (t === "Incident") return "Incident";
  return t;
}

function getDescriptionPreview(item) {
  if (item.details && String(item.details).trim()) {
    return String(item.details).trim();
  }
  if (item.location && String(item.location).trim()) {
    return String(item.location).trim();
  }
  return "—";
}

function getStatusLabel(item) {
  return item.status && String(item.status).trim() ? item.status : "Submitted";
}

function getShortReference(referenceCode) {
  const raw = String(referenceCode || "").trim();
  if (!raw) return "-";
  if (/^REF-/i.test(raw)) return raw;
  const compact = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return `REF-${compact.slice(0, 8)}`;
}

export default function ReportHomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [reports, setReports] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const loadReports = async () => {
    try {
      const liveReports = await fetchMyReports();
      setReports(liveReports);
      await AsyncStorage.setItem("reports", JSON.stringify(liveReports));
      return;
    } catch (error) {
      console.warn("Falling back to local report cache", error);
    }

    const stored = await AsyncStorage.getItem("reports");
    setReports(stored ? JSON.parse(stored) : []);
  };

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, []),
  );

  if (reports.length === 0) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom + 33 }]}>
        <View
          style={{
            width: "100%",
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: insets.top + 16,
            paddingBottom: 16,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>
              My Reports
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
              View and track your reports
            </Text>
          </View>
          <View>
            <NotificationHeaderButton
              onPress={() => navigation.getParent()?.navigate("Notifications")}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <FileTextIcon
            name="EmptyReport"
            size={75}
            color={colors.Secondary_Dark_AC_Green}
            style={styles.reportHomeEmptyIcon}
          />

          <View style={styles.headerContainer}>
            <Text style={typography.h4}>No Reports Yet</Text>
          </View>

          <Pressable
            style={[styles.reportButton, { marginTop: 14 }]}
            onPress={() => navigation.navigate("Select Category")}
          >
            <PlusCircleIcon name="add" size={24} color={colors.primary_White} />
            <Text style={styles.callSecurityButtonText}>Submit new report</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        styles.reportHomeListWrapper,
        { paddingBottom: insets.bottom + 33 },
      ]}
    >
      <View
        style={{
          paddingLeft: 8,
          paddingTop: insets.top + 8,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>
            My Reports
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
            View and track your reports
          </Text>
        </View>
        <View style={{ paddingRight: 8, paddingVertical: 2 }}>
          <NotificationHeaderButton
            onPress={() => navigation.getParent()?.navigate("Notifications")}
          />
        </View>
      </View>

      <FlatList
        data={reports}
        style={styles.reportHomeFlatList}
        contentContainerStyle={styles.reportHomeListContent}
        keyExtractor={(item) => `${item.id}-${item.type}-${item.createdAt}`}
        renderItem={({ item }) => {
          const status = getStatusLabel(item);
          const pillBg =
            reportStatusBackground[status] || reportStatusBackground.Submitted;

          return (
            <Pressable
              style={styles.reportRow}
              onPress={() =>
                navigation.navigate("Report Details", { report: item })
              }
            >
              <View style={styles.reportRowTopRow}>
                <Text
                  style={[
                    typography.h4,
                    {
                      color: colors.Primary_Charcoal,
                      flex: 1,
                      paddingRight: 12,
                    },
                  ]}
                >
                  {getReportTypeLabel(item.type)}
                </Text>
                <Text
                  style={[
                    typography.caption,
                    { color: colors.Primary_Charcoal },
                  ]}
                >
                  {formatReportDate(item.createdAt)}
                </Text>
              </View>
              <Text
                style={[
                  typography.body,
                  { color: colors.Dark_Grey, marginBottom: 10 },
                ]}
                numberOfLines={2}
              >
                {getDescriptionPreview(item)}
              </Text>
              <View style={styles.reportRowBottomRow}>
                <Text
                  style={[
                    typography.body,
                    { color: colors.Dark_Grey, flex: 1, paddingRight: 12 },
                  ]}
                >
                  {getShortReference(item.referenceCode)}
                </Text>
                <View
                  style={[
                    styles.reportRowStatusPill,
                    { backgroundColor: pillBg },
                  ]}
                >
                  <Text
                    style={[
                      typography.caption,
                      { fontWeight: "700", color: colors.primary_White },
                    ]}
                  >
                    {status}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
      <Pressable
        style={[styles.reportButton, { marginTop: 14 }]}
        onPress={() => navigation.navigate("Select Category")}
      >
        <PlusCircleIcon name="add" size={24} color={colors.primary_White} />
        <Text style={styles.callSecurityButtonText}>Submit new report</Text>
      </Pressable>
    </View>
  );
}
