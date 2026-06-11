import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../screens/map/MapScreen";
import { colors } from "../themes/color";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="Campus Map"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary_AC_Green },
        headerTintColor: colors.primary_White,
        headerTitleStyle: { fontWeight: "bold" },
        headerBackTitle: "Back",
        headerBackTitleVisible: true,
        headerBackTitleStyle: {
          fontSize: 14,
        },
      }}
    >
      <Stack.Screen name="Campus Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
