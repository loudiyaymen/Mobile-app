import { apiFetch } from "./apiClient";

export async function fetchNavigationGraphs() {
  const result = await apiFetch("/navigation/graphs");
  return Array.isArray(result?.data) ? result.data : [];
}
