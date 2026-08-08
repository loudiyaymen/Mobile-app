const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
const graph = {};

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const [id, node] of Object.entries(content)) {
    graph[id] = node;
  }
}

function shortestPath(graphData, start, end) {
  if (!graphData[start] || !graphData[end]) return [];

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graphData));

  for (const id of unvisited) distances[id] = Infinity;
  distances[start] = 0;

  while (unvisited.size > 0) {
    let current = null;

    for (const id of unvisited) {
      if (current === null || distances[id] < distances[current]) {
        current = id;
      }
    }

    if (current === null) break;
    if (distances[current] === Infinity) break;
    if (current === end) break;

    unvisited.delete(current);

    for (const [neighborId, weight] of Object.entries(
      graphData[current].neighbors || {},
    )) {
      if (!graphData[neighborId] || !unvisited.has(neighborId)) continue;
      const candidate = distances[current] + Number(weight);
      if (candidate < distances[neighborId]) {
        distances[neighborId] = candidate;
        previous[neighborId] = current;
      }
    }
  }

  const pathIds = [];
  let cursor = end;
  while (cursor) {
    pathIds.unshift(cursor);
    if (cursor === start) break;
    cursor = previous[cursor];
  }

  return pathIds[0] === start ? pathIds : [];
}

const pairs = [
  [
    "{f06c8651-4a9e-49d6-a9ac-13365b485b27}",
    "{20aa8738-2471-4e3c-bc53-31bad5be4798}",
    "B->A",
  ],
  [
    "{dd2b86f9-4823-460e-b9ef-15c120af296e}",
    "{4c5e3c67-6124-45ab-b99f-41084b3e1c11}",
    "J->N",
  ],
  [
    "{fcb8885d-99e5-425d-8787-67feb04aba00}",
    "{2af62993-3cab-4b44-be8a-50f74605a987}",
    "N->T",
  ],
  [
    "{31d93104-05d1-450b-8510-81c5b995bd52}",
    "{42df2b9d-f256-4e47-a771-638d58e22baf}_L1",
    "A->C",
  ],
  [
    "{cfd9ed65-ce50-466e-83e8-0d2e0918f9c3}",
    "{ad47e639-5ee6-4ad2-8c54-35293d1dc55d}",
    "N->J",
  ],
];

const results = pairs.map(([from, to, label]) => {
  const route = shortestPath(graph, from, to);
  return { label, found: route.length > 0, pathLength: route.length };
});

console.log(
  JSON.stringify(
    {
      unifiedNodeCount: Object.keys(graph).length,
      results,
      allFound: results.every((r) => r.found),
    },
    null,
    2,
  ),
);
