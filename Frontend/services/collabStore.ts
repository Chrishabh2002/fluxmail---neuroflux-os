
import { CollabTask, TeamMember, ActivityItem, Comment, Goal, HintResponse } from "../types";

class CollabStore {
  notes: string = "";
  tasks: CollabTask[] = [];
  teamPresence: TeamMember[] = [];
  activityFeed: ActivityItem[] = [];
  comments: Comment[] = [];
  goals: Goal[] = [];
  lastAIHints: HintResponse | null = null;

  private readonly STORAGE_KEY = 'neuroflux_collab_state';

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const state = JSON.parse(stored);
        this.notes = state.notes || this.notes;
        this.tasks = state.tasks || this.tasks;
        this.activityFeed = state.activityFeed || this.activityFeed;
        this.comments = state.comments || this.comments;
        this.goals = state.goals || this.goals;
        // teamPresence is usually real-time, but we'll persist for now
      } catch (e) { console.error(e); }
    }
  }

  private persist() {
    const state = {
      notes: this.notes,
      tasks: this.tasks,
      activityFeed: this.activityFeed,
      comments: this.comments,
      goals: this.goals
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  updateNotes(text: string) {
    this.notes = text;
    this.persist();
  }

  addTask(task: CollabTask) {
    this.tasks.push(task);
    this.persist();
  }

  updateTask(id: string, updates: Partial<CollabTask>) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx >= 0) {
      this.tasks[idx] = { ...this.tasks[idx], ...updates };
      this.persist();
    }
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    this.persist();
  }

  logActivity(activity: ActivityItem) {
    this.activityFeed.unshift(activity);
    if (this.activityFeed.length > 20) this.activityFeed.pop();
    this.persist();
  }

  saveHints(hints: HintResponse) {
    this.lastAIHints = hints;
    // Hints might not need persistence, but we can if needed
  }

  // Getters for React state sync (simplified)
  getState() {
    return {
      notes: this.notes,
      tasks: [...this.tasks],
      teamPresence: [...this.teamPresence],
      activityFeed: [...this.activityFeed],
      comments: [...this.comments],
      goals: [...this.goals],
      lastAIHints: this.lastAIHints
    };
  }
}

export const collabStore = new CollabStore();
