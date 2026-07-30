import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import buildingA from "../../assets/building_graphs/building_A_unified.json";
import buildingB from "../../assets/building_graphs/building_B_unified.json";
import buildingC from "../../assets/building_graphs/building_C_unified.json";
import buildingCA from "../../assets/building_graphs/building_CA_unified.json";
import buildingD from "../../assets/building_graphs/building_D_unified.json";
import buildingE from "../../assets/building_graphs/building_E_unified.json";
import buildingF from "../../assets/building_graphs/building_F_unified.json";
import buildingH from "../../assets/building_graphs/building_H_unified.json";
import buildingJ from "../../assets/building_graphs/building_J_unified.json";
import buildingN from "../../assets/building_graphs/building_N_unified.json";
import buildingP from "../../assets/building_graphs/building_P_unified.json";
import buildingT from "../../assets/building_graphs/building_T_unified.json";
import buildingV from "../../assets/building_graphs/building_V_unified.json";
import buildingZ from "../../assets/building_graphs/building_Z_unified.json";
import { fetchNavigationGraphs } from "../../services/navigationService";
import {
  DeviceRotateIcon,
  LightbulbIcon,
  ForkKnifeIcon,
  StorefrontIcon,
  FirstAidIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  XIcon,
} from "phosphor-react-native";
import { NavigationArrowIcon } from "phosphor-react-native";

const LOCAL_GRAPH_DATASETS = {
  A: buildingA,
  B: buildingB,
  C: buildingC,
  CA: buildingCA,
  D: buildingD,
  E: buildingE,
  F: buildingF,
  H: buildingH,
  J: buildingJ,
  N: buildingN,
  P: buildingP,
  T: buildingT,
  V: buildingV,
  Z: buildingZ,
};

const EXCLUDED_WORDS = [
  "entrance",
  "exit",
  "washroom",
  "restroom",
  "toilet",
  "stairs",
  "elevator",
  "hallway",
  "intersection",
  "bridge",
  "path",
];

const AMENITY_LABEL_HINTS = {
  "Marketplace Food Court": ["food court", "cafeteria"],
  "Tim Hortons": ["tim hortons"],
  Starbucks: ["starbucks"],
  Connections: ["connections"],
  "The Fix": ["the fix"],
  "Health Services": ["health services", "health service"],
};

const WAYFINDER_FAVORITES_STORAGE_KEY = "wayfinder.favoriteRooms.v1";

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function parseRoomLabel(rawLabel) {
  const normalized = String(rawLabel || "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const roomPattern = normalized.match(
    /(?:room|romm)?\s*([a-z])\s*([0-9]{2,}[a-z0-9-]*)\s*(.*)$/i,
  );
  if (roomPattern) {
    const qualifier = normalized.match(/\b(left|right|upper|lower|main)\b/i);
    const code = `${roomPattern[1].toUpperCase()}${roomPattern[2].toUpperCase()}`;
    const suffix = roomPattern[3] ? roomPattern[3].trim() : "";
    let label = `Room ${code}`;

    if (suffix && !/^(left|right|upper|lower|main)$/i.test(suffix)) {
      label = `${label} - ${titleCase(suffix)}`;
    }
    if (qualifier) {
      label = `${label} (${titleCase(qualifier[1])})`;
    }
    return label;
  }

  return titleCase(normalized);
}

function isRoomNode(node) {
  if (!node || !node.label) return false;
  const type = String(node.type || "")
    .toLowerCase()
    .trim();
  return type === "room_door";
}

function isAmenityNode(node) {
  if (!node || !node.label) return false;
  const type = String(node.type || "")
    .toLowerCase()
    .trim();
  const label = String(node.label || "").toLowerCase();

  if (!(type === "room_door" || type === "poi")) return false;
  return !EXCLUDED_WORDS.some((word) => label.includes(word));
}

function shortestPath(graph, startNodeId, endNodeId) {
  if (!graph[startNodeId] || !graph[endNodeId]) return [];

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const nodeId of unvisited) distances[nodeId] = Infinity;
  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    let currentNodeId = null;

    for (const nodeId of unvisited) {
      if (
        currentNodeId === null ||
        distances[nodeId] < distances[currentNodeId]
      ) {
        currentNodeId = nodeId;
      }
    }

    if (currentNodeId === null) break;
    if (distances[currentNodeId] === Infinity) break;
    if (currentNodeId === endNodeId) break;

    unvisited.delete(currentNodeId);

    const neighbors = graph[currentNodeId].neighbors || {};
    for (const [neighborId, edgeDistance] of Object.entries(neighbors)) {
      if (!graph[neighborId] || !unvisited.has(neighborId)) continue;
      const candidateDistance = distances[currentNodeId] + Number(edgeDistance);
      if (candidateDistance < distances[neighborId]) {
        distances[neighborId] = candidateDistance;
        previous[neighborId] = currentNodeId;
      }
    }
  }

  const path = [];
  let current = endNodeId;
  while (current) {
    path.unshift(current);
    if (current === startNodeId) break;
    current = previous[current];
  }

  if (path[0] !== startNodeId) return [];
  return path;
}

function inferTurnInstruction(previousNode, currentNode, nextNode) {
  if (!previousNode || !currentNode || !nextNode) {
    return {
      direction: "up",
      text: `Continue to ${nextNode?.name || "next point"}.`,
    };
  }

  const vectorAX = currentNode.x - previousNode.x;
  const vectorAY = currentNode.y - previousNode.y;
  const vectorBX = nextNode.x - currentNode.x;
  const vectorBY = nextNode.y - currentNode.y;
  const cross = vectorAX * vectorBY - vectorAY * vectorBX;

  if (Math.abs(cross) < 1e-3) {
    return { direction: "up", text: `Continue straight to ${nextNode.name}.` };
  }
  if (cross > 0) {
    return { direction: "right", text: `Turn right toward ${nextNode.name}.` };
  }
  return { direction: "right", text: `Turn left toward ${nextNode.name}.` };
}

function getNodeDisplayName(node, fallbackId) {
  if (node?.name && String(node.name).trim()) return String(node.name).trim();
  if (node?.label && String(node.label).trim()) {
    return parseRoomLabel(String(node.label));
  }
  return `Waypoint ${String(fallbackId || "")}`.trim();
}

function buildRouteStepsFromPath(graph, path, startName, destinationName) {
  if (!Array.isArray(path) || path.length < 2) return [];

  const steps = [];
  for (let index = 0; index < path.length - 1; index += 1) {
    const currentNodeId = path[index];
    const nextNodeId = path[index + 1];
    const currentNode = graph[currentNodeId];
    const nextNode = graph[nextNodeId];
    const nextNodeName = getNodeDisplayName(nextNode, index + 2);
    const edgeDistance = currentNode?.neighbors?.[nextNodeId] || 0;

    let instruction;
    let direction;
    if (index === 0) {
      instruction = `Start at ${startName} and proceed to ${nextNodeName}.`;
      direction = "up";
    } else {
      const previousNode = graph[path[index - 1]];
      const turnStep = inferTurnInstruction(previousNode, currentNode, {
        ...nextNode,
        name: nextNodeName,
      });
      instruction = turnStep.text;
      direction = turnStep.direction;
    }

    steps.push({
      id: index + 1,
      instruction,
      direction,
    });
  }

  steps.push({
    id: steps.length + 1,
    instruction: `You have arrived at ${destinationName}.`,
    direction: "right",
  });

  return steps;
}

export default function NavigateScreen() {
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeSteps, setRouteSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeSearchField, setActiveSearchField] = useState(null);
  const [hasTypedInActiveField, setHasTypedInActiveField] = useState(false);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState(() => new Set());
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [graphDatasets, setGraphDatasets] = useState(
    () => LOCAL_GRAPH_DATASETS,
  );

  const syncNavigationGraphs = useCallback(async () => {
    try {
      const graphs = await fetchNavigationGraphs();
      const nextGraphDatasets = {};

      graphs.forEach((graphEntry) => {
        const buildingCode = String(
          graphEntry?.buildingCode || graphEntry?.building_code || "",
        )
          .trim()
          .toUpperCase();

        if (!buildingCode) return;

        nextGraphDatasets[buildingCode] =
          graphEntry?.graphData || graphEntry?.graph_data || {};
      });

      if (Object.keys(nextGraphDatasets).length > 0) {
        setGraphDatasets((current) => ({
          ...current,
          ...nextGraphDatasets,
        }));
      }
    } catch {
      setGraphDatasets((current) =>
        Object.keys(current).length > 0 ? current : LOCAL_GRAPH_DATASETS,
      );
    }
  }, []);

  useEffect(() => {
    syncNavigationGraphs();

    const refreshInterval = setInterval(() => {
      syncNavigationGraphs();
    }, 20000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [syncNavigationGraphs]);

  useFocusEffect(
    useCallback(() => {
      syncNavigationGraphs();
      return undefined;
    }, [syncNavigationGraphs]),
  );

  const locationOptions = useMemo(() => {
    const options = [];

    Object.entries(graphDatasets).forEach(([graphId, graph]) => {
      Object.entries(graph).forEach(([nodeId, node]) => {
        if (!isRoomNode(node)) return;

        const displayName = parseRoomLabel(node.label);
        if (!displayName) return;

        options.push({
          key: `${graphId}:${nodeId}`,
          graphId,
          nodeId,
          rawLabel: String(node.label || ""),
          name: displayName,
        });
      });
    });

    const duplicateCountByName = options.reduce((accumulator, option) => {
      accumulator[option.name] = (accumulator[option.name] || 0) + 1;
      return accumulator;
    }, {});

    return options
      .map((option) => ({
        ...option,
        name:
          duplicateCountByName[option.name] > 1
            ? `${option.name} (${option.graphId})`
            : option.name,
      }))
      .sort((first, second) => first.name.localeCompare(second.name));
  }, [graphDatasets]);

  const amenityTargetOptions = useMemo(() => {
    const options = [];

    Object.entries(graphDatasets).forEach(([graphId, graph]) => {
      Object.entries(graph).forEach(([nodeId, node]) => {
        if (!isAmenityNode(node)) return;
        options.push({
          key: `${graphId}:${nodeId}`,
          graphId,
          nodeId,
          rawLabel: String(node.label || ""),
          name: parseRoomLabel(node.label),
        });
      });
    });

    return options;
  }, [graphDatasets]);

  const optionByName = useMemo(() => {
    const lookup = new Map();
    locationOptions.forEach((option) => {
      lookup.set(option.name, option);
    });
    return lookup;
  }, [locationOptions]);

  useEffect(() => {
    let mounted = true;

    async function loadFavorites() {
      try {
        const raw = await AsyncStorage.getItem(WAYFINDER_FAVORITES_STORAGE_KEY);
        if (!mounted || !raw) return;

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return;

        const validKeys = new Set(locationOptions.map((option) => option.key));
        const filtered = parsed.filter((key) => validKeys.has(key));
        setFavoriteKeys(new Set(filtered));
      } catch {
      } finally {
        if (mounted) setFavoritesLoaded(true);
      }
    }

    loadFavorites();
    return () => {
      mounted = false;
    };
  }, [locationOptions]);

  useEffect(() => {
    if (!favoritesLoaded) return;
    const favoriteList = Array.from(favoriteKeys);
    AsyncStorage.setItem(
      WAYFINDER_FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteList),
    ).catch(() => {});
  }, [favoriteKeys, favoritesLoaded]);

  const amenitiesList = [
    { id: 1, name: "Marketplace Food Court", icon: ForkKnifeIcon },
    { id: 2, name: "Tim Hortons", icon: ForkKnifeIcon },
    { id: 3, name: "Starbucks", icon: ForkKnifeIcon },
    { id: 4, name: "Connections", icon: StorefrontIcon },
    { id: 5, name: "The Fix", icon: ForkKnifeIcon },
    { id: 6, name: "Health Services", icon: FirstAidIcon },
  ];

  const amenitiesItems = amenitiesList.map((amenity) => (
    <Pressable
      key={amenity.id}
      style={styles.amenityItem}
      onPress={() => handleAmenityPress(amenity)}
    >
      <amenity.icon size={20} color={colors.Primary_Charcoal} weight="bold" />
      <Text style={typography.body}>{amenity.name}</Text>
    </Pressable>
  ));

  const activeStep = routeSteps[currentStepIndex];
  const progressPercent = routeSteps.length
    ? ((currentStepIndex + 1) / routeSteps.length) * 100
    : 0;
  const activeSearchValue =
    activeSearchField === "start" ? startingPoint : destination;

  const anchorGraphId =
    selectedStart?.graphId || selectedDestination?.graphId || null;

  const filteredSuggestions = useMemo(() => {
    const query = hasTypedInActiveField
      ? activeSearchValue.trim().toLowerCase()
      : "";
    if (!activeSearchField) {
      return [];
    }

    let scopedOptions = locationOptions;
    if (anchorGraphId) {
      if (activeSearchField === "destination" && selectedStart?.graphId) {
        scopedOptions = locationOptions.filter(
          (option) => option.graphId === selectedStart.graphId,
        );
      } else if (
        activeSearchField === "start" &&
        selectedDestination?.graphId
      ) {
        scopedOptions = locationOptions.filter(
          (option) => option.graphId === selectedDestination.graphId,
        );
      }
    }

    if (activeSearchField === "start" && selectedDestination) {
      scopedOptions = scopedOptions.filter(
        (option) => option.key !== selectedDestination.key,
      );
    }
    if (activeSearchField === "destination" && selectedStart) {
      scopedOptions = scopedOptions.filter(
        (option) => option.key !== selectedStart.key,
      );
    }

    const filtered = !query
      ? scopedOptions
      : scopedOptions.filter((option) =>
          option.name.toLowerCase().includes(query),
        );

    return filtered.sort((first, second) => {
      const firstFav = favoriteKeys.has(first.key) ? 1 : 0;
      const secondFav = favoriteKeys.has(second.key) ? 1 : 0;
      if (firstFav !== secondFav) return secondFav - firstFav;
      return first.name.localeCompare(second.name);
    });
  }, [
    activeSearchField,
    activeSearchValue,
    hasTypedInActiveField,
    locationOptions,
    selectedStart,
    selectedDestination,
    anchorGraphId,
    favoriteKeys,
  ]);

  const handleSwap = () => {
    if (!selectedStart || !selectedDestination) {
      setStartingPoint(destination);
      setDestination(startingPoint);
      setSelectedStart(selectedDestination);
      setSelectedDestination(selectedStart);
      return;
    }

    setStartingPoint(selectedDestination.name);
    setDestination(selectedStart.name);
    setSelectedStart(selectedDestination);
    setSelectedDestination(selectedStart);
  };

  const handleSearchChange = (field, value) => {
    setHasTypedInActiveField(true);
    if (field === "start") {
      setStartingPoint(value);
      setSelectedStart(null);
    } else {
      setDestination(value);
      setSelectedDestination(null);
    }
    setActiveSearchField(field);
  };

  const handleSelectSuggestion = (field, option) => {
    if (field === "start") {
      setStartingPoint(option.name);
      setSelectedStart(option);
    } else {
      setDestination(option.name);
      setSelectedDestination(option);
    }
    setActiveSearchField(null);
    setHasTypedInActiveField(false);
  };

  const handleInputFocus = (field) => {
    setActiveSearchField(field);
    setHasTypedInActiveField(false);
  };

  const toggleFavorite = (option) => {
    setFavoriteKeys((previous) => {
      const next = new Set(previous);
      if (next.has(option.key)) {
        next.delete(option.key);
      } else {
        next.add(option.key);
      }
      return next;
    });
  };

  const startNavigationSession = (startSelection, destinationSelection) => {
    if (!startSelection || !destinationSelection) {
      Alert.alert(
        "Missing route details",
        "Please choose a start and destination from the dropdown list.",
      );
      return;
    }

    if (startSelection.key === destinationSelection.key) {
      Alert.alert(
        "Invalid route",
        "Starting point and destination cannot be the same.",
      );
      return;
    }

    if (startSelection.graphId !== destinationSelection.graphId) {
      Alert.alert(
        "Route unavailable",
        "Start and destination must be in the same building for now.",
      );
      return;
    }

    const graph = graphDatasets[startSelection.graphId];
    const path = shortestPath(
      graph,
      startSelection.nodeId,
      destinationSelection.nodeId,
    );
    if (!path.length) {
      Alert.alert(
        "Route unavailable",
        "No path was found between those two points in this building.",
      );
      return;
    }

    const graphWithDisplayNames = { ...graph };
    path.forEach((nodeId) => {
      const option = locationOptions.find(
        (candidate) =>
          candidate.graphId === startSelection.graphId &&
          candidate.nodeId === nodeId,
      );
      if (option) {
        graphWithDisplayNames[nodeId] = {
          ...graphWithDisplayNames[nodeId],
          name: option.name,
        };
      }
    });

    setStartingPoint(startSelection.name);
    setDestination(destinationSelection.name);
    const steps = buildRouteStepsFromPath(
      graphWithDisplayNames,
      path,
      startSelection.name,
      destinationSelection.name,
    );
    setRouteSteps(steps);
    setCurrentStepIndex(0);
    setIsNavigating(true);
  };

  const handleStartNavigation = () => {
    const resolvedStart =
      selectedStart || optionByName.get(startingPoint.trim());
    const resolvedDestination =
      selectedDestination || optionByName.get(destination.trim());
    setSelectedStart(resolvedStart || null);
    setSelectedDestination(resolvedDestination || null);
    startNavigationSession(resolvedStart, resolvedDestination);
  };

  const handleNextStep = () => {
    if (currentStepIndex >= routeSteps.length - 1) {
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBackStep = () => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((prev) => prev - 1);
  };

  const resetNavigationState = () => {
    setIsNavigating(false);
    setRouteSteps([]);
    setCurrentStepIndex(0);
    setStartingPoint("");
    setDestination("");
    setSelectedStart(null);
    setSelectedDestination(null);
    setActiveSearchField(null);
    setHasTypedInActiveField(false);
  };

  const handleEndNavigation = () => {
    resetNavigationState();
  };

  const handleFinishNavigation = () => {
    resetNavigationState();
    setShowArrivalModal(true);
  };

  const handleArrivalModalClose = () => {
    setShowArrivalModal(false);
    navigation.navigate("Wayfinder");
  };



  const handleAmenityPress = (amenity) => {
    const hints = AMENITY_LABEL_HINTS[amenity.name] || [
      amenity.name.toLowerCase(),
    ];

    const candidates = amenityTargetOptions.filter((option) =>
      hints.some((hint) => option.rawLabel.toLowerCase().includes(hint)),
    );

    const amenityOption = candidates[0];

    if (!amenityOption) {
      Alert.alert(
        "Unavailable",
        "This amenity is not available in the selected building graph.",
      );
      return;
    }

    const targetField = activeSearchField === "start" ? "start" : "destination";
    if (targetField === "start") {
      setStartingPoint(amenityOption.name);
      setSelectedStart(amenityOption);
      setDestination("");
      setSelectedDestination(null);
    } else {
      setDestination(amenityOption.name);
      setSelectedDestination(amenityOption);
      setStartingPoint("");
      setSelectedStart(null);
    }

    setIsNavigating(false);
    setRouteSteps([]);
    setCurrentStepIndex(0);
    setActiveSearchField(null);
    setHasTypedInActiveField(false);
  };

  const renderSuggestionsDropdown = () => {
    if (filteredSuggestions.length === 0) return null;

    return (
      <View style={styles.searchDropdown}>
        <ScrollView
          style={{ maxHeight: 240 }}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          {filteredSuggestions.map((location) => {
            const isFavorite = favoriteKeys.has(location.key);
            return (
              <View key={location.key} style={styles.searchDropdownItem}>
                <Pressable onPress={() => toggleFavorite(location)} hitSlop={8}>
                  <StarIcon
                    size={16}
                    color={isFavorite ? colors.Warning_line : colors.Dark_Grey}
                    weight={isFavorite ? "fill" : "regular"}
                  />
                </Pressable>

                <Pressable
                  style={{ flex: 1, paddingVertical: 10 }}
                  onPress={() =>
                    handleSelectSuggestion(activeSearchField, location)
                  }
                >
                  <Text
                    style={[
                      typography.body,
                      styles.searchDropdownText,
                      { color: colors.Primary_Charcoal },
                    ]}
                  >
                    {location.name}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationCard}>
        <View>
          <Text style={typography.h4}>Plan route</Text>
          <Text
            style={[typography.caption, { color: colors.Primary_Charcoal }]}
          >
            Choose your starting point and destination
          </Text>
        </View>

        <View style={styles.fieldsRow}>
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
          </View>

          <View style={styles.inputsColumn}>
            <TextInput
              style={styles.input}
              placeholder="Starting Point"
              placeholderTextColor={colors.Primary_Charcoal}
              value={startingPoint}
              onFocus={() => handleInputFocus("start")}
              onChangeText={(value) => handleSearchChange("start", value)}
            />
            {activeSearchField === "start" ? renderSuggestionsDropdown() : null}

            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="Destination"
              placeholderTextColor={colors.Primary_Charcoal}
              value={destination}
              onFocus={() => handleInputFocus("destination")}
              onChangeText={(value) => handleSearchChange("destination", value)}
            />
            {activeSearchField === "destination"
              ? renderSuggestionsDropdown()
              : null}
          </View>

          <Pressable onPress={handleSwap} disabled={isNavigating}>
            <DeviceRotateIcon
              size={28}
              color={isNavigating ? colors.Grey : colors.primary_AC_Green}
              weight="bold"
            />
          </Pressable>
        </View>

        <Pressable
          style={[
            styles.buttonContainer,
            {
              backgroundColor: colors.primary_AC_Green,
              justifyContent: "center",
            },
          ]}
          onPress={handleStartNavigation}
        >
          <NavigationArrowIcon
            size={26}
            color={colors.primary_White}
            weight="bold"
          />
          <Text
            style={[typography.secondaryBody, { color: colors.primary_White }]}
          >
            {isNavigating ? "Restart navigation" : "Start navigation"}
          </Text>
        </Pressable>
      </View>

      {isNavigating && activeStep ? (
        <View style={styles.navigationCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {activeStep.direction === "up" ? (
                <ArrowUpIcon
                  size={24}
                  color={colors.Primary_Charcoal}
                  weight="bold"
                />
              ) : (
                <ArrowRightIcon
                  size={24}
                  color={colors.Primary_Charcoal}
                  weight="bold"
                />
              )}
            </View>

            <Pressable onPress={handleEndNavigation} hitSlop={8}>
              <XIcon size={22} color={colors.Dark_Grey} weight="bold" />
            </Pressable>
          </View>

          <Text style={[typography.body, styles.routeActionText]}>
            {activeStep.instruction}
          </Text>

          <View style={styles.routeProgressTrack}>
            <View
              style={[
                styles.routeProgressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>

          <Pressable
            style={[styles.buttonContainer, styles.routeButtonPrimary]}
            onPress={
              currentStepIndex === routeSteps.length - 1
                ? handleFinishNavigation
                : handleNextStep
            }
          >
            <Text
              style={[
                typography.secondaryBody,
                { color: colors.primary_White },
              ]}
            >
              {currentStepIndex === routeSteps.length - 1 ? "Finish" : "Next"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.routeButtonSecondary]}
            onPress={handleBackStep}
            disabled={currentStepIndex === 0}
          >
            <Text
              style={[
                typography.secondaryBody,
                {
                  color:
                    currentStepIndex === 0
                      ? colors.Light_Grey
                      : colors.Primary_Charcoal,
                },
              ]}
            >
              Back
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.navigationCard, { gap: 12 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <LightbulbIcon size={20} weight="bold" />
            <Text style={typography.h4}>Amenities</Text>
          </View>
          <View>{amenitiesItems}</View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={showArrivalModal}
        onRequestClose={() => {}}
      >
        <View style={styles.arrivalModalBackdrop}>
          <View style={styles.arrivalModalScrim} />

          <View style={styles.arrivalModalCard}>
            <View style={styles.arrivalModalIconCircle}>
              <CheckIcon size={54} color={colors.primary_White} weight="bold" />
            </View>

            <Text
              style={[
                typography.h2,
                {
                  color: colors.primary_AC_Green,
                  textAlign: "center",
                },
              ]}
            >
              You have arrived at your destination
            </Text>

            <Pressable
              style={[styles.buttonContainer, styles.arrivalModalButton]}
              onPress={handleArrivalModalClose}
            >
              <Text style={[typography.h4, { color: colors.primary_White }]}>
                Back to Wayfinder
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
