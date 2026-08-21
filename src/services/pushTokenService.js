import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { apiFetch } from "./apiClient";
import { getOrCreateDeviceId } from "./deviceIdentityService";

function resolveExpoProjectId() {
  return (
    Constants?.expoConfig?.extra?.eas?.projectId ||
    Constants?.easConfig?.projectId ||
    undefined
  );
}

export async function registerDevicePushToken() {
  const permissions = await Notifications.getPermissionsAsync();
  let permissionStatus = permissions.status;

  if (permissionStatus !== "granted") {
    const requested = await Notifications.requestPermissionsAsync();
    permissionStatus = requested.status;
  }

  if (permissionStatus !== "granted") {
    return { ok: false, reason: "permissions_denied" };
  }

  const projectId = resolveExpoProjectId();
  const tokenResult = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined,
  );

  const pushToken = String(tokenResult?.data || "").trim();
  if (!pushToken) {
    return { ok: false, reason: "token_missing" };
  }

  const deviceId = await getOrCreateDeviceId();

  await apiFetch("/users/push-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      device_id: deviceId,
      push_token: pushToken,
      platform: Platform.OS,
    }),
  });

  return { ok: true, pushToken };
}
