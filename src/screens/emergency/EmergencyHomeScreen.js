// Displays the emergency SOS FAB home screen

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../themes/styles";
import { useNavigation } from "@react-navigation/native";
import { BellIcon } from "phosphor-react-native";
import { colors } from "../../themes/color";

import { useNotifications } from "../../context/NotificationContext";

export default function EmergencyHomescreen() {
  const navigation = useNavigation();
  const { addNotification, unreadCount } = useNotifications();

  // We trigger a fake notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        id: "1",
        title: "Emergency Meeting",
        body: "Emergency safety meeting in 30 minutes at Student Center.",
        timestamp: "1m ago",
        type: "emergency",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  //TODO: Separate the UI from the styles and integrate the modal properly instead of using a layout effect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            marginRight: 8,
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BellIcon size={24} color="#FFFFFF" weight="regular" />

          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                backgroundColor: colors.SOS_Red,
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1.5,
                borderColor: colors.primary_AC_Green,
                zIndex: 10,
              }}
            >
              <Text
                style={{
                  color: colors.primary_White,
                  fontSize: 10,
                  fontWeight: "bold",
                  paddingHorizontal: 2,
                }}
              >
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, unreadCount]);
  const timerRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isPressing, setIsPressing] = useState(false);
  const holdTime = 3000; // 3 seconds

  const handlePressIn = () => {
    setIsPressing(true);

    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();

    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: holdTime,
      useNativeDriver: false,
    }).start();

    timerRef.current = setTimeout(() => {
      navigation.navigate("EmergencyConfirm");
      resetAnimations();
    }, holdTime);
  };

  const handlePressOut = () => {
    setIsPressing(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    resetAnimations();
  };

  const resetAnimations = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    progressAnim.setValue(0);
  };

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
    <View style={styles.container}>
      <View style={styles.homeTitleContainer}>
        <Text style={styles.homeTitle}>
          Press and hold the SOS button for 3 seconds
        </Text>
      </View>

      <View style={styles.fabContainer}>
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
