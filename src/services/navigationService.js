import { apiFetch } from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NAVIGATION_GRAPH_CACHE_KEY = "navigation.graphs.cache.v1";
const NAVIGATION_GRAPH_CACHE_VERSION_KEY = "navigation.graphs.version.v1";

export async function fetchNavigationGraphs() {
  const result = await apiFetch("/navigation/graphs");
  return Array.isArray(result?.data) ? result.data : [];
}

export async function fetchNavigationGraphsVersion() {
  const result = await apiFetch("/navigation/graphs/version");
  return String(result?.version || "").trim() || "0:empty";
}

export async function loadCachedNavigationGraphs() {
  try {
    const raw = await AsyncStorage.getItem(NAVIGATION_GRAPH_CACHE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveNavigationGraphsCache(graphs, version) {
  await Promise.all([
    AsyncStorage.setItem(
      NAVIGATION_GRAPH_CACHE_KEY,
      JSON.stringify(Array.isArray(graphs) ? graphs : []),
    ),
    AsyncStorage.setItem(
      NAVIGATION_GRAPH_CACHE_VERSION_KEY,
      String(version || "0:empty"),
    ),
  ]);
}

async function fetchAndCacheNavigationGraphs(targetVersion = null) {
  const graphs = await fetchNavigationGraphs();
  const version = targetVersion || (await fetchNavigationGraphsVersion());
  await saveNavigationGraphsCache(graphs, version);
  return graphs;
}

export async function getNavigationGraphs({ checkForUpdates = true } = {}) {
  const cachedGraphs = await loadCachedNavigationGraphs();

  if (!checkForUpdates) {
    return cachedGraphs;
  }

  try {
    const serverVersion = await fetchNavigationGraphsVersion();
    const cachedVersion =
      (await AsyncStorage.getItem(NAVIGATION_GRAPH_CACHE_VERSION_KEY)) || "";

    if (cachedGraphs.length === 0 || cachedVersion !== serverVersion) {
      return await fetchAndCacheNavigationGraphs(serverVersion);
    }

    return cachedGraphs;
  } catch {
    return cachedGraphs;
  }
}

export async function primeNavigationGraphsCacheOnAppStart() {
  await getNavigationGraphs({ checkForUpdates: true });
}
