import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

export default function ReportCategoryScreen() {
  const navigation = useNavigation();

  const CategoryRow = ({ title, description, onPress }) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.category,
        {
          borderWidth: 1,
          borderColor: colors.Primary_Charcoal,
          minHeight: 112,
          justifyContent: "left",
        },
      ]}
    >
      <View>
        <Text style={[styles.categoryButtonText, typography.h3]}>{title}</Text>
        <Text style={[styles.categoryButtonDescription, typography.body]}>
          {description}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <CategoryRow
        title="Incident report"
        description="Report general incidents or suspicious activity"
        onPress={() => navigation.navigate("Incident Report")}
      />

      <CategoryRow
        title="Lost Items"
        description="Report a lost item"
        onPress={() => navigation.navigate("Submit Report")}
      />

      <CategoryRow
        title="Sexual Assault"
        description="Report sexual assault or harassment"
        onPress={() => navigation.navigate("Sexual Assault Report")}
      />
    </View>
  );
}
