
import React, { useState } from 'react';
import { Comment } from '../types';
import { Send, MessageSquare } from 'lucide-react';

interface Props {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CommentThread: React.FC<Props> = ({ comments, onAddComment }) => {
  const [input, setInput] = useState('');

  const send = () => {
    if(!input.trim()) return;
    onAddComment(input);
    setInput('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[300px] flex flex-col">
       <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Team Chat
       </h3>
       
       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-3">
          {comments.map(c => (
             <div key={c.id} className="bg-slate-800/30 p-2 rounded-lg border border-slate-800">
                <div className="flex justify-between items-baseline mb-1">
                   <span className="text-xs font-bold text-cyan-400">{c.user}</span>
                   <span className="text-[10px] text-slate-600">{c.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.text}</p>
             </div>
          ))}
       </div>

       <div className="relative">
          <input 
             className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
             placeholder="Type a message..."
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button 
             onClick={send}
             className="absolute right-2 top-1.5 text-slate-500 hover:text-cyan-400"
          >
             <Send className="w-3.5 h-3.5" />
          </button>
       </div>
    </div>
  );
};
