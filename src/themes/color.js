import { StyleSheet } from "react-native";

export const colors = StyleSheet.create({
  primary_AC_Green: "#006341",
  primary_White: "#FFFFFF",
  Primary_Charcoal: "#212721",
  Secondary_New_Growth_Green: "#43B02A",
  Secondary_Dark_AC_Green: "#003328",

  SOS_Red: "#B21A1D",
  Cloud_Grey: "#DEE4E7",
  Light_Grey: "#F6F6F6",
  Grey: "#B5B5B5",
  Dark_Grey: "#5E5E5E",

  Warning_line: "#DBA837",
  Warning_background: "#EDC65F",

  Report_Sheet_Background: "#F1F5F2",
  Report_Modal_Backdrop: "rgba(0, 0, 0, 0.45)",
});

export const reportStatusBackground = {
  Opened: "#007AFF",
  "In review": "#FF9500",
  Resolved: "#34C759",
  Closed: "#8E8E93",
};

export const lightTheme = StyleSheet.create({
  colors: {
    background: colors.primary_White,
    surface: colors.Light_Grey,
    text: colors.Primary_Charcoal,
    subtext: colors.Dark_Grey,
    primary: colors.primary_AC_Green,
    accent: colors.Secondary_New_Growth_Green,
    border: colors.Cloud_Grey,
    error: colors.SOS_Red,
  },
});

export const darkTheme = StyleSheet.create({
  colors: {
    background: "#121212",
    surface: "#1E1E1E",
    text: "#F6F6F6",
    subtext: colors.Grey,
    primary: "#008557",
    accent: "#52D036",
    border: "#333333",
    error: "#CF6679",
  },
});
