
import { SupportResponse, FAQItem } from "../types";

class SupportStore {
  private tickets: SupportResponse[] = [];
  private faqs: FAQItem[] = [];
  private readonly TICKET_KEY = 'neuroflux_support_tickets';
  private readonly FAQ_KEY = 'neuroflux_support_faqs';

  constructor() {
    const storedTickets = localStorage.getItem(this.TICKET_KEY);
    const storedFaqs = localStorage.getItem(this.FAQ_KEY);
    if (storedTickets) {
      try { this.tickets = JSON.parse(storedTickets); } catch (e) { console.error(e); }
    }
    if (storedFaqs) {
      try { this.faqs = JSON.parse(storedFaqs); } catch (e) { console.error(e); }
    }
  }

  private persistTickets() {
    localStorage.setItem(this.TICKET_KEY, JSON.stringify(this.tickets));
  }

  private persistFaqs() {
    localStorage.setItem(this.FAQ_KEY, JSON.stringify(this.faqs));
  }

  saveTicket(ticket: SupportResponse) {
    this.tickets.unshift(ticket);
    // Keep only last 50
    if (this.tickets.length > 50) this.tickets.pop();
    this.persistTickets();
  }

  getTickets(): SupportResponse[] {
    return [...this.tickets];
  }

  saveFAQs(newFaqs: FAQItem[]) {
    this.faqs = [...newFaqs, ...this.faqs];
    // De-duplicate loosely based on question text
    this.faqs = this.faqs.filter((v, i, a) => a.findIndex(t => t.question === v.question) === i);
    this.persistFaqs();
  }

  getFAQs(): FAQItem[] {
    return [...this.faqs];
  }
}

export const supportStore = new SupportStore();
