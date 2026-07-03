import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Modal } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinSimpleIcon,
  CheckCircleIcon,
} from "phosphor-react-native";

export default function EventRegisterScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const isFormValid = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0;
  }, [name, email]);

  const handleRegister = () => {
    if (isFormValid) {
      setVisible(!visible);
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
              style={styles.inputField}
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
          </Pressable>
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
          onPress={handleRegister}
        >
          <Text
            style={[typography.secondaryBody, { color: colors.primary_White }]}
          >
            Register
          </Text>
        </Pressable>
      </View>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setVisible(false)}
          />
          <View>
            <View
              style={[styles.overlay, { paddingBottom: insets.bottom + 16 }]}
            >
              <CheckCircleIcon
                size={100}
                color={colors.primary_AC_Green}
                weight="fill"
                style={{ marginBottom: 16 }}
              />
              <Text style={[typography.h3, { color: colors.primary_AC_Green }]}>
                Success!
              </Text>
              <Text style={typography.h4}>{event?.title ?? "Event"}</Text>
              <View style={styles.infoContainer}>
                <View style={styles.iconTextGroup}>
                  <MapPinSimpleIcon size={20} color={colors.Primary_Charcoal} />
                  <Text style={typography.body}>
                    {event?.location ?? "Algonquin College"}
                  </Text>
                </View>
                <View style={styles.iconTextGroup}>
                  <CalendarIcon size={20} color={colors.Primary_Charcoal} />
                  <Text style={typography.body}>
                    {event?.date ?? "17th March 2026"}
                  </Text>
                </View>
                <View style={styles.iconTextGroup}>
                  <ClockIcon size={20} color={colors.Primary_Charcoal} />
                  <Text style={typography.body}>
                    {event?.time ?? "4:00 PM"}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.closeOverlayButton}
                onPress={() => {
                  setVisible(false);
                  navigation.popToTop();
                }}
              >
                <Text
                  style={[
                    typography.secondaryBody,
                    { color: colors.primary_White },
                  ]}
                >
                  Back to Events
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
