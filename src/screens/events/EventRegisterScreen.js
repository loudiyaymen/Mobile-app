import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  EnvelopeIcon,
} from "phosphor-react-native";
import { registerForEvent } from "../../services/eventService";

export default function EventRegisterScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0;
  }, [name, email]);

  const handleRegister = async () => {
    if (event?.isRegistered) {
      Alert.alert(
        "Already registered",
        "You are already registered for this event.",
      );
      navigation.navigate("Registration Details", { event });
      return;
    }

    if (isFormValid) {
      try {
        setIsSubmitting(true);
        await registerForEvent(event?.id);

        navigation.navigate("Registration Details", {
          event: { ...event, isRegistered: true },
          registration: {
            name: name.trim(),
            email: email.trim(),
          },
        });
      } catch (error) {
        const message = String(error?.message || "");
        if (message.toLowerCase().includes("already registered")) {
          Alert.alert(
            "Already registered",
            "You are already registered for this event.",
          );
          navigation.navigate("Registration Details", { event });
          return;
        }

        Alert.alert("Registration failed", message || "Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
        <Text style={[typography.h4, styles.label]}>Name *</Text>
        <View style={styles.shadowContainer}>
          <View style={styles.inputRow}>
            <UserIcon
              size={26}
              color={colors.Primary_Charcoal}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="e.g., John Doe"
              autoCapitalize="words"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        <Text style={[typography.h4, styles.label]}>Email *</Text>
        <View style={styles.shadowContainer}>
          <View style={styles.inputRow}>
            <EnvelopeIcon
              size={26}
              color={colors.Primary_Charcoal}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="e.g., john.doe@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <Pressable
          style={[
            styles.registerButton,
            {
              backgroundColor: isFormValid
                ? colors.primary_AC_Green
                : colors.Dark_Grey,
            },
          ]}
          key={event.id}
          disabled={!isFormValid || isSubmitting}
          onPress={handleRegister}
        >
          <Text
            style={[typography.secondaryBody, { color: colors.primary_White }]}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
