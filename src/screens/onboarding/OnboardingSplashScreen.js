import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

const splashStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary_AC_Green,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  titleBlock: {
    alignItems: "center",
    gap: 8,
    paddingTop: 18,
  },
  titleText: {
    color: colors.primary_White,
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 58,
  },
  titleTopText: {
    marginBottom: 6,
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.primary_White,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.primary_AC_Green,
    fontWeight: "700",
  },
});

export default function OnboardingSplashScreen({ onContinue }) {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeInAnim, scaleAnim]);

  return (
    <SafeAreaView style={splashStyles.root}>
      <View style={splashStyles.centeredContent}>
        <Animated.View
          style={[
            splashStyles.titleBlock,
            {
              opacity: fadeInAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text
            style={[
              typography.h1,
              splashStyles.titleText,
              splashStyles.titleTopText,
            ]}
          >
            Algonquin
          </Text>
          <Text style={[typography.h1, splashStyles.titleText]}>GO</Text>
        </Animated.View>
      </View>

      <Pressable onPress={onContinue} style={splashStyles.startButton}>
        <Text style={[typography.h4, splashStyles.startButtonText]}>
          Get Started
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
