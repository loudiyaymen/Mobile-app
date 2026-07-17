import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import EventsScreen from "../screens/events/EventsScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";
import { BellIcon } from "phosphor-react-native";
import { headerOptions, headerStyle } from "../themes/header.styles";
import NotificationScreen from "../screens/emergency/NotificationScreen";
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
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
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
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Notifications")}>
              <BellIcon size={24} color={colors.primary_AC_Green} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Event Details" component={EventDetailsScreen} />
      <Stack.Screen name="Event Register" component={EventRegisterScreen} />
    </Stack.Navigator>
  );
}
