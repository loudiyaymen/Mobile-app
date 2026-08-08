import React, { useMemo, useRef, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  CalendarIcon,
  ClockIcon,
  MapPinSimpleIcon,
  WarningCircleIcon,
  XIcon,
  CaretRightIcon,
  Check,
} from "phosphor-react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { cancelEventRegistration } from "../../services/eventService";

function ActionRow(props) {
  const { icon, label, onPress, destructive } = props;
  const isDestructive = destructive === true;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {icon}
        <Text
          style={[
            typography.body,
            {
              color: isDestructive
                ? colors.Primary_Charcoal
                : colors.Primary_Charcoal,
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <CaretRightIcon size={28} color={colors.Primary_Charcoal} />
    </Pressable>
  );
}

export default function RegistrationDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const event = route && route.params ? route.params.event : undefined;
  const [showToast, setShowToast] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const cancelTimerRef = useRef(null);

  const eventTitle = event?.title ?? "Event";
  const eventDate = event?.date ?? "17th March 2026";
  const eventTime = event?.time ?? "4:00 PM";
  const eventLocation = event?.location ?? "Jack Doyle Athletics Centre";

  const dateText = useMemo(() => eventDate, [eventDate]);

  const handleCancelRegistration = async () => {
    try {
      await cancelEventRegistration(event?.id);
      setShowToast(true);
      if (cancelTimerRef.current) {
        clearTimeout(cancelTimerRef.current);
      }
      cancelTimerRef.current = setTimeout(() => {
        setShowToast(false);
        navigation.navigate("Events Home", {
          activeTab: "myEvents",
          refreshKey: Date.now(),
        });
      }, 1400);
    } catch (error) {
      setShowToast(false);
      console.error("Failed to cancel registration:", error);
    }
  };

  const handleConfirmCancelRegistration = () => {
    setShowCancelConfirm(true);
  };

  const handleKeepRegistration = () => {
    setShowCancelConfirm(false);
  };

  const handleConfirmCancellation = async () => {
    setShowCancelConfirm(false);
    await handleCancelRegistration();
  };

  const handleBackToEvents = () => {
    navigation.navigate("Events Home", {
      activeTab: "myEvents",
      refreshKey: Date.now(),
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey }}>
      <View style={{ paddingHorizontal: 22, paddingTop: 18 }}>
        <Text
          style={[
            typography.h4,
            { color: colors.Primary_Charcoal, marginBottom: 12 },
          ]}
        >
          Date and time
        </Text>
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <CalendarIcon size={34} color={colors.Primary_Charcoal} />
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {dateText}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <ClockIcon size={34} color={colors.Primary_Charcoal} />
            <Text style={[typography.body, { color: colors.Primary_Charcoal }]}>
              {eventTime}
            </Text>
          </View>
        </View>

        <Text
          style={[
            typography.h4,
            { color: colors.Primary_Charcoal, marginTop: 28, marginBottom: 10 },
          ]}
        >
          Location
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MapPinSimpleIcon size={34} color={colors.Primary_Charcoal} />
          <Text
            style={[
              typography.body,
              { color: colors.Primary_Charcoal, flex: 1 },
            ]}
          >
            {eventLocation}
          </Text>
        </View>

        <View
          style={{
            marginTop: 28,
            borderRadius: 18,
            backgroundColor: "#EDEDED",
            overflow: "hidden",
          }}
        >
          <ActionRow
            icon={
              <WarningCircleIcon size={32} color={colors.Primary_Charcoal} />
            }
            label="Event details"
            onPress={() => navigation.navigate("Event Details", { event })}
          />
          <View
            style={{
              marginLeft: 60,
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
            }}
          />
          <ActionRow
            icon={<XIcon size={32} color={colors.Primary_Charcoal} />}
            label="Cancel registration"
            onPress={handleConfirmCancelRegistration}
            destructive
          />
        </View>

        <Text
          style={[
            typography.caption,
            { color: colors.Dark_Grey, marginTop: 14 },
          ]}
        >
          {eventTitle}
        </Text>

        <Pressable
          onPress={handleBackToEvents}
          style={{
            marginTop: 20,
            backgroundColor: colors.primary_AC_Green,
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={[typography.secondaryBody, { color: colors.primary_White }]}
          >
            Back to events
          </Text>
        </Pressable>
      </View>

      {showToast ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: 22,
            left: 22,
            right: 22,
            backgroundColor: "#2F8F1F",
            borderRadius: 18,
            paddingVertical: 14,
            paddingHorizontal: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            shadowColor: colors.Primary_Charcoal,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 6,
          }}
        >
          <Check size={28} color={colors.primary_White} weight="bold" />
          <Text style={[typography.body, { color: colors.primary_White }]}>
            Cancellation complete
          </Text>
        </View>
      ) : null}

      <Modal
        animationType="fade"
        transparent
        visible={showCancelConfirm}
        onRequestClose={handleKeepRegistration}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: colors.primary_White,
              borderRadius: 18,
              paddingVertical: 20,
              paddingHorizontal: 18,
              gap: 16,
            }}
          >
            <Text style={[typography.h4, { color: colors.Primary_Charcoal }]}>
              Cancel registration
            </Text>
            <Text style={[typography.body, { color: colors.Dark_Grey }]}>
              Are you sure you want to cancel your registration for this event?
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={handleKeepRegistration}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  backgroundColor: colors.Light_Grey,
                }}
              >
                <Text
                  style={[
                    typography.secondaryBody,
                    { color: colors.Primary_Charcoal },
                  ]}
                >
                  Keep registration
                </Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmCancellation}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  backgroundColor: "#B42318",
                }}
              >
                <Text
                  style={[
                    typography.secondaryBody,
                    { color: colors.primary_White },
                  ]}
                >
                  Cancel registration
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
