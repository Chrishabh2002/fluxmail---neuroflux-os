import React from 'react';
import { ExecutionResult } from '../types';
import { CheckCircle2, XCircle, Terminal } from 'lucide-react';

export const ExecutionLogCard: React.FC<{ log: ExecutionResult }> = ({ log }) => (
  <div className="bg-black/30 border border-slate-800 rounded p-3 text-xs font-mono">
     <div className="flex justify-between items-center mb-2">
        <span className="text-slate-400">{log.timestamp}</span>
        {log.success 
            ? <span className="flex items-center gap-1 text-green-400"><CheckCircle2 className="w-3 h-3" /> SUCCESS</span>
            : <span className="flex items-center gap-1 text-red-400"><XCircle className="w-3 h-3" /> FAILED</span>
        }
     </div>
     <div className="mb-2 text-indigo-300 font-bold">{log.workflow_name}</div>
     <div className="space-y-1 text-slate-500 pl-2 border-l border-slate-800">
        {log.steps_executed.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
                <span className="text-slate-600">$</span>
                <span>{step}</span>
            </div>
        ))}
     </div>
     <div className="mt-2 pt-2 border-t border-slate-800/50 text-slate-400 italic">
        {log.output_summary}
     </div>
  </div>
);