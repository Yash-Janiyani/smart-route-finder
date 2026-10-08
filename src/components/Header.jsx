import React from 'react';
import { Route, BookOpen, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Dijkstra's Shortest Path
              </span>
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                Discrete Mathematics and Graph Theory • MAT2002
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Route className="w-7 h-7 text-indigo-600 inline-block" />
              SMART ROUTE FINDER
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Shortest Path Analysis using Dijkstra's Algorithm
            </p>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Academic Project
            </div>
            <div className="text-sm font-medium text-slate-700">
              School of Computer Science & Engineering
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
