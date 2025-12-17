import React from 'react';
import { CRMResponse } from '../types';
import { ProbabilityBadge } from './ProbabilityBadge';
import { DealStageBadge } from './DealStageBadge';
import { NextActionList } from './NextActionList';
import { FollowUpBox } from './FollowUpBox';
import { User, Building, Mail, Phone, DollarSign, Flag } from 'lucide-react';

export const LeadCard: React.FC<{ data: CRMResponse }> = ({ data }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Info */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flag className="w-32 h-32" />
        </div>
        
        <div className="flex justify-between items-start relative z-10 mb-4">
             <div>
                <h2 className="text-2xl font-bold text-white mb-1">{data.lead_name}</h2>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Building className="w-4 h-4" />
                    {data.company}
                </div>
             </div>
             <ProbabilityBadge probability={data.probability} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm relative z-10">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" /> {data.email}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-500" /> {data.phone}
                </div>
            </div>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="w-4 h-4 text-slate-500" /> 
                    <span className="font-mono text-emerald-400 font-bold">{data.deal_value}</span>
                </div>
                <DealStageBadge stage={data.deal_stage} />
            </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <NextActionList actions={data.recommended_next_actions} />

      {/* Follow Up */}
      <div className="space-y-2">
         <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">
            Follow-Up Strategy
         </h3>
         <FollowUpBox message={data.auto_follow_up_message} timing={data.next_follow_up_in} />
      </div>

       {/* Notes Summary */}
       <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-slate-500 mb-2">AI NOTES</h4>
          <p className="text-sm text-slate-400 italic leading-relaxed">"{data.notes}"</p>
       </div>

    </div>
  );
};