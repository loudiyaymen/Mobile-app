import { apiFetch } from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NAVIGATION_GRAPH_CACHE_KEY = "navigation.graphs.cache.v1";
const NAVIGATION_GRAPH_CACHE_VERSION_KEY = "navigation.graphs.version.v1";
const USE_LOCAL_NAVIGATION_GRAPHS = false;

const LOCAL_GRAPH_DATASETS = {
  A: require("../assets/building_graphs/building_A_unified.json"),
  B: require("../assets/building_graphs/building_B_unified.json"),
  CA: require("../assets/building_graphs/building_CA_unified.json"),
  C: require("../assets/building_graphs/building_C_unified.json"),
  D: require("../assets/building_graphs/building_D_unified.json"),
  E: require("../assets/building_graphs/building_E_unified.json"),
  F: require("../assets/building_graphs/building_F_unified.json"),
  H: require("../assets/building_graphs/building_H_unified.json"),
  J: require("../assets/building_graphs/building_J_unified.json"),
  N: require("../assets/building_graphs/building_N_unified.json"),
  P: require("../assets/building_graphs/building_P_unified.json"),
  T: require("../assets/building_graphs/building_T_unified.json"),
  V: require("../assets/building_graphs/building_V_unified.json"),
  Z: require("../assets/building_graphs/building_Z_unified.json"),
};

function getLocalNavigationGraphs() {
  return Object.entries(LOCAL_GRAPH_DATASETS).map(
    ([buildingCode, graphData]) => ({
      buildingId: buildingCode,
      buildingCode,
      buildingName: buildingCode,
      graphData,
      sourceFile: `building_${buildingCode}_unified.json`,
    }),
  );
}

function getLocalNavigationGraphsVersion() {
  return `local-assets:${Object.keys(LOCAL_GRAPH_DATASETS).length}`;
}

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

export async function clearNavigationGraphsCache() {
  await Promise.all([
    AsyncStorage.removeItem(NAVIGATION_GRAPH_CACHE_KEY),
    AsyncStorage.removeItem(NAVIGATION_GRAPH_CACHE_VERSION_KEY),
  ]);
}

export async function refreshNavigationGraphsCache() {
  if (USE_LOCAL_NAVIGATION_GRAPHS) {
    const localGraphs = getLocalNavigationGraphs();
    await saveNavigationGraphsCache(
      localGraphs,
      getLocalNavigationGraphsVersion(),
    );
    return localGraphs;
  }

  const version = await fetchNavigationGraphsVersion();
  return fetchAndCacheNavigationGraphs(version);
}

export async function getNavigationGraphs({ checkForUpdates = true } = {}) {
  if (USE_LOCAL_NAVIGATION_GRAPHS) {
    const localGraphs = getLocalNavigationGraphs();
    // Keep cache in sync so fallback/dev tools see the same payload shape.
    await saveNavigationGraphsCache(
      localGraphs,
      getLocalNavigationGraphsVersion(),
    );
    return localGraphs;
  }

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
  if (USE_LOCAL_NAVIGATION_GRAPHS) {
    await refreshNavigationGraphsCache();
    return;
  }

  await getNavigationGraphs({ checkForUpdates: true });
}
