import React, { useState } from 'react';
import { Copy, CheckCircle2, MessageCircle } from 'lucide-react';

export const FollowUpBox: React.FC<{ message: string; timing: string }> = ({ message, timing }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 transition-all hover:border-cyan-500/30">
      <div className="flex justify-between items-center mb-3">
         <div className="flex items-center gap-2">
             <MessageCircle className="w-4 h-4 text-cyan-400" />
             <h4 className="text-sm font-semibold text-slate-200">Auto-Drafted Follow Up</h4>
         </div>
         <span className="text-xs text-slate-400 font-mono">Suggested: {timing}</span>
      </div>
      
      <div className="bg-black/20 rounded p-3 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed mb-3">
        {message}
      </div>

      <button 
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700/50 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors"
      >
        {copied ? <><CheckCircle2 className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy to Clipboard</>}
      </button>
    </div>
  );
};