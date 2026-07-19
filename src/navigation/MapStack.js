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
        name="Wayfinder"
        component={MapScreen}
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
                Wayfinder
              </Text>
              <Text style={[typography.body, { color: colors.Dark_Grey }]}>
                Plan your navigation route or scan a QR code
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Navigate"
        component={NavigateScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <Text
                  style={[
                    typography.h2,
                    {
                      color: colors.Primary_Charcoal,
                    },
                  ]}
                >
                  Plan Route
                </Text>
                <Text
                  style={[
                    typography.body,
                    { fontSize: 14, color: colors.Dark_Grey, flexShrink: 1 },
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
