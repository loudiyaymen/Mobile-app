import { View, Text } from "react-native";
import { typography } from "../themes/typography";
import { colors } from "../themes/color";

export default function DetailSection({ title, content, icon: Icon }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[typography.secondaryBody, { marginBottom: 8 }]}>
        {title}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {Icon && (
          <Icon size={20} color={colors.Primary_Charcoal} weight="bold" />
        )}
        <Text style={typography.body}>{content}</Text>
      </View>
    </View>
  );
}