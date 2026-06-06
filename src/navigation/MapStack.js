import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../screens/map/MapScreen";

import { COLORS } from "../themes/styles";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="Campus Map"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.ALGONQUIN_GREEN },
        headerTintColor: COLORS.WHITE,
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
