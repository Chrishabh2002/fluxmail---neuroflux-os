
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  content: string;
}

export const GeneratedCodeBlock: React.FC<Props> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-slate-800 bg-slate-950/50 my-2">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-xs md:text-sm text-indigo-100 leading-relaxed">
            {content}
        </pre>
      </div>
    </div>
  );
};
