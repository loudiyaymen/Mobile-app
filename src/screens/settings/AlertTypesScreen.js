import { Switch, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";

function AlertRow({ label, value, onValueChange }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#EDEDED",
      }}
    >
      <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D3D3D3", true: colors.primary_AC_Green }}
        thumbColor={colors.primary_White}
      />
    </View>
  );
}

export default function AlertTypesScreen() {
  const { settings, setAlertTypeEnabled } = useSettings();

  return (
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View style={{ borderRadius: 14, overflow: "hidden" }}>
        <AlertRow
          label="Fire alerts"
          value={settings.alertTypes.fire}
          onValueChange={(v) => setAlertTypeEnabled("fire", v)}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DFDFDF",
            marginLeft: 16,
          }}
        />
        <AlertRow
          label="Security alerts"
          value={settings.alertTypes.security}
          onValueChange={(v) => setAlertTypeEnabled("security", v)}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DFDFDF",
            marginLeft: 16,
          }}
        />
        <AlertRow
          label="Event alerts"
          value={settings.alertTypes.events}
          onValueChange={(v) => setAlertTypeEnabled("events", v)}
        />
      </View>
    </View>
  );
}
