import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

export default function ReportIncidentScreen() {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [details, setDetails] = useState("");
  const [media, setMedia] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // LOCATION AUTO FILL
  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const reverse = await Location.reverseGeocodeAsync(loc.coords);

    if (reverse.length > 0) {
      const place = reverse[0];
      setLocationText(
        `${place.name || ""} ${place.street || ""}, ${place.city || ""}`,
      );
    }
  };

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (_, selectedTime) => {
    setShowTimePicker(false);
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

  // VALIDATION + SUBMIT
  const handleSubmit = () => {
    if (!locationText || !date || !time || !details) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    const reportData = {
      id: Date.now().toString(),
      type: "Incident",
      location: locationText,
      date,
      time,
      details,
      media,
      anonymous,
      emailUpdates,
    };

    navigation.navigate("Report Submitted", { reportData });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.container,
          { paddingBlockEnd: 48, paddingHorizontal: 16 },
        ]}
      >
        {/* LOCATION */}
        <Text style={[typography.h4, styles.label]}>Location *</Text>
        <View style={styles.inputRow}>
          <Pressable onPress={handleGetLocation}>
            <Ionicons
              name="location"
              size={22}
              color={colors.primary_AC_Green}
            />
          </Pressable>
          <TextInput
            style={typography.body}
            placeholder="e.g, ACCE Building, Floor 2"
            value={locationText}
            onChangeText={setLocationText}
          />
        </View>

        {/* DATE */}
        <Text style={[typography.h4, styles.label]}>Date *</Text>
        <View>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.inputRow}
          >
            <Ionicons
              name="calendar"
              size={22}
              color={colors.primary_AC_Green}
            />
            <TextInput
              style={typography.body}
              placeholder="e.g., Feb 14, 2026"
              value={date ? date.toDateString() : ""}
              editable={false}
            />
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* TIME */}
        <Text style={[typography.h4, styles.label]}>Time of incident</Text>
        <View>
          <Pressable
            onPress={() => setShowTimePicker(true)}
            style={styles.inputRow}
          >
            <Ionicons
              name="time"
              size={22}
              color={colors.primary_AC_Green}
            />
            <TextInput
              style={typography.body}
              placeholder="e.g., 2:30 PM"
              value={
                time
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              editable={false}
            />
          </Pressable>
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* DETAILS */}
        <Text style={[typography.h4, styles.label]}>Incident Details *</Text>
        <TextInput
          placeholder="Describe the situation (e.g., suspicious activity near E-Building entrance)"
          style={[styles.textArea, typography.body]}
          multiline={true}
          value={details}
          onChangeText={setDetails}
        />

        {/* MEDIA */}
        <Text style={[typography.h4, styles.label]}>Attachments</Text>
        <Pressable onPress={handlePickMedia} style={styles.mediaBox}>
          <Ionicons name={media ? "reload" : "camera"} size={28} />
          <Text>{media ? "Choose Another Photo" : "Add Photo"}</Text>
        </Pressable>

        {media && (
          <Image
            source={{ uri: media }}
            style={{ width: "100%", height: 200, marginBottom: 20 }}
          />
        )}

        {/* SUBMIT */}
        <Pressable
          style={[styles.reportButton, { alignSelf: "center" }]}
          onPress={handleSubmit}
        >
          <Text style={{ color: colors.primary_White }}>Submit Report</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
