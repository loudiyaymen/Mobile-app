import { Platform } from "react-native";
import Constants from "expo-constants";

function stripTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

export function resolveApiBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_BACKEND_API_URL;
  const fromConfig = Constants.expoConfig?.extra?.backendApiUrl;

  if (fromEnv) return stripTrailingSlash(fromEnv);
  if (fromConfig) return stripTrailingSlash(fromConfig);

  const localHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  return `http://${localHost}:4000/api/v1`;
}

export async function apiFetch(path, options) {
  const baseUrl = resolveApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, options);

  const isJson = response.headers
    .get("content-type")
    ?.toLowerCase()
    .includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload
        ? payload.error ||
          payload.message ||
          `Request failed (${response.status})`
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}
