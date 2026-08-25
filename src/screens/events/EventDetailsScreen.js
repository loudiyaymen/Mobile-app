import React, { useState } from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import DetailSection from "../../components/DetailsSection";
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  ClockIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { cancelEventRegistration } from "../../services/eventService";

export default function EventDetailsScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const sourceTab = route.params?.sourceTab || "allEvents";
  const imageUri = event?.image;
  const navigation = useNavigation();
  const alreadyRegistered = Boolean(event?.isRegistered);
  const [isCancelling, setIsCancelling] = useState(false);

  async function handleCancelRegistration() {
    if (!event?.id || isCancelling) return;

    Alert.alert(
      "Cancel registration",
      "Are you sure you want to cancel your registration for this event?",
      [
        { text: "Keep registration", style: "cancel" },
        {
          text: "Cancel registration",
          style: "destructive",
          onPress: async () => {
            try {
              setIsCancelling(true);
              await cancelEventRegistration(event.id);
              navigation.navigate("Events Home", {
                activeTab: sourceTab,
                refreshKey: Date.now(),
              });
            } catch (error) {
              Alert.alert(
                "Cancellation failed",
                error?.message || "Please try again.",
              );
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ],
    );
  }

  return (
    <View style={[styles.container]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.eventImage} />
      ) : null}
      <ScrollView style={styles.detailsContent}>
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

        <View>
          <DetailSection
            title="Event details"
            content={event?.description ?? "No description available."}
          />
          <DetailSection
            title="Location"
            icon={MapPinIcon}
            content={event?.location ?? "No location specified."}
          />
          <DetailSection
            title="Registration Deadline"
            icon={CalendarIcon}
            content={event?.registrationDeadline ?? "No deadline specified."}
          />
        </View>
      </ScrollView>

      <View style={{ marginHorizontal: 16 }}>
        <Pressable
          style={[
            styles.registerButton,
            alreadyRegistered ? { backgroundColor: colors.SOS_Red } : null,
          ]}
          disabled={isCancelling}
          onPress={() => {
            if (alreadyRegistered) {
              handleCancelRegistration();
            } else {
              navigation.navigate("Event Register", { event });
            }
          }}
        >
          <Text style={[typography.body, { color: colors.primary_White }]}>
            {alreadyRegistered
              ? isCancelling
                ? "Cancelling..."
                : "Cancel registration"
              : "Register"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
