import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Pressable, Text, Animated, Linking, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { navigate, navigationRef } from "../navigation/navigationRef";
import { styles } from "../themes/styles";

const HIDDEN_SCREENS = ["EmergencyConnected", "EmergencyHelp"];
const HOLD_TIME = 3000;
const SECURITY_PHONE = "613-727-4723";

export default function SOSButton() {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

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
      Alert.alert(
        "Open dialer failed",
        `Please try again ${SECURITY_PHONE}.`,
        [{ text: "OK" }],
      );
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
    const unsubscribe = navigationRef.addListener("state", () => {
      const route = navigationRef.getCurrentRoute();
      setCurrentRoute(route?.name);
    });
    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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

  const rotateInterpolation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressCircleAnimatedStyle = {
    transform: [{ rotate: rotateInterpolation }],
  };

  const fabAnimatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.sosFabOverlayWrapper}>
      <Text
        style={[
          styles.sosFabHoldHint,
          isPressing && styles.sosFabHoldHintActive,
        ]}
      >
        {isPressing ? "Keep holding…" : "Hold for 3 seconds"}
      </Text>
      <View style={styles.sosFabInner}>
        {isPressing && (
          <Animated.View style={styles.progressCircleContainer}>
            <Animated.View style={styles.progressCircleBase}>
              <Animated.View
                style={[styles.progressCircleFill, progressCircleAnimatedStyle]}
              />
            </Animated.View>
          </Animated.View>
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
