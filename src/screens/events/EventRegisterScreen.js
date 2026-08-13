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
import { isNonEmptyString, isValidEmail } from "../../utils/validation";

function sanitizeName(value) {
  return String(value || "").replace(/[^A-Za-z\s]/g, "");
}

export default function EventRegisterScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const isFormValid = useMemo(() => {
    return isNonEmptyString(name) && isValidEmail(email);
  }, [name, email]);

  const clearFieldError = (fieldName, value, validator) => {
    if (!errors[fieldName]) return;
    if (validator(value)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const handleRegister = async () => {
    if (event?.isRegistered) {
      Alert.alert(
        "Already registered",
        "You are already registered for this event.",
      );
      navigation.navigate("Registration Details", { event });
      return;
    }

    const nextErrors = {
      name: isNonEmptyString(name)
        ? undefined
        : "Name is required. Use letters and spaces only.",
      email: isValidEmail(email)
        ? undefined
        : "Enter a valid email in the format name@example.com.",
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      Alert.alert("Invalid Input", "Please complete the highlighted fields.");
      return;
    }

    setErrors({});

    try {
      setIsSubmitting(true);
      await registerForEvent(event?.id, {
        name: name.trim(),
        email: email.trim(),
      });

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

      if (
        message.toLowerCase().includes("event is full") ||
        message.toLowerCase().includes("registration is closed")
      ) {
        Alert.alert(
          "Registration closed",
          "This event has reached the participant limit.",
        );
        return;
      }

      Alert.alert("Registration failed", message || "Please try again.");
    } finally {
      setIsSubmitting(false);
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
          <View
            style={[styles.inputRow, errors.name ? styles.inputRowError : null]}
          >
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
              onChangeText={(value) => {
                const sanitized = sanitizeName(value);
                setName(sanitized);

                if (sanitized !== value) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    name: "Use letters and spaces only.",
                  }));
                  return;
                }

                clearFieldError("name", sanitized, isNonEmptyString);
              }}
            />
          </View>
        </View>
        {errors.name ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.name}
          </Text>
        ) : null}
        <Text style={[typography.h4, styles.label]}>Email *</Text>
        <View style={styles.shadowContainer}>
          <View
            style={[
              styles.inputRow,
              errors.email ? styles.inputRowError : null,
            ]}
          >
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
              onBlur={() => {
                setEmailTouched(true);
                if (!isValidEmail(email)) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    email:
                      "Enter a valid email in the format name@example.com.",
                  }));
                }
              }}
              onChangeText={(value) => {
                setEmail(value);
                if (emailTouched) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    email: isValidEmail(value)
                      ? undefined
                      : "Enter a valid email in the format name@example.com.",
                  }));
                  return;
                }

                clearFieldError("email", value, isValidEmail);
              }}
            />
          </View>
        </View>
        {errors.email ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.email}
          </Text>
        ) : null}
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
