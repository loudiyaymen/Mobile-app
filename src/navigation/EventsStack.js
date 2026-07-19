import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import EventsScreen from "../screens/events/EventsScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";
import { headerOptions, headerStyle } from "../themes/header.styles";
import EventDetailsScreen from "../screens/events/EventDetailsScreen";
import EventRegisterScreen from "../screens/events/EventRegisterScreen";
import RegistrationDetailsScreen from "../screens/events/RegistrationDetailsScreen";
import NotificationHeaderButton from "../components/NotificationHeaderButton";

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events Home"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: ({ canGoBack, tintColor }) =>
          canGoBack ? (
            <View style={{ paddingLeft: 24, paddingVertical: 16 }}>
              <HeaderBackButton
                tintColor={tintColor ?? colors.Primary_Charcoal}
                labelVisible={false}
                onPress={() => navigation.goBack()}
              />
            </View>
          ) : null,
        headerRight: () => (
          <View style={{ paddingRight: 24, paddingVertical: 16 }}>
            <NotificationHeaderButton
              onPress={() => navigation.getParent()?.navigate("Notifications")}
            />
          </View>
        ),
      })}
    >
      <Stack.Screen
        name="Events Home"
        component={EventsScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                paddingHorizontal: 24,
                paddingVertical: 16,
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
        }}
      />
      <Stack.Screen name="Event Details" component={EventDetailsScreen} />
      <Stack.Screen name="Event Register" component={EventRegisterScreen} />
      <Stack.Screen
        name="Registration Details"
        component={RegistrationDetailsScreen}
        options={{
          title: "Registration details",
        }}
      />
    </Stack.Navigator>
  );
}
