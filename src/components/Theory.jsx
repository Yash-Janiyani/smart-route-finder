import React from 'react';
import { BookOpen, Clock, Target, Check } from 'lucide-react';

export default function Theory() {
  return (
    <div className="space-y-6">
      {/* Project Objective Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-indigo-900">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-indigo-400 shrink-0" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Project Objective
          </h3>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium pl-7">
          "To develop an interactive application that represents a weighted directed graph, generates its adjacency matrix, and determines the shortest path between two vertices using Dijkstra's algorithm."
        </p>
      </div>

      {/* Concept Behind the Project */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Concept Behind the Project
              </h2>
              <p className="text-xs text-slate-500">
                Core mathematical definitions from MAT2002 course syllabus
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-mono font-semibold border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Time Complexity: O(V²)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Concept 1 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              1. Graph
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A graph consists of a finite set of vertices (nodes) connected by edges (links). Formally represented as \(G = (V, E)\).
            </p>
          </div>

          {/* Concept 2 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              2. Weighted Directed Graph
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              In this project, edges have a direction (\(u \rightarrow v\)) and a positive weight representing distance or traversal cost.
            </p>
          </div>

          {/* Concept 3 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              3. Dijkstra's Algorithm
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dijkstra's algorithm finds the shortest path from a chosen source vertex to other vertices in a weighted graph with non-negative edge weights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
