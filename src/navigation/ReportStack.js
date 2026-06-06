import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportHomeScreen from "../screens/reports/ReportHomeScreen";
import ReportCategoryScreen from "../screens/reports/ReportCategoryScreen";
import ReportIncidentScreen from "../screens/reports/ReportIncidentScreen";
import ReportAssaultScreen from "../screens/reports/ReportAssaultScreen";
import ReportLostItemScreen from "../screens/reports/ReportLostItemScreen";
import ReportSubmittedScreen from "../screens/reports/ReportSubmittedScreen";

import { COLORS } from "../themes/styles";

const Stack = createNativeStackNavigator();

export default function ReportStack() {
  return (
    <Stack.Navigator
      initialRouteName="My Reports"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.ALGONQUIN_GREEN },
        headerTintColor: COLORS.WHITE,
        headerTitleStyle: { fontWeight: "bold" },
        headerBackTitle: "Back",
        headerBackTitleVisible: true,
        headerBackTitleStyle: {
          fontSize: 14,
        },
      }}
    >
      <Stack.Screen name="My Reports" component={ReportHomeScreen} />
      <Stack.Screen name="Select Category" component={ReportCategoryScreen} />
      <Stack.Screen name="Incident Report" component={ReportIncidentScreen} />
      <Stack.Screen
        name="Sexual Assault Report"
        component={ReportAssaultScreen}
      />
      <Stack.Screen name="Submit Report" component={ReportLostItemScreen} />
      <Stack.Screen name="Report Submitted" component={ReportSubmittedScreen} />
    </Stack.Navigator>
  );
}
