export const campusGraph = {
  Entrance_TL: {
    name: "Entrance B",
    x: 10,
    y: 0,
    neighbors: { HW_W_T119: 20 },
  },
  HW_W_T119: {
    name: "corridor passing T119",
    x: 10,
    y: 20,
    neighbors: { Entrance_TL: 20, T119: 10, HW_1_West_Junction: 15 },
  },
  T119: { name: "Room T119", x: 0, y: 20, neighbors: { HW_W_T119: 10 } },
  HW_1_West_Junction: {
    name: "the first hallway junction",
    x: 10,
    y: 35,
    neighbors: { HW_W_T119: 15, HW_1_T120: 20, HW_W_T117: 15 },
  },
  HW_W_T117: {
    name: "corridor passing T117",
    x: 10,
    y: 50,
    neighbors: { HW_1_West_Junction: 15, T117: 10, HW_2_West_Junction: 15 },
  },
  T117: { name: "Room T117", x: 0, y: 50, neighbors: { HW_W_T117: 10 } },
  HW_2_West_Junction: {
    name: "the second hallway junction",
    x: 10,
    y: 65,
    neighbors: { HW_W_T117: 15, HW_2_T118: 20, HW_W_T116: 15 },
  },
  HW_W_T116: {
    name: "corridor passing T116",
    x: 10,
    y: 80,
    neighbors: { HW_2_West_Junction: 15, T116: 10, Entrance_BL: 10 },
  },
  T116: { name: "Room T116", x: 0, y: 80, neighbors: { HW_W_T116: 10 } },
  Entrance_BL: {
    name: "Bottom Left Entrance",
    x: 10,
    y: 90,
    neighbors: { HW_W_T116: 10 },
  },

  HW_1_T120: {
    name: "hallway outside T120",
    x: 30,
    y: 35,
    neighbors: {
      HW_1_West_Junction: 20,
      T120: 10,
      Washrooms: 10,
      HW_1_T123: 20,
    },
  },
  T120: { name: "Room T120", x: 30, y: 45, neighbors: { HW_1_T120: 10 } },
  Washrooms: { name: "Washrooms", x: 30, y: 25, neighbors: { HW_1_T120: 10 } },
  HW_1_T123: {
    name: "hallway outside T123",
    x: 50,
    y: 35,
    neighbors: { HW_1_T120: 20, T123: 10, T125: 10, HW_1_T126: 20 },
  },
  T123: { name: "Room T123", x: 50, y: 45, neighbors: { HW_1_T123: 10 } },
  T125: { name: "Room T125", x: 50, y: 25, neighbors: { HW_1_T123: 10 } },
  HW_1_T126: {
    name: "hallway outside T126",
    x: 70,
    y: 35,
    neighbors: { HW_1_T123: 20, T126: 10, HW_1_T127: 20 },
  },
  T126: { name: "Room T126", x: 70, y: 45, neighbors: { HW_1_T126: 10 } },
  HW_1_T127: {
    name: "hallway outside T127",
    x: 90,
    y: 35,
    neighbors: { HW_1_T126: 20, T127: 10, T140: 10, HW_1_East_Junction: 10 },
  },
  T127: { name: "Room T127", x: 90, y: 45, neighbors: { HW_1_T127: 10 } },
  T140: { name: "Room T140", x: 90, y: 25, neighbors: { HW_1_T127: 10 } },
  HW_1_East_Junction: {
    name: "East Corridor (Upper)",
    x: 100,
    y: 35,
    neighbors: { HW_1_T127: 10, T129_A: 10, HW_2_East_Junction: 30 },
  },
  T129_A: {
    name: "Room T129-A",
    x: 100,
    y: 25,
    neighbors: { HW_1_East_Junction: 10 },
  },

  HW_2_T118: {
    name: "hallway outside T118",
    x: 30,
    y: 65,
    neighbors: { HW_2_West_Junction: 20, T118: 10, T115: 10, HW_2_T113: 20 },
  },
  T118: { name: "Room T118", x: 30, y: 55, neighbors: { HW_2_T118: 10 } },
  T115: { name: "Room T115", x: 30, y: 75, neighbors: { HW_2_T118: 10 } },
  HW_2_T113: {
    name: "hallway outside T113",
    x: 50,
    y: 65,
    neighbors: { HW_2_T118: 20, T113: 10, T114: 10, HW_2_T110: 20 },
  },
  T113: { name: "Room T113", x: 50, y: 55, neighbors: { HW_2_T113: 10 } },
  T114: { name: "Room T114", x: 50, y: 75, neighbors: { HW_2_T113: 10 } },
  HW_2_T110: {
    name: "hallway outside T110",
    x: 70,
    y: 65,
    neighbors: { HW_2_T113: 20, T110: 10, T111: 10, HW_2_T108: 20 },
  },
  T110: { name: "Room T110", x: 70, y: 55, neighbors: { HW_2_T110: 10 } },
  T111: { name: "Room T111", x: 70, y: 75, neighbors: { HW_2_T110: 10 } },
  HW_2_T108: {
    name: "hallway outside T108",
    x: 90,
    y: 65,
    neighbors: { HW_2_T110: 20, T108: 10, T106: 10, HW_2_East_Junction: 10 },
  },
  T108: { name: "Room T108", x: 90, y: 55, neighbors: { HW_2_T108: 10 } },
  T106: { name: "Room T106", x: 90, y: 75, neighbors: { HW_2_T108: 10 } },

  HW_2_East_Junction: {
    name: "East Corridor (Mid)",
    x: 100,
    y: 65,
    neighbors: {
      HW_1_East_Junction: 30,
      HW_2_T108: 10,
      T102A: 10,
      HW_East_Lower: 15,
    },
  },
  T102A: {
    name: "Room T102A",
    x: 110,
    y: 65,
    neighbors: { HW_2_East_Junction: 10 },
  },
  HW_East_Lower: {
    name: "East Corridor (Lower)",
    x: 100,
    y: 80,
    neighbors: { HW_2_East_Junction: 15, T102D: 10 },
  },
  T102D: {
    name: "Room T102D",
    x: 110,
    y: 80,
    neighbors: { HW_East_Lower: 10 },
  },
};

export function findShortestPath(graph, startNode, endNode) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (let node in graph) distances[node] = Infinity;
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    let currNode = null;
    for (let node of unvisited) {
      if (currNode === null || distances[node] < distances[currNode])
        currNode = node;
    }
    if (distances[currNode] === Infinity || currNode === endNode) break;
    unvisited.delete(currNode);

    for (let neighbor in graph[currNode].neighbors) {
      let alt = distances[currNode] + graph[currNode].neighbors[neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currNode;
      }
    }
  }

  const path = [];
  let current = endNode;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }
  return path;
}

export function generateInstructions(graph, path) {
  if (path.length < 2) return ["You are already at your destination."];

  const instructions = [];
  let dirX = graph[path[1]].x - graph[path[0]].x;
  let dirY = graph[path[1]].y - graph[path[0]].y;

  instructions.push(`Start at ${graph[path[0]].name} and proceed forward.`);

  for (let i = 1; i < path.length - 1; i++) {
    const prevNode = graph[path[i]];
    const nextNode = graph[path[i + 1]];

    const nextDirX = nextNode.x - prevNode.x;
    const nextDirY = nextNode.y - prevNode.y;

    const crossProduct = dirX * nextDirY - dirY * nextDirX;

    if (crossProduct > 0) {
      instructions.push(`Turn right at ${prevNode.name}.`);
    } else if (crossProduct < 0) {
      if (prevNode.name.includes("junction")) {
        instructions.push(`Turn left at ${prevNode.name}.`);
      } else {
        instructions.push(`Turn left into ${nextNode.name}.`);
      }
    } else {
      let cleanName = prevNode.name
        .replace("corridor passing ", "")
        .replace("hallway outside ", "");
      instructions.push(`Continue straight, passing ${cleanName}.`);
    }

    dirX = nextDirX;
    dirY = nextDirY;
  }

  instructions.push(
    `You have arrived at ${graph[path[path.length - 1]].name}.`,
  );
  return instructions;
}

export const locationList = Object.keys(campusGraph)
  .filter(
    (key) =>
      campusGraph[key].name.includes("Room") ||
      campusGraph[key].name.includes("Entrance") ||
      campusGraph[key].name.includes("Washroom"),
  )
  .map((key) => ({ id: key, name: campusGraph[key].name }));
