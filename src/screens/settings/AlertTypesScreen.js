import { Switch, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";
import { settingsStyles } from "./settingsStyles";

function AlertRow({ label, value, onValueChange }) {
  return (
    <View style={settingsStyles.row}>
      <Text style={[typography.h4, settingsStyles.label]}>{label}</Text>
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
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        <AlertRow
          label="Fire alerts"
          value={settings.alertTypes.fire}
          onValueChange={(v) => setAlertTypeEnabled("fire", v)}
        />
        <View style={settingsStyles.divider} />
        <AlertRow
          label="Security alerts"
          value={settings.alertTypes.security}
          onValueChange={(v) => setAlertTypeEnabled("security", v)}
        />
        <View style={settingsStyles.divider} />
        <AlertRow
          label="Event alerts"
          value={settings.alertTypes.events}
          onValueChange={(v) => setAlertTypeEnabled("events", v)}
        />
      </View>
    </View>
  );
}
