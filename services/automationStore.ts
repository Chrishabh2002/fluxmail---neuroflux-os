import { Workflow, ExecutionResult } from "../types";

class AutomationStore {
  private workflows: Workflow[] = [];
  private executionLogs: ExecutionResult[] = [];
  private readonly WF_KEY = 'neuroflux_automation_workflows';
  private readonly LOGS_KEY = 'neuroflux_automation_logs';

  constructor() {
    const storedWf = localStorage.getItem(this.WF_KEY);
    const storedLogs = localStorage.getItem(this.LOGS_KEY);

    if (storedWf) {
      try {
        this.workflows = JSON.parse(storedWf);
      } catch (e) { console.error(e); }
    }

    if (storedLogs) {
      try {
        this.executionLogs = JSON.parse(storedLogs);
      } catch (e) { console.error(e); }
    }
  }

  private persistWorkflows() {
    localStorage.setItem(this.WF_KEY, JSON.stringify(this.workflows));
  }

  private persistLogs() {
    localStorage.setItem(this.LOGS_KEY, JSON.stringify(this.executionLogs));
  }

  getWorkflows(): Workflow[] {
    return [...this.workflows];
  }

  saveWorkflow(workflow: Workflow) {
    const index = this.workflows.findIndex(w => w.id === workflow.id);
    if (index >= 0) {
      this.workflows[index] = workflow;
    } else {
      this.workflows.push(workflow);
    }
    this.persistWorkflows();
  }

  toggleStatus(id: string) {
    const wf = this.workflows.find(w => w.id === id);
    if (wf) {
      wf.status = wf.status === 'active' ? 'inactive' : 'active';
      this.persistWorkflows();
    }
  }

  logExecution(result: ExecutionResult) {
    this.executionLogs.unshift(result);
    // Keep last 50 logs
    if (this.executionLogs.length > 50) {
      this.executionLogs.pop();
    }
    this.persistLogs();
  }

  getLogs(): ExecutionResult[] {
    return [...this.executionLogs];
  }
}

export const automationStore = new AutomationStore();