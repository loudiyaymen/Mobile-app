import { apiFetch } from "./apiClient";
import { getOrCreateDeviceId } from "./deviceIdentityService";

export async function logDailyActivity() {
  try {
    const deviceId = await getOrCreateDeviceId();
    await apiFetch("/users/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: deviceId }),
    });
    return deviceId;
  } catch (error) {
    console.warn("Failed to log daily activity", error);
    return null;
  }
}
