import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

import { NotificationProvider } from "./src/context/NotificationContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import SOSButton from "./src/components/SOSButton";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.otf"),
    "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.otf"),
    "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.otf"),
    "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
            <SOSButton />
          </NavigationContainer>
        </PaperProvider>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
