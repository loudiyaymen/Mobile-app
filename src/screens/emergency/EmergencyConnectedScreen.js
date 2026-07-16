// Thank-you screen after user has contacted security
import { useRef, useEffect } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PhoneIcon } from "phosphor-react-native";
import { styles } from "../../themes/styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

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

  const goBack = () => {
    navigation.getParent()?.goBack();
  };

  return (
    <Animated.View
      style={[styles.container, styles.callingContainer, fadeInAnimatedStyle]}
    >
      <View style={styles.callingContent}>
        {/* Red phone icon */}
        <View style={styles.callingIconContainer}>
          <View
            style={[
              styles.callingIconCircle,
              { backgroundColor: colors.SOS_Red },
            ]}
          >
            <PhoneIcon
              name="call"
              size={56}
              color={colors.primary_White}
              weight="fill"
            />
          </View>
        </View>
        <Text
          style={[
            typography.secondaryH5,
            {
              color: colors.Primary_Charcoal,
              marginBottom: 24,
              textAlign: "center",
            },
          ]}
        >
          Thank you for using Algonquin College Security
        </Text>

        <View
          style={{
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.Primary_Charcoal,
              lineHeight: 22,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Emergency Phones (red/yellow) are located in stairwells, entrances,
            and parking lots. You can also report incidents via the app home
            screen.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.Primary_Charcoal,
              lineHeight: 22,
              textAlign: "center",
              marginBottom: 12,
              fontWeight: "600",
            }}
          >
            DIAL Ext. 5000 from any College phone.
          </Text>
        </View>

        <Pressable
          style={{
            backgroundColor: colors.primary_AC_Green,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 32,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={goBack}
        >
          <Text
            style={[
              typography.secondaryH4,
              {
                color: colors.primary_White,
              },
            ]}
          >
            Return to Home
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
