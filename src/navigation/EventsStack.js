import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EventsScreen from "../screens/events/EventsScreen";

import { COLORS } from "../themes/styles";

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
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
      <Stack.Screen name="Events" component={EventsScreen} title="Events" />
    </Stack.Navigator>
  );
}
