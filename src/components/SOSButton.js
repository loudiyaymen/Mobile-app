import { View, Pressable, Text } from "react-native";
import { navigate } from "../navigation/navigationRef";
import { styles } from "../themes/styles";

export default function SOSButton() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 105,
        right: 20,
        zIndex: 999,
      }}
    >
      <Pressable
        style={styles.fab}
        onPress={() => navigate("Emergency", { screen: "Emergency Home" })}
      >
        <Text style={styles.fabIcon}>SOS</Text>
      </Pressable>
    </View>
  );
}
