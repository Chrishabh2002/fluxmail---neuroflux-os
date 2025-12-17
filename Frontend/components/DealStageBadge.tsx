import React from 'react';
import { GitCommit } from 'lucide-react';

export const DealStageBadge: React.FC<{ stage: string }> = ({ stage }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs font-medium uppercase tracking-wider">
    <GitCommit className="w-3 h-3" />
    {stage}
  </div>
);