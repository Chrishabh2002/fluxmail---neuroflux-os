import React from 'react';
import { Competitor } from '../types';

export const CompetitiveTable: React.FC<{ competitors: Competitor[] }> = ({ competitors }) => (
  <div className="overflow-hidden rounded-xl border border-slate-700">
    <table className="w-full text-sm text-left text-slate-400">
      <thead className="text-xs text-slate-200 uppercase bg-slate-800">
        <tr>
          <th className="px-6 py-3 font-semibold">Competitor</th>
          <th className="px-6 py-3 font-semibold text-green-400">Strengths</th>
          <th className="px-6 py-3 font-semibold text-red-400">Weaknesses</th>
          <th className="px-6 py-3 font-semibold text-cyan-400">Key Differentiator</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-900/50">
        {competitors.map((comp, idx) => (
          <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
            <td className="px-6 py-4 font-medium text-white">{comp.name}</td>
            <td className="px-6 py-4 text-slate-300">{comp.strengths}</td>
            <td className="px-6 py-4 text-slate-300">{comp.weaknesses}</td>
            <td className="px-6 py-4 text-slate-300 italic">{comp.key_differentiator}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);