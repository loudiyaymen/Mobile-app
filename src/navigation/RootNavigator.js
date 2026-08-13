import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import EmergencyStack from "./EmergencyStack";
import NotificationScreen from "../screens/emergency/NotificationScreen";
import NotificationDetailsScreen from "../screens/emergency/NotificationDetailsScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import { headerOptions, headerStyle } from "../themes/header.styles";
import { useSettings } from "../context/SettingsContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { settings, isLoaded } = useSettings();

  if (!isLoaded) {
    return null;
  }

  const showOnboarding = !settings.onboardingCompleted;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}
