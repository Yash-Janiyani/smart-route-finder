import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileCode, CheckCircle2 } from 'lucide-react';

export default function AlgorithmTrace({ result }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!result || !result.steps || result.steps.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 transition-colors text-left border-b border-slate-200/80 cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <FileCode className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-bold text-slate-800">
              How Dijkstra Solved It
            </h3>
            <p className="text-xs text-slate-500">
              Step-by-step distance relaxation trace (Viva demonstration)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200/60 font-semibold">
            {result.steps.length} Steps
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-4">
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5 w-16 text-center">Step</th>
                  <th className="px-4 py-2.5 w-32">Current Vertex</th>
                  <th className="px-4 py-2.5">Updated Distances</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800 bg-white">
                {result.steps.map((stepItem, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5 text-center font-bold text-slate-500">
                      {stepItem.step}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60">
                        {stepItem.currentVertex}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-700">
                      {stepItem.updatedDistances}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.path && result.path.length > 0 && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">Final Path:</span>
                <span className="font-mono text-emerald-800 font-bold text-sm">
                  {result.path.join(' → ')}
                </span>
              </div>
              <div className="text-slate-600 font-mono">
                Total Distance: <strong className="text-emerald-700">{result.totalDistance}</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
