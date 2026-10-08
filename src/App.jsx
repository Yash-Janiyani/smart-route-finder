import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GraphControls from './components/GraphControls';
import GraphView from './components/GraphView';
import ShortestPath from './components/ShortestPath';
import AlgorithmTrace from './components/AlgorithmTrace';
import AdjacencyMatrix from './components/AdjacencyMatrix';
import Theory from './components/Theory';
import Team from './components/Team';
import Footer from './components/Footer';
import { runDijkstra } from './algorithms/dijkstra';

// Default Demo Graph data according to MAT2002 requirements
const DEFAULT_VERTICES = ['A', 'B', 'C', 'D', 'E'];

const DEFAULT_EDGES = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'C', to: 'B', weight: 1 },
  { from: 'B', to: 'D', weight: 5 },
  { from: 'C', to: 'D', weight: 8 },
  { from: 'D', to: 'E', weight: 2 },
  { from: 'B', to: 'E', weight: 10 },
];

export default function App() {
  const [vertices, setVertices] = useState(DEFAULT_VERTICES);
  const [edges, setEdges] = useState(DEFAULT_EDGES);

  const [source, setSource] = useState('A');
  const [destination, setDestination] = useState('E');

  const [pathResult, setPathResult] = useState(null);

  // Automatically execute Dijkstra when initial demo graph loads or parameters change cleanly
  const executeDijkstra = (src = source, dest = destination, vList = vertices, eList = edges) => {
    if (!src || !dest || !vList.includes(src) || !vList.includes(dest)) {
      setPathResult(null);
      return;
    }
    const result = runDijkstra(vList, eList, src, dest);
    setPathResult(result);
  };

  // Run Dijkstra on mount for default demo graph
  useEffect(() => {
    executeDijkstra('A', 'E', DEFAULT_VERTICES, DEFAULT_EDGES);
  }, []);

  // Handlers for graph mutation
  const handleAddVertex = (name) => {
    const updatedVertices = [...vertices, name];
    setVertices(updatedVertices);

    // If source or dest not selected, select automatically if convenient
    if (!source) setSource(name);
    else if (!destination && name !== source) setDestination(name);

    if (source && destination) {
      executeDijkstra(source, destination, updatedVertices, edges);
    }
  };

  const handleAddEdge = (newEdge) => {
    const updatedEdges = [...edges, newEdge];
    setEdges(updatedEdges);
    if (source && destination) {
      executeDijkstra(source, destination, vertices, updatedEdges);
    }
  };

  const handleResetDemo = () => {
    setVertices(DEFAULT_VERTICES);
    setEdges(DEFAULT_EDGES);
    setSource('A');
    setDestination('E');
    executeDijkstra('A', 'E', DEFAULT_VERTICES, DEFAULT_EDGES);
  };

  const handleClearGraph = () => {
    setVertices([]);
    setEdges([]);
    setSource('');
    setDestination('');
    setPathResult(null);
  };

  const handleRunDijkstraClick = () => {
    executeDijkstra(source, destination, vertices, edges);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Main 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Graph Controls & Shortest Path Form */}
          <div className="lg:col-span-5 space-y-6">
            <GraphControls
              vertices={vertices}
              edges={edges}
              onAddVertex={handleAddVertex}
              onAddEdge={handleAddEdge}
              onResetDemo={handleResetDemo}
              onClearGraph={handleClearGraph}
            />

            <ShortestPath
              vertices={vertices}
              source={source}
              setSource={(s) => {
                setSource(s);
                setPathResult(null);
              }}
              destination={destination}
              setDestination={(d) => {
                setDestination(d);
                setPathResult(null);
              }}
              onRunDijkstra={handleRunDijkstraClick}
              result={pathResult}
            />
          </div>

          {/* Right Column: Graph Canvas Visualization */}
          <div className="lg:col-span-7 h-full">
            <GraphView
              vertices={vertices}
              edges={edges}
              pathResult={pathResult}
              source={source}
              destination={destination}
            />
          </div>
        </div>

        {/* Algorithm Trace Table */}
        <AlgorithmTrace result={pathResult} />

        {/* Adjacency Matrix Representation */}
        <AdjacencyMatrix vertices={vertices} edges={edges} />

        {/* Course Theory & Objective */}
        <Theory />

        {/* Team Members */}
        <Team />
      </main>

      <Footer />
    </div>
  );
}
