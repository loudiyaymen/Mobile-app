import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import SOSButton from "./src/components/SOSButton";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
      <SOSButton />
    </NavigationContainer>
  );
}
