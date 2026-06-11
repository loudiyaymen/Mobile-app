import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapStack from "./MapStack";
import EventsStack from "./EventsStack";
import SettingsStack from "./SettingsStack";
import ReportStack from "./ReportStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Reports" component={ReportStack}options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          
          // Add screen names where you want to hide the tab bar
          const hideOnScreens = ["Select Category", "Incident Report", "Sexual Assault Report", "Submit Report", "Report Submitted"]; 
          
          return {
            tabBarStyle: hideOnScreens.includes(routeName) 
              ? { display: "none" } 
              : undefined,
          };
        }}
      />
      <Tab.Screen name="Events" component={EventsStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}