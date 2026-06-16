import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import EventsScreen from "../screens/events/EventsScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";
import { headerOptions, headerStyle } from "../themes/header.styles";
import EventDetailsScreen from "../screens/events/EventDetailsScreen";
import EventRegisterScreen from "../screens/events/EventRegisterScreen";

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        ...headerOptions,
        headerStyle,
      }}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: "Events",
          headerTitle: () => (
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text
                style={[
                  typography.h2,
                  {
                    color: colors.Primary_Charcoal,
                  },
                ]}
              >
                Events
              </Text>
              <Text style={[typography.body, { color: colors.Dark_Grey }]}>
                Discover and join campus activities
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
      />
      <Stack.Screen
        name="EventRegister"
        component={EventRegisterScreen}
      />
    </Stack.Navigator>
  );
}
