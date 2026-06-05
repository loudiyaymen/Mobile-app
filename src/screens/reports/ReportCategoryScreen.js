// Report category selection screen

import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles, COLORS } from "../../themes/styles";

export default function ReportCategoryScreen() {
  const navigation = useNavigation();

  const CategoryRow = ({ title, icon, onPress }) => (
    <Pressable onPress={onPress} style={styles.category}>
      <Ionicons name={icon} size={24} color={COLORS.ALGONQUIN_GREEN} />
      <Text style={styles.categoryButtonText}>{title}</Text>
    </Pressable>
  );

  return (
    <View
      style={[styles.container, { paddingBottom: 32, paddingHorizontal: 16 }]}
    >
      <Text style={[styles.confirmCardTitle, { marginVertical: 24 }]}>
        Select Report Type
      </Text>

      <CategoryRow
        title="Incidents"
        icon="alert-circle"
        onPress={() => navigation.navigate("Incident Report")}
      />

      <CategoryRow
        title="Sexual Assault"
        icon="shield"
        onPress={() => navigation.navigate("Sexual Assault Report")}
      />

      <CategoryRow
        title="Lost Item"
        icon="cube"
        onPress={() => navigation.navigate("Submit Report")}
      />
    </View>
  );
}
