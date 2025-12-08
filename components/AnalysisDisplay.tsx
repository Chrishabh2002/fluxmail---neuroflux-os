import React from 'react';
import { FluxMailResponse } from '../types';
import { 
  CheckCircle2, 
  Zap, 
  MessageSquare, 
  BrainCircuit
} from 'lucide-react';
import { ClassificationBadge } from './ClassificationBadge';
import { TaskCard } from './TaskCard';
import { MeetingCard } from './MeetingCard';
import { FollowUpCard } from './FollowUpCard';
import { ReplyCard } from './ReplyCard';

interface AnalysisDisplayProps {
  data: FluxMailResponse | null;
  loading: boolean;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 text-cyan-500 animate-pulse min-h-[400px]">
        <BrainCircuit className="w-16 h-16 animate-spin-slow" />
        <p className="text-lg font-mono">NEUROFLUX AGENT PROCESSING...</p>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 min-h-[400px]">
        <MessageSquare className="w-16 h-16 opacity-20" />
        <p className="font-mono text-sm">WAITING FOR EMAIL INPUT STREAM...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Classification Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClassificationBadge 
          classification={data.classification} 
          confidence={data.confidence} 
          sentiment={data.sentiment} 
        />
        
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm h-full">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Summary</h3>
                <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{data.summary}</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Detected Tasks ({data.task_items.length})
        </h3>
        {data.task_items.length === 0 ? (
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-slate-500 text-sm">
                No distinct tasks identified.
            </div>
        ) : (
            <div className="grid gap-3">
            {data.task_items.map((task, idx) => (
                <TaskCard key={idx} task={task} />
            ))}
            </div>
        )}
      </div>

      {/* Meeting Intelligence */}
      <MeetingCard data={data.meeting_data} />

      {/* Follow Up */}
      <FollowUpCard data={data.follow_up} />

      {/* Generated Replies */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Generated Responses
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Object.entries(data.reply_options).map(([key, content]) => (
                <ReplyCard key={key} type={key} content={String(content)} />
            ))}
        </div>
      </div>

    </div>
  );
};