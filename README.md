# Smart Route Finder
### Shortest Path Analysis using Dijkstra's Algorithm

> **Course:** Discrete Mathematics and Graph Theory (MAT2002)  
> **School:** School of Computer Science & Engineering  
> **Project Type:** Academic College Web Application  

---

## 📌 Project Overview

**Smart Route Finder** is a web-based educational application designed for the college subject **Discrete Mathematics and Graph Theory (MAT2002)**. It computationally models a **weighted directed graph** and calculates the minimum traversal cost (shortest path) between a source and destination vertex using **Dijkstra's Algorithm**.

The application is built purely on frontend technologies to serve as a clean, interactive mathematical demonstration for academic viva evaluation.

---

## 🎯 Problem Statement

Given a directed graph $G = (V, E)$ with non-negative edge weights $w(u, v) \ge 0$, a designated source vertex $s \in V$, and a destination vertex $d \in V$, determine:
1. The shortest distance (minimum total path weight) from $s$ to $d$.
2. The exact sequence of vertices forming the optimal path.

---

## 🚀 Objectives

- **Graph Representation**: Represent directed vertices and weighted edges computationally in frontend state.
- **Shortest Path Computation**: Implement Dijkstra's algorithm manually without third-party pathfinding libraries.
- **Adjacency Matrix Generation**: Dynamically construct and update the $V \times V$ weighted adjacency matrix $A_{ij}$.
- **Step Trace Visualization**: Log each step of vertex selection and distance relaxation for viva explanation.
- **Interactive Visualization**: Render directed graphs using SVG nodes and arrows with drag-and-drop capabilities.

---

## ✨ Features

- ➕ **Dynamic Graph Controls**: Add custom vertices and directed weighted edges with inline validation.
- 🎨 **Interactive SVG Canvas**: Visualizes vertices as draggable nodes and directed edges with curved arrowheads and edge weight labels.
- 📍 **Path Highlighting**: Visually highlights the optimal path in emerald green while subduing non-path elements.
- 📊 **Dynamic Adjacency Matrix**: Displays the $V \times V$ weighted directed matrix ($0$ for self, edge weight for directed link, $\infty$ for no link).
- 🔍 **Step-by-Step Algorithm Trace**: Shows a compact trace table detailing current vertex selections and distance relaxations.
- 🔄 **Preset Demo & Reset**: One-click restoration of the default MAT2002 syllabus demo graph.
- 🛡️ **Comprehensive Validation**: Prevents duplicate vertices, duplicate directed edges, negative weights, zero weights, and self-loops.

---

## 🧮 Mathematical Concepts

- **Graph $G = (V, E)$**: A set of vertices $V$ connected by directed edges $E$.
- **Directed Graph (Digraph)**: Edges have a defined direction ($u \to v$).
- **Weighted Graph**: Each edge $(u, v)$ carries a numeric cost $w(u, v) > 0$.
- **Adjacency Matrix ($A_{ij}$)**:
  $$A_{ij} = \begin{cases} 0 & \text{if } i = j \\ w(i, j) & \text{if } (i, j) \in E \\ \infty & \text{if } (i, j) \notin E \end{cases}$$
- **Distance Relaxation**: The core triangular inequality update:
  $$\text{If } d[u] + w(u, v) < d[v] \implies d[v] = d[u] + w(u, v), \quad \text{prev}[v] = u$$

---

## ⚙️ Algorithm & Time Complexity

The application features a manual implementation of **Dijkstra's Algorithm**:

1. **Initialization**: Set $d[s] = 0$ for source $s$ and $d[v] = \infty$ for all other vertices $v \ne s$. Mark all vertices as unvisited ($Q = V$).
2. **Vertex Selection**: Extract unvisited vertex $u \in Q$ with minimum tentative distance $d[u]$.
3. **Distance Relaxation**: For each outgoing neighbor $v$ of $u$ remaining in $Q$:
   $$\text{If } d[u] + w(u, v) < d[v] \implies d[v] = d[u] + w(u, v), \text{ prev}[v] = u$$
4. **Termination**: Repeat until target $d$ is processed or all reachable vertices in $Q$ are visited.
5. **Path Reconstruction**: Trace backward from $d$ to $s$ using the `prev` pointer map.

### Time & Space Complexity
- **Time Complexity**: $\mathcal{O}(V^2)$ using a linear array scan for minimum distance selection (suitable for simple educational implementations).
- **Space Complexity**: $\mathcal{O}(V + E)$ for adjacency list storage and distance maps.

---

## 💻 Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)
- **Visualization**: HTML5 Inline SVG

---

## 📁 Project Structure

```
smart-route-finder/
├── src/
│   ├── algorithms/
│   │   └── dijkstra.js           # Manual Dijkstra algorithm implementation
│   ├── components/
│   │   ├── Header.jsx            # Course banner & badge header
│   │   ├── GraphControls.jsx     # Vertex/Edge addition & reset controls
│   │   ├── GraphView.jsx         # Interactive SVG graph canvas with drag & drop
│   │   ├── ShortestPath.jsx      # Source/Destination select & result card
│   │   ├── AlgorithmTrace.jsx    # Viva step trace table component
│   │   ├── AdjacencyMatrix.jsx   # Dynamic weighted adjacency matrix
│   │   ├── Theory.jsx            # Mathematical background & time complexity
│   │   ├── Team.jsx              # Project team member details
│   │   └── Footer.jsx            # Page footer
│   ├── App.jsx                   # Root application state & layout manager
│   ├── index.css                 # Base Tailwind CSS styles
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd smart-route-finder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📖 Usage Instructions

1. **Default Demo**: Upon opening, the app automatically loads a 5-vertex demo graph with Source `A` and Destination `E`. Click **"Find Shortest Path"** to view the result.
2. **Add Vertices**: Enter a vertex label (e.g., `Library`, `Gate`, `F`) in Section A and click **"+ Add Vertex"**.
3. **Add Directed Edges**: Select From and To vertices, specify a positive numeric weight, and click **"+ Add Directed Edge"**.
4. **Rearrange Graph**: Drag any node on the SVG canvas to arrange the visualization.
5. **View Adjacency Matrix & Trace**: Expand the **Adjacency Matrix** and **How Dijkstra Solved It** cards to inspect mathematical matrices and relaxation steps.

---

## 📊 Sample Demonstration

### Default Demo Graph Setup
- **Vertices**: `A, B, C, D, E`
- **Edges**: 
  - $A \to B = 4$, $A \to C = 2$
  - $C \to B = 1$, $B \to D = 5$, $C \to D = 8$
  - $D \to E = 2$, $B \to E = 10$
- **Source**: `A` | **Destination**: `E`

### Algorithm Execution Output
- **Shortest Path**: `A → C → B → D → E`
- **Total Distance**: `10`
- **Relaxation Trace**:
  - Step 1 ($A$): $B=4, C=2$
  - Step 2 ($C$): $B=3, D=10$
  - Step 3 ($B$): $D=8, E=13$
  - Step 4 ($D$): $E=10$

---

## 👥 Project Team

| Name | Registration ID |
| :--- | :--- |
| **Yash Janiyani** | `24BCE11394` |
| **Himanshu Vishwakarma** | `25MIM10119` |
| **Prashant Raj** | `24BCE11371` |
| **Abhishek** | `24BCE11402` |
| **Mradul Agrawal** | `24BCE11403` |
| **Devraj Srivastava** | `24BCE10050` |

- **Course**: Discrete Mathematics and Graph Theory
- **Course Code**: MAT2002

---

## 🎓 Academic Context

This project fulfills the practical component of **MAT2002 (Discrete Mathematics and Graph Theory)** syllabus topic: *"Shortest Path Algorithm for Directed Graphs"*. It demonstrates how abstract graph theory data structures (adjacency matrices and lists) translate directly into computer algorithm implementations.

---

## ⚠️ Limitations

- Educational graph analysis tool designed for finite discrete graphs (not real-time GPS navigation).
- All edge weights must be strictly positive ($w > 0$).
- Frontend state-based execution without persistent backend database storage.

---

## 🔭 Future Scope

- Support for undirected graph toggling.
- Step-by-step animation speed controls for classroom presentations.
- Support for Bellman-Ford algorithm to handle graphs with negative edge weights.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
