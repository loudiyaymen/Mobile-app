import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { useSettings } from "../../context/SettingsContext";
import { fetchCampuses } from "../../services/reportService";
import { settingsStyles } from "./settingsStyles";

function normalizeCampusRows(rows = []) {
  return rows
    .map((row) => {
      const campusId = row?.campusId || row?.campus_id || row?.id || null;
      const name = row?.name || row?.campusName || row?.campus_name || null;
      if (!name) return null;
      return { campusId, name: String(name) };
    })
    .filter(Boolean);
}

function CampusRow({ label, selected, disabled, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[settingsStyles.row, disabled && { opacity: 0.5 }]}
    >
      <Text
        style={[
          typography.h4,
          disabled ? { color: "#666666" } : settingsStyles.label,
        ]}
      >
        {label}
      </Text>
      {selected ? (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.primary_AC_Green,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="checkmark" size={20} color={colors.primary_White} />
        </View>
      ) : (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#8B8B8B",
          }}
        />
      )}
    </Pressable>
  );
}

export default function CampusScreen() {
  const { settings, setCampus } = useSettings();
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCampuses() {
      try {
        const rows = await fetchCampuses();
        if (!mounted) return;
        const normalized = normalizeCampusRows(rows);
        if (normalized.length === 0) {
          console.warn(
            "No campuses available. Please check backend connection.",
          );
          setCampuses([]);
        } else {
          setCampuses(normalized);
        }
      } catch (error) {
        if (!mounted) return;
        console.error("Failed to fetch campuses:", error);
        setCampuses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCampuses();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          ...settingsStyles.screen,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="small" color={colors.primary_AC_Green} />
      </View>
    );
  }

  return (
    <View style={settingsStyles.screen}>
      <View style={settingsStyles.card}>
        {campuses.map((campus, index) => (
          <CampusRow
            key={campus.campusId || campus.name}
            label={campus.name}
            selected={settings.campus === campus.name}
            disabled={false}
            onPress={() => setCampus(campus.name)}
          />
        ))}
      </View>
    </View>
  );
}
