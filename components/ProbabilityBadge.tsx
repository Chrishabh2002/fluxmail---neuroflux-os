import React from 'react';

export const ProbabilityBadge: React.FC<{ probability: string }> = ({ probability }) => {
  // Extract number if possible, default to 0
  const num = parseInt(probability.replace(/[^0-9]/g, '')) || 0;
  
  let colorClass = "bg-slate-700 text-slate-300 border-slate-600";
  if (num >= 80) colorClass = "bg-emerald-900/50 text-emerald-300 border-emerald-600";
  else if (num >= 50) colorClass = "bg-blue-900/50 text-blue-300 border-blue-600";
  else if (num > 0) colorClass = "bg-orange-900/50 text-orange-300 border-orange-600";

  return (
    <div className={`px-3 py-1 rounded-full border ${colorClass} text-xs font-mono font-bold inline-flex items-center gap-2`}>
       <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
       {probability} WIN PROBABILITY
    </div>
  );
};