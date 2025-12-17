
import { AppPackage } from "../types";

class ForgeStore {
  private history: AppPackage[] = [];
  private readonly KEY = 'neuroflux_forge_history';

  constructor() {
    const stored = localStorage.getItem(this.KEY);
    if (stored) {
      try {
        this.history = JSON.parse(stored);
      } catch (e) { console.error(e); }
    }
  }

  private persist() {
    localStorage.setItem(this.KEY, JSON.stringify(this.history));
  }

  saveGeneratedApp(app: AppPackage) {
    // Add to beginning of history
    this.history.unshift(app);
    // Keep max 10
    if (this.history.length > 10) this.history.pop();
    this.persist();
  }

  getHistory(): AppPackage[] {
    return [...this.history];
  }

  getLastGenerated(): AppPackage | null {
    return this.history.length > 0 ? this.history[0] : null;
  }
}

export const forgeStore = new ForgeStore();
