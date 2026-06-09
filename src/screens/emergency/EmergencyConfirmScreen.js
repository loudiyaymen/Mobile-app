// Displays the emergency SOS confirmation screen

import { useEffect, useRef } from "react";
import { Text, View, Pressable, Linking, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../themes/styles";
import { useNavigation } from "@react-navigation/native";

export default function EmergencyConfirmScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const securityPhoneNumber = "613-727-4723";

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const confirmAndCall = async () => {
    const url = `tel:${securityPhoneNumber}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.warn("Could not open dialer:", err);
      Alert.alert(
        "Open dialer failed",
        `Please try again ${securityPhoneNumber}.`,
        [{ text: "OK" }],
      );
    }
    setTimeout(() => {
      navigation.navigate("EmergencyConnected");
    }, 500);
  };

  const handleConfirm = () => {
    confirmAndCall();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

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

        <View style={styles.confirmButtonContainer}>
          <Pressable
            style={[styles.button, styles.confirmEmergencyButton]}
            onPress={handleConfirm}
          >
            <Ionicons name="call" size={20} color={COLORS.WHITE} />
            <Text style={styles.confirmEmergencyButtonText}>
              Confirm Emergency
            </Text>
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
