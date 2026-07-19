import { Text, View, Switch } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";

export default function AppearanceScreen() {
  const { settings, setDarkModeEnabled } = useSettings();

  return (
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View
        style={{
          marginTop: 16,
          backgroundColor: "#EDEDED",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[typography.h3, { color: colors.Primary_Charcoal }]}>
          Dark Theme
        </Text>
        <Switch
          value={settings.darkModeEnabled}
          disabled
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: "#D3D3D3", true: colors.Primary_Charcoal }}
          thumbColor={
            settings.darkModeEnabled ? colors.primary_White : "#7D7D7D"
          }
        />
      </View>
      <Text
        style={[
          typography.caption,
          { color: colors.Dark_Grey, marginTop: 10, marginLeft: 6 },
        ]}
      >
        Dark mode is intentionally disabled for now.
      </Text>
    </View>
  );
}
