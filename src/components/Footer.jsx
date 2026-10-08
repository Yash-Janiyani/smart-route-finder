import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <p className="font-bold text-slate-200 text-sm">Smart Route Finder</p>
          <p className="text-slate-500 text-xs">
            Discrete Mathematics and Graph Theory • MAT2002
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-300 font-mono text-[11px] border border-slate-700">
            "Built as an academic project"
          </span>
        </div>
      </div>
    </footer>
  );
}
