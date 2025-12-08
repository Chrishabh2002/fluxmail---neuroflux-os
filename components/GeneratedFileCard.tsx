
import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import { GeneratedCodeBlock } from './GeneratedCodeBlock';
import { FileCode, ChevronDown, ChevronRight } from 'lucide-react';

export const GeneratedFileCard: React.FC<{ file: GeneratedFile }> = ({ file }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/30 hover:border-indigo-500/30 transition-colors">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-800/50 transition-colors"
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
        <FileCode className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-mono text-slate-200 font-medium">{file.path}</span>
        <span className="ml-auto text-[10px] text-slate-600 uppercase tracking-wider">
            {file.content.length} bytes
        </span>
      </button>
      
      {expanded && (
        <div className="border-t border-slate-800/50 bg-black/20">
            <GeneratedCodeBlock content={file.content} />
        </div>
      )}
    </div>
  );
};
