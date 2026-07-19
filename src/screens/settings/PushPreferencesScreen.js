import { Switch, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";

function PreferenceRow({ label, value, onValueChange, disabled }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#EDEDED",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
        {label}
      </Text>
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
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View style={{ borderRadius: 14, overflow: "hidden" }}>
        <PreferenceRow
          label="Push notifications"
          value={settings.pushPreferences.pushEnabled}
          onValueChange={(v) => setPushPreferenceEnabled("pushEnabled", v)}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DFDFDF",
            marginLeft: 16,
          }}
        />
        <PreferenceRow
          label="Notification sound"
          value={settings.pushPreferences.sound}
          disabled={!settings.pushPreferences.pushEnabled}
          onValueChange={(v) => setPushPreferenceEnabled("sound", v)}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#DFDFDF",
            marginLeft: 16,
          }}
        />
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
