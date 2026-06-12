import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/settings/SettingsScreen";

import { colors } from "../themes/color";
const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary_White },
        headerTintColor: colors.Primary_Charcoal,
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
