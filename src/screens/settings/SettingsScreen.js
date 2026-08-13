import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";

const sections = [
  {
    title: "Preferences & Personalization",
    rows: [
      { label: "Campus", icon: "map-outline", route: "Campus" },
      {
        label: "Accessibility",
        icon: "accessibility-outline",
        route: "Accessibility",
      },
    ],
  },
  {
    title: "Safety & Emergency",
    rows: [
      {
        label: "Emergency Contacts",
        icon: "person-outline",
        route: "Emergency Contacts",
      },
    ],
  },
  {
    title: "Privacy & Legal",
    rows: [
      { label: "Permissions", icon: "shield-outline", route: "Permissions" },
      { label: "Legal", icon: "document-text-outline", route: "Legal" },
    ],
  },
];

function SettingsRow({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Ionicons name={icon} size={22} color={colors.Primary_Charcoal} />
        <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={colors.Primary_Charcoal}
      />
    </Pressable>
  );
}

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();

  return (
    <ScrollView
      key={`settings-${settings.textSizeIndex}`}
      style={{ flex: 1, backgroundColor: colors.primary_White }}
      contentContainerStyle={{ paddingBottom: 36 }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
        }}
      >
        <Text
          style={[
            typography.h2,
            {
              color: colors.Primary_Charcoal,
            },
          ]}
        >
          Settings
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
          Manage your preferences
        </Text>
      </View>

      {sections.map((section) => (
        <View
          key={section.title}
          style={{ marginTop: 20, marginHorizontal: 16 }}
        >
          <Text
            style={[
              typography.h3,
              { color: colors.Dark_Grey, marginBottom: 10 },
            ]}
          >
            {section.title}
          </Text>
          <View
            style={{
              backgroundColor: "#EDEDED",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {section.rows.map((row, index) => (
              <View key={row.label}>
                <SettingsRow
                  icon={row.icon}
                  label={row.label}
                  onPress={() => navigation.navigate(row.route)}
                />
                {index !== section.rows.length - 1 && (
                  <View
                    style={{
                      marginLeft: 52,
                      borderBottomWidth: 1,
                      borderBottomColor: "#DFDFDF",
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
