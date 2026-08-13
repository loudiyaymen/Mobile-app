import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmergencyConnectedScreen from "../screens/emergency/EmergencyConnectedScreen";

const Stack = createNativeStackNavigator();

export default function EmergencyStack() {
  return (
    <Stack.Navigator
      initialRouteName="EmergencyConnected"
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        name="EmergencyConnected"
        component={EmergencyConnectedScreen}
        options={{ title: "Calling Security" }}
      />
    </Stack.Navigator>
  );
}
