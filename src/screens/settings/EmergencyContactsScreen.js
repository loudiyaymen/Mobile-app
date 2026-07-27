import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { settingsStyles } from "./settingsStyles";

const CONTACTS_STORAGE_KEY = "settings.emergencyContacts.v1";

const defaultContacts = [
  { name: "Campus Security", phone: "613-727-4723" },
  { name: "Emergency", phone: "911" },
];

async function callContact(phone) {
  const clean = phone.replace(/[^0-9]/g, "");
  const url = `tel:${clean}`;
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    Alert.alert(
      "Cannot place call",
      "Calling is not available on this device.",
    );
    return;
  }
  Linking.openURL(url);
}

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState(defaultContacts);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadContacts() {
      try {
        const raw = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
        if (!mounted || !raw) return;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return;

        const normalized = parsed
          .map((row) => ({
            name: String(row?.name || "").trim(),
            phone: String(row?.phone || "").trim(),
          }))
          .filter((row) => row.name && row.phone);

        if (normalized.length > 0) {
          setContacts(normalized);
        }
      } catch {}
    }

    loadContacts();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts)).catch(
      () => {},
    );
  }, [contacts]);

  const normalizedDigits = useMemo(
    () => contactPhone.replace(/[^0-9]/g, ""),
    [contactPhone],
  );

  const isValidContact =
    contactName.trim().length >= 2 &&
    normalizedDigits.length >= 3 &&
    normalizedDigits.length <= 15;

  function resetForm() {
    setIsFormVisible(false);
    setEditingIndex(-1);
    setContactName("");
    setContactPhone("");
    setFormError("");
  }

  function openCreateForm() {
    setEditingIndex(-1);
    setContactName("");
    setContactPhone("");
    setFormError("");
    setIsFormVisible(true);
  }

  function openEditForm(index) {
    const target = contacts[index];
    if (!target) return;
    setEditingIndex(index);
    setContactName(target.name);
    setContactPhone(target.phone);
    setFormError("");
    setIsFormVisible(true);
  }

  function removeContact(index) {
    Alert.alert(
      "Remove contact",
      "Are you sure you want to remove this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setContacts((current) => current.filter((_, i) => i !== index));
            if (editingIndex === index) {
              resetForm();
            }
          },
        },
      ],
    );
  }

  function saveContact() {
    if (!isValidContact) {
      setFormError(
        "Use a contact name with at least 2 letters and a valid phone number (3-15 digits).",
      );
      return;
    }

    const nextContact = {
      name: contactName.trim(),
      phone: contactPhone.trim(),
    };

    setContacts((current) => {
      if (editingIndex >= 0) {
        return current.map((contact, index) =>
          index === editingIndex ? nextContact : contact,
        );
      }
      return [...current, nextContact];
    });

    resetForm();
  }

  return (
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        <View style={settingsStyles.cardHeader}>
          <Text style={[typography.h4, settingsStyles.label]}>Contacts</Text>
          <Pressable style={settingsStyles.plusButton} onPress={openCreateForm}>
            <Ionicons name="add" size={20} color={colors.primary_White} />
          </Pressable>
        </View>

        {isFormVisible ? (
          <View style={settingsStyles.formWrap}>
            <TextInput
              style={settingsStyles.formInput}
              placeholder="Contact name"
              value={contactName}
              onChangeText={(value) => {
                setContactName(value);
                if (formError) setFormError("");
              }}
            />
            <TextInput
              style={settingsStyles.formInput}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={contactPhone}
              onChangeText={(value) => {
                setContactPhone(value);
                if (formError) setFormError("");
              }}
            />
            {formError ? (
              <Text style={[typography.caption, settingsStyles.formError]}>
                {formError}
              </Text>
            ) : null}
            <View style={settingsStyles.formActions}>
              <Pressable style={settingsStyles.actionPill} onPress={resetForm}>
                <Text style={[typography.secondaryBody, settingsStyles.label]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  settingsStyles.actionPill,
                  settingsStyles.actionPillPrimary,
                ]}
                onPress={saveContact}
              >
                <Text
                  style={[
                    typography.secondaryBody,
                    { color: colors.primary_White },
                  ]}
                >
                  {editingIndex >= 0 ? "Save" : "Add"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {contacts.map((contact, index) => (
          <View key={`${contact.phone}-${index}`}>
            <Pressable
              onPress={() => callContact(contact.phone)}
              style={settingsStyles.row}
            >
              <View style={settingsStyles.rowMeta}>
                <Text style={[typography.h4, settingsStyles.label]}>
                  {contact.name}
                </Text>
                <Text style={[typography.h5, settingsStyles.secondaryLabel]}>
                  {contact.phone}
                </Text>
              </View>
              <View style={settingsStyles.rowActions}>
                <Pressable
                  style={settingsStyles.iconButton}
                  onPress={(event) => {
                    event.stopPropagation();
                    openEditForm(index);
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.primary_AC_Green}
                  />
                </Pressable>
                <Pressable
                  style={settingsStyles.iconButton}
                  onPress={(event) => {
                    event.stopPropagation();
                    removeContact(index);
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.SOS_Red}
                  />
                </Pressable>
                <Ionicons
                  name="call-outline"
                  size={24}
                  color={colors.primary_AC_Green}
                />
              </View>
            </Pressable>
            {index !== contacts.length - 1 && (
              <View style={settingsStyles.divider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
