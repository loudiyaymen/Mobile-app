const fs = require("fs");
const path = require("path");

const GRAPH_DIR = path.join(
  __dirname,
  "..",
  "src",
  "assets",
  "building_graphs",
);

function graphPath(code) {
  return path.join(GRAPH_DIR, `building_${code}_unified.json`);
}

function readGraph(code) {
  return JSON.parse(fs.readFileSync(graphPath(code), "utf8"));
}

function writeGraph(code, graph) {
  fs.writeFileSync(
    graphPath(code),
    `${JSON.stringify(graph, null, 2)}\n`,
    "utf8",
  );
}

function ensureNeighbor(graph, fromId, toId, weight = 1) {
  const node = graph[fromId];
  if (!node) return false;
  if (!node.neighbors || typeof node.neighbors !== "object")
    node.neighbors = {};
  const before = node.neighbors[toId];
  node.neighbors[toId] = weight;
  return before !== weight;
}

const links = [
  {
    step: 1,
    note: "CA far-right L2 entrance -> B far top-left L2 entrance",
    from: { building: "CA", id: "{739a73fe-0973-47e5-9acc-df1ab4d4d8b1}_L2" },
    to: { building: "B", id: "{09946d6a-fb6c-4414-815c-a1054c6a6765}" },
  },
  {
    step: 2,
    note: "B top-right L2 entrance -> A bottom entrance",
    from: { building: "B", id: "{f06c8651-4a9e-49d6-a9ac-13365b485b27}" },
    to: { building: "A", id: "{20aa8738-2471-4e3c-bc53-31bad5be4798}" },
  },
  {
    step: 3,
    note: "B bottom-right L2 entrance -> C bottom-left entrance",
    from: { building: "B", id: "{aaa659dc-07b0-4d79-93fe-8d0efe360a9a}" },
    to: { building: "C", id: "{151bde12-548b-494b-86c1-4f112eb05263}_L1" },
  },
  {
    step: 4,
    note: "C bottom-right entrance -> J top-left L2 entrance cluster",
    from: { building: "C", id: "{0b8518f9-b037-4048-837e-7013365c4059}_L1" },
    to: { building: "J", id: "{ad47e639-5ee6-4ad2-8c54-35293d1dc55d}" },
  },
  {
    step: 5,
    note: "J top-right L2 entrance -> N left entrance",
    from: { building: "J", id: "{dd2b86f9-4823-460e-b9ef-15c120af296e}" },
    to: { building: "N", id: "{4c5e3c67-6124-45ab-b99f-41084b3e1c11}" },
  },
  {
    step: 6,
    note: "J bottom-right L2 entrance -> T top-left entrance",
    from: { building: "J", id: "{dd2b86f9-4823-460e-b9ef-15c120af296e}" },
    to: { building: "T", id: "{8d424382-46a0-4d87-af46-86abad2aca7c}" },
  },
  {
    step: 7,
    note: "N bottom-right entrance -> T top-right L2 entrance",
    from: { building: "N", id: "{fcb8885d-99e5-425d-8787-67feb04aba00}" },
    to: { building: "T", id: "{2af62993-3cab-4b44-be8a-50f74605a987}" },
  },
];

const loaded = new Map();
for (const code of ["CA", "B", "A", "C", "J", "N", "T"]) {
  loaded.set(code, readGraph(code));
}

let changed = 0;
for (const link of links) {
  const fromGraph = loaded.get(link.from.building);
  const toGraph = loaded.get(link.to.building);

  if (!fromGraph[link.from.id]) {
    console.warn(
      `Step ${link.step} skipped: source missing ${link.from.id} in ${link.from.building}`,
    );
    continue;
  }
  if (!toGraph[link.to.id]) {
    console.warn(
      `Step ${link.step} skipped: target missing ${link.to.id} in ${link.to.building}`,
    );
    continue;
  }

  const a = ensureNeighbor(fromGraph, link.from.id, link.to.id, 1);
  const b = ensureNeighbor(toGraph, link.to.id, link.from.id, 1);

  if (a || b) changed += 1;

  console.log(
    `Step ${link.step}: ${link.note} -> ${a || b ? "linked" : "already linked"}`,
  );
}

for (const [code, graph] of loaded.entries()) {
  writeGraph(code, graph);
}

console.log(`Completed. Link operations changed: ${changed}`);
