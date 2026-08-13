import { apiFetch } from "./apiClient";

export async function createAlert({
  message,
  alert_type = null,
  severity = null,
  building_id = null,
  campus_id = null,
  starts_at = null,
  ends_at = null,
}) {
  if (!message || typeof message !== "string" || message.trim() === "") {
    throw new Error("Alert message is required");
  }

  const response = await apiFetch("/alerts/create", {
    method: "POST",
    body: JSON.stringify({
      message: message.trim(),
      alert_type,
      severity,
      building_id,
      campus_id,
      starts_at,
      ends_at,
    }),
  });

  return response;
}

export async function fetchAlerts({
  limit = 50,
  offset = 0,
  alert_type = null,
  building_id = null,
} = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (alert_type) {
    params.append("alert_type", alert_type);
  }
  if (building_id) {
    params.append("building_id", building_id);
  }

  const response = await apiFetch(`/alerts?${params}`);
  return Array.isArray(response?.data) ? response.data : [];
}

export async function fetchAlert(alertId) {
  if (!alertId) {
    throw new Error("Alert ID is required");
  }
  return apiFetch(`/alerts/${alertId}`);
}
