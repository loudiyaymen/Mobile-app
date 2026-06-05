// Calling Security screen - opens phone dialer and guides user to call

import React, { useRef, useEffect, useState } from "react";
import { Text, View, Pressable, Linking, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../../themes/styles";
import { useNavigation } from "@react-navigation/native";

export default function EmergencyHelpScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const securityPhoneNumber = "613-727-4723";
  const [dialerOpened, setDialerOpened] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const openDialer = async () => {
      try {
        const phoneUrl = `tel:${securityPhoneNumber}`;
        const canOpen = await Linking.canOpenURL(phoneUrl);

        if (canOpen) {
          await Linking.openURL(phoneUrl);
          setDialerOpened(true);
        } else {
          Alert.alert(
            "Cannot Make Call",
            "Your device cannot make phone calls. Please dial the number manually.",
            [{ text: "OK" }],
          );
        }
      } catch (error) {
        console.error("Error opening dialer:", error);
        Alert.alert(
          "Error",
          "Could not open phone dialer. Please try the call button below.",
          [{ text: "OK" }],
        );
      }
    };

    const timer = setTimeout(() => {
      openDialer();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle call button - opens dialer again as backup
  const handleCallSecurity = async () => {
    try {
      const phoneUrl = `tel:${securityPhoneNumber}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);

      if (canOpen) {
        await Linking.openURL(phoneUrl);
        setDialerOpened(true);
      } else {
        Alert.alert(
          "Cannot Make Call",
          "Your device cannot make phone calls.",
          [{ text: "OK" }],
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not open phone dialer.", [{ text: "OK" }]);
    }
  };

  const handleReturnHome = () => {
    navigation.navigate("EmergencyHome");
  };

  const fadeInAnimatedStyle = {
    opacity: fadeAnim,
  };

  return (
    <Animated.View
      style={[styles.container, styles.callingContainer, fadeInAnimatedStyle]}
    >
      <View style={styles.callingContent}>
        <View style={styles.callingIconContainer}>
          <View style={styles.callingIconCircle}>
            <Ionicons name="call" size={50} color={COLORS.WHITE} />
          </View>
        </View>
        <Text style={styles.callingTitle}>Calling Campus Security</Text>

        {/* Phone Number Display */}
        <View style={styles.phoneNumberContainer}>
          <Text style={styles.phoneNumberLabel}>Security Number:</Text>
          <Text style={styles.phoneNumber}>{securityPhoneNumber}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Your phone dialer should open automatically.{"\n"}
            If it doesn't, tap the button below.
          </Text>
        </View>

        {/* Call Security Button */}
        <Pressable
          style={[styles.button, styles.callSecurityButton]}
          onPress={handleCallSecurity}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="call" size={24} color={COLORS.WHITE} />
            <Text style={styles.callSecurityButtonText}> Call Security</Text>
          </View>
        </Pressable>

        {/* Return to Home Button */}
        <Pressable style={styles.returnHomeButton} onPress={handleReturnHome}>
          <Text style={styles.returnHomeButtonText}>Return to Home</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
