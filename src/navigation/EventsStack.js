import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import EventsScreen from "../screens/events/EventsScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary_White },
        headerTintColor: colors.Primary_Charcoal,
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "left",
        headerBackTitle: "Back",
        headerBackTitleVisible: true,
        headerBackTitleStyle: {
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        title="Events"
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={[
                  typography.h2,
                  {
                    fontWeight: "bold",
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
    </Stack.Navigator>
  );
}
