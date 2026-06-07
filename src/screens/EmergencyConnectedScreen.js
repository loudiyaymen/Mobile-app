// Thank-you screen after user has contacted security

import { useRef, useEffect } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../themes/styles";
import { useNavigation } from "@react-navigation/native";

export default function EmergencyConnectedScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fadeInAnimatedStyle = {
    opacity: fadeAnim,
  };

  const handleReturnToMap = () => {
    navigation.navigate("EmergencyHome");
  };

  return (
    <Animated.View
      style={[styles.container, styles.callingContainer, fadeInAnimatedStyle]}
    >
      <View style={styles.callingContent}>
        {/* Green phone icon */}
        <View style={styles.callingIconContainer}>
          <View
            style={[
              styles.callingIconCircle,
              { backgroundColor: COLORS.ALGONQUIN_GREEN },
            ]}
          >
            <Ionicons name="call" size={50} color={COLORS.WHITE} />
          </View>
        </View>

        <Text style={styles.callingTitle}>Thank you for contacting</Text>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.CHARCOAL,
            fontWeight: "700",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Algonquin College Security
        </Text>

        <View
          style={{
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: COLORS.CHARCOAL,
              lineHeight: 22,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            EMERGENCY TELEPHONES are located at most building stairwells and
            entrances as well as in the parking lots. They are red or yellow
            with a button to call for assistance.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.CHARCOAL,
              lineHeight: 22,
              textAlign: "center",
              marginBottom: 12,
              fontWeight: "600",
            }}
          >
            DIAL Ext. 5000 from any College phone.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.CHARCOAL,
              lineHeight: 22,
              textAlign: "center",
            }}
          >
            You can also report any incident using the{" "}
            <Text style={{ fontWeight: "600" }}>Report an Incident</Text>{" "}
            feature on the app home screen.
          </Text>
        </View>

        <Pressable
          style={{
            backgroundColor: COLORS.CHARCOAL,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 32,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleReturnToMap}
        >
          <Text
            style={{ color: COLORS.WHITE, fontSize: 16, fontWeight: "600" }}
          >
            Return to Map
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
