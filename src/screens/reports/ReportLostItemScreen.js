import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
  Platform,
} from "react-native";
import {
  MapPinIcon,
  UserIcon,
  EnvelopeIcon,
  CameraIcon,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { submitReport } from "../../services/reportService";
import { useSettings } from "../../context/SettingsContext";
import { isNonEmptyString, isValidEmail } from "../../utils/validation";

const MAX_REPORT_DETAILS_LENGTH = 500;
const MAX_REPORT_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;

function validateReporterName(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return "Name is required. Enter your first and last name.";
  }

  if (!/^[A-Za-z\s]+$/.test(trimmed)) {
    return "Name can only contain letters and spaces.";
  }

  if (trimmed.length < 2) {
    return "Name is too short. Enter at least 2 letters.";
  }

  return undefined;
}

function validateReporterEmail(value) {
  return isValidEmail(value)
    ? undefined
    : "Enter a valid email address (example: name@domain.com).";
}

function validateLostItemDetails(value) {
  const trimmed = String(value || "").trim();

  if (!isNonEmptyString(trimmed)) {
    return "Details are required. Include color, brand, and where you last saw the item.";
  }

  if (trimmed.length > MAX_REPORT_DETAILS_LENGTH) {
    return `Details must be ${MAX_REPORT_DETAILS_LENGTH} characters or fewer.`;
  }

  return undefined;
}

function validateLocationIfProvided(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length < 3) {
    return "Location is too short. Add at least 3 characters for clarity.";
  }

  return undefined;
}

export default function ReportLostItemScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [locationText, setLocationText] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaSizeBytes, setMediaSizeBytes] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { settings } = useSettings();

  const handlePickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Media access is required.");
      return;
    }

    const pickerOptions = {
      mediaTypes: ImagePicker.All,
      quality: 0.7,
      allowsMultiple: false,
      ...(Platform.OS === "ios" && {
        allowsEditing: false,
        presentationStyle: "fullScreen",
        exif: false,
      }),
    };

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

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
    const nextErrors = {
      name: validateReporterName(name),
      email: validateReporterEmail(email),
      details: validateLostItemDetails(details),
      locationText: validateLocationIfProvided(locationText),
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
        type: "lostItem",
        description: details,
        campusName: settings.campus,
        photoUri: media,
        photoSizeBytes: mediaSizeBytes,
        locationText,
        incidentAt: null,
        isAnonymous: anonymous,
        emailUpdates: updates,
      });

      const reportData = {
        id: created.id || Date.now().toString(),
        type: "lostItem",
        name,
        email,
        details,
        media,
        locationText,
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
    !validateReporterName(name) &&
    !validateReporterEmail(email) &&
    !validateLostItemDetails(details) &&
    !validateLocationIfProvided(locationText);

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.container,
          { paddingBlockEnd: 48, paddingHorizontal: 16 },
        ]}
      >
        <Text style={[typography.h4, styles.label]}>Name *</Text>
        <View style={styles.shadowContainer}>
          <View style={styles.inputRow}>
            <UserIcon name="name" size={24} color={colors.Primary_Charcoal} />
            <TextInput
              style={[typography.body, styles.textInput]}
              placeholder="Enter your name"
              value={name}
              onChangeText={(value) => {
                const sanitized = String(value || "").replace(
                  /[^A-Za-z\s]/g,
                  "",
                );
                setName(sanitized);
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  name:
                    sanitized !== value
                      ? "Name can only contain letters and spaces."
                      : validateReporterName(sanitized),
                }));
              }}
              onBlur={() => {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  name: validateReporterName(name),
                }));
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
          <View style={styles.inputRow}>
            <EnvelopeIcon
              name="email"
              size={24}
              color={colors.Primary_Charcoal}
            />
            <TextInput
              style={[typography.body, styles.textInput]}
              placeholder="Enter your Email"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              onChangeText={(value) => {
                setEmail(value);
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  email: validateReporterEmail(value),
                }));
              }}
              onBlur={() => {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  email: validateReporterEmail(email),
                }));
              }}
            />
          </View>
        </View>
        {errors.email ? (
          <Text style={[typography.caption, styles.fieldErrorText]}>
            {errors.email}
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
                details: validateLostItemDetails(value),
              }));
            }}
            onBlur={() => {
              setErrors((currentErrors) => ({
                ...currentErrors,
                details: validateLostItemDetails(details),
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

        <Text style={[typography.h4, styles.label]}>Location </Text>
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
                  locationText: validateLocationIfProvided(value),
                }));
              }}
              onBlur={() => {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  locationText: validateLocationIfProvided(locationText),
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
