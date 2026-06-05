// Reporting found and lost items screen

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
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { styles, COLORS } from "../../themes/styles";

export default function ReportLostItemScreen() {
  const navigation = useNavigation();

  const [mode, setMode] = useState("lost");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [updates, setUpdates] = useState(false);

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const submitLostItem = () => {
    if (!name || !email || !description) {
      Alert.alert("Missing fields", "Please complete required fields.");
      return;
    }

    navigation.navigate("Report Submitted", {
      reportData: {
        id: Date.now().toString(),
        type: "Lost Item",
        name,
        email,
        description,
        location,
        photo,
      },
    });
  };

  const submitFoundItem = () => {
    if (!description) {
      Alert.alert("Missing description", "Please describe the item.");
      return;
    }

    navigation.navigate("Report Submitted", {
      reportData: {
        id: Date.now().toString(),
        type: "Found Item",
        name,
        email,
        description,
        location,
        anonymous,
        updates,
        photo,
      },
    });
  };

  // SELECT TYPE SCREEN
  return (
    <ScrollView
      style={[
        styles.container,
        { paddingBlockStart: 16, paddingBlockEnd: 60, paddingHorizontal: 16 },
      ]}
    >
      {/* TOGGLE */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Pressable onPress={() => setMode("lost")} style={styles.lostFound}>
          <Text
            style={{ color: mode === "lost" ? COLORS.WHITE : COLORS.CHARCOAL }}
          >
            I lost an item
          </Text>
        </Pressable>

        <Pressable onPress={() => setMode("found")} style={styles.lostFound}>
          <Text
            style={{ color: mode === "found" ? COLORS.WHITE : COLORS.CHARCOAL }}
          >
            I found an item
          </Text>
        </Pressable>
      </View>

      {/* ALTERNATE FORM FIELDS */}
      <Text style={styles.homeTitle}>
        {mode === "lost" ? "Lost Item Report" : "Found Item Report"}
      </Text>

      {mode === "lost" && (
        <>
          <TextInput
            placeholder="Your Name *"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Your Email *"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </>
      )}

      {mode === "found" && (
        <>
          <TextInput
            placeholder="Your Name (optional)"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Your Email (optional)"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </>
      )}

      {/* UNIFORM FORM FIELDS */}
      <TextInput
        placeholder="Item description *"
        style={styles.textArea}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Location (optional)"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Pressable style={styles.mediaBox} onPress={pickPhoto}>
        <Text>Add Photo</Text>
      </Pressable>

      {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}

      {mode === "found" && (
        <>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => setAnonymous(!anonymous)}
          >
            <Ionicons
              name={anonymous ? "checkbox" : "square-outline"}
              size={22}
            />
            <Text style={{ marginLeft: 8 }}>Submit anonymously</Text>
          </Pressable>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setUpdates(!updates)}
          >
            <Ionicons
              name={updates ? "checkbox" : "square-outline"}
              size={22}
            />
            <Text style={{ marginLeft: 8 }}>Send updates via email</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={styles.reportButton}
        onPress={mode === "lost" ? submitLostItem : submitFoundItem}
      >
        <Text style={{ color: COLORS.WHITE }}>Submit Report</Text>
      </Pressable>
    </ScrollView>
  );
}
