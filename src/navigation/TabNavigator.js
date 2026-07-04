import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapStack from "./MapStack";
import EventsStack from "./EventsStack";
import SettingsStack from "./SettingsStack";
import ReportStack from "./ReportStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { headerOptions, headerStyle } from "../themes/header.styles";
import {
  NavigationArrowIcon,
  FileTextIcon,
  CalendarBlankIcon,
  GearSixIcon,
} from "phosphor-react-native";
import { colors } from "../themes/color";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const sharedTabBarStyle = {
  position: "absolute",
  backgroundColor: colors.primary_White,
  borderTopStartRadius: 40,
  borderTopEndRadius: 40,
  overflow: "hidden",
};

const sharedTabBarBackgroundStyle = {
  flex: 1,
  backgroundColor: colors.primary_White,
  borderWidth: 1,
  borderColor: colors.Cloud_Grey,
  borderBottomWidth: 0,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
};

const navHideOnScreens = [
  "Navigate",
];

const reportHideOnScreens = [
  "Select Category",
  "Incident Report",
  "Sexual Assault Report",
  "Submit Report",
  "Report Submitted",
];

const eventHideOnScreens = [
  "Event Details",
  "Event Register",
];

function shouldHideTabBar(route, hideOnScreens) {
  const routeName = getFocusedRouteNameFromRoute(route);
  return hideOnScreens.includes(routeName);
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="WayFinder"
      screenOptions={{
        headerShown: false,
        ...headerOptions,
        headerStyle,
        tabBarActiveTintColor: colors.primary_AC_Green,
        tabBarInactiveTintColor: colors.Primary_Charcoal,
        tabBarStyle: sharedTabBarStyle,
        tabBarBackground: () => <View style={sharedTabBarBackgroundStyle} />,
      }}
    >
      <Tab.Screen
        name="WayFinder"
        component={MapStack}
        options={({ route }) => {
          const shouldHide = shouldHideTabBar(route, navHideOnScreens);
          return {
            title: "WayFinder",
            tabBarStyle: shouldHide ? { display: "none" } : sharedTabBarStyle,
            tabBarBackground: shouldHide
              ? undefined
              : () => <View style={sharedTabBarBackgroundStyle} />,
            tabBarIcon: ({ size, color, focused }) => (
              <NavigationArrowIcon
                size={size}
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportStack}
        options={({ route }) => {
          const shouldHide = shouldHideTabBar(route, reportHideOnScreens);

          return {
            title: "Reports",
            tabBarStyle: shouldHide ? { display: "none" } : sharedTabBarStyle,
            tabBarBackground: shouldHide
              ? undefined
              : () => <View style={sharedTabBarBackgroundStyle} />,
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
        options={({ route }) => {
          const shouldHide = shouldHideTabBar(route, eventHideOnScreens);

          return {
            title: "Events",
            tabBarStyle: shouldHide ? { display: "none" } : sharedTabBarStyle,
            tabBarBackground: shouldHide
              ? undefined
              : () => <View style={sharedTabBarBackgroundStyle} />,
            tabBarIcon: ({ size, color, focused }) => (
              <CalendarBlankIcon
                size={size}
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: "Settings",
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
