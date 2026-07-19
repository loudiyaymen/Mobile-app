import { Alert, Linking, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

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
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View style={{ borderRadius: 14, overflow: "hidden" }}>
        {contacts.map((contact, index) => (
          <View key={contact.phone}>
            <Pressable
              onPress={() => callContact(contact.phone)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: "#EDEDED",
              }}
            >
              <View>
                <Text
                  style={[typography.h4, { color: colors.Primary_Charcoal }]}
                >
                  {contact.name}
                </Text>
                <Text style={[typography.h5, { color: colors.Dark_Grey }]}>
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
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#DFDFDF",
                  marginLeft: 16,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
