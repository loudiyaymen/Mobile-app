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
  const { settings } = useSettings();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeConfirm = (selectedTime) => {
    setTimePickerVisibility(false);
    if (selectedTime) setTime(selectedTime);
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

  const handleSubmit = async () => {
    if (!locationText || !date || !details) {
      Alert.alert("Missing Fields", "Please fill in required fields.");
      return;
    }

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
              onChangeText={setLocationText}
            />
          </View>
        </View>

        <Text style={[typography.h4, styles.label]}>Date *</Text>
        <View style={styles.shadowContainer}>
          <Pressable
            onPress={() => setDatePickerVisibility(true)}
            style={styles.inputRow}
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

        <Text style={[typography.h4, styles.label]}>Time</Text>
        <View style={styles.shadowContainer}>
          <Pressable
            onPress={() => setTimePickerVisibility(true)}
            style={styles.inputRow}
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

        <Text style={[typography.h4, styles.label]}>Incident details *</Text>
        <View style={styles.shadowContainer}>
          <TextInput
            placeholder="Describe the situation (e.g., suspicious activity near E-Building entrance)"
            style={[styles.textArea, typography.body]}
            multiline={true}
            value={details}
            onChangeText={setDetails}
          />
        </View>

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
          <Image
            source={{ uri: media }}
            style={{ width: "100%", height: 200, marginBottom: 20 }}
          />
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
