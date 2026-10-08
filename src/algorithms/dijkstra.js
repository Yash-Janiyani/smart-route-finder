/**
 * Dijkstra's Shortest Path Algorithm (Manual Implementation)
 * Course: Discrete Mathematics and Graph Theory (MAT2002)
 *
 * This implementation strictly adheres to the mathematical step-by-step
 * relaxation method for weighted directed graphs with non-negative edge weights.
 */

export function runDijkstra(vertices, edges, source, destination) {
  // Input Validation
  if (!vertices || vertices.length === 0) {
    return {
      error: "Graph contains no vertices.",
      path: [],
      totalDistance: Infinity,
      steps: [],
    };
  }

  if (!source || !destination) {
    return {
      error: "Please select both Source and Destination vertices.",
      path: [],
      totalDistance: Infinity,
      steps: [],
    };
  }

  if (!vertices.includes(source) || !vertices.includes(destination)) {
    return {
      error: "Selected vertex does not exist in the graph.",
      path: [],
      totalDistance: Infinity,
      steps: [],
    };
  }

  // Edge Case: Source equals Destination
  if (source === destination) {
    return {
      isSame: true,
      path: [source],
      totalDistance: 0,
      steps: [
        {
          step: 1,
          currentVertex: source,
          updatedDistances: "Source and destination are the same (Distance = 0).",
          distances: { [source]: 0 },
          unvisited: [],
        },
      ],
      distances: { [source]: 0 },
      previous: { [source]: null },
    };
  }

  // Adjacency List for outgoing edges lookup
  const adj = {};
  vertices.forEach((v) => {
    adj[v] = [];
  });

  edges.forEach(({ from, to, weight }) => {
    if (adj[from]) {
      adj[from].push({ to, weight: Number(weight) });
    }
  });

  // Initialization
  const distances = {};
  const previous = {};
  const unvisited = new Set(vertices);

  vertices.forEach((v) => {
    distances[v] = Infinity;
    previous[v] = null;
  });

  distances[source] = 0;

  const steps = [];
  let stepNumber = 0;

  // Algorithm Main Loop
  while (unvisited.size > 0) {
    // Select unvisited vertex with minimum distance
    let current = null;
    let minDistance = Infinity;

    for (const v of unvisited) {
      if (distances[v] < minDistance) {
        minDistance = distances[v];
        current = v;
      }
    }

    // If minimum distance is Infinity, remaining vertices are unreachable from source
    if (current === null || minDistance === Infinity) {
      break;
    }

    // Mark current vertex as visited
    unvisited.delete(current);
    stepNumber++;

    const updatedLabels = [];

    // Examine outgoing edges and relax neighbor distances
    const outgoing = adj[current] || [];
    for (const edge of outgoing) {
      const { to, weight } = edge;
      if (unvisited.has(to)) {
        const newDist = distances[current] + weight;
        if (newDist < distances[to]) {
          distances[to] = newDist;
          previous[to] = current;
          updatedLabels.push(`${to} = ${newDist}`);
        }
      }
    }

    steps.push({
      step: stepNumber,
      currentVertex: current,
      updatedDistances: updatedLabels.length > 0 ? updatedLabels.join(", ") : "No distance updates",
      distances: { ...distances },
      unvisited: Array.from(unvisited),
    });

    // Destination reached
    if (current === destination) {
      break;
    }
  }

  // Check if destination was reached
  if (distances[destination] === Infinity) {
    return {
      unreachable: true,
      path: [],
      totalDistance: Infinity,
      steps,
      distances,
      previous,
    };
  }

  // Reconstruct Shortest Path using previous pointer array
  const path = [];
  let curr = destination;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    path,
    totalDistance: distances[destination],
    steps,
    distances,
    previous,
    unreachable: false,
    isSame: false,
  };
}
