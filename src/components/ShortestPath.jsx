import React from 'react';
import { Navigation, ArrowRight, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function ShortestPath({
  vertices,
  source,
  setSource,
  destination,
  setDestination,
  onRunDijkstra,
  result,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-indigo-600" />
          Find Shortest Path
        </h2>
        <p className="text-xs text-slate-500">
          Compute minimum cost route on directed graph
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Source Vertex
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          >
            <option value="">Select Source</option>
            {vertices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Destination Vertex
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          >
            <option value="">Select Destination</option>
            {vertices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onRunDijkstra}
        disabled={!source || !destination}
        className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <Navigation className="w-4 h-4" />
        Find Shortest Path
      </button>

      {/* Result Card Display */}
      {result && (
        <div className="mt-4 pt-4 border-t border-slate-100 transition-all duration-300">
          {result.isSame ? (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Source and destination are the same.</p>
                <p className="text-slate-600 mt-0.5">Total distance is 0.</p>
              </div>
            </div>
          ) : result.unreachable ? (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">No path exists between the selected vertices.</p>
                <p className="text-amber-700 mt-0.5">
                  There are no directed edges forming a path from <strong>{source}</strong> to <strong>{destination}</strong>.
                </p>
              </div>
            </div>
          ) : result.path && result.path.length > 0 ? (
            <div className="bg-slate-900 text-white rounded-xl p-4 space-y-4 shadow-md border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Shortest Path Found
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  Dijkstra's Algorithm
                </span>
              </div>

              {/* Path Sequence */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                  Shortest Path
                </label>
                <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-sm">
                  {result.path.map((node, index) => (
                    <React.Fragment key={index}>
                      <span
                        className={`px-2.5 py-1 rounded font-bold ${
                          index === 0
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : index === result.path.length - 1
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {node}
                      </span>
                      {index < result.path.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Total Distance & Algorithm metadata */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Total Distance
                  </span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">
                    {result.totalDistance}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    Hops / Nodes
                  </span>
                  <span className="text-xl font-bold text-slate-200 font-mono">
                    {result.path.length - 1} edges ({result.path.length} nodes)
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
