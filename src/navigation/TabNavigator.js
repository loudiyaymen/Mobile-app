import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapStack from "./MapStack";
import EventsStack from "./EventsStack";
import SettingsStack from "./SettingsStack";
import ReportStack from "./ReportStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Reports" component={ReportStack} />
      <Tab.Screen name="Events" component={EventsStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}
