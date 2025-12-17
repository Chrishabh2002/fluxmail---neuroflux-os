
import React from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface Props {
  type: string;
  content: string;
}

export const SupportReplyCard: React.FC<Props> = ({ type, content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-slate-800/30 border border-slate-700 hover:border-cyan-500/50 rounded-lg p-3 transition-colors h-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">{type.replace(/_/g, ' ')}</span>
        <button 
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
      <div className="flex-1 bg-black/20 rounded p-2 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[200px] font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {content}
      </div>
    </div>
  );
};
