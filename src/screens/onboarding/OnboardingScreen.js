import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { fetchCampuses } from "../../services/reportService";
import { useSettings } from "../../context/SettingsContext";
import OnboardingSplashScreen from "./OnboardingSplashScreen";

const FALLBACK_CAMPUSES = [{ campusId: null, name: "Main Campus" }];

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

function CampusSelectionScreen({
  campuses,
  onCampusSelected,
  isLoading,
  showOfflinePrompt,
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary_AC_Green,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 300,
          gap: 32,
        }}
      >
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text
            style={[
              typography.h2,
              {
                color: colors.primary_White,
                textAlign: "center",
                fontSize: 28,
              },
            ]}
          >
            Which campus is your home base?
          </Text>

          {showOfflinePrompt && (
            <View
              style={{
                marginTop: 8,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={[
                  typography.body,
                  {
                    color: colors.primary_White,
                    textAlign: "center",
                  },
                ]}
              >
                You appear to be offline. This app needs internet to work
                properly. You can continue with a fallback campus and reconnect
                later.
              </Text>
            </View>
          )}
        </View>

        <View style={{ gap: 12 }}>
          {campuses.map((campus) => (
            <Pressable
              key={campus.campusId || campus.name}
              onPress={() => onCampusSelected(campus.name)}
              disabled={isLoading}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                backgroundColor: colors.primary_White,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              <Text
                style={[
                  typography.h4,
                  {
                    color: colors.Primary_Charcoal,
                    fontWeight: "600",
                  },
                ]}
              >
                {campus.name}
              </Text>
            </Pressable>
          ))}
        </View>

        {isLoading && (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="small" color={colors.primary_White} />
          </View>
        )}
      </View>
    </View>
  );
}

export default function OnboardingScreen({ onComplete }) {
  const { setCampus, setOnboardingCompleted } = useSettings();
  const [screen, setScreen] = useState("splash");
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOfflinePrompt, setShowOfflinePrompt] = useState(false);

  useEffect(() => {
    if (screen !== "campus") return;

    let mounted = true;
    setLoading(true);

    async function loadCampuses() {
      try {
        const rows = await fetchCampuses();
        if (!mounted) return;
        const normalized = normalizeCampusRows(rows);
        if (normalized.length > 0) {
          setCampuses(normalized);
          setShowOfflinePrompt(false);
        } else {
          console.warn("No campuses available");
          setCampuses(FALLBACK_CAMPUSES);
          setShowOfflinePrompt(true);
        }
      } catch (error) {
        if (!mounted) return;
        console.error("Failed to fetch campuses:", error);
        setCampuses(FALLBACK_CAMPUSES);
        setShowOfflinePrompt(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCampuses();
    return () => {
      mounted = false;
    };
  }, [screen]);

  const handleCampusSelected = (campusName) => {
    setCampus(campusName);
    setOnboardingCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  if (screen === "splash") {
    return <OnboardingSplashScreen onContinue={() => setScreen("campus")} />;
  }

  if (screen === "campus") {
    return (
      <CampusSelectionScreen
        campuses={campuses}
        onCampusSelected={handleCampusSelected}
        isLoading={loading}
        showOfflinePrompt={showOfflinePrompt}
      />
    );
  }

  return null;
}
