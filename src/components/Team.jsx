import React from 'react';
import { Users, GraduationCap } from 'lucide-react';

export default function Team() {
  const members = [
    { name: 'Yash Janiyani', reg: '24BCE11394' },
    { name: 'Himanshu Vishwakarma', reg: '25MIM10119' },
    { name: 'Prashant Raj', reg: '24BCE11371' },
    { name: 'Abhishek', reg: '24BCE11402' },
    { name: 'Mradul Agrawal', reg: '24BCE11403' },
    { name: 'Devraj Srivastava', reg: '24BCE10050' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">Project Team</h2>
            <p className="text-xs text-slate-500">
              Discrete Mathematics and Graph Theory • MAT2002
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 flex items-center gap-1.5 self-start sm:self-auto">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
          Project: <strong>Smart Route Finder</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors"
          >
            <div>
              <p className="text-xs font-bold text-slate-800">{member.name}</p>
              <p className="text-[11px] font-mono text-slate-500">{member.reg}</p>
            </div>
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              Member
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
