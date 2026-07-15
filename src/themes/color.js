import { StyleSheet } from "react-native";

// Algonquin College Brand Colors
// Separate from styles and extend Color based on Figma design system
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
});

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
    icon: colors.Primary_Charcoal,
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
    icon: "#F6F6F6",
  },
});

export const accessibleTheme = StyleSheet.create({
  colors: {
    background: "#FFFFFF",
    surface: "#F0F0F0",
    text: "#000000",  
    subtext: "#333333",
    primary: "#006341",
    accent: "#43B02A",
    border: "#999999",
    error: "#B21A1D",
  },
});

export const protanopiaTheme = {
  colors: {
    background: "#FFFFFF",
    surface:    "#F6F6F6",
    text:       "#212721",
    subtext:    "#5E5E5E",
    primary:    "#0072B2",  
    accent:     "#56B4E9",
    border:     "#DEE4E7",
    error:      "#E69F00", 
  },
};

export const deuteranopiaTheme = {
  colors: {
    background: "#FFFFFF",
    surface:    "#F6F6F6",
    text:       "#212721",
    subtext:    "#5E5E5E",
    primary:    "#0072B2", 
    accent:     "#56B4E9",
    border:     "#DEE4E7",
    error:      "#E69F00",
  },
};

export const tritanopiaTheme = {
  colors: {
    background: "#FFFFFF",
    surface:    "#F6F6F6",
    text:       "#212721",
    subtext:    "#5E5E5E",
    primary:    "#CC79A7",  
    accent:     "#D55E00",
    border:     "#DEE4E7",
    error:      "#D55E00",
  },
};