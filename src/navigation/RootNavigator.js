import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import EmergencyStack from "./EmergencyStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main app */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      {/* Emergency flow (modal on top of app) */}
      <Stack.Screen
        name="Emergency"
        component={EmergencyStack}
        options={{ presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
}
