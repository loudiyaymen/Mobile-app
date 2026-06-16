import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import MapScreen from "../screens/map/MapScreen";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";
import { headerStyle, headerOptions } from "../themes/header.styles";

const Stack = createNativeStackNavigator();

export default function MapStack() {
  return (
    <Stack.Navigator
      initialRouteName="Wayfinder"
      screenOptions={{
        ...headerOptions,
        headerStyle,
      }}
    >
      <Stack.Screen
        name="Wayfinder"
        component={MapScreen}
        options={{
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
