import { Platform } from "react-native";
import Constants from "expo-constants";

function stripTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

export function resolveApiBaseUrl() {
  const fromEnv =
    process.env.EXPO_PUBLIC_BACKEND_API_URL ||
    process.env.EXPO_PUBLIC_API_BASE_URL;
  const fromConfig = Constants.expoConfig?.extra?.backendApiUrl;

  if (fromEnv) return stripTrailingSlash(fromEnv);
  if (fromConfig) return stripTrailingSlash(fromConfig);

  if (!__DEV__) {
    return "https://algonquingo-backend.azurewebsites.net/api/v1";
  }

  const localHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  return `http://${localHost}:4000/api/v1`;
}

export async function apiFetch(path, options) {
  const baseUrl = resolveApiBaseUrl();
  const controller = new AbortController();
  const timeoutMs = 12000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...(options || {}),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your internet connection.",
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

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
