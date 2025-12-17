
import { GoogleGenAI, Type, Schema } from "@google/genai";
import {
  FluxMailResponse, EmailInput,
  ResearchResponse,
  CRMInput, CRMResponse, FollowUpResponse,
  AutomationSuggestion, ExecutionResult, Workflow,
  SupportResponse, SupportTicketInput, FAQResponse,
  AnalyticsResponse, FluxVoiceResponse, VoiceCommandPlan,
  AppPackage, AdminActionResponse, CollabAIResponse, HintResponse
} from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const emailResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "One of: Important, Urgent, Follow-Up Required, FYI, Promotional, Spam, Meeting-Related, Negotiation, Customer Inquiry",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 1",
    },
    sentiment: {
      type: Type.STRING,
      description: "Tone of the email, e.g., Professional, Angry, Urgent, Casual",
    },
    summary: {
      type: Type.STRING,
      description: "Concise summary of the email content",
    },
    task_items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          due_date: { type: Type.STRING, description: "YYYY-MM-DD or 'None'" },
          priority: { type: Type.STRING, description: "Low, Medium, High, or Critical" },
          recommended_next_action: { type: Type.STRING },
        },
        required: ["title", "priority", "recommended_next_action"],
      },
    },
    recommended_actions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    reply_options: {
      type: Type.OBJECT,
      properties: {
        professional: { type: Type.STRING },
        friendly: { type: Type.STRING },
        short_power_reply: { type: Type.STRING, description: "10-20 words max" },
      },
      required: ["professional", "friendly", "short_power_reply"],
    },
    meeting_data: {
      type: Type.OBJECT,
      properties: {
        is_meeting_related: { type: Type.BOOLEAN },
        date: { type: Type.STRING },
        time: { type: Type.STRING },
        timezone: { type: Type.STRING },
        agenda: { type: Type.STRING },
        participants: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggested_alternatives: { type: Type.ARRAY, items: { type: Type.STRING } },
        calendar_summary: { type: Type.STRING },
      },
    },
    follow_up: {
      type: Type.OBJECT,
      properties: {
        is_needed: { type: Type.BOOLEAN },
        when: { type: Type.STRING, description: "e.g., '24 hours', 'Next Monday'" },
        suggested_message: { type: Type.STRING },
      },
      required: ["is_needed"],
    },
  },
  required: [
    "classification",
    "confidence",
    "sentiment",
    "summary",
    "task_items",
    "reply_options",
    "follow_up",
  ],
};

const researchResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    query: { type: Type.STRING },
    summary: { type: Type.STRING, description: "Executive summary of the research topic." },
    deep_insights: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Complex, multi-layered insights." },
    key_points: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Main takeaways." },
    risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Potential pitfalls, threats, or downsides." },
    opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Growth areas, upsides, or strategic advantages." },
    actionable_recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Concrete steps to take." },
    competitive_landscape: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          strengths: { type: Type.STRING },
          weaknesses: { type: Type.STRING },
          key_differentiator: { type: Type.STRING },
        },
        required: ["name", "strengths", "weaknesses", "key_differentiator"],
      },
      description: "Analysis of competitors or alternatives."
    },
    suggested_next_steps: { type: Type.ARRAY, items: { type: Type.STRING } },
    tone: { type: Type.STRING, description: "The analytical tone used, e.g. Strategic, Cautionary." },
  },
  required: [
    "query",
    "summary",
    "deep_insights",
    "key_points",
    "risks",
    "opportunities",
    "actionable_recommendations",
    "competitive_landscape",
    "suggested_next_steps",
    "tone"
  ]
};

const crmResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    lead_name: { type: Type.STRING },
    company: { type: Type.STRING },
    email: { type: Type.STRING },
    phone: { type: Type.STRING },
    deal_value: { type: Type.STRING },
    probability: { type: Type.STRING, description: "Percentage likelihood of closing, e.g., '75%'" },
    deal_stage: { type: Type.STRING, description: "e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won" },
    priority: { type: Type.STRING, description: "High, Medium, Low" },
    notes: { type: Type.STRING },
    recommended_next_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
    next_follow_up_in: { type: Type.STRING },
    auto_follow_up_message: { type: Type.STRING },
  },
  required: [
    "lead_name",
    "probability",
    "deal_stage",
    "priority",
    "recommended_next_actions",
    "auto_follow_up_message"
  ]
};

const followUpResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    message: { type: Type.STRING },
    best_time_to_send: { type: Type.STRING },
    urgency_score: { type: Type.STRING },
  },
  required: ["message", "best_time_to_send", "urgency_score"]
};

const automationSuggestionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    workflow_name: { type: Type.STRING },
    recommended_trigger: { type: Type.STRING, description: "Suggest one: email_received, crm_lead_added, schedule, manual" },
    recommended_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
    reasoning: { type: Type.STRING },
  },
  required: ["workflow_name", "recommended_trigger", "recommended_actions", "reasoning"]
};

const executionResultSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    workflow_name: { type: Type.STRING },
    steps_executed: { type: Type.ARRAY, items: { type: Type.STRING } },
    output_summary: { type: Type.STRING },
    success: { type: Type.BOOLEAN },
    timestamp: { type: Type.STRING },
  },
  required: ["workflow_name", "steps_executed", "output_summary", "success", "timestamp"]
};

const supportResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    classification: { type: Type.STRING, description: "Bug, Complaint, Query, Feedback, Urgent Issue" },
    sentiment: { type: Type.STRING, description: "positive, neutral, negative, mixed" },
    urgency_level: { type: Type.STRING, description: "Low, Medium, High, Critical" },
    summary: { type: Type.STRING },
    root_cause: { type: Type.STRING, description: "Probable technical or process cause" },
    suggested_resolution: { type: Type.STRING },
    internal_tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
    reply_options: {
      type: Type.OBJECT,
      properties: {
        professional: { type: Type.STRING },
        friendly: { type: Type.STRING },
        short_fix: { type: Type.STRING },
      },
      required: ["professional", "friendly", "short_fix"],
    },
    should_escalate: { type: Type.BOOLEAN },
    escalation_reason: { type: Type.STRING },
    faq_entry: { type: Type.STRING, description: "A Q&A pair formatted for FAQs" },
  },
  required: ["classification", "sentiment", "urgency_level", "summary", "suggested_resolution", "reply_options"]
};

const faqResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    faqs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          category: { type: Type.STRING },
        },
        required: ["question", "answer", "category"]
      }
    }
  },
  required: ["faqs"]
};

const chartPointSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    label: { type: Type.STRING },
    value: { type: Type.NUMBER },
  },
  required: ["label", "value"]
};

const analyticsResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    kpis: {
      type: Type.OBJECT,
      properties: {
        conversion_rate: { type: Type.STRING },
        lead_velocity: { type: Type.STRING },
        ticket_volume: { type: Type.STRING },
        avg_resolution_time: { type: Type.STRING },
        sentiment_score: { type: Type.STRING },
        email_response_speed: { type: Type.STRING },
      },
      required: ["conversion_rate", "lead_velocity", "ticket_volume", "avg_resolution_time", "sentiment_score", "email_response_speed"]
    },
    charts: {
      type: Type.OBJECT,
      properties: {
        sentiment_trend: { type: Type.ARRAY, items: chartPointSchema },
        ticket_trend: { type: Type.ARRAY, items: chartPointSchema },
        lead_growth: { type: Type.ARRAY, items: chartPointSchema },
        response_time_trend: { type: Type.ARRAY, items: chartPointSchema },
      },
      required: ["sentiment_trend", "ticket_trend", "lead_growth", "response_time_trend"]
    },
    insights: { type: Type.ARRAY, items: { type: Type.STRING } },
    forecast: { type: Type.ARRAY, items: { type: Type.STRING } },
    summary: { type: Type.STRING },
    warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommended_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["kpis", "charts", "insights", "forecast", "summary", "warnings", "recommended_actions"]
};

const fluxVoiceResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    input_type: { type: Type.STRING, description: "meeting | call | voice_command | dictated_email | notes" },
    summary: { type: Type.STRING },
    participants: { type: Type.ARRAY, items: { type: Type.STRING } },
    key_points: { type: Type.ARRAY, items: { type: Type.STRING } },
    decisions: { type: Type.ARRAY, items: { type: Type.STRING } },
    action_items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          owner: { type: Type.STRING },
          due_date: { type: Type.STRING },
          priority: { type: Type.STRING }
        },
        required: ["title", "owner", "due_date", "priority"]
      }
    },
    suggested_follow_ups: { type: Type.ARRAY, items: { type: Type.STRING } },
    email_suggestion: {
      type: Type.OBJECT,
      properties: {
        professional: { type: Type.STRING },
        friendly: { type: Type.STRING },
        short: { type: Type.STRING }
      },
      required: ["professional", "friendly", "short"]
    },
    suggested_module_to_use: { type: Type.STRING, description: "email, crm, support, automation, research, or none" }
  },
  required: ["input_type", "summary", "action_items", "suggested_module_to_use", "email_suggestion"]
};

const voiceCommandPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    raw_command: { type: Type.STRING },
    interpreted_intent: { type: Type.STRING },
    target_module: { type: Type.STRING },
    parameters: { type: Type.OBJECT, properties: {}, description: "Key-value pairs extracted parameters" },
    natural_language_explanation: { type: Type.STRING }
  },
  required: ["raw_command", "interpreted_intent", "target_module", "natural_language_explanation"]
};

const appPackageSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    app_name: { type: Type.STRING },
    app_description: { type: Type.STRING },
    recommended_route: { type: Type.STRING },
    file_structure: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          path: { type: Type.STRING, description: "File path, e.g., 'src/components/MyComponent.tsx'" },
          content: { type: Type.STRING, description: "Full source code content of the file." },
        },
        required: ["path", "content"],
      },
    },
    integration: {
      type: Type.OBJECT,
      properties: {
        menu_item: { type: Type.STRING },
        route_path: { type: Type.STRING },
        agent_usage: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["menu_item", "route_path", "agent_usage"],
    },
    run_instructions: { type: Type.STRING },
  },
  required: ["app_name", "app_description", "recommended_route", "file_structure", "integration", "run_instructions"],
};

const adminActionResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    action_type: { type: Type.STRING },
    status: { type: Type.STRING },
    reasoning: { type: Type.STRING },
    suggested_next_steps: { type: Type.ARRAY, items: { type: Type.STRING } },
    affected_entities: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["action_type", "status", "reasoning", "suggested_next_steps", "affected_entities"]
};

const collabAIResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    event_summary: { type: Type.STRING },
    recommended_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
    related_tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
    affected_modules: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["event_summary", "recommended_actions", "related_tasks", "affected_modules"]
};

const hintResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hints: { type: Type.ARRAY, items: { type: Type.STRING } },
    warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
    opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["hints", "warnings", "opportunities"]
};


/* --- USAGE LIMIT HELPERS --- */

const API_URL = 'http://localhost:5003/api';

const checkUsage = async () => {
  const token = localStorage.getItem('neuroflux_token');
  if (!token) return; // Allow if no token (e.g. public demo), or handle auth error elsewhere

  try {
    const res = await fetch(`${API_URL}/user/usage/check`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    if (!data.allowed) {
      throw new Error("USAGE_LIMIT_EXCEEDED");
    }
  } catch (error: any) {
    if (error.message === "USAGE_LIMIT_EXCEEDED") throw error;
    console.error("Usage check failed:", error);
    // Fail open or closed? Closed for safety.
  }
};

const incrementUsage = async () => {
  const token = localStorage.getItem('neuroflux_token');
  if (!token) return;

  try {
    await fetch(`${API_URL}/user/usage/increment`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Failed to increment usage:", error);
  }
};

/* --- EMAIL AGENT --- */

export const analyzeEmail = async (email: EmailInput): Promise<FluxMailResponse> => {
  await checkUsage(); // Enforce Limit

  const model = "gemini-2.5-flash";
  const prompt = `
    Analyze the following email:
    
    Sender: ${email.sender}
    Subject: ${email.subject}
    Body:
    ${email.body}
    
    Adhere strictly to the JSON schema provided. 
    Ensure privacy and security; do not hallucinate PII.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: emailResponseSchema,
        systemInstruction: `
You are “FluxMail”, an autonomous email-processing agent inside the NeuroFlux OS. 
Your core purpose is to intelligently read emails, classify them, extract tasks, 
detect intent, generate responses, and maintain context across long email threads.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");

    await incrementUsage(); // Count Usage

    return JSON.parse(text) as FluxMailResponse;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

/* --- RESEARCH AGENT --- */

export const analyzeResearch = async (query: string): Promise<ResearchResponse> => {
  await checkUsage();
  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Perform a deep dive research analysis on the following topic/query:\n\n"${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: researchResponseSchema,
        systemInstruction: `
You are FluxResearch, an elite autonomous research analyst inside NeuroFlux OS.
Your job is to analyze any topic and produce expert-level insights, structured
breakdowns, competitive mapping, risks, opportunities, and actionable recommendations.

You think in multi-layer reasoning, are highly analytical, and never hallucinate.
If needed, ask for clarification to avoid incorrect output.
`,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Research Agent");

    await incrementUsage();
    return JSON.parse(text) as ResearchResponse;

  } catch (error) {
    console.error("FluxResearch Error:", error);
    throw error;
  }
};

/* --- CRM AGENT --- */

export const analyzeLead = async (leadData: CRMInput): Promise<CRMResponse> => {
  const model = "gemini-3-pro-preview"; // Using Pro for deeper business reasoning

  const prompt = `
    Analyze the following lead and business opportunity:
    
    Name: ${leadData.lead_name}
    Company: ${leadData.company}
    Email: ${leadData.email}
    Phone: ${leadData.phone}
    Estimated Deal Value: ${leadData.deal_value}
    Raw Notes/Context: 
    ${leadData.notes}
    
    Extract insights, determine the deal stage, probability, and priority.
    Generate a recommended sales strategy.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: crmResponseSchema,
        systemInstruction: `
You are FluxCRM, an autonomous sales and CRM intelligence agent inside NeuroFlux OS.
You understand lead data, extract opportunities, predict close probability, assign deal
stages, generate follow-ups, and create recommended next actions. 
You behave like a senior sales strategist with deep business intuition.
        `,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from CRM Agent");
    return JSON.parse(text) as CRMResponse;

  } catch (error) {
    console.error("FluxCRM Error:", error);
    throw error;
  }
};

export const generateFollowUp = async (leadContext: string): Promise<FollowUpResponse> => {
  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Generate a sales follow-up strategy and message based on this context:\n\n${leadContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: followUpResponseSchema,
        systemInstruction: `You are FluxCRM. Generate a high-converting, personalized follow-up message.`,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from CRM Agent");
    return JSON.parse(text) as FollowUpResponse;

  } catch (error) {
    console.error("FluxCRM FollowUp Error:", error);
    throw error;
  }
};

/* --- AUTOMATION AGENT --- */

export const analyzeAutomationIdea = async (userInput: string): Promise<AutomationSuggestion> => {
  const model = "gemini-3-pro-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `User request for automation: "${userInput}". Suggest a robust workflow.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: automationSuggestionSchema,
        systemInstruction: `
You are FluxAutomate — NeuroFlux OS’s autonomous workflow automation engineer.
You convert business rules, user descriptions, and tasks into executable workflows.
You understand triggers, actions, dependencies, CRM integration, email chains,
and research pipelines. You behave like a senior automation architect.
                `,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Automation Agent");
    return JSON.parse(text) as AutomationSuggestion;

  } catch (error) {
    console.error("FluxAutomate Error:", error);
    throw error;
  }
};

export const executeWorkflow = async (workflow: Workflow): Promise<ExecutionResult> => {
  const model = "gemini-3-pro-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `
                Simulate the execution of the following workflow logic. 
                Assume standard successful conditions for external API calls (CRM, Email, etc.).
                
                Workflow Definition:
                ${JSON.stringify(workflow, null, 2)}
            `,
      config: {
        responseMimeType: "application/json",
        responseSchema: executionResultSchema,
        systemInstruction: `
You are the execution engine for FluxAutomate. 
Simulate the step-by-step execution of the provided workflow.
Log each step, summarize the output, and determine success/failure.
Return a realistic timestamp.
                `,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Execution Engine");
    return JSON.parse(text) as ExecutionResult;

  } catch (error) {
    console.error("FluxAutomate Execution Error:", error);
    throw error;
  }
};

/* --- SUPPORT AGENT --- */

export const analyzeSupportTicket = async (ticketText: string): Promise<SupportResponse> => {
  const model = "gemini-3-pro-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze the following support ticket:\n\n"${ticketText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: supportResponseSchema,
        systemInstruction: `
You are FluxSupport — NeuroFlux OS’s autonomous customer support AI.
You classify tickets, detect sentiment and urgency, generate helpful replies,
create internal action items, and escalate issues when necessary.
You behave like a professional Level 2 support engineer.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Support Agent");
    return JSON.parse(text) as SupportResponse;
  } catch (error) {
    console.error("FluxSupport Analysis Error:", error);
    throw error;
  }
};

export const generateSupportFAQ = async (historyContext: string): Promise<FAQResponse> => {
  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Generate a list of FAQs based on these recent tickets and themes:\n\n${historyContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: faqResponseSchema,
        systemInstruction: `
You are FluxSupport. Identify common patterns and generate a helpful FAQ section.
Keep answers concise and solution-oriented.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Support Agent (FAQ)");
    return JSON.parse(text) as FAQResponse;
  } catch (error) {
    console.error("FluxSupport FAQ Error:", error);
    throw error;
  }
};

/* --- ANALYTICS AGENT --- */

export const analyzeDataset = async (dataset: any): Promise<AnalyticsResponse> => {
  const model = "gemini-3-pro-preview"; // High reasoning required for insights

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `
                Analyze the following business dataset and extract KPIs, trends, and executive insights.
                
                Dataset:
                ${JSON.stringify(dataset, null, 2)}
                
                Generate a CEO-level dashboard summary, detect risks, and forecast future trends based on the data patterns.
            `,
      config: {
        responseMimeType: "application/json",
        responseSchema: analyticsResponseSchema,
        systemInstruction: `
You are FluxAnalytics — an autonomous analytics and business intelligence engine 
inside NeuroFlux OS. You analyze datasets, extract KPIs, generate insights, create 
visualizations, detect anomalies, and forecast trends. 
Your thinking resembles a senior data analyst + business strategist.
                `,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Analytics Agent");
    return JSON.parse(text) as AnalyticsResponse;

  } catch (error) {
    console.error("FluxAnalytics Error:", error);
    throw error;
  }
};

/* --- VOICE AGENT --- */

export const analyzeVoiceInput = async (transcript: string): Promise<FluxVoiceResponse> => {
  const model = "gemini-3-pro-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze the following voice input/transcript:\n\n"${transcript}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: fluxVoiceResponseSchema,
        systemInstruction: `
You are FluxVoice — the autonomous voice and meeting intelligence agent inside NeuroFlux OS.
You receive transcripts of calls, meetings, or spoken commands. You detect whether the text
is a meeting/call, a voice command, a dictated email, or general notes. You summarize,
extract tasks and decisions, generate follow-ups, and route actions to the right module
(Email, CRM, Support, Automation, Research). You behave like a world-class meeting assistant
and voice operations specialist.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Voice Agent");
    return JSON.parse(text) as FluxVoiceResponse;
  } catch (error) {
    console.error("FluxVoice Analysis Error:", error);
    throw error;
  }
};

export const interpretVoiceCommand = async (commandText: string): Promise<VoiceCommandPlan> => {
  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Interpret this voice command for the OS:\n\n"${commandText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: voiceCommandPlanSchema,
        systemInstruction: `
You are FluxVoice. Interpret short user voice commands to determine the user's intent,
the target module (Email, CRM, etc), and the parameters they are providing.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Voice Command Interpreter");
    return JSON.parse(text) as VoiceCommandPlan;
  } catch (error) {
    console.error("FluxVoice Command Error:", error);
    throw error;
  }
};

/* --- FLUX FORGE (AUTO-APP BUILDER) --- */

export const generateMiniApp = async (userRequest: string): Promise<AppPackage> => {
  const model = "gemini-3-pro-preview"; // Needs strong code generation capabilities

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `
        User Request: "${userRequest}"

        Create a complete, single-file or multi-file React application package based on this request.
        The code should be production-ready, using TailwindCSS for styling and React functional components.
        If multiple components are needed, provide them as separate files in the 'file_structure' array.
        Ensure the 'recommended_route' and 'integration' fields are filled out correctly for seamless insertion into NeuroFlux OS.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: appPackageSchema,
        systemInstruction: `
You are FluxForge — NeuroFlux OS’s autonomous meta-app builder. 
You convert user instructions into complete app packages, with production-ready 
React + TypeScript + Tailwind code, file structures, routing plans, and integration 
guidelines. You behave like a senior full-stack engineer who understands modular 
architecture and can generate scalable UI/logic components.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from FluxForge");
    return JSON.parse(text) as AppPackage;
  } catch (error) {
    console.error("FluxForge Error:", error);
    throw error;
  }
};

/* --- FLUX ADMIN (ADMIN AGENT) --- */

export const analyzeAdminAction = async (request: string): Promise<AdminActionResponse> => {
  const model = "gemini-3-pro-preview";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `User Admin Command: "${request}". Analyze and suggest execution plan.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: adminActionResponseSchema,
        systemInstruction: `
You are FluxAdmin — the enterprise administration agent of NeuroFlux OS.
You understand user management, roles, permissions, teams, API keys, and system policies.
You behave like a senior platform administrator who ensures secure and smooth operation.
        `,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from FluxAdmin");
    return JSON.parse(text) as AdminActionResponse;
  } catch (error) {
    console.error("FluxAdmin Error:", error);
    throw error;
  }
};

/* --- FLUX COLLAB (COLLABORATION AGENT) --- */

export const analyzeCollaborationEvent = async (event: any): Promise<CollabAIResponse> => {
  const model = "gemini-3-pro-preview";
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze this collaboration event/action: ${JSON.stringify(event)}. Suggest implications.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: collabAIResponseSchema,
        systemInstruction: `
You are FluxCollab — the realtime collaboration intelligence inside NeuroFlux OS.
You help teams coordinate, share ideas, track actions, and stay aligned. You observe
team updates, generate insights, detect patterns, and recommend next steps. Your
thinking resembles a strategic project manager + collaboration facilitator.
        `
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from FluxCollab");
    return JSON.parse(text) as CollabAIResponse;
  } catch (error) {
    console.error("FluxCollab Event Error:", error);
    throw error;
  }
};

export const generateCollaborationHints = async (teamState: any): Promise<HintResponse> => {
  const model = "gemini-2.5-flash";
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Based on the current team state: ${JSON.stringify(teamState)}, generate strategic hints.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: hintResponseSchema,
        systemInstruction: "You are FluxCollab. Generate helpful, concise hints to improve team flow."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from FluxCollab Hints");
    return JSON.parse(text) as HintResponse;
  } catch (error) {
    console.error("FluxCollab Hint Error:", error);
    throw error;
  }
};
