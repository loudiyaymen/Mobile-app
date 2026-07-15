import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { typography } from "../themes/typography";
import { colors } from "../themes/color";
import SettingsScreen from "../screens/settings/SettingsScreen";
import SettingsCampusScreen from "../screens/settings/SettingsCampusScreen";
import SettingsAppearanceScreen from "../screens/settings/SettingsAppearanceScreen.js";
import SettingsAccessibilityScreen from "../screens/settings/SettingsAccessibilityScreen";
import SettingsEmergencyContactsScreen from "../screens/settings/SettingsEmergencyContactsScreen.js";
import SettingsAlertTypesScreen from "../screens/settings/SettingsAlertTypesScreen.js";
import SettingsPushPreferencesScreen from "../screens/settings/SettingsPushPreferencesScreen.js";
import SettingsPermissionsScreen from "../screens/settings/SettingsPermissionsScreen.js";
import SettingsLegalScreen from "../screens/settings/SettingsLegalScreen.js";
import { headerOptions, headerStyle } from "../themes/header.styles";
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        ...headerOptions,
        headerStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "column", alignItems: "flex-start", width: "100%" , }}>
              <Text style={[typography.h2, { fontWeight: "bold", color: theme.colors.text }]}>
                Settings
              </Text>
              <Text style={[typography.body, { color: theme.colors.subtext }]}>
                Manage your preferences
              </Text>
            </View>
          ),
        }}
      />

      {/* Workable screens for now */}
      <Stack.Screen name="SettingsCampusScreen" component={SettingsCampusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsAppearanceScreen" component={SettingsAppearanceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsAccessibilityScreen" component={SettingsAccessibilityScreen} options={{ headerShown: false }} />

      {/* Phase 2 — coming soon screens im gueesin */}
      <Stack.Screen name="SettingsEmergencyContactsScreen" component={SettingsEmergencyContactsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsAlertTypesScreen" component={SettingsAlertTypesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsPushPreferencesScreen" component={SettingsPushPreferencesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsPermissionsScreen" component={SettingsPermissionsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsLegalScreen" component={SettingsLegalScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}