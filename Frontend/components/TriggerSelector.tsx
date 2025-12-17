import React from 'react';
import { Trigger, TriggerType } from '../types';
import { Mail, Users, Clock, PlayCircle } from 'lucide-react';

interface Props {
  trigger: Trigger;
  onChange: (t: Trigger) => void;
}

export const TriggerSelector: React.FC<Props> = ({ trigger, onChange }) => {
  const types: { value: TriggerType; label: string; icon: React.FC<any> }[] = [
    { value: 'email_received', label: 'Email Received', icon: Mail },
    { value: 'crm_lead_added', label: 'CRM Lead Added', icon: Users },
    { value: 'schedule', label: 'Schedule', icon: Clock },
    { value: 'manual', label: 'Manual Trigger', icon: PlayCircle },
  ];

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
      <label className="text-xs text-slate-400 font-mono mb-2 block uppercase">Trigger Event</label>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange({ ...trigger, type: t.value })}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
              trigger.type === t.value
                ? 'bg-cyan-900/40 border border-cyan-500/50 text-cyan-200'
                : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-500 font-mono ml-1">CONDITIONS</label>
        <input
          type="text"
          value={trigger.conditions}
          onChange={(e) => onChange({ ...trigger, conditions: e.target.value })}
          placeholder={
            trigger.type === 'email_received' ? "Subject contains 'Urgent'..." :
            trigger.type === 'crm_lead_added' ? "Deal Value > $10k..." :
            trigger.type === 'schedule' ? "Every Monday at 9am..." : "No conditions"
          }
          className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
        />
      </div>
    </div>
  );
};