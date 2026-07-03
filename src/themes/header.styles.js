import { colors } from "./color";

export const headerStyle = {
  backgroundColor: colors.primary_White,
  borderBottomWidth: 0,
  shadowOpacity: 0,
  elevation: 0,
  height: 100, //ignored on iOS
};

export const headerOptions = {
  headerTintColor: colors.Primary_Charcoal,
  headerTitleAlign: "left",
  headerBackTitle: "Back",
  headerBackTitleVisible: true,
  headerTitleContainerStyle: {
    paddingBottom: 10,
  },
  headerTitleStyle: {
    color: colors.Primary_Charcoal,
  },
  headerBackTitleStyle: {
    fontSize: 24,
  },
};
