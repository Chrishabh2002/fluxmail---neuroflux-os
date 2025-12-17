
import { FluxVoiceResponse } from "../types";

class VoiceStore {
  private transcripts: { text: string; analysis: FluxVoiceResponse }[] = [];
  private readonly KEY = 'neuroflux_voice_transcripts';

  constructor() {
    const stored = localStorage.getItem(this.KEY);
    if (stored) {
      try { this.transcripts = JSON.parse(stored); } catch (e) { console.error(e); }
    }
  }

  private persist() {
    localStorage.setItem(this.KEY, JSON.stringify(this.transcripts));
  }

  saveTranscript(text: string, analysis: FluxVoiceResponse) {
    this.transcripts.unshift({ text, analysis });
    if (this.transcripts.length > 20) this.transcripts.pop();
    this.persist();
  }

  getHistory() {
    return [...this.transcripts];
  }

  getLastAnalysis(): FluxVoiceResponse | null {
    return this.transcripts.length > 0 ? this.transcripts[0].analysis : null;
  }
}

export const voiceStore = new VoiceStore();
