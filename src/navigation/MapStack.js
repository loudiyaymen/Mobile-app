import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import MapScreen from "../screens/map/MapScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";
import { headerStyle, headerOptions } from "../themes/header.styles";
import NavigateScreen from "../screens/map/NavigateScreen";
import NotificationHeaderButton from "../components/NotificationHeaderButton";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="Wayfinder"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: ({ canGoBack, tintColor }) =>
          canGoBack ? (
            <HeaderBackButton
              tintColor={tintColor ?? colors.Primary_Charcoal}
              labelVisible={false}
              onPress={() => navigation.goBack()}
            />
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
        name="Wayfinder"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Navigate"
        component={NavigateScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <View style={{ paddingVertical: 16 }}>
                <Text
                  style={[
                    typography.h3,
                    {
                      color: colors.Primary_Charcoal,
                    },
                  ]}
                >
                  Plan Route
                </Text>
                <Text
                  style={[
                    typography.caption,
                    { color: colors.Dark_Grey, flexShrink: 1 },
                  ]}
                >
                  Choose your starting point and destination
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
