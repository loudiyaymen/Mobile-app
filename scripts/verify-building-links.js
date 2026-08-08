const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), "src/assets/building_graphs");

const checks = [
  [
    "CA",
    "{739a73fe-0973-47e5-9acc-df1ab4d4d8b1}_L2",
    "B",
    "{09946d6a-fb6c-4414-815c-a1054c6a6765}",
  ],
  [
    "B",
    "{f06c8651-4a9e-49d6-a9ac-13365b485b27}",
    "A",
    "{20aa8738-2471-4e3c-bc53-31bad5be4798}",
  ],
  [
    "B",
    "{aaa659dc-07b0-4d79-93fe-8d0efe360a9a}",
    "C",
    "{151bde12-548b-494b-86c1-4f112eb05263}_L1",
  ],
  [
    "C",
    "{0b8518f9-b037-4048-837e-7013365c4059}_L1",
    "J",
    "{ad47e639-5ee6-4ad2-8c54-35293d1dc55d}",
  ],
  [
    "J",
    "{dd2b86f9-4823-460e-b9ef-15c120af296e}",
    "N",
    "{4c5e3c67-6124-45ab-b99f-41084b3e1c11}",
  ],
  [
    "J",
    "{dd2b86f9-4823-460e-b9ef-15c120af296e}",
    "T",
    "{8d424382-46a0-4d87-af46-86abad2aca7c}",
  ],
  [
    "N",
    "{fcb8885d-99e5-425d-8787-67feb04aba00}",
    "T",
    "{2af62993-3cab-4b44-be8a-50f74605a987}",
  ],
];

function readGraph(code) {
  const filePath = path.join(dir, `building_${code}_unified.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const cache = {};
for (const [aCode, aId, bCode, bId] of checks) {
  cache[aCode] = cache[aCode] || readGraph(aCode);
  cache[bCode] = cache[bCode] || readGraph(bCode);

  const forward = cache[aCode][aId]?.neighbors?.[bId];
  const reverse = cache[bCode][bId]?.neighbors?.[aId];
  const ok = forward === 1 && reverse === 1;

  console.log(
    `${ok ? "OK" : "MISSING"} | ${aCode}:${aId} <-> ${bCode}:${bId} | forward=${forward} reverse=${reverse}`,
  );
}
