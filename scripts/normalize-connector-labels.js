const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

function shouldNormalize(node) {
  const label = String(node?.label || "").toLowerCase();
  return /to buildings?|to building|hallway to buildings?|hallway to building|bridge to building/.test(
    label,
  );
}

function nextLabel(node) {
  const currentLabel = String(node?.label || "").toLowerCase();
  if (/\bexit\b/.test(currentLabel)) return "exit";
  return "entrance";
}

let updated = 0;

for (const fileName of files) {
  const filePath = path.join(dir, fileName);
  const graph = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;

  for (const node of Object.values(graph)) {
    if (!shouldNormalize(node)) continue;
    const desired = nextLabel(node);
    if (node.label !== desired) {
      node.label = desired;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
    updated += 1;
  }
}

console.log(`Updated connector labels in ${updated} files.`);
