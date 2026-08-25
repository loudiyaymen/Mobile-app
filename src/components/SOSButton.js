import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Pressable, Text, Animated, Linking, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";
import { navigate, navigationRef } from "../navigation/navigationRef";
import { styles } from "../themes/styles";

const HIDDEN_SCREENS = ["EmergencyConnected", "EmergencyHelp", "Onboarding"];
const HOLD_TIME = 3000;
const SECURITY_PHONE = "613-727-4723";

export default function SOSButton() {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);

  const resetAnimations = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    progressAnim.setValue(0);
  };

  const triggerCallAndNavigate = async () => {
    const url = `tel:${SECURITY_PHONE}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.warn("Could not open dialer:", err);
      Alert.alert("Open dialer failed", `Please try again ${SECURITY_PHONE}.`, [
        { text: "OK" },
      ]);
    }
    navigate("Emergency", { screen: "EmergencyConnected" });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        scaleAnim.setValue(1);
        progressAnim.setValue(0);
      };
    }, [scaleAnim, progressAnim]),
  );

  useEffect(() => {
    const progressListenerId = progressAnim.addListener(({ value }) => {
      setProgressValue(value);
    });
    const unsubscribe = navigationRef.addListener("state", () => {
      const route = navigationRef.getCurrentRoute();
      setCurrentRoute(route?.name);
    });
    return () => {
      progressAnim.removeListener(progressListenerId);
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [progressAnim]);

  const handlePressIn = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPressing(true);

    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();

    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: HOLD_TIME,
      useNativeDriver: false,
    }).start();

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIsPressing(false);
      resetAnimations();
      triggerCallAndNavigate();
    }, HOLD_TIME);
  };

  const handlePressOut = () => {
    setIsPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    resetAnimations();
  };

  if (HIDDEN_SCREENS.includes(currentRoute)) return null;

  const fabAnimatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressValue);

  return (
    <View style={styles.sosFabOverlayWrapper}>
      <View style={styles.sosFabInner}>
        {isPressing ? (
          <Text style={[styles.sosFabHoldHint, styles.sosFabHoldHintActive]}>
            Keep holding
          </Text>
        ) : null}
        {isPressing && (
          <View style={styles.progressCircleContainer}>
            <Svg width={size} height={size}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(0, 99, 65, 0.22)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#006341"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>
          </View>
        )}
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Animated.View style={[styles.fab, fabAnimatedStyle]}>
            <Text style={styles.fabIcon}>SOS</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
