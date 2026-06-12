import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapStack from "./MapStack";
import EventsStack from "./EventsStack";
import SettingsStack from "./SettingsStack";
import ReportStack from "./ReportStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  NavigationArrowIcon,
  FileTextIcon,
  CalendarBlankIcon,
  GearSixIcon,
} from "phosphor-react-native";
import { colors } from "../themes/color";
import { typography } from "../themes/typography";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="WayFinder"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary_AC_Green,
        tabBarInactiveTintColor: colors.Primary_Charcoal,
        tabBarLabelStyle: {
          ...typography.caption,
        },
      }}
    >
      <Tab.Screen
        name="WayFinder"
        component={MapStack}
        options={{
          title: "WayFinder",
          tabBarIcon: ({ size, color, focused }) => (
            <NavigationArrowIcon
              size={size}
              color={color}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          // Add screen names where you want to hide the tab bar
          const hideOnScreens = [
            "Select Category",
            "Incident Report",
            "Sexual Assault Report",
            "Submit Report",
            "Report Submitted",
          ];

          return {
            title: "Reports",
            tabBarStyle: hideOnScreens.includes(routeName)
              ? { display: "none" }
              : undefined,
            tabBarIcon: ({ size, color, focused }) => (
              <FileTextIcon
                size={size}
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{
          title: "Events",
          tabBarIcon: ({ size, color, focused }) => (
            <CalendarBlankIcon
              size={size}
              color={color}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: "Events",
          tabBarIcon: ({ size, color, focused }) => (
            <GearSixIcon
              size={size}
              color={color}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
