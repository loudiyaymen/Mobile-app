import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { typography } from "../themes/typography";
import { colors } from "../themes/color";
import { styles } from "../themes/styles";
import { BellIcon } from "phosphor-react-native";
import NotificationScreen from "../screens/emergency/NotificationScreen";
import ReportHomeScreen from "../screens/reports/ReportHomeScreen";
import ReportCategoryScreen from "../screens/reports/ReportCategoryScreen";
import ReportIncidentScreen from "../screens/reports/ReportIncidentScreen";
import ReportAssaultScreen from "../screens/reports/ReportAssaultScreen";
import ReportLostItemScreen from "../screens/reports/ReportLostItemScreen";
import ReportSubmittedScreen from "../screens/reports/ReportSubmittedScreen";

import { headerStyle, headerOptions } from "../themes/header.styles";

const Stack = createNativeStackNavigator();

export default function ReportStack() {
  return (
    <Stack.Navigator
      initialRouteName="My Reports"
      screenOptions={{
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="My Reports"
        component={ReportHomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={styles.reportStackHeaderTitleWrapper}>
              <Text style={[typography.h2, styles.reportStackHeaderTitleText]}>
                My Reports
              </Text>
              <Text style={[typography.body, styles.reportStackHeaderSubtitle]}>
                View and track your incident reports
              </Text>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Notifications")}>
              <BellIcon size={24} color={colors.primary_AC_Green} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Select Category" component={ReportCategoryScreen} />
      <Stack.Screen name="Incident Report" component={ReportIncidentScreen} />
      <Stack.Screen
        name="Sexual Assault Report"
        component={ReportAssaultScreen}
      />
      <Stack.Screen name="Submit Report" component={ReportLostItemScreen} />
      <Stack.Screen
        name="Report Submitted"
        component={ReportSubmittedScreen}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
          contentStyle: styles.reportSubmittedScreenContent,
        }}
      />
    </Stack.Navigator>
  );
}
