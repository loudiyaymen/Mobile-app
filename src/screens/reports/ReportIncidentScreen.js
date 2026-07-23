import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import {
  MapPinIcon,
  CalendarBlankIcon,
  ClockIcon,
  CameraIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { submitReport } from "../../services/reportService";
import { useSettings } from "../../context/SettingsContext";
import { isNonEmptyString } from "../../utils/validation";

export default function ReportIncidentScreen() {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [details, setDetails] = useState("");
  const [media, setMedia] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { settings } = useSettings();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      setDate(selectedDate);
      setErrors((currentErrors) => ({
        ...currentErrors,
        date: undefined,
      }));
    }
  };

  const handleTimeConfirm = (selectedTime) => {
    setTimePickerVisibility(false);
    if (selectedTime) {
      setTime(selectedTime);
      setErrors((currentErrors) => ({
        ...currentErrors,
        time: undefined,
      }));
    }
  };

  const handlePickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Media access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.All,
      quality: 0.7,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
  };

  const handleSubmit = async () => {
    const nextErrors = {
      locationText: isNonEmptyString(locationText)
        ? undefined
        : "Location is required.",
      date: date ? undefined : "Select a date.",
      time: time ? undefined : "Select a time.",
      details: isNonEmptyString(details)
        ? undefined
        : "Incident details are required.",
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      Alert.alert("Missing Fields", "Please complete the highlighted fields.");
      return;
    }

    setErrors({});

    try {
      setIsSubmitting(true);

      const created = await submitReport({
        type: "Incident",
        description: details,
        campusName: settings.campus,
        photoUri: media,
        locationText,
        incidentAt:
          date && time
            ? new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                0,
                0,
              ).toISOString()
            : null,
        isAnonymous: anonymous,
        emailUpdates,
      });

      const reportData = {
        id: created.id || Date.now().toString(),
        type: "Incident",
        location: locationText,
        date,
        time,
        details,
        media,
        anonymous,
        emailUpdates,
        status: created.status || "Submitted",
        referenceCode: created.referenceCode || created.id,
        createdAt: created.createdAt,
      };

      navigation.navigate("Report Submitted", { reportData });
    } catch (error) {
      Alert.alert("Submission failed", error.message || "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const isFormValid =
    locationText.trim() !== "" &&
    date !== null &&
    time !== null &&
    details.trim() !== "";

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.container,
          { paddingBlockEnd: 48, paddingHorizontal: 16 },
        ]}
      >
        <Text style={[typography.h4, styles.label]}>Location *</Text>
        <View style={styles.shadowContainer}>
          <View style={styles.inputRow}>
            <MapPinIcon
              name="location"
              size={24}
              color={colors.Primary_Charcoal}
            />
            <TextInput
              style={[typography.body, styles.textInput]}
              placeholder="e.g., ACCE Building, Floor 2"
              value={locationText}
              onChangeText={(value) => {
                setLocationText(value);
                if (errors.locationText) {
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    locationText: isNonEmptyString(value)
                      ? undefined
                      : currentErrors.locationText,
                  }));
                }
              }}
            />
          </View>
        </View>
        {errors.locationText ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.locationText}
          </Text>
        ) : null}

        <Text style={[typography.h4, styles.label]}>Date *</Text>
        <View style={styles.shadowContainer}>
          <Pressable
            onPress={() => setDatePickerVisibility(true)}
            style={[styles.inputRow, errors.date ? styles.inputRowError : null]}
          >
            <CalendarBlankIcon
              name="calendar"
              size={24}
              color={colors.Primary_Charcoal}
            />
            <TextInput
              style={[typography.body, styles.textInput, { flex: 1 }]}
              placeholder="Select Date"
              value={date ? date.toDateString() : ""}
              editable={false}
              pointerEvents="none"
            />
          </Pressable>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          value={date || new Date()}
          mode="date"
          accentColor={colors.primary_AC_Green}
          buttonTextColorIOS={colors.primary_AC_Green}
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        {errors.date ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.date}
          </Text>
        ) : null}

        <Text style={[typography.h4, styles.label]}>Time</Text>
        <View style={styles.shadowContainer}>
          <Pressable
            onPress={() => setTimePickerVisibility(true)}
            style={[styles.inputRow, errors.time ? styles.inputRowError : null]}
          >
            <ClockIcon name="time" size={24} color={colors.Primary_Charcoal} />
            <TextInput
              style={[typography.body, styles.textInput]}
              placeholder="Approximate time (e.g., 2:00 PM)"
              value={
                time
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              editable={false}
              pointerEvents="none"
            />
          </Pressable>
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          value={time || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
          accentColor={colors.primary_AC_Green}
          buttonTextColorIOS={colors.primary_AC_Green}
          is24Hour={false}
        />
        {errors.time ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.time}
          </Text>
        ) : null}

        <Text style={[typography.h4, styles.label]}>Incident details *</Text>
        <View style={styles.shadowContainer}>
          <TextInput
            placeholder="Describe the situation (e.g., suspicious activity near E-Building entrance)"
            style={[
              styles.textArea,
              typography.body,
              errors.details ? styles.inputRowError : null,
            ]}
            multiline={true}
            value={details}
            onChangeText={(value) => {
              setDetails(value);
              if (errors.details && isNonEmptyString(value)) {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  details: undefined,
                }));
              }
            }}
          />
        </View>
        {errors.details ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.details}
          </Text>
        ) : null}

        <Text style={[typography.h4, styles.label]}>Attachments</Text>
        <Pressable onPress={handlePickMedia} style={styles.mediaBox}>
          <CameraIcon
            name={media ? "reload" : "camera"}
            size={24}
            color={colors.primary_AC_Green}
          />
          <Text style={{ color: colors.primary_AC_Green }}>
            {media ? "Choose Another Photo" : "Add Photo"}
          </Text>
        </Pressable>

        {media && (
          <View style={styles.mediaPreviewBox}>
            <Image
              source={{ uri: media }}
              style={styles.mediaPreviewImage}
              resizeMode="contain"
            />
            <Pressable
              onPress={handleRemoveMedia}
              style={styles.mediaRemoveButton}
            >
              <Text style={styles.mediaRemoveButtonText}>Remove photo</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          onPress={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          style={[
            styles.reportButton,
            { alignSelf: "center" },
            {
              backgroundColor:
                isFormValid && !isSubmitting
                  ? colors.primary_AC_Green
                  : colors.Dark_Grey,
            },
          ]}
        >
          <Text
            style={[typography.secondaryH4, { color: colors.primary_White }]}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
