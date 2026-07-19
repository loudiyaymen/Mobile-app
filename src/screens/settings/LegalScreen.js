import { Alert, Linking, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

const legalLinks = [
  {
    title: "Privacy Policy",
    url: "https://www.algonquincollege.com/policies/privacy/",
  },
  {
    title: "Terms of Use",
    url: "https://www.algonquincollege.com/policies/",
  },
];

async function openLink(url) {
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    Alert.alert("Unable to open link", "Please try again later.");
    return;
  }
  Linking.openURL(url);
}

export default function LegalScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View style={{ borderRadius: 14, overflow: "hidden" }}>
        {legalLinks.map((item, index) => (
          <View key={item.title}>
            <Pressable
              onPress={() => openLink(item.url)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#EDEDED",
                paddingHorizontal: 16,
                paddingVertical: 14,
              }}
            >
              <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
                {item.title}
              </Text>
              <Ionicons
                name="open-outline"
                size={20}
                color={colors.Primary_Charcoal}
              />
            </Pressable>
            {index !== legalLinks.length - 1 && (
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
