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
  const prev = node.neighbors[toId];
  node.neighbors[toId] = weight;
  return prev !== weight;
}

const links = [
  {
    step: 1,
    note: "N bottom entrance/exit -> T top-right entrance/exit",
    from: { building: "N", id: "{fcb8885d-99e5-425d-8787-67feb04aba00}" },
    to: { building: "T", id: "{2af62993-3cab-4b44-be8a-50f74605a987}" },
  },
  {
    step: 2,
    note: "N top-left entrance/exit -> J top-right entrance/exit",
    from: { building: "N", id: "{cfd9ed65-ce50-466e-83e8-0d2e0918f9c3}" },
    to: { building: "J", id: "{ad47e639-5ee6-4ad2-8c54-35293d1dc55d}" },
  },
  {
    step: 3,
    note: "D bottom entrance/exit -> J top-left entrance/exit",
    from: { building: "D", id: "{c0afc4bb-8e1a-4eb9-a03d-a28c7f71fd87}" },
    to: { building: "J", id: "{46b803f3-5f24-4858-837a-154d42e1e2f6}" },
  },
  {
    step: 4,
    note: "E left entrance/exit -> D top-right entrance/exit",
    from: { building: "E", id: "{3416f62d-0b29-40db-91f7-16ad98760bc1}" },
    to: { building: "D", id: "{a047621a-a269-4e4d-9a15-6ca4dc558bfc}" },
  },
  {
    step: 5,
    note: "E left entrance/exit -> H bottom-right entrance/exit",
    from: { building: "E", id: "{3416f62d-0b29-40db-91f7-16ad98760bc1}" },
    to: { building: "H", id: "{ac84649e-16ac-4a43-8b89-91aca6fda467}_L1" },
  },
  {
    step: 6,
    note: "H bottom-left entrance/exit -> A mid-right entrance/exit",
    from: { building: "H", id: "{4fe5ddcb-5096-42e7-9f9f-655f1acbae35}_L1" },
    to: { building: "A", id: "{258c8517-be28-4e85-b37e-21dfaebd24e0}" },
  },
  {
    step: 7,
    note: "D top-left entrance/exit -> A mid-right entrance/exit",
    from: { building: "D", id: "{e5ca75db-cf31-4b70-bcce-8038e27867c7}" },
    to: { building: "A", id: "{258c8517-be28-4e85-b37e-21dfaebd24e0}" },
  },
  {
    step: 8,
    note: "A bottom-right entrance/exit -> C top-right entrance/exit",
    from: { building: "A", id: "{31d93104-05d1-450b-8510-81c5b995bd52}" },
    to: { building: "C", id: "{42df2b9d-f256-4e47-a771-638d58e22baf}_L1" },
  },
  {
    step: 9,
    note: "C bottom-left entrance/exit -> B bottom-right entrance/exit",
    from: { building: "C", id: "{a253dcd6-ef0d-412a-b3e4-b4cf8ffbb86f}_L1" },
    to: { building: "B", id: "{aaa659dc-07b0-4d79-93fe-8d0efe360a9a}" },
  },
  {
    step: 10,
    note: "B top-right entrance/exit -> A bottom-left entrance/exit",
    from: { building: "B", id: "{f06c8651-4a9e-49d6-a9ac-13365b485b27}" },
    to: { building: "A", id: "{20aa8738-2471-4e3c-bc53-31bad5be4798}" },
  },
];

const buildings = new Set();
for (const link of links) {
  buildings.add(link.from.building);
  buildings.add(link.to.building);
}

const graphs = new Map();
for (const code of buildings) {
  graphs.set(code, readGraph(code));
}

let changedCount = 0;
for (const link of links) {
  const fromGraph = graphs.get(link.from.building);
  const toGraph = graphs.get(link.to.building);

  if (!fromGraph[link.from.id]) {
    console.warn(
      `Step ${link.step} skipped: missing source ${link.from.building}:${link.from.id}`,
    );
    continue;
  }
  if (!toGraph[link.to.id]) {
    console.warn(
      `Step ${link.step} skipped: missing target ${link.to.building}:${link.to.id}`,
    );
    continue;
  }

  const a = ensureNeighbor(fromGraph, link.from.id, link.to.id, 1);
  const b = ensureNeighbor(toGraph, link.to.id, link.from.id, 1);
  if (a || b) changedCount += 1;

  console.log(
    `Step ${link.step}: ${link.note} -> ${a || b ? "linked" : "already linked"}`,
  );
}

for (const [code, graph] of graphs.entries()) {
  writeGraph(code, graph);
}

console.log(`Completed. Link steps changed: ${changedCount}`);
