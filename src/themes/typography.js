import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  // Primary Styles (Metropolis)
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Metropolis-Bold",
  },
  h2: {
    fontSize: 24,
    lineHeight: 31.2,
    fontFamily: "Metropolis-SemiBold",
  },
  h3: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "Metropolis-SemiBold",
  },
  h4: {
    fontSize: 18,
    lineHeight: 25.2,
    fontFamily: "Metropolis-SemiBold",
  },
  h5: {
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: "Metropolis-Medium",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Metropolis-Regular",
  },
  caption: {
    fontSize: 12,
    lineHeight: 15.6,
    fontFamily: "Metropolis-Regular",
  },

  // Secondary Styles (Arial)
  secondaryH3: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "Arial",
    fontWeight: 700,
  },
  secondaryH4: {
    fontSize: 18,
    lineHeight: 25.2,
    fontFamily: "Arial",
    fontWeight: 600,
  },
  secondaryH5: {
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: "Arial",
    fontWeight: 600,
  },
  secondaryBody: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Arial",
    fontWeight: 500,
  },
  secondaryCaption: {
    fontSize: 12,
    lineHeight: 16.8,
    fontFamily: "Arial",
    fontWeight: 400,
  },
});
