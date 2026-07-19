import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import EmergencyStack from "./EmergencyStack";
import NotificationScreen from "../screens/emergency/NotificationScreen";
import NotificationDetailsScreen from "../screens/emergency/NotificationDetailsScreen";
import { headerOptions, headerStyle } from "../themes/header.styles";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      <Stack.Screen
        name="Emergency"
        component={EmergencyStack}
        options={{ presentation: "transparentModal" }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          ...headerOptions,
          headerStyle,
          headerShown: true,
          title: "Notifications",
        }}
      />

      <Stack.Screen
        name="Notification Details"
        component={NotificationDetailsScreen}
        options={{
          ...headerOptions,
          headerStyle,
          headerShown: true,
          title: "Notification details",
        }}
      />
    </Stack.Navigator>
  );
}
