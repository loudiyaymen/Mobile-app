import { Alert, Linking, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { settingsStyles } from "./settingsStyles";

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
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        {legalLinks.map((item, index) => (
          <View key={item.title}>
            <Pressable
              onPress={() => openLink(item.url)}
              style={settingsStyles.row}
            >
              <Text style={[typography.h4, settingsStyles.label]}>
                {item.title}
              </Text>
              <Ionicons
                name="open-outline"
                size={20}
                color={colors.Primary_Charcoal}
              />
            </Pressable>
            {index !== legalLinks.length - 1 && (
              <View style={settingsStyles.divider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
