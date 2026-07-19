import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { typography } from "../themes/typography";
import { colors } from "../themes/color";
import { styles } from "../themes/styles";
import ReportHomeScreen from "../screens/reports/ReportHomeScreen";
import ReportCategoryScreen from "../screens/reports/ReportCategoryScreen";
import ReportIncidentScreen from "../screens/reports/ReportIncidentScreen";
import ReportAssaultScreen from "../screens/reports/ReportAssaultScreen";
import ReportLostItemScreen from "../screens/reports/ReportLostItemScreen";
import ReportSubmittedScreen from "../screens/reports/ReportSubmittedScreen";

import { headerStyle, headerOptions } from "../themes/header.styles";
import NotificationHeaderButton from "../components/NotificationHeaderButton";

const Stack = createNativeStackNavigator();

export default function ReportStack() {
  return (
    <Stack.Navigator
      initialRouteName="My Reports"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerStyle,
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: ({ canGoBack, tintColor }) =>
          canGoBack ? (
            <View style={{ paddingLeft: 24, paddingVertical: 16 }}>
              <HeaderBackButton
                tintColor={tintColor ?? colors.Primary_Charcoal}
                labelVisible={false}
                onPress={() => navigation.goBack()}
              />
            </View>
          ) : null,
        headerRight: () => (
          <View style={{ paddingRight: 24, paddingVertical: 16 }}>
            <NotificationHeaderButton
              onPress={() => navigation.getParent()?.navigate("Notifications")}
            />
          </View>
        ),
      })}
    >
      <Stack.Screen
        name="My Reports"
        component={ReportHomeScreen}
        options={{
          headerTitle: () => (
            <View
              style={[
                styles.reportStackHeaderTitleWrapper,
                { paddingHorizontal: 24, paddingVertical: 16 },
              ]}
            >
              <Text style={[typography.h2, styles.reportStackHeaderTitleText]}>
                My Reports
              </Text>
              <Text style={[typography.body, styles.reportStackHeaderSubtitle]}>
                View and track your incident reports
              </Text>
            </View>
          ),
        }}
      />
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
