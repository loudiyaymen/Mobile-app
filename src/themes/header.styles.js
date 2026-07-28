import { Platform } from "react-native";
import { colors } from "./color";

export const headerStyle = {
  backgroundColor: colors.primary_White,
  borderBottomWidth: 0,
  shadowOpacity: 0,
  elevation: 0,
  height: Platform.OS === "ios" ? 122 : 100,
};

export const headerOptions = {
  headerTintColor: colors.Primary_Charcoal,
  headerTitleAlign: "left",
  headerBackTitle: "Back",
  headerBackTitleVisible: true,
  headerTitleContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: Platform.OS === "ios" ? 10 : 16,
  },
  headerLeftContainerStyle: {
    paddingLeft: 24,
    paddingVertical: Platform.OS === "ios" ? 10 : 16,
  },
  headerRightContainerStyle: {
    paddingRight: 24,
    paddingVertical: Platform.OS === "ios" ? 10 : 16,
  },
  headerTitleStyle: {
    color: colors.Primary_Charcoal,
  },
  headerBackTitleStyle: {
    fontSize: 24,
  },
};
