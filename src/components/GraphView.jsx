import React, { useState, useEffect, useRef } from 'react';
import { Network, RefreshCw, Move } from 'lucide-react';

export default function GraphView({ vertices, edges, pathResult, source, destination }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});
  const [draggingNode, setDraggingNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const SVG_WIDTH = 640;
  const SVG_HEIGHT = 440;
  const NODE_RADIUS = 24;

  // Compute circular layout for nodes
  const autoArrangeNodes = () => {
    if (!vertices || vertices.length === 0) return;
    const centerX = SVG_WIDTH / 2;
    const centerY = SVG_HEIGHT / 2;
    const radius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2.6;

    const newPos = {};
    const count = vertices.length;

    vertices.forEach((v, index) => {
      const angle = (2 * Math.PI * index) / count - Math.PI / 2;
      newPos[v] = {
        x: Math.round(centerX + radius * Math.cos(angle)),
        y: Math.round(centerY + radius * Math.sin(angle)),
      };
    });

    setPositions(newPos);
  };

  // Sync positions when vertices list changes
  useEffect(() => {
    setPositions((prev) => {
      const updated = { ...prev };
      let changed = false;

      // Add missing vertices
      vertices.forEach((v) => {
        if (!updated[v]) {
          changed = true;
        }
      });

      // Remove deleted vertices
      Object.keys(updated).forEach((v) => {
        if (!vertices.includes(v)) {
          delete updated[v];
          changed = true;
        }
      });

      if (changed || Object.keys(updated).length === 0) {
        const count = vertices.length;
        const centerX = SVG_WIDTH / 2;
        const centerY = SVG_HEIGHT / 2;
        const radius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2.6;

        vertices.forEach((v, index) => {
          if (!updated[v]) {
            const angle = (2 * Math.PI * index) / count - Math.PI / 2;
            updated[v] = {
              x: Math.round(centerX + radius * Math.cos(angle)),
              y: Math.round(centerY + radius * Math.sin(angle)),
            };
          }
        });
      }

      return updated;
    });
  }, [vertices]);

  // Drag Handlers
  const handleMouseDown = (e, vertex) => {
    e.stopPropagation();
    setDraggingNode(vertex);
    const pos = positions[vertex] || { x: 0, y: 0 };
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingNode) return;
    const svgRect = containerRef.current?.getBoundingClientRect();
    if (!svgRect) return;

    // Calculate canvas relative coords
    let newX = e.clientX - svgRect.left;
    let newY = e.clientY - svgRect.top;

    // Clamp within canvas boundaries
    newX = Math.max(NODE_RADIUS + 10, Math.min(SVG_WIDTH - NODE_RADIUS - 10, newX));
    newY = Math.max(NODE_RADIUS + 10, Math.min(SVG_HEIGHT - NODE_RADIUS - 10, newY));

    setPositions((prev) => ({
      ...prev,
      [draggingNode]: { x: newX, y: newY },
    }));
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  // Helper to check if edge is part of shortest path
  const isEdgeInPath = (from, to) => {
    if (!pathResult || !pathResult.path || pathResult.path.length < 2) return false;
    const path = pathResult.path;
    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] === from && path[i + 1] === to) {
        return true;
      }
    }
    return false;
  };

  const isNodeInPath = (v) => {
    if (!pathResult || !pathResult.path) return false;
    return pathResult.path.includes(v);
  };

  const isShortestPathActive = pathResult && pathResult.path && pathResult.path.length > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-600" />
            Graph Visualization
          </h2>
          <p className="text-xs text-slate-500">
            Weighted directed graph representation (Drag nodes to arrange)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
            <Move className="w-3.5 h-3.5" />
            Draggable
          </span>
          <button
            onClick={autoArrangeNodes}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Auto-arrange nodes in circle"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Auto Arrange
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full flex-1 min-h-[420px] bg-slate-50/70 border border-slate-200 rounded-lg relative overflow-hidden flex items-center justify-center select-none"
      >
        {vertices.length === 0 ? (
          <div className="text-center p-6 text-slate-400">
            <Network className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium">Graph is empty</p>
            <p className="text-xs mt-1">Use "Section A — Add Vertex" on the left to add nodes.</p>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-full max-h-[460px] drop-shadow-xs"
          >
            <defs>
              {/* Default Arrowhead Marker */}
              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
              </marker>

              {/* Subdued Arrowhead Marker */}
              <marker
                id="arrow-subdued"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#cbd5e1" />
              </marker>

              {/* Highlighted Shortest Path Arrowhead */}
              <marker
                id="arrow-highlight"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Render Edges */}
            {edges.map((edge, idx) => {
              const fromPos = positions[edge.from];
              const toPos = positions[edge.to];
              if (!fromPos || !toPos) return null;

              const inPath = isEdgeInPath(edge.from, edge.to);

              // Check if reverse edge exists (bidirectional pair)
              const hasReverse = edges.some((e) => e.from === edge.to && e.to === edge.from);

              const dx = toPos.x - fromPos.x;
              const dy = toPos.y - fromPos.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;

              // Unit vectors
              const ux = dx / dist;
              const uy = dy / dist;

              // Offset for node radius
              const startX = fromPos.x + ux * NODE_RADIUS;
              const startY = fromPos.y + uy * NODE_RADIUS;
              const endX = toPos.x - ux * (NODE_RADIUS + 6);
              const endY = toPos.y - uy * (NODE_RADIUS + 6);

              // Curvature for bidirectional edges or clean pathing
              let pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
              let midX = (startX + endX) / 2;
              let midY = (startY + endY) / 2;

              if (hasReverse) {
                // Perpendicular offset for curved edge
                const perpX = -uy * 25;
                const perpY = ux * 25;
                const ctrlX = (fromPos.x + toPos.x) / 2 + perpX;
                const ctrlY = (fromPos.y + toPos.y) / 2 + perpY;

                pathD = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
                midX = 0.25 * startX + 0.5 * ctrlX + 0.25 * endX;
                midY = 0.25 * startY + 0.5 * ctrlY + 0.25 * endY;
              }

              // Styling depending on shortest path highlight state
              let strokeColor = '#64748b';
              let strokeWidth = 2;
              let markerId = 'url(#arrow-default)';
              let opacity = 1;

              if (isShortestPathActive) {
                if (inPath) {
                  strokeColor = '#10b981'; // Emerald highlight
                  strokeWidth = 3.5;
                  markerId = 'url(#arrow-highlight)';
                  opacity = 1;
                } else {
                  strokeColor = '#cbd5e1'; // Subdued
                  strokeWidth = 1.5;
                  markerId = 'url(#arrow-subdued)';
                  opacity = 0.4;
                }
              }

              return (
                <g key={`${edge.from}-${edge.to}-${idx}`} style={{ opacity }}>
                  {/* Outer glow stroke for path edge */}
                  {inPath && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#a7f3d0"
                      strokeWidth={8}
                      strokeLinecap="round"
                      opacity={0.6}
                    />
                  )}

                  {/* Main Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    markerEnd={markerId}
                  />

                  {/* Edge Weight Badge */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-14"
                      y="-11"
                      width="28"
                      height="22"
                      rx="6"
                      fill={inPath ? '#065f46' : '#ffffff'}
                      stroke={inPath ? '#10b981' : strokeColor}
                      strokeWidth={inPath ? '1.5' : '1'}
                      className="shadow-xs"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={inPath ? '#ffffff' : '#1e293b'}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {edge.weight}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Render Nodes */}
            {vertices.map((v) => {
              const pos = positions[v];
              if (!pos) return null;

              const isSource = v === source;
              const isDest = v === destination;
              const inPath = isNodeInPath(v);

              let circleFill = '#ffffff';
              let strokeColor = '#475569';
              let textColor = '#0f172a';
              let strokeWidth = 2;
              let opacity = 1;

              if (isShortestPathActive) {
                if (inPath) {
                  strokeWidth = 3;
                  if (isSource) {
                    circleFill = '#ecfdf5';
                    strokeColor = '#059669';
                    textColor = '#047857';
                  } else if (isDest) {
                    circleFill = '#eff6ff';
                    strokeColor = '#2563eb';
                    textColor = '#1d4ed8';
                  } else {
                    circleFill = '#f0fdf4';
                    strokeColor = '#10b981';
                    textColor = '#047857';
                  }
                } else {
                  opacity = 0.45;
                  strokeColor = '#cbd5e1';
                  circleFill = '#f8fafc';
                  textColor = '#94a3b8';
                }
              } else {
                if (isSource) {
                  circleFill = '#f0fdf4';
                  strokeColor = '#059669';
                } else if (isDest) {
                  circleFill = '#eff6ff';
                  strokeColor = '#2563eb';
                }
              }

              return (
                <g
                  key={v}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseDown={(e) => handleMouseDown(e, v)}
                  className="cursor-grab active:cursor-grabbing transition-transform duration-75"
                  style={{ opacity }}
                >
                  {/* Node Outer Ring Highlight for Source/Dest */}
                  {(isSource || isDest) && (
                    <circle
                      r={NODE_RADIUS + 6}
                      fill="none"
                      stroke={isSource ? '#10b981' : '#3b82f6'}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r={NODE_RADIUS}
                    fill={circleFill}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="shadow-xs"
                  />

                  {/* Vertex Label */}
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    pointerEvents="none"
                  >
                    {v}
                  </text>

                  {/* START / END Badges */}
                  {isSource && (
                    <g transform="translate(0, -32)">
                      <rect
                        x="-20"
                        y="-8"
                        width="40"
                        height="16"
                        rx="4"
                        fill="#059669"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        SOURCE
                      </text>
                    </g>
                  )}

                  {isDest && (
                    <g transform="translate(0, 32)">
                      <rect
                        x="-18"
                        y="-8"
                        width="36"
                        height="16"
                        rx="4"
                        fill="#2563eb"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        DEST
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Legend Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-emerald-600 bg-emerald-50 inline-block" />
            Source Node
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-blue-600 bg-blue-50 inline-block" />
            Destination Node
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-emerald-500 rounded inline-block" />
            Shortest Path Edge
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Directed Graph • Positive Weights
        </span>
      </div>
    </div>
  );
}
