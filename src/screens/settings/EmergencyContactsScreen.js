import { Alert, Linking, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { settingsStyles } from "./settingsStyles";

const contacts = [
  { name: "Campus Security", phone: "613-727-4723" },
  { name: "Emergency", phone: "911" },
];

async function callContact(phone) {
  const clean = phone.replace(/[^0-9]/g, "");
  const url = `tel:${clean}`;
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    Alert.alert(
      "Cannot place call",
      "Calling is not available on this device.",
    );
    return;
  }
  Linking.openURL(url);
}

export default function EmergencyContactsScreen() {
  return (
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        {contacts.map((contact, index) => (
          <View key={contact.phone}>
            <Pressable
              onPress={() => callContact(contact.phone)}
              style={settingsStyles.row}
            >
              <View>
                <Text style={[typography.h4, settingsStyles.label]}>
                  {contact.name}
                </Text>
                <Text style={[typography.h5, settingsStyles.secondaryLabel]}>
                  {contact.phone}
                </Text>
              </View>
              <Ionicons
                name="call-outline"
                size={24}
                color={colors.primary_AC_Green}
              />
            </Pressable>
            {index !== contacts.length - 1 && (
              <View style={settingsStyles.divider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
