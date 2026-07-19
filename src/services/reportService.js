import { apiFetch } from "./apiClient";
import { getOrCreateDeviceId } from "./deviceIdentityService";

let campusCache;

function normalizeCampusName(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function toFileName(uri, fallbackName) {
  const rawName = String(uri || "")
    .split("/")
    .pop();
  if (rawName && rawName.includes(".")) return rawName;
  return fallbackName;
}

function toMimeType(uri) {
  const lower = String(uri || "").toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".pdf")) return "application/pdf";
  return "image/jpeg";
}

function mapApiType(type) {
  if (type === "Incident") return "safety_concern";
  if (type === "lostItem") return "lost_item";
  return "safety_concern";
}

function mapApiStatus(status) {
  if (status === "new") return "Opened";
  if (status === "in_review") return "In Review";
  if (status === "resolved") return "Resolved";
  if (status === "dismissed") return "Dismissed";
  return "Opened";
}

function normalizeApiReport(report) {
  return {
    id: report?.id,
    type: report?.type === "lost_item" ? "lostItem" : "Incident",
    details: report?.description || "",
    status: mapApiStatus(report?.status),
    createdAt: report?.created_at || new Date().toISOString(),
    referenceCode: report?.id || "",
  };
}

export async function fetchCampuses() {
  const response = await apiFetch("/campuses");
  const rows = Array.isArray(response?.data) ? response.data : [];

  const mapped = rows.map((row) => ({
    campusId: row?.campus_id || row?.campusId || row?.id,
    name: row?.name || row?.campus_name || row?.campusName,
  }));

  campusCache = mapped;
  return mapped;
}

export async function resolveCampusId(campusName) {
  const target = normalizeCampusName(campusName);

  if (!campusCache) {
    try {
      campusCache = await fetchCampuses();
    } catch (error) {
      console.error("Failed to fetch campuses:", error);
      campusCache = [];
    }
  }

  const exact = campusCache.find(
    (campus) => normalizeCampusName(campus.name) === target,
  );
  if (exact?.campusId) return exact.campusId;

  if (!campusCache || campusCache.length === 0) {
    throw new Error(
      "No campuses available. Please check that the backend server is running and contains at least one campus.",
    );
  }

  if (campusCache[0]?.campusId) {
    console.warn(
      `Campus "${campusName}" not found. Using "${campusCache[0].name}" instead.`,
    );
    return campusCache[0].campusId;
  }

  return null;
}

export async function submitReport({
  type,
  description,
  campusName,
  photoUri,
  locationText,
  incidentAt,
  isAnonymous,
  emailUpdates,
}) {
  const campusId = await resolveCampusId(campusName);
  if (!campusId) {
    throw new Error("No campus available for report submission");
  }

  const deviceId = await getOrCreateDeviceId();

  const formData = new FormData();
  formData.append("type", mapApiType(type));
  formData.append("description", String(description || "").trim());
  formData.append("campus_id", campusId);
  formData.append("device_id", deviceId);
  formData.append("location_text", String(locationText || "").trim());
  formData.append("incident_at", incidentAt ? String(incidentAt) : "");
  formData.append("is_anonymous", String(Boolean(isAnonymous)));
  formData.append("email_updates", String(Boolean(emailUpdates)));

  if (photoUri) {
    formData.append("photo", {
      uri: photoUri,
      name: toFileName(photoUri, `report-${Date.now()}.jpg`),
      type: toMimeType(photoUri),
    });
  }

  const created = await apiFetch("/reports", {
    method: "POST",
    body: formData,
  });

  return normalizeApiReport(created);
}

export async function fetchMyReports() {
  const deviceId = await getOrCreateDeviceId();
  const response = await apiFetch(
    `/reports/mine?device_id=${encodeURIComponent(deviceId)}`,
  );
  const rows = Array.isArray(response?.data) ? response.data : [];
  return rows.map(normalizeApiReport);
}
