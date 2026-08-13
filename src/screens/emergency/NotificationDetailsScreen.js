import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WarningCircleIcon } from "phosphor-react-native";
import { useRoute } from "@react-navigation/native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

export default function NotificationDetailsScreen() {
  const route = useRoute();
  const note = route?.params?.notification || {};

  const title = note.title || "Notification";
  const body =
    note.body ||
    note.message ||
    note.description ||
    "No additional details available.";
  const timeText = note.timestamp || "now";
  const createdAt = note.createdAt
    ? new Date(note.createdAt).toLocaleString()
    : "";

  const detailsRows = [
    { label: "Type", value: note.alertType || note.type || "-" },
    { label: "Campus", value: "Main Campus" },
    {
      label: "Building affected",
      value:
        note.buildingAffected ||
        note.buildingName ||
        note.buildingCode ||
        note.buildingId ||
        note.building_id
          ? `${
              note.buildingAffected ||
              note.buildingName ||
              note.buildingCode ||
              note.buildingId ||
              note.building_id
            }${
              note.buildingCode && note.buildingName
                ? ` (${note.buildingCode})`
                : ""
            }`
          : "-",
    },
    {
      label: "Time sent",
      value: note.sentAt
        ? new Date(note.sentAt).toLocaleString()
        : createdAt || timeText,
    },
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.Cloud_Grey }}
      edges={["left", "right"]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary_White,
            borderRadius: 16,
            padding: 18,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <WarningCircleIcon size={34} color="#B91C1C" weight="regular" />
            <View style={{ flex: 1 }}>
              <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>
                {title}
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: "#666",
                }}
              >
                {timeText}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 18,
              lineHeight: 28,
              color: colors.Primary_Charcoal,
            }}
          >
            {body}
          </Text>

          <View
            style={{
              marginTop: 18,
              borderTopWidth: 1,
              borderTopColor: "#E6E6E6",
              paddingTop: 12,
            }}
          >
            {detailsRows.map((row) => (
              <View
                key={row.label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingVertical: 6,
                }}
              >
                <Text style={{ color: "#666", fontSize: 14 }}>{row.label}</Text>
                <Text
                  style={{
                    color: colors.Primary_Charcoal,
                    fontSize: 14,
                    fontWeight: "600",
                    flexShrink: 1,
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
