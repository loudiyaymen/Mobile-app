// Displays the confirmation of emergency alert screen

import { useState, useEffect, useRef } from "react";
import { Text, View, Pressable, Linking, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../../themes/styles";
import { useNavigation } from "@react-navigation/native";

export default function EmergencyConfirmScreen() {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(5);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const securityPhoneNumber = "613-727-4723";

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handling the phone API - opens phone dialer with security number
  const handleConfirm = () => {
    Linking.openURL(`tel:${securityPhoneNumber}`);
    navigation.navigate("EmergencyHelp");
  };

  useEffect(() => {
    progressAnim.setValue(0);
    const interval = setInterval(() => {
      setCounter((prev) => {
        const newValue = prev <= 1 ? 0 : prev - 1;
        const progress = (5 - newValue) / 5;
        Animated.timing(progressAnim, {
          toValue: progress,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setTimeout(() => {
        Linking.openURL(`tel:${securityPhoneNumber}`);
        navigation.navigate("EmergencyHelp");
      }, 0);
    }
  }, [counter, navigation, securityPhoneNumber]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const progressRotation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "270deg"],
  });

  const fadeInAnimatedStyle = {
    opacity: fadeAnim,
  };

  return (
    <Animated.View
      style={[styles.confirmScreenBackground, fadeInAnimatedStyle]}
    >
      <View style={styles.confirmCard}>
        <View style={styles.shieldIconContainer}>
          <View style={styles.shieldIconBackground}>
            <Ionicons name="shield" size={32} color={COLORS.ALGONQUIN_GREEN} />
          </View>
        </View>

        <Text style={styles.confirmCardTitle}>Emergency Alert</Text>

        <Text style={styles.confirmCardSubtitle}>
          Contacting Algonquin College Security in...
        </Text>

        <View style={styles.countdownCircleContainer}>
          <View style={styles.countdownCircle}>
            <Animated.View
              style={[
                styles.countdownProgressArc,
                {
                  transform: [{ rotate: progressRotation }],
                },
              ]}
            />

            <Text style={styles.countdownCircleNumber}>{counter}</Text>
            <Text style={styles.countdownCircleLabel}>
              {counter === 1 ? "SECOND" : "SECONDS"}
            </Text>
          </View>
        </View>

        <View style={styles.confirmButtonContainer}>
          <Pressable
            style={[styles.button, styles.confirmEmergencyButton]}
            onPress={handleConfirm}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="call" size={20} color={COLORS.WHITE} />
              <Text style={styles.confirmEmergencyButtonText}>
                {" "}
                Confirm Emergency
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.button, styles.cancelButtonNew]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonTextNew}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
