import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import MapScreen from "../screens/map/MapScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="Wayfinder"
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
        name="Wayfinder"
        component={MapScreen}
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
                Wayfinder
              </Text>
              <Text style={[typography.body, { color: colors.Dark_Grey }]}>
                Plan your navigation route or scan a QR code
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
