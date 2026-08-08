const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .sort();

function isStair(node) {
  const type = String(node?.type || "").toLowerCase();
  const label = String(node?.label || "").toLowerCase();
  if (type === "stairs") return true;
  if (
    type === "elevator" ||
    type === "hallway_node" ||
    type === "intersection"
  ) {
    return false;
  }
  return /\bstair/.test(label);
}

function levelOf(node) {
  const levelValue = Number(node?.level);
  if (Number.isFinite(levelValue)) return levelValue;
  const levelMatch = String(node?.label || "").match(/level\s*(\d+)/i);
  return levelMatch ? Number(levelMatch[1]) : null;
}

let total = 0;

for (const fileName of files) {
  const graph = JSON.parse(fs.readFileSync(path.join(dir, fileName), "utf8"));
  const missing = [];

  for (const [id, node] of Object.entries(graph)) {
    if (!isStair(node)) continue;

    const hasStairNeighbor = Object.keys(node.neighbors || {}).some(
      (neighborId) => graph[neighborId] && isStair(graph[neighborId]),
    );

    if (!hasStairNeighbor) {
      missing.push({
        id,
        label: String(node.label || ""),
        level: levelOf(node),
      });
    }
  }

  if (missing.length > 0) {
    total += missing.length;
    console.log(
      `\n${fileName}: ${missing.length} stairs without stair neighbor`,
    );
    for (const item of missing.slice(0, 10)) {
      console.log(`  - [L${item.level}] ${item.label} :: ${item.id}`);
    }
  }
}

console.log(`\nTOTAL stairs without stair neighbor: ${total}`);
