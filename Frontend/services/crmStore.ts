import { CRMResponse } from "../types";

// In-memory mock database
class CRMStore {
  private leads: CRMResponse[] = [];
  private readonly STORAGE_KEY = 'neuroflux_crm_leads';

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.leads = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse CRM leads", e);
      }
    }
  }

  private persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.leads));
  }

  saveLead(lead: CRMResponse) {
    // Check if lead exists by email, update if so, else push
    const index = this.leads.findIndex(l => l.email === lead.email && lead.email !== "");
    if (index >= 0) {
      this.leads[index] = lead;
    } else {
      this.leads.push(lead);
    }
    this.persist();
  }

  getLeads(): CRMResponse[] {
    return this.leads;
  }

  getLeadByEmail(email: string): CRMResponse | undefined {
    return this.leads.find(l => l.email === email);
  }
}

export const crmStore = new CRMStore();