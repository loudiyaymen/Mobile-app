import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/settings/SettingsScreen";

import { COLORS } from "../themes/styles";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
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
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        title="Settings"
      />
    </Stack.Navigator>
  );
}
