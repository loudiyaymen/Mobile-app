import { Alert, Linking, Pressable, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

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
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View
        style={{
          backgroundColor: "#EDEDED",
          borderRadius: 14,
          padding: 16,
        }}
      >
        <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
          App Permissions
        </Text>
        <Text
          style={[typography.body, { color: colors.Dark_Grey, marginTop: 8 }]}
        >
          Manage notifications, location, camera, and microphone permissions
          from your device settings.
        </Text>
        <Pressable
          onPress={openDeviceSettings}
          style={{
            marginTop: 14,
            alignSelf: "flex-start",
            backgroundColor: colors.primary_AC_Green,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 10,
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
