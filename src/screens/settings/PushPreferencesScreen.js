import { Switch, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";
import { settingsStyles } from "./settingsStyles";

function PreferenceRow({ label, value, onValueChange, disabled }) {
  return (
    <View style={[settingsStyles.row, disabled && { opacity: 0.5 }]}>
      <Text style={[typography.h4, settingsStyles.label]}>{label}</Text>
      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{ false: "#D3D3D3", true: colors.primary_AC_Green }}
        thumbColor={colors.primary_White}
      />
    </View>
  );
}

export default function PushPreferencesScreen() {
  const { settings, setPushPreferenceEnabled } = useSettings();

  return (
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        <PreferenceRow
          label="Push notifications"
          value={settings.pushPreferences.pushEnabled}
          onValueChange={(v) => setPushPreferenceEnabled("pushEnabled", v)}
        />
        <View style={settingsStyles.divider} />
        <PreferenceRow
          label="Notification sound"
          value={settings.pushPreferences.sound}
          disabled={!settings.pushPreferences.pushEnabled}
          onValueChange={(v) => setPushPreferenceEnabled("sound", v)}
        />
        <View style={settingsStyles.divider} />
        <PreferenceRow
          label="Vibration"
          value={settings.pushPreferences.vibration}
          disabled={!settings.pushPreferences.pushEnabled}
          onValueChange={(v) => setPushPreferenceEnabled("vibration", v)}
        />
      </View>
    </View>
  );
}
