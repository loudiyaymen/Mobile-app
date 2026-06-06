import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmergencyHomeScreen from "../screens/emergency/EmergencyHomeScreen";
import EmergencyConfirmScreen from "../screens/emergency/EmergencyConfirmScreen";
import EmergencyHelpScreen from "../screens/emergency/EmergencyHelpScreen";

const Stack = createNativeStackNavigator();

export default function EmergencyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmergencyHome"
        component={EmergencyHomeScreen}
        options={{ title: "Emergency Home" }}
      />
      <Stack.Screen
        name="EmergencyConfirm"
        component={EmergencyConfirmScreen}
        options={{ title: "Confirm Emergency" }}
      />
      <Stack.Screen
        name="EmergencyHelp"
        component={EmergencyHelpScreen}
        options={{ title: "Calling Security" }}
      />
    </Stack.Navigator>
  );
}
