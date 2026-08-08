const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");

const checks = [
  [
    "N",
    "{fcb8885d-99e5-425d-8787-67feb04aba00}",
    "T",
    "{2af62993-3cab-4b44-be8a-50f74605a987}",
    "N bottom -> T top-right",
  ],
  [
    "N",
    "{cfd9ed65-ce50-466e-83e8-0d2e0918f9c3}",
    "J",
    "{ad47e639-5ee6-4ad2-8c54-35293d1dc55d}",
    "N top-left -> J top-right",
  ],
  [
    "D",
    "{c0afc4bb-8e1a-4eb9-a03d-a28c7f71fd87}",
    "J",
    "{46b803f3-5f24-4858-837a-154d42e1e2f6}",
    "D bottom -> J top-left",
  ],
  [
    "E",
    "{3416f62d-0b29-40db-91f7-16ad98760bc1}",
    "D",
    "{a047621a-a269-4e4d-9a15-6ca4dc558bfc}",
    "E left -> D top-right",
  ],
  [
    "E",
    "{3416f62d-0b29-40db-91f7-16ad98760bc1}",
    "H",
    "{ac84649e-16ac-4a43-8b89-91aca6fda467}_L1",
    "E left -> H bottom-right",
  ],
  [
    "H",
    "{4fe5ddcb-5096-42e7-9f9f-655f1acbae35}_L1",
    "A",
    "{258c8517-be28-4e85-b37e-21dfaebd24e0}",
    "H bottom-left -> A mid-right",
  ],
  [
    "D",
    "{e5ca75db-cf31-4b70-bcce-8038e27867c7}",
    "A",
    "{258c8517-be28-4e85-b37e-21dfaebd24e0}",
    "D top-left -> A mid-right",
  ],
  [
    "A",
    "{31d93104-05d1-450b-8510-81c5b995bd52}",
    "C",
    "{42df2b9d-f256-4e47-a771-638d58e22baf}_L1",
    "A bottom-right -> C top-right",
  ],
  [
    "C",
    "{a253dcd6-ef0d-412a-b3e4-b4cf8ffbb86f}_L1",
    "B",
    "{aaa659dc-07b0-4d79-93fe-8d0efe360a9a}",
    "C bottom-left -> B bottom-right",
  ],
  [
    "B",
    "{f06c8651-4a9e-49d6-a9ac-13365b485b27}",
    "A",
    "{20aa8738-2471-4e3c-bc53-31bad5be4798}",
    "B top-right -> A bottom-left",
  ],
];

function readGraph(code) {
  return JSON.parse(
    fs.readFileSync(path.join(dir, `building_${code}_unified.json`), "utf8"),
  );
}

const cache = {};
let allOk = true;

for (const [aCode, aId, bCode, bId, description] of checks) {
  cache[aCode] = cache[aCode] || readGraph(aCode);
  cache[bCode] = cache[bCode] || readGraph(bCode);

  const forward = cache[aCode][aId]?.neighbors?.[bId];
  const reverse = cache[bCode][bId]?.neighbors?.[aId];
  const ok = forward === 1 && reverse === 1;
  if (!ok) allOk = false;

  console.log(
    `${ok ? "OK" : "MISSING"} | ${description} | forward=${forward} reverse=${reverse}`,
  );
}

console.log(`\nAll checks passed: ${allOk}`);
