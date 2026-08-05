import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

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
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary_AC_Green,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeInAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={[
              typography.h1,
              {
                color: colors.primary_White,
                fontSize: 48,
                fontWeight: "700",
              },
            ]}
          >
            Algonquin
          </Text>
          <Text
            style={[
              typography.h1,
              {
                color: colors.primary_White,
                fontSize: 48,
                fontWeight: "700",
              },
            ]}
          >
            GO
          </Text>
        </Animated.View>
      </View>

      <Pressable
        onPress={onContinue}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 32,
          backgroundColor: colors.primary_White,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Text
          style={[
            typography.h4,
            {
              color: colors.primary_AC_Green,
              fontWeight: "700",
            },
          ]}
        >
          Get Started
        </Text>
      </Pressable>
    </View>
  );
}
