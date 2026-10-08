import React, { useState } from 'react';
import { Grid, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdjacencyMatrix({ vertices, edges }) {
  const [isOpen, setIsOpen] = useState(true);

  // Build matrix lookup map: matrixMap[from][to] = weight
  const matrixMap = {};
  vertices.forEach((v1) => {
    matrixMap[v1] = {};
    vertices.forEach((v2) => {
      if (v1 === v2) {
        matrixMap[v1][v2] = 0;
      } else {
        matrixMap[v1][v2] = Infinity;
      }
    });
  });

  edges.forEach(({ from, to, weight }) => {
    if (matrixMap[from] && matrixMap[from][to] !== undefined) {
      matrixMap[from][to] = Number(weight);
    }
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 transition-colors text-left border-b border-slate-200/80 cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Grid className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Adjacency Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Weighted directed matrix representation \(A_{'{ij}'}\) (MAT2002 Syllabus)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
            {vertices.length} × {vertices.length} Matrix
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-3">
          {vertices.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-4">
              Add vertices to generate the Adjacency Matrix.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2.5 bg-slate-200/80 text-slate-500 font-mono w-12 border-r border-slate-300">
                        \(V\)
                      </th>
                      {vertices.map((v) => (
                        <th
                          key={v}
                          className="p-2.5 font-bold font-mono text-slate-800 min-w-[48px] border-r border-slate-200 last:border-r-0"
                        >
                          {v}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {vertices.map((rowV) => (
                      <tr key={rowV} className="hover:bg-slate-50 transition-colors">
                        <td className="p-2.5 font-bold bg-slate-100/60 text-slate-800 border-r border-slate-300">
                          {rowV}
                        </td>
                        {vertices.map((colV) => {
                          const val = matrixMap[rowV][colV];
                          const isSelf = rowV === colV;
                          const hasEdge = val !== Infinity && !isSelf;

                          return (
                            <td
                              key={colV}
                              className={`p-2.5 border-r border-slate-200 last:border-r-0 ${
                                isSelf
                                  ? 'bg-slate-50 text-slate-400'
                                  : hasEdge
                                  ? 'bg-emerald-50/80 text-emerald-800 font-bold'
                                  : 'text-slate-300'
                              }`}
                            >
                              {val === Infinity ? '∞' : val}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-200 inline-block" /> 0 = Self vertex
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-200 inline-block" /> Weight = Directed edge
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400 font-mono">∞</span> = No direct edge
                  </span>
                </span>
                <span className="italic text-slate-400">Updates dynamically</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
