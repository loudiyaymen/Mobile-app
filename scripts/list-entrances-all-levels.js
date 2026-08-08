const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");
const buildings = ["CA", "B", "A", "C", "J", "N", "T"];

function isEntranceLike(node) {
  const type = String(node?.type || "").toLowerCase();
  const label = String(node?.label || "").toLowerCase();
  return (
    type === "entrance" ||
    /entrance|exit|bridge|to building|to buildings/.test(label)
  );
}

for (const code of buildings) {
  const fileName = `building_${code}_unified.json`;
  const filePath = path.join(dir, fileName);
  const graph = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const rows = [];
  for (const [id, node] of Object.entries(graph)) {
    if (!isEntranceLike(node)) continue;
    rows.push({
      id,
      type: String(node.type || ""),
      label: String(node.label || ""),
      level: Number.isFinite(Number(node.level)) ? Number(node.level) : null,
      x: Number(node.x),
      y: Number(node.y),
      degree: Object.keys(node.neighbors || {}).length,
    });
  }

  rows.sort((a, b) => a.x - b.x || a.y - b.y);

  console.log(`\n${fileName} (entrance-like nodes: ${rows.length})`);
  for (const r of rows) {
    const levelText = r.level === null ? "?" : String(r.level);
    console.log(
      `${r.id} | L${levelText} | ${r.type} | ${r.label} | x=${r.x.toFixed(2)} y=${r.y.toFixed(2)} | deg=${r.degree}`,
    );
  }
}
