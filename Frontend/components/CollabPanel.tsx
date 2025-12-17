
import React, { useState, useEffect } from 'react';
import { collabStore } from '../services/collabStore';
import { generateCollaborationHints } from '../services/geminiService';
import { SharedNotes } from './SharedNotes';
import { SharedTaskBoard } from './SharedTaskBoard';
import { TeamGoalsCard } from './TeamGoalsCard';
import { TeamPresence } from './TeamPresence';
import { ActivityFeed } from './ActivityFeed';
import { CommentThread } from './CommentThread';
import { CollaborationHints } from './CollaborationHints';
import { CollabTask } from '../types';

export const CollabPanel: React.FC = () => {
  const [state, setState] = useState(collabStore.getState());
  const [loadingHints, setLoadingHints] = useState(false);

  // Poll for simulated "realtime" updates from store (mocking socket)
  useEffect(() => {
    const interval = setInterval(() => {
      setState(collabStore.getState());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateNotes = (text: string) => {
    collabStore.updateNotes(text);
    setState(collabStore.getState()); // Optimistic update
  };

  const handleAddTask = () => {
    const newTask: CollabTask = {
      id: crypto.randomUUID(),
      title: 'New Task',
      owner: 'Unassigned',
      status: 'todo'
    };
    collabStore.addTask(newTask);
    collabStore.logActivity({
      id: crypto.randomUUID(),
      user: 'You',
      action: 'created a new task',
      timestamp: 'Just now',
      type: 'task'
    });
  };

  const handleStatusChange = (id: string, status: CollabTask['status']) => {
    collabStore.updateTask(id, { status });
    collabStore.logActivity({
      id: crypto.randomUUID(),
      user: 'You',
      action: `updated task status to ${status}`,
      timestamp: 'Just now',
      type: 'task'
    });
  };

  const handleAddComment = (text: string) => {
    collabStore.addComment({
      id: crypto.randomUUID(),
      user: 'You',
      text: text,
      timestamp: 'Just now'
    });
    collabStore.logActivity({
      id: crypto.randomUUID(),
      user: 'You',
      action: 'posted a comment',
      timestamp: 'Just now',
      type: 'comment'
    });
  };

  const handleGenerateHints = async () => {
    setLoadingHints(true);
    try {
      const hints = await generateCollaborationHints({
         tasks: state.tasks,
         goals: state.goals,
         activity: state.activityFeed
      });
      collabStore.saveHints(hints);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHints(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
       
       {/* Left Column: Workspace */}
       <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <SharedNotes notes={state.notes} onChange={handleUpdateNotes} />
             <SharedTaskBoard 
                tasks={state.tasks} 
                onStatusChange={handleStatusChange} 
                onAddTask={handleAddTask} 
             />
          </div>
          <TeamGoalsCard goals={state.goals} />
          
          {/* Mobile/Tablet view might stack differently, here we put comments below goals on left side for space */}
          <CommentThread comments={state.comments} onAddComment={handleAddComment} />
       </div>

       {/* Right Column: Activity & Intelligence */}
       <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
          <TeamPresence members={state.teamPresence} />
          <CollaborationHints 
             hints={state.lastAIHints} 
             loading={loadingHints} 
             onGenerate={handleGenerateHints} 
          />
          <ActivityFeed feed={state.activityFeed} />
       </div>

    </div>
  );
};
