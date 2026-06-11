import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EventsScreen from "../screens/events/EventsScreen";

import { colors } from "../themes/color";
const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
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
      <Stack.Screen name="Events" component={EventsScreen} title="Events" />
    </Stack.Navigator>
  );
}
