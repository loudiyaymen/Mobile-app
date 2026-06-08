import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NotificationProvider } from "./src/context/NotificationContext";

import EmergencyHomeScreen from "./src/screens/EmergencyHomeScreen";
import EmergencyConfirmScreen from "./src/screens/EmergencyConfirmScreen";
import EmergencyConnectedScreen from "./src/screens/EmergencyConnectedScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="EmergencyHome"
              screenOptions={{
                headerStyle: { backgroundColor: "#006341" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { fontWeight: "bold" },
                headerBackTitle: "Back",
                headerBackTitleVisible: true,
                headerBackTitleStyle: {
                  fontSize: 14,
                },
              }}
            >
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
                name="EmergencyConnected"
                component={EmergencyConnectedScreen}
                options={{ title: "Security Information" }}
              />
              <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                  presentation: "modal",
                  // Need to hide the default header to use our custom one inside screen
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
