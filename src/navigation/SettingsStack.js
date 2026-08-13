import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { headerOptions, headerStyle } from "../themes/header.styles";
import NotificationHeaderButton from "../components/NotificationHeaderButton";
import CampusScreen from "../screens/settings/CampusScreen";
import AccessibilityScreen from "../screens/settings/AccessibilityScreen";
import EmergencyContactsScreen from "../screens/settings/EmergencyContactsScreen";
import AlertTypesScreen from "../screens/settings/AlertTypesScreen";
import PushPreferencesScreen from "../screens/settings/PushPreferencesScreen";
import PermissionsScreen from "../screens/settings/PermissionsScreen";
import LegalScreen from "../screens/settings/LegalScreen";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings Home"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
        headerBackVisible: true,
        headerRight: () => (
          <View>
            <NotificationHeaderButton
              onPress={() => navigation.getParent()?.navigate("Notifications")}
            />
          </View>
        ),
      })}
    >
      <Stack.Screen
        name="Settings Home"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Campus" component={CampusScreen} />
      <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
      <Stack.Screen
        name="Emergency Contacts"
        component={EmergencyContactsScreen}
      />
      <Stack.Screen name="Alert Types" component={AlertTypesScreen} />
      <Stack.Screen name="Push Preferences" component={PushPreferencesScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
    </Stack.Navigator>
  );
}
