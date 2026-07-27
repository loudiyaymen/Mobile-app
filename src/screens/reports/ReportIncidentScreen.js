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

const MAX_REPORT_DETAILS_LENGTH = 500;
const MAX_REPORT_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_REPORT_PAST_DAYS = 31;

function validateLocation(value) {
  return isNonEmptyString(value)
    ? undefined
    : "Location is required. Enter a building and room (e.g., ACCE Building, Floor 2).";
}

function validateIncidentDetails(value) {
  const trimmed = String(value || "").trim();

  if (!isNonEmptyString(trimmed)) {
    return "Incident details are required. Describe what happened in clear, short sentences.";
  }

  if (trimmed.length > MAX_REPORT_DETAILS_LENGTH) {
    return `Incident details must be ${MAX_REPORT_DETAILS_LENGTH} characters or fewer.`;
  }

  return undefined;
}

function validateDateInAllowedRange(dateValue) {
  if (!dateValue) {
    return "Select a date.";
  }

  const now = new Date();
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const earliestAllowed = new Date(now);
  earliestAllowed.setDate(earliestAllowed.getDate() - MAX_REPORT_PAST_DAYS);
  earliestAllowed.setHours(0, 0, 0, 0);

  if (dateValue > todayEnd) {
    return "Date cannot be in the future. Choose today or an earlier date.";
  }

  if (dateValue < earliestAllowed) {
    return "Date is too far in the past. Choose a date within the last month.";
  }

  return undefined;
}

function validateDateTimeNotFuture(dateValue, timeValue) {
  if (!dateValue || !timeValue) {
    return undefined;
  }

  const combinedDateTime = new Date(
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate(),
    timeValue.getHours(),
    timeValue.getMinutes(),
    0,
    0,
  );

  if (combinedDateTime > new Date()) {
    return "Incident date and time cannot be in the future. Choose an earlier time.";
  }

  return undefined;
}

export default function ReportIncidentScreen() {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [details, setDetails] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaSizeBytes, setMediaSizeBytes] = useState(null);
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
      const dateError = validateDateInAllowedRange(selectedDate);
      const dateTimeError = validateDateTimeNotFuture(selectedDate, time);
      setErrors((currentErrors) => ({
        ...currentErrors,
        date: dateError || dateTimeError,
        time: time ? dateTimeError || undefined : currentErrors.time,
      }));
    }
  };

  const handleTimeConfirm = (selectedTime) => {
    setTimePickerVisibility(false);
    if (selectedTime) {
      setTime(selectedTime);
      const dateTimeError = validateDateTimeNotFuture(date, selectedTime);
      setErrors((currentErrors) => ({
        ...currentErrors,
        time: dateTimeError || undefined,
        date: !date
          ? "Select a date."
          : currentErrors.date === "Select a date."
            ? undefined
            : dateTimeError || undefined,
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
      const asset = result.assets?.[0];
      const fileSize = Number(asset?.fileSize || 0);

      if (
        Number.isFinite(fileSize) &&
        fileSize > MAX_REPORT_ATTACHMENT_SIZE_BYTES
      ) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          media:
            "Attachment must be 5MB or smaller. Use a smaller file or compress the image.",
        }));
        return;
      }

      setMedia(asset?.uri || null);
      setMediaSizeBytes(
        Number.isFinite(fileSize) && fileSize > 0 ? fileSize : null,
      );
      setErrors((currentErrors) => ({
        ...currentErrors,
        media: undefined,
      }));
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setMediaSizeBytes(null);
  };

  const handleSubmit = async () => {
    const dateError = validateDateInAllowedRange(date);
    const dateTimeError = validateDateTimeNotFuture(date, time);
    const nextErrors = {
      locationText: validateLocation(locationText),
      date: dateError || dateTimeError,
      time: !time ? "Select a time." : dateTimeError || undefined,
      details: validateIncidentDetails(details),
      media:
        media &&
        typeof mediaSizeBytes === "number" &&
        mediaSizeBytes > MAX_REPORT_ATTACHMENT_SIZE_BYTES
          ? "Attachment must be 5MB or smaller. Use a smaller file or compress the image."
          : undefined,
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
        photoSizeBytes: mediaSizeBytes,
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
    !validateLocation(locationText) &&
    !validateDateInAllowedRange(date) &&
    !validateDateTimeNotFuture(date, time) &&
    time !== null &&
    !validateIncidentDetails(details);

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
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  locationText: validateLocation(value),
                }));
              }}
              onBlur={() => {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  locationText: validateLocation(locationText),
                }));
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
              setErrors((currentErrors) => ({
                ...currentErrors,
                details: validateIncidentDetails(value),
              }));
            }}
            onBlur={() => {
              setErrors((currentErrors) => ({
                ...currentErrors,
                details: validateIncidentDetails(details),
              }));
            }}
          />
        </View>
        {errors.details ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.details}
          </Text>
        ) : null}
        <Text style={[typography.caption, styles.secondaryLabel]}>
          {`${String(details || "").trim().length}/${MAX_REPORT_DETAILS_LENGTH} characters`}
        </Text>

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
        {errors.media ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.media}
          </Text>
        ) : null}

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
