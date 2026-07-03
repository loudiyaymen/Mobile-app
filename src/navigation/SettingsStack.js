import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { typography } from "../themes/typography";
import { colors } from "../themes/color";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { headerOptions, headerStyle } from "../themes/header.styles";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text
                style={[
                  typography.h2,
                  {
                    fontWeight: "bold",
                    color: colors.Primary_Charcoal,
                  },
                ]}
              >
                Settings
              </Text>
              <Text style={[typography.body, { color: colors.Dark_Grey }]}>
                Manage your preferences
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
