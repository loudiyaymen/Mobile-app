import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NotificationProvider } from "./src/context/NotificationContext";
import { SettingsProvider } from "./src/context/SettingsContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import SOSButton from "./src/components/SOSButton";
import NotificationBridge from "./src/components/NotificationBridge";
import { useFonts } from "expo-font";
import { logDailyActivity } from "./src/services/userActivityService";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.otf"),
    "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.otf"),
    "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.otf"),
    "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.otf"),
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    logDailyActivity();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <NotificationProvider>
            <PaperProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
                <NotificationBridge />
                <SOSButton />
              </NavigationContainer>
            </PaperProvider>
          </NotificationProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
