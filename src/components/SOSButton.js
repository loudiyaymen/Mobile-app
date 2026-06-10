import { View, Pressable, Text } from "react-native";
import { navigate, navigationRef } from "../navigation/navigationRef";
import { styles } from "../themes/styles";
import { useEffect, useState } from "react";

const HIDDEN_SCREENS = ["EmergencyConfirm", "EmergencyHelp", "EmergencyHome"];

export default function SOSButton() {
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    const unsubscribe = navigationRef.addListener("state", () => {
      const route = navigationRef.getCurrentRoute();
      setCurrentRoute(route?.name);
    });

    return unsubscribe;
  }, []);

  // Hide button on certain screens
  if (HIDDEN_SCREENS.includes(currentRoute)) return null;

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
