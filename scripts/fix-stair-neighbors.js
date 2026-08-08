const fs = require("fs");
const path = require("path");

const GRAPHS_DIR = path.join(
  __dirname,
  "..",
  "src",
  "assets",
  "building_graphs",
);

const DIRECTION_WORDS = new Set([
  "left",
  "right",
  "upper",
  "lower",
  "middle",
  "center",
  "central",
  "west",
  "east",
  "north",
  "south",
]);

const STOP_WORDS = new Set([
  "stair",
  "stairs",
  "staircase",
  "level",
  "floor",
  "near",
  "of",
  "the",
  "and",
  "in",
  "front",
  "its",
]);

const SAME_LEVEL_FALLBACK_MAX_DISTANCE = 220;
const CROSS_LEVEL_MAX_DISTANCE = 260;
const ISOLATED_SAME_LEVEL_MAX_DISTANCE = 260;
const ISOLATED_RELAXED_MAX_DISTANCE = 520;

const TYPE_PRIORITY = {
  room_door: ["intersection", "hallway_node", "room_door", "poi"],
  intersection: ["hallway_node", "intersection", "room_door", "poi"],
  hallway_node: ["intersection", "hallway_node", "room_door", "poi"],
  entrance: ["hallway_node", "intersection", "room_door"],
  elevator: ["hallway_node", "intersection", "stairs", "elevator"],
  stairs: ["intersection", "hallway_node", "stairs"],
  poi: ["hallway_node", "intersection", "poi", "room_door"],
};

function parseJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, content) {
  fs.writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getNodeLevel(node) {
  const explicit = toNumber(node?.level);
  if (explicit !== null) return explicit;

  const label = String(node?.label || "");
  const levelMatch = label.match(/\blevel\s*([0-9]+)\b/i);
  if (levelMatch) return Number(levelMatch[1]);

  const roomMatch = label.match(/\b[A-Z]{0,2}([0-9])[0-9]{2,}\b/i);
  if (roomMatch) return Number(roomMatch[1]);

  return null;
}

function getDistance(a, b) {
  const ax = toNumber(a?.x);
  const ay = toNumber(a?.y);
  const bx = toNumber(b?.x);
  const by = toNumber(b?.y);
  if (ax === null || ay === null || bx === null || by === null) {
    return Number.POSITIVE_INFINITY;
  }

  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

function isStairNode(node) {
  const type = normalizeType(node?.type);
  const label = String(node?.label || "").toLowerCase();

  if (type === "stairs") return true;

  // Include mislabeled stairs, but exclude explicit non-stair transport/corridor types.
  if (
    type === "elevator" ||
    type === "hallway_node" ||
    type === "intersection"
  ) {
    return false;
  }

  return /\bstair/.test(label);
}

function normalizeType(typeValue) {
  return String(typeValue || "")
    .toLowerCase()
    .trim();
}

function getLabelWords(labelValue) {
  const label = String(labelValue || "").toLowerCase();
  return label
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !STOP_WORDS.has(word));
}

function getDirectionWords(labelValue) {
  return getLabelWords(labelValue).filter((word) => DIRECTION_WORDS.has(word));
}

function ensureNeighbor(node, neighborId, distance) {
  if (!node.neighbors || typeof node.neighbors !== "object") {
    node.neighbors = {};
  }

  if (node.neighbors[neighborId] !== undefined) return false;

  node.neighbors[neighborId] = Number.isFinite(distance)
    ? distance
    : Number.POSITIVE_INFINITY;
  return true;
}

function getNeighborIds(node) {
  if (!node?.neighbors || typeof node.neighbors !== "object") return [];
  return Object.keys(node.neighbors);
}

function connectBidirectional(graph, aId, bId) {
  const a = graph[aId];
  const b = graph[bId];
  if (!a || !b) return false;

  const distance = getDistance(a, b);
  const changedA = ensureNeighbor(a, bId, distance);
  const changedB = ensureNeighbor(b, aId, distance);
  return changedA || changedB;
}

function closestNodeOnSameLevel(graph, stairId) {
  const stair = graph[stairId];
  const stairLevel = getNodeLevel(stair);

  const entries = Object.entries(graph).filter(([id, node]) => {
    if (id === stairId) return false;
    if (getNodeLevel(node) !== stairLevel) return false;
    return Number.isFinite(getDistance(stair, node));
  });

  if (entries.length === 0) return null;

  const nonStairs = entries.filter(([, node]) => !isStairNode(node));
  const pool = nonStairs.length > 0 ? nonStairs : entries;

  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const [id, node] of pool) {
    const distance = getDistance(stair, node);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = id;
    }
  }

  if (!best || bestDistance > SAME_LEVEL_FALLBACK_MAX_DISTANCE) {
    return null;
  }

  return best;
}

function hasStairNeighbor(graph, stairId) {
  const node = graph[stairId];
  return getNeighborIds(node).some((neighborId) =>
    isStairNode(graph[neighborId]),
  );
}

function getIsolatedNodeIds(graph) {
  return Object.entries(graph)
    .filter(([, node]) => getNeighborIds(node).length === 0)
    .map(([id]) => id);
}

function isTypePreferred(sourceType, candidateType) {
  const preferred = TYPE_PRIORITY[sourceType] || [];
  return preferred.includes(candidateType);
}

function chooseCandidateForIsolatedNode(graph, sourceId) {
  const sourceNode = graph[sourceId];
  const sourceLevel = getNodeLevel(sourceNode);
  const sourceType = normalizeType(sourceNode?.type);
  const sourceWords = new Set(getLabelWords(sourceNode?.label));

  const allCandidates = Object.entries(graph).filter(
    ([candidateId, candidate]) => {
      if (candidateId === sourceId) return false;
      const distance = getDistance(sourceNode, candidate);
      return Number.isFinite(distance);
    },
  );

  if (allCandidates.length === 0) return null;

  const sameLevelCandidates = allCandidates.filter(([, candidate]) => {
    return getNodeLevel(candidate) === sourceLevel;
  });

  const anchoredSameLevelPreferred = sameLevelCandidates.filter(
    ([, candidate]) => {
      const candidateType = normalizeType(candidate?.type);
      return (
        getNeighborIds(candidate).length > 0 &&
        isTypePreferred(sourceType, candidateType) &&
        getDistance(sourceNode, candidate) <= ISOLATED_SAME_LEVEL_MAX_DISTANCE
      );
    },
  );

  const anchoredSameLevelAny = sameLevelCandidates.filter(([, candidate]) => {
    return (
      getNeighborIds(candidate).length > 0 &&
      getDistance(sourceNode, candidate) <= ISOLATED_RELAXED_MAX_DISTANCE
    );
  });

  const fallbackPool =
    anchoredSameLevelPreferred.length > 0
      ? anchoredSameLevelPreferred
      : anchoredSameLevelAny.length > 0
        ? anchoredSameLevelAny
        : sameLevelCandidates.length > 0
          ? sameLevelCandidates
          : allCandidates;

  let bestId = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const [candidateId, candidate] of fallbackPool) {
    const distance = getDistance(sourceNode, candidate);
    const candidateType = normalizeType(candidate?.type);
    const candidateWords = new Set(getLabelWords(candidate?.label));

    let overlap = 0;
    for (const word of sourceWords) {
      if (candidateWords.has(word)) overlap += 1;
    }

    const anchoredBonus = getNeighborIds(candidate).length > 0 ? 8 : 0;
    const typeBonus = isTypePreferred(sourceType, candidateType) ? 6 : 0;
    const sameLevelBonus = getNodeLevel(candidate) === sourceLevel ? 5 : 0;
    const score =
      anchoredBonus + typeBonus + sameLevelBonus + overlap * 2 - distance / 35;

    if (score > bestScore) {
      bestScore = score;
      bestId = candidateId;
    }
  }

  return bestId;
}

function connectRemainingIsolatedNodes(graph) {
  let linksAdded = 0;
  const isolatedIds = getIsolatedNodeIds(graph);

  for (const nodeId of isolatedIds) {
    if (getNeighborIds(graph[nodeId]).length > 0) continue;

    const candidateId = chooseCandidateForIsolatedNode(graph, nodeId);
    if (!candidateId) continue;

    if (connectBidirectional(graph, nodeId, candidateId)) {
      linksAdded += 1;
    }
  }

  return linksAdded;
}

function bestCrossLevelStair(graph, sourceStairId) {
  const source = graph[sourceStairId];
  const sourceLevel = getNodeLevel(source);
  const allCandidates = Object.entries(graph).filter(([candidateId, node]) => {
    if (candidateId === sourceStairId) return false;
    if (!isStairNode(node)) return false;
    return true;
  });

  if (allCandidates.length === 0) return null;

  const sourceDirectionWords = new Set(getDirectionWords(source.label));
  const sourceWords = new Set(getLabelWords(source.label));

  function scoreCandidates(candidates, maxDistance) {
    let bestId = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const [candidateId, candidate] of candidates) {
      const candidateLevel = getNodeLevel(candidate);
      const distance = getDistance(source, candidate);
      if (!Number.isFinite(distance) || distance > maxDistance) {
        continue;
      }

      const candidateDirectionWords = new Set(
        getDirectionWords(candidate.label),
      );
      const candidateWords = new Set(getLabelWords(candidate.label));

      let directionOverlap = 0;
      for (const word of sourceDirectionWords) {
        if (candidateDirectionWords.has(word)) directionOverlap += 1;
      }

      let wordOverlap = 0;
      for (const word of sourceWords) {
        if (candidateWords.has(word)) wordOverlap += 1;
      }

      const levelBonus =
        sourceLevel !== null && candidateLevel !== null
          ? Math.abs(sourceLevel - candidateLevel) === 1
            ? 6
            : sourceLevel === candidateLevel
              ? -10
              : 2
          : 0;

      const score =
        directionOverlap * 4 + wordOverlap * 2 + levelBonus - distance / 40;

      if (score > bestScore) {
        bestScore = score;
        bestId = candidateId;
      }
    }

    return bestId;
  }

  const strictCandidates = allCandidates.filter(([, node]) => {
    const candidateLevel = getNodeLevel(node);
    if (sourceLevel !== null && candidateLevel !== null) {
      return (
        candidateLevel !== sourceLevel &&
        Math.abs(candidateLevel - sourceLevel) <= 1
      );
    }
    return true;
  });

  let bestId = scoreCandidates(strictCandidates, CROSS_LEVEL_MAX_DISTANCE);
  if (bestId) return bestId;

  const relaxedDifferentLevel = allCandidates.filter(([, node]) => {
    const candidateLevel = getNodeLevel(node);
    if (sourceLevel !== null && candidateLevel !== null) {
      return candidateLevel !== sourceLevel;
    }
    return true;
  });

  bestId = scoreCandidates(relaxedDifferentLevel, 900);
  if (bestId) return bestId;

  // Last resort: allow same-level stair pairing to avoid totally disconnected stair stacks.
  bestId = scoreCandidates(allCandidates, 1400);
  if (bestId) return bestId;

  return null;
}

function processGraphFile(filePath) {
  const graph = parseJson(filePath);
  const stairIds = Object.entries(graph)
    .filter(([, node]) => isStairNode(node))
    .map(([id]) => id);

  let sameLevelLinksAdded = 0;
  let crossLevelLinksAdded = 0;
  let isolatedLinksAdded = 0;

  for (const stairId of stairIds) {
    const stair = graph[stairId];
    const hasAnyNeighbors = getNeighborIds(stair).length > 0;
    if (hasAnyNeighbors) continue;

    const nearest = closestNodeOnSameLevel(graph, stairId);
    if (!nearest) continue;

    if (connectBidirectional(graph, stairId, nearest)) {
      sameLevelLinksAdded += 1;
    }
  }

  for (const stairId of stairIds) {
    if (hasStairNeighbor(graph, stairId)) continue;

    const targetStairId = bestCrossLevelStair(graph, stairId);
    if (!targetStairId) continue;

    if (connectBidirectional(graph, stairId, targetStairId)) {
      crossLevelLinksAdded += 1;
    }
  }

  isolatedLinksAdded += connectRemainingIsolatedNodes(graph);

  if (
    sameLevelLinksAdded === 0 &&
    crossLevelLinksAdded === 0 &&
    isolatedLinksAdded === 0
  ) {
    return {
      changed: false,
      sameLevelLinksAdded,
      crossLevelLinksAdded,
      isolatedLinksAdded,
    };
  }

  writeJson(filePath, graph);

  return {
    changed: true,
    sameLevelLinksAdded,
    crossLevelLinksAdded,
    isolatedLinksAdded,
  };
}

function main() {
  const files = fs
    .readdirSync(GRAPHS_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort();

  let changedFiles = 0;
  let totalSameLevelLinks = 0;
  let totalCrossLevelLinks = 0;
  let totalIsolatedLinks = 0;

  for (const fileName of files) {
    const filePath = path.join(GRAPHS_DIR, fileName);
    const result = processGraphFile(filePath);
    if (!result.changed) continue;

    changedFiles += 1;
    totalSameLevelLinks += result.sameLevelLinksAdded;
    totalCrossLevelLinks += result.crossLevelLinksAdded;
    totalIsolatedLinks += result.isolatedLinksAdded;

    console.log(
      `${fileName}: +${result.sameLevelLinksAdded} same-level stair, +${result.crossLevelLinksAdded} cross-level stair, +${result.isolatedLinksAdded} isolated-node links`,
    );
  }

  console.log("---");
  console.log(`Changed files: ${changedFiles}`);
  console.log(`Same-level stair links added: ${totalSameLevelLinks}`);
  console.log(`Cross-level stair links added: ${totalCrossLevelLinks}`);
  console.log(`Isolated-node links added: ${totalIsolatedLinks}`);
}

main();
