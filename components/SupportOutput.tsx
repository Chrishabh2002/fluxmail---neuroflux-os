
import React from 'react';
import { SupportResponse } from '../types';
import { SentimentBadge } from './SentimentBadge';
import { UrgencyBadge } from './UrgencyBadge';
import { InternalTaskList } from './InternalTaskList';
import { SupportReplyCard } from './SupportReplyCard';
import { AlertTriangle, Lightbulb, MessageSquare, ShieldAlert } from 'lucide-react';

interface Props {
  data: SupportResponse;
}

export const SupportOutput: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">Classification</h3>
            <span className="text-lg font-bold text-white">{data.classification}</span>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm flex flex-col justify-center">
             <h3 className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">Sentiment</h3>
             <SentimentBadge sentiment={data.sentiment as any} />
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm flex flex-col justify-center">
             <h3 className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">Urgency</h3>
             <UrgencyBadge level={data.urgency_level as any} />
        </div>
      </div>

      {/* Escalation Warning */}
      {data.should_escalate && (
          <div className="bg-red-950/20 border border-red-500/40 p-4 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                  <h3 className="text-red-400 font-bold text-sm">ESCALATION RECOMMENDED</h3>
                  <p className="text-red-200/80 text-sm mt-1">{data.escalation_reason}</p>
              </div>
          </div>
      )}

      {/* Analysis Block */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-1">Issue Summary</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{data.summary}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3" /> Root Cause
                  </h3>
                  <p className="text-slate-300 text-sm">{data.root_cause}</p>
              </div>
              <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Lightbulb className="w-3 h-3" /> Suggested Resolution
                  </h3>
                  <p className="text-slate-300 text-sm">{data.suggested_resolution}</p>
              </div>
          </div>
      </div>

      <InternalTaskList tasks={data.internal_tasks} />

      {/* Replies */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Generated Replies
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <SupportReplyCard type="Professional" content={data.reply_options.professional} />
            <SupportReplyCard type="Friendly" content={data.reply_options.friendly} />
            <SupportReplyCard type="Short Fix" content={data.reply_options.short_fix} />
        </div>
      </div>

       {/* FAQ Suggestion */}
       {data.faq_entry && (
           <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-lg p-4 text-sm">
               <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">Auto-Generated FAQ Entry</span>
               <div className="text-slate-300">
                   <span className="text-indigo-300 font-semibold">Q: </span> {data.faq_entry.split('?')[0]}?
               </div>
           </div>
       )}

    </div>
  );
};
