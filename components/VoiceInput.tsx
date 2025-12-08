
import React, { useState } from 'react';
import { Mic2, PlayCircle, Sparkles, FileText, Trash2 } from 'lucide-react';

interface Props {
  onAnalyze: (text: string) => void;
  loading: boolean;
  onClear: () => void;
}

export const VoiceInput: React.FC<Props> = ({ onAnalyze, loading, onClear }) => {
  const [text, setText] = useState('');

  const loadSample = () => {
    setText(`Transcript:
Alice: "Okay, let's start the weekly sync. Bob, how is the Q3 report coming along?"
Bob: "I'm about 80% done. I just need the sales figures from the West Coast team. Can someone ping Sarah?"
Alice: "I'll handle that. I'll email Sarah today. Also, we need to schedule the client demo for next Tuesday."
Bob: "Got it. I'll prepare the slide deck by Friday. Is 2 PM okay for the demo?"
Alice: "Yes, 2 PM works. Let's lock that in. Also, please update the CRM with the new lead from the expo."
Bob: "Will do."`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Mic2 className="w-4 h-4" /> Voice Input Stream
        </h2>
        <div className="flex gap-2">
            <button onClick={loadSample} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                SAMPLE_MEETING
            </button>
            <button onClick={() => { setText(''); onClear(); }} className="text-slate-600 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2">
         <label className="text-xs text-slate-500 font-mono ml-1">TRANSCRIPT / COMMAND</label>
         <textarea 
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none font-sans leading-relaxed min-h-[200px]"
            placeholder="Paste meeting transcript or voice command here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
         />
      </div>

      <div className="mt-6 flex flex-col gap-3">
         <button 
            onClick={() => onAnalyze(text)}
            disabled={loading || !text}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                loading || !text
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-900/20'
            }`}
        >
            {loading ? (
                <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    PROCESSING SPEECH...
                </>
            ) : (
                <>
                    <PlayCircle className="w-5 h-5" />
                    ANALYZE VOICE INPUT
                </>
            )}
        </button>
        
        <button disabled className="w-full py-3 bg-slate-800/50 border border-slate-700/50 text-slate-500 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2">
            <Mic2 className="w-4 h-4 opacity-50" /> Record Audio (Coming Soon)
        </button>
      </div>
    </div>
  );
};
