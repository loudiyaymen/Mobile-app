import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmergencyConnectedScreen from "../screens/emergency/EmergencyConnectedScreen";
import NotificationScreen from "../screens/emergency/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function EmergencyStack() {
  return (
    <Stack.Navigator initialRouteName="EmergencyConnected">
      <Stack.Screen
        name="EmergencyConnected"
        component={EmergencyConnectedScreen}
        options={{ title: "Calling Security" }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: "Notifications" }}
      />
    </Stack.Navigator>
  );
}
