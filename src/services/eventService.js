import { apiFetch, resolveApiBaseUrl } from "./apiClient";
import { getOrCreateDeviceId } from "./deviceIdentityService";

function resolveImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const origin = resolveApiBaseUrl().replace(/\/api\/v1$/, "");
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${origin}${normalizedPath}`;
}

function formatDateParts(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return {
      date: "TBD",
      time: "TBD",
    };
  }

  return {
    date: d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function normalizeEvent(item) {
  const when = formatDateParts(item?.event_date);
  const regEnd = formatDateParts(item?.registration_end_at || item?.event_date);
  const campusName = item?.campus?.name;
  const locationName = item?.location_node?.name;
  const eventType = item?.event_type || "General";

  return {
    id: item?.id,
    title: item?.title || "Untitled event",
    description:
      item?.description ||
      "Join us for this upcoming event and stay connected with campus safety updates.",
    image: resolveImageUrl(item?.event_image_url),
    organizer:
      item?.host_type === "student" ? "Student organizer" : "Algonquin College",
    date: when.date,
    time: when.time,
    location:
      item?.location_text || locationName || campusName || "Campus location",
    registrationDeadline: regEnd.date,
    type: eventType,
    eventType,
    hostType: item?.host_type || "admin",
    isApproved: Boolean(item?.is_approved),
    campusId: item?.campus_id,
    raw: item,
  };
}

export async function fetchEventsByTab() {
  try {
    const deviceId = await getOrCreateDeviceId();

    const [allResponse, myResponse] = await Promise.all([
      apiFetch("/events"),
      apiFetch(`/events/mine?device_id=${encodeURIComponent(deviceId)}`),
    ]);

    const allRows = Array.isArray(allResponse?.data) ? allResponse.data : [];
    const myRows = Array.isArray(myResponse?.data) ? myResponse.data : [];

    const myEvents = myRows
      .map((item) => ({
        ...normalizeEvent(item),
        isRegistered: true,
      }))
      .filter((event) => Boolean(event.id));
    const myEventIds = new Set(myEvents.map((event) => event.id));
    const allEvents = allRows.map((item) => {
      const normalized = normalizeEvent(item);
      return {
        ...normalized,
        isRegistered: myEventIds.has(normalized.id),
      };
    });

    return {
      allEvents,
      myEvents,
    };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return {
      allEvents: [],
      myEvents: [],
    };
  }
}

export async function registerForEvent(eventId, participant = {}) {
  const id = String(eventId || "").trim();
  if (!id) {
    throw new Error("Event id is required");
  }

  const deviceId = await getOrCreateDeviceId();
  const name = String(participant.name || "").trim();
  const email = String(participant.email || "").trim();

  return apiFetch(`/events/${id}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      device_id: deviceId,
      name,
      email,
    }),
  });
}

export async function cancelEventRegistration(eventId) {
  const id = String(eventId || "").trim();
  if (!id) {
    throw new Error("Event id is required");
  }

  const deviceId = await getOrCreateDeviceId();

  return apiFetch(`/events/${id}/register`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device_id: deviceId }),
  });
}
