const fs = require("fs");
const path = require("path");

const targets = [
  path.join(
    process.cwd(),
    "src/assets/building_graphs/building_C_unified.json",
  ),
  path.resolve(
    process.cwd(),
    "..",
    "admin-dashboard",
    "assets",
    "navigation_graphs",
    "building_C_unified.json",
  ),
];

function shouldNormalizeLabel(label) {
  return /hallway/i.test(String(label || ""));
}

let updatedFiles = 0;

for (const filePath of targets) {
  if (!fs.existsSync(filePath)) continue;

  const graph = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;

  for (const node of Object.values(graph)) {
    if (!shouldNormalizeLabel(node?.label)) continue;
    if (node.label !== "hallway") {
      node.label = "hallway";
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
    updatedFiles += 1;
  }
}

console.log(`Updated Building C hallway labels in ${updatedFiles} files.`);
