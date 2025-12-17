import React from 'react';
import { Clock } from 'lucide-react';
import { FollowUp } from '../types';

export const FollowUpCard: React.FC<{ data: FollowUp }> = ({ data }) => {
  if (!data.is_needed) return null;

  return (
    <div className="bg-amber-950/20 border border-amber-600/30 rounded-lg p-3 flex items-start gap-3">
      <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-amber-500 text-sm font-semibold mb-1">Follow-Up Recommended</h4>
        <p className="text-xs text-amber-200/70 mb-2">Timing: {data.when}</p>
        <div className="bg-black/30 p-2 rounded text-xs text-amber-100 font-mono">
          {data.suggested_message}
        </div>
      </div>
    </div>
  );
};