import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Pressable, Text, Animated, Easing } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { navigate, navigationRef } from "../navigation/navigationRef";
import { styles } from "../themes/styles";

const HIDDEN_SCREENS = ["EmergencyConfirm", "EmergencyHelp"];
const HOLD_TIME = 3000;

export default function SOSButton() {
  const [currentRoute, setCurrentRoute] = useState(null);
  
  const timerRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // --- Animation Helpers ---

  const animateIn = () => {
    // Shrink down
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Progress bar fills up
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: HOLD_TIME,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const animateOut = (isInstant = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isInstant) {
      scaleAnim.setValue(1);
      progressAnim.setValue(0);
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // --- Lifecycle Hooks ---

  useFocusEffect(
    useCallback(() => {
      return () => animateOut(true);
    }, [])
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

  // --- Handlers ---

  const handlePressIn = () => {
    animateIn();

    timerRef.current = setTimeout(() => {
      animateOut(true);
      navigate("Emergency", { screen: "EmergencyConfirm" });
    }, HOLD_TIME);
  };

  const handlePressOut = () => {
    animateOut(false);
  };

  if (HIDDEN_SCREENS.includes(currentRoute)) return null;

  return (
    <View style={{ position: "absolute", bottom: 105, right: 20, zIndex: 999 }}>
      <Animated.View 
        style={{ 
          transform: [{ scale: scaleAnim }],
          elevation: scaleAnim.interpolate({
            inputRange: [0.85, 1],
            outputRange: [2, 8]
          })
        }}
      >
        <Pressable
          style={styles.fab}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.fabIcon}>SOS</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}