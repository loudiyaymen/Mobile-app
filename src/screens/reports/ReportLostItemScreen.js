import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
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

export default function ReportLostItemScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [locationText, setLocationText] = useState("");
  const [media, setMedia] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { settings } = useSettings();

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
    if (!name || !email || !details) {
      Alert.alert("Missing Fields", "Please fill in required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const created = await submitReport({
        type: "lostItem",
        description: details,
        campusName: settings.campus,
        photoUri: media,
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
        status: created.status || "Opened",
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
    name.trim() !== "" && email.trim() !== "" && details.trim() !== "";

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
              onChangeText={setName}
            />
          </View>
        </View>

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
              onChangeText={setEmail}
            />
          </View>
        </View>

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
              onChangeText={setLocationText}
            />
          </View>
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
