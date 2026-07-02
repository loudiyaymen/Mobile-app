import React, { useMemo } from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import { useRoute } from "@react-navigation/native";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  EnvelopeIcon,
} from "phosphor-react-native";
import { TextInput, Pressable } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EventRegisterScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0;
  }, [name, email]);

  const handleRegister = () => {
    if (isFormValid) {
      Alert.alert(
        "Registration Successful",
        `You have registered for ${event.title}`,
      );
      // put API call here to register user for event
    } else {
      Alert.alert("Invalid Input", "Please fill in all required fields.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.infoRow}>
            <Text style={[typography.h5, { flex: 1 }]}>
              {event?.title ?? "Event"}
            </Text>
            <View style={styles.iconTextGroup}>
              <UserIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>
                {event?.organizer ?? "Algonquin College"}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconTextGroup}>
              <CalendarIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>
                {event?.date ?? "17th March 2026"}
              </Text>
            </View>
            <View style={styles.iconTextGroup}>
              <ClockIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>{event?.time ?? "4:00 PM"}</Text>
            </View>
          </View>
        </View>
        {/* Name */}
        <Text style={[typography.h4, styles.label]}>Name *</Text>
        <View style={styles.shadowContainer}>
          <Pressable style={styles.inputRow}>
            <UserIcon
              size={26}
              color={colors.Primary_Charcoal}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={[typography.body, styles.inputField]}
              placeholder="e.g., John Doe"
              autoCapitalize="words"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
            />
          </Pressable>
        </View>
        {/* Email */}
        <Text style={[typography.h4, styles.label]}>Email *</Text>
        <View style={styles.shadowContainer}>
          <Pressable style={styles.inputRow}>
            <EnvelopeIcon
              size={26}
              color={colors.Primary_Charcoal}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={[typography.body, styles.inputField]}
              placeholder="e.g., john.doe@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
          </Pressable>
        </View>
        <Pressable
          style={styles.registerButton}
          key={event.id}
          onPress={handleRegister}
          disabled={!isFormValid}
        >
          <Text style={[typography.body, { color: colors.primary_White }]}>
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
