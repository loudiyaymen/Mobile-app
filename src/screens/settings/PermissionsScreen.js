import { Alert, Linking, Pressable, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { settingsStyles } from "./settingsStyles";

async function openDeviceSettings() {
  try {
    await Linking.openSettings();
  } catch {
    Alert.alert(
      "Unable to open settings",
      "Please open device settings manually.",
    );
  }
}

export default function PermissionsScreen() {
  return (
    <View style={settingsStyles.screen}>
      <View
        style={{
          ...settingsStyles.card,
          padding: 16,
          backgroundColor: "#EDEDED",
        }}
      >
        <Text style={[typography.h4, settingsStyles.label]}>
          App Permissions
        </Text>
        <Text
          style={[
            typography.body,
            settingsStyles.secondaryLabel,
            { marginTop: 8 },
          ]}
        >
          Manage notifications, location, camera, and microphone permissions
          from your device settings.
        </Text>
        <Pressable
          onPress={openDeviceSettings}
          style={{
            marginTop: 14,
            alignSelf: "stretch",
            backgroundColor: colors.primary_AC_Green,
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 14,
            minHeight: 56,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[typography.h5, { color: colors.primary_White }]}>
            Open Device Settings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
