import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setTypographyTextSizeIndex } from "../themes/typography";

const STORAGE_KEY = "app.settings.v1";

const defaultSettings = {
  campus: "Main Campus",
  darkModeEnabled: false,
  accessibilityEnabled: false,
  textSizeIndex: 1,
  alertTypes: {
    fire: true,
    security: true,
    events: true,
  },
  pushPreferences: {
    pushEnabled: true,
    sound: true,
    vibration: true,
  },
};

const SettingsContext = createContext(null);

function syncTypographyTextSize(index) {
  setTypographyTextSizeIndex(index);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted || !raw) {
          setIsLoaded(true);
          return;
        }

        const parsed = JSON.parse(raw);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          alertTypes: { ...prev.alertTypes, ...(parsed.alertTypes || {}) },
          pushPreferences: {
            ...prev.pushPreferences,
            ...(parsed.pushPreferences || {}),
          },
        }));
        syncTypographyTextSize(
          Number.isInteger(parsed.textSizeIndex)
            ? parsed.textSizeIndex
            : defaultSettings.textSizeIndex,
        );
      } catch {
      } finally {
        if (mounted) setIsLoaded(true);
      }
    }

    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    syncTypographyTextSize(settings.textSizeIndex);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(
      (error) => {
        console.warn("Failed to save settings:", error);
        setIsLoaded(false);
      },
    );
  }, [isLoaded, settings]);

  const setCampus = useCallback((campus) => {
    setSettings((prev) => ({ ...prev, campus }));
  }, []);

  const setDarkModeEnabled = useCallback((enabled) => {
    setSettings((prev) => ({ ...prev, darkModeEnabled: enabled }));
  }, []);

  const setAccessibilityEnabled = useCallback((enabled) => {
    setSettings((prev) => ({ ...prev, accessibilityEnabled: enabled }));
  }, []);

  const setTextSizeIndex = useCallback((index) => {
    syncTypographyTextSize(index);
    setSettings((prev) => ({ ...prev, textSizeIndex: index }));
  }, []);

  const setAlertTypeEnabled = useCallback((key, enabled) => {
    setSettings((prev) => ({
      ...prev,
      alertTypes: {
        ...prev.alertTypes,
        [key]: enabled,
      },
    }));
  }, []);

  const setPushPreferenceEnabled = useCallback((key, enabled) => {
    setSettings((prev) => ({
      ...prev,
      pushPreferences: {
        ...prev.pushPreferences,
        [key]: enabled,
      },
    }));
  }, []);

  const value = useMemo(
    () => ({
      settings,
      isLoaded,
      setCampus,
      setDarkModeEnabled,
      setAccessibilityEnabled,
      setTextSizeIndex,
      setAlertTypeEnabled,
      setPushPreferenceEnabled,
    }),
    [
      settings,
      isLoaded,
      setCampus,
      setDarkModeEnabled,
      setAccessibilityEnabled,
      setTextSizeIndex,
      setAlertTypeEnabled,
      setPushPreferenceEnabled,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export const TEXT_SIZE_OPTIONS = [14, 16, 18, 20, 22, 24];
