import React, { useState } from 'react';
import { PlusCircle, RotateCcw, Trash2, ArrowRight, AlertCircle } from 'lucide-react';

export default function GraphControls({
  vertices,
  edges,
  onAddVertex,
  onAddEdge,
  onResetDemo,
  onClearGraph,
}) {
  const [newVertex, setNewVertex] = useState('');
  const [fromVertex, setFromVertex] = useState('');
  const [toVertex, setToVertex] = useState('');
  const [weight, setWeight] = useState('');

  const [vertexError, setVertexError] = useState('');
  const [edgeError, setEdgeError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Handle Add Vertex
  const handleAddVertex = (e) => {
    e.preventDefault();
    setVertexError('');
    const trimmed = newVertex.trim();

    if (!trimmed) {
      setVertexError('Please enter a vertex name.');
      return;
    }

    if (vertices.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setVertexError(`Vertex "${trimmed}" already exists.`);
      return;
    }

    onAddVertex(trimmed);
    setNewVertex('');
  };

  // Handle Add Edge
  const handleAddEdge = (e) => {
    e.preventDefault();
    setEdgeError('');

    if (!fromVertex || !toVertex || weight === '') {
      setEdgeError('Please select From, To vertices and enter an edge weight.');
      return;
    }

    if (!vertices.includes(fromVertex) || !vertices.includes(toVertex)) {
      setEdgeError('One or both selected vertices do not exist.');
      return;
    }

    const numericWeight = Number(weight);

    if (isNaN(numericWeight)) {
      setEdgeError('Edge weight must be a valid number.');
      return;
    }

    if (numericWeight <= 0) {
      setEdgeError('Only positive edge weights (> 0) are allowed in Dijkstra\'s algorithm.');
      return;
    }

    if (fromVertex === toVertex) {
      setEdgeError('Self-loop edges (From == To) are not permitted in this route analysis.');
      return;
    }

    // Check duplicate directed edge
    const exists = edges.some(
      (edge) => edge.from === fromVertex && edge.to === toVertex
    );

    if (exists) {
      setEdgeError(`Directed edge from ${fromVertex} → ${toVertex} already exists.`);
      return;
    }

    onAddEdge({ from: fromVertex, to: toVertex, weight: numericWeight });
    setWeight('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Graph Controls</h2>
          <p className="text-xs text-slate-500">Construct & modify directed graph topology</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onResetDemo}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Reset to default demo graph"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            title="Remove all vertices and edges"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Clear Confirmation Prompt */}
      {showClearConfirm && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-800 space-y-2">
          <p className="font-semibold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            Are you sure you want to clear the entire graph?
          </p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onClearGraph();
                setShowClearConfirm(false);
              }}
              className="px-3 py-1 text-xs font-semibold bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Yes, Clear Graph
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1 text-xs font-medium bg-white text-slate-700 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Section A — Add Vertex */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Section A — Add Vertex
        </label>
        <form onSubmit={handleAddVertex} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., A, B, Library, Gate"
            value={newVertex}
            onChange={(e) => {
              setNewVertex(e.target.value);
              setVertexError('');
            }}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Add Vertex
          </button>
        </form>
        {vertexError && (
          <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {vertexError}
          </p>
        )}
      </div>

      <hr className="border-slate-100" />

      {/* Section B — Add Directed Edge */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Section B — Add Directed Edge
        </label>
        <form onSubmit={handleAddEdge} className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">From</label>
              <select
                value={fromVertex}
                onChange={(e) => {
                  setFromVertex(e.target.value);
                  setEdgeError('');
                }}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select</option>
                {vertices.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-slate-600 mb-1">To</label>
              <select
                value={toVertex}
                onChange={(e) => {
                  setToVertex(e.target.value);
                  setEdgeError('');
                }}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">Select</option>
                {vertices.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Weight</label>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="Weight"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setEdgeError('');
                }}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          {fromVertex && toVertex && (
            <div className="text-xs text-slate-500 flex items-center gap-1 font-mono bg-slate-50 p-2 rounded-md border border-slate-200/60">
              <span className="font-semibold text-slate-700">{fromVertex}</span>
              <ArrowRight className="w-3 h-3 text-indigo-600 inline" />
              <span className="font-semibold text-slate-700">{toVertex}</span>
              <span>(Weight: {weight || '?'})</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            Add Directed Edge
          </button>
        </form>

        {edgeError && (
          <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {edgeError}
          </p>
        )}
      </div>
    </div>
  );
}
