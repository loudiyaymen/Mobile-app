import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, XIcon } from "phosphor-react-native";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

function getReportTypeLabel(type) {
  if (!type) return "Report";
  const t = String(type);
  if (t === "lostItem") return "Lost Item";
  if (t === "Incident") return "Incident";
  return t;
}

function formatReportDate(isoOrDate) {
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return "";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function ReportDetailsScreen({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const { report } = route.params || {};

  if (!report) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={typography.body}>Report not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary_White }}>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          style={{ padding: 4 }}
        >
          <ArrowLeftIcon size={24} color={colors.Primary_Charcoal} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
            {getReportTypeLabel(report.type)}
          </Text>
          <Text
            style={[
              typography.caption,
              { color: colors.Dark_Grey, marginTop: 2 },
            ]}
          >
            {report.referenceCode ? `Ref: ${report.referenceCode}` : ""}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
      >
        <View
          style={{
            backgroundColor: colors.Cloud_Grey,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text
              style={[
                typography.caption,
                { color: colors.Dark_Grey, fontWeight: "600" },
              ]}
            >
              Status
            </Text>
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {report.status || "Submitted"}
            </Text>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text
              style={[
                typography.caption,
                { color: colors.Dark_Grey, fontWeight: "600" },
              ]}
            >
              Submitted
            </Text>
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {formatReportDate(report.createdAt)}
              {report.createdAt && ` at ${formatTime(report.createdAt)}`}
            </Text>
          </View>
        </View>

        {report.location && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={[
                typography.caption,
                { color: colors.Dark_Grey, fontWeight: "600", marginBottom: 6 },
              ]}
            >
              Location
            </Text>
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {report.location}
            </Text>
          </View>
        )}

        {report.details && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={[
                typography.caption,
                { color: colors.Dark_Grey, fontWeight: "600", marginBottom: 6 },
              ]}
            >
              Details
            </Text>
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {report.details}
            </Text>
          </View>
        )}

        {report.media && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={[
                typography.caption,
                { color: colors.Dark_Grey, fontWeight: "600", marginBottom: 8 },
              ]}
            >
              Attachment
            </Text>
            <Pressable
              onPress={() => setIsPhotoViewerOpen(true)}
              style={{ position: "relative" }}
            >
              <Image
                source={{ uri: report.media }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 8,
                  backgroundColor: colors.Cloud_Grey,
                }}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={isPhotoViewerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPhotoViewerOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
          onPress={() => setIsPhotoViewerOpen(false)}
        >
          <Image
            source={{ uri: report.media }}
            style={{
              width: "100%",
              height: "80%",
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => setIsPhotoViewerOpen(false)}
            style={{
              position: "absolute",
              top: 40,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <XIcon size={24} color={colors.primary_White} weight="bold" />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
