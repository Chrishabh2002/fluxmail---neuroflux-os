
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export const BusinessSummary: React.FC<{ summary: string }> = ({ summary }) => (
  <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-800 rounded-lg border border-slate-600">
            <LayoutDashboard className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
            Executive Summary
        </h3>
    </div>
    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
        {summary}
    </p>
  </div>
);
