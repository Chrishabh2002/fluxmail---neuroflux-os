
import React from 'react';
import { AppPackage } from '../types';
import { AppOverviewCard } from './AppOverviewCard';
import { GeneratedFileCard } from './GeneratedFileCard';
import { Download, Sparkles, Layout } from 'lucide-react';

export const ForgeOutput: React.FC<{ app: AppPackage }> = ({ app }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AppOverviewCard app={app} />
      
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
           <Sparkles className="w-4 h-4 text-indigo-400" /> Generated Source Code
        </h3>
        <div className="grid gap-3">
            {app.file_structure.map((file, i) => (
                <GeneratedFileCard key={i} file={file} />
            ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 flex justify-center gap-4">
         <button disabled className="flex items-center gap-2 px-6 py-3 bg-indigo-900/20 border border-indigo-500/50 rounded-lg text-indigo-300 text-sm font-semibold hover:bg-indigo-900/40 cursor-not-allowed transition-colors">
            <Layout className="w-4 h-4" /> Create This App Inside NeuroFlux (Coming Soon)
         </button>
         <button disabled className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 text-sm font-semibold hover:bg-slate-700 cursor-not-allowed transition-colors">
            <Download className="w-4 h-4" /> Download Package
         </button>
      </div>
    </div>
  );
};
