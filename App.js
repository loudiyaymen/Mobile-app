import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

import { NotificationProvider } from "./src/context/NotificationContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import SOSButton from "./src/components/SOSButton";

export default function App() {

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
