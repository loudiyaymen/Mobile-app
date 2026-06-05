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

import { styles, COLORS } from "../../themes/styles";

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
    <ScrollView
      style={[styles.container, { paddingBlockEnd: 48, paddingHorizontal: 16 }]}
    >
      {/* Important banner */}
      <View style={styles.dangerBanner}>
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
          In immediate danger?
        </Text>
        <Text>Call emergency services or use the SOS button at any time.</Text>
      </View>

      {/* LOCATION */}
      <Text style={styles.label}>Location *</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Building, room, or area"
          value={locationText}
          onChangeText={setLocationText}
        />
        <Pressable onPress={handleGetLocation}>
          <Ionicons name="location" size={22} color={COLORS.ALGONQUIN_GREEN} />
        </Pressable>
      </View>

      {/* DATE */}
      <Text style={styles.label}>Date *</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Select date"
          value={date ? date.toDateString() : ""}
          editable={false}
        />
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar" size={22} color={COLORS.ALGONQUIN_GREEN} />
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
      <Text style={styles.label}>Time *</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Select time"
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
        <Pressable onPress={() => setShowTimePicker(true)}>
          <Ionicons name="time" size={22} color={COLORS.ALGONQUIN_GREEN} />
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
      <Text style={styles.label}>Incident Details *</Text>
      <TextInput
        placeholder="Describe what happened or what you observed..."
        style={styles.textArea}
        multiline
        value={details}
        onChangeText={setDetails}
      />

      {/* MEDIA */}
      <Pressable
        onPress={handlePickMedia}
        style={{
          marginVertical: 20,
          alignItems: "center",
          padding: 16,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 12,
        }}
      >
        <Ionicons name="camera" size={28} />
        <Text>Add Photo or Video</Text>
      </Pressable>

      {media && (
        <Image
          source={{ uri: media }}
          style={{ width: "100%", height: 200, marginBottom: 20 }}
        />
      )}

      {/* CHECKBOXES */}
      <Pressable
        style={styles.checkboxRow}
        onPress={() => setAnonymous(!anonymous)}
      >
        <Ionicons name={anonymous ? "checkbox" : "square-outline"} size={22} />
        <Text style={{ marginLeft: 8 }}>Submit anonymously</Text>
      </Pressable>

      <Pressable
        style={styles.checkboxRow}
        onPress={() => setEmailUpdates(!emailUpdates)}
      >
        <Ionicons
          name={emailUpdates ? "checkbox" : "square-outline"}
          size={22}
        />
        <Text style={{ marginLeft: 8 }}>Send updates via email</Text>
      </Pressable>

      {/* SUBMIT */}
      <Pressable
        style={[styles.reportButton, { alignSelf: "center" }]}
        onPress={handleSubmit}
      >
        <Text style={{ color: COLORS.WHITE }}>Submit Report</Text>
      </Pressable>
    </ScrollView>
  );
}
