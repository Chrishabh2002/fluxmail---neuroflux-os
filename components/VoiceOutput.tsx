
import React from 'react';
import { FluxVoiceResponse } from '../types';
import { VoiceSummaryCard } from './VoiceSummaryCard';
import { ActionItemList } from './ActionItemList';
import { ParticipantsList } from './ParticipantsList';
import { RoutingBadge } from './RoutingBadge';
import { EmailSuggestionCard } from './EmailSuggestionCard';
import { Mic, CheckCircle2, MessageSquare } from 'lucide-react';

interface Props {
  data: FluxVoiceResponse;
  onExecute: (module: string) => void;
}

export const VoiceOutput: React.FC<Props> = ({ data, onExecute }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-950/40 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-500/20 flex items-center gap-2">
              <Mic className="w-3 h-3" /> {data.input_type.replace(/_/g, ' ')} DETECTED
            </span>
            <span className="text-xs text-slate-500 font-mono">CONFIDENCE: HIGH</span>
          </div>
        </div>
        <ParticipantsList participants={data.participants} />
      </div>

      <VoiceSummaryCard data={data} />

      <RoutingBadge moduleName={data.suggested_module_to_use} onExecute={() => onExecute(data.suggested_module_to_use)} />

      {/* Actions */}
      {data.action_items.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Extracted Action Items
          </h3>
          <ActionItemList actions={data.action_items} />
        </div>
      )}

      {/* Email Suggestions */}
      {data.input_type !== 'voice_command' && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Automated Follow-Ups
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EmailSuggestionCard type="Professional" content={data.email_suggestion.professional} />
            <EmailSuggestionCard type="Friendly" content={data.email_suggestion.friendly} />
            <EmailSuggestionCard type="Short" content={data.email_suggestion.short} />
          </div>
        </div>
      )}

      {/* Follow Up Notes */}
      {data.suggested_follow_ups.length > 0 && (
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Next Steps</h4>
          <ul className="list-disc list-inside space-y-1">
            {data.suggested_follow_ups.map((item, i) => (
              <li key={i} className="text-sm text-slate-300">{item}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
