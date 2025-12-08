import React from 'react';
import { Calendar } from 'lucide-react';
import { MeetingData } from '../types';

export const MeetingCard: React.FC<{ data: MeetingData }> = ({ data }) => {
  if (!data.is_meeting_related && (!data.participants || data.participants.length === 0)) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <Calendar className="w-4 h-4" /> Meeting Intelligence
      </h3>
      <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3">
          <div>
            <span className="text-indigo-400 block text-xs mb-1">DATE & TIME</span>
            <span className="text-slate-200">{data.date || 'TBD'} @ {data.time || 'TBD'}</span>
          </div>
          <div>
            <span className="text-indigo-400 block text-xs mb-1">AGENDA</span>
            <span className="text-slate-200">{data.agenda || 'Not specified'}</span>
          </div>
        </div>
        {data.suggested_alternatives && data.suggested_alternatives.length > 0 && (
          <div className="mt-2 pt-2 border-t border-indigo-500/20">
            <span className="text-indigo-400 block text-xs mb-1">SUGGESTED ALTERNATIVES</span>
            <div className="flex flex-wrap gap-2">
              {data.suggested_alternatives.map((time, i) => (
                <span key={i} className="bg-indigo-900/50 text-indigo-200 px-2 py-1 rounded text-xs border border-indigo-700/50">
                  {time}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};