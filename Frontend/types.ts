
export interface TaskItem {
  title: string;
  description: string;
  due_date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  recommended_next_action: string;
}

export interface ReplyOptions {
  professional: string;
  friendly: string;
  short_power_reply: string;
}

export interface MeetingData {
  is_meeting_related?: boolean;
  date?: string;
  time?: string;
  timezone?: string;
  agenda?: string;
  participants?: string[];
  suggested_alternatives?: string[];
  calendar_summary?: string;
}

export interface FollowUp {
  is_needed: boolean;
  when?: string;
  suggested_message?: string;
}

export interface FluxMailResponse {
  classification: string;
  confidence: number;
  sentiment: string;
  summary: string;
  task_items: TaskItem[];
  recommended_actions: string[];
  reply_options: ReplyOptions;
  meeting_data: MeetingData;
  follow_up: FollowUp;
}

export interface EmailInput {
  sender: string;
  subject: string;
  body: string;
}

/* --- Research Agent Types --- */

export interface Competitor {
  name: string;
  strengths: string;
  weaknesses: string;
  key_differentiator: string;
}

export interface ResearchResponse {
  query: string;
  summary: string;
  deep_insights: string[];
  key_points: string[];
  risks: string[];
  opportunities: string[];
  actionable_recommendations: string[];
  competitive_landscape: Competitor[];
  suggested_next_steps: string[];
  tone: string;
}

/* --- CRM Agent Types --- */

export interface CRMInput {
  lead_name: string;
  company: string;
  email: string;
  phone: string;
  deal_value: string;
  notes: string;
}

export interface CRMResponse {
  lead_name: string;
  company: string;
  email: string;
  phone: string;
  deal_value: string;
  probability: string;
  deal_stage: string;
  priority: string;
  notes: string;
  recommended_next_actions: string[];
  next_follow_up_in: string;
  auto_follow_up_message: string;
}

export interface FollowUpResponse {
  message: string;
  best_time_to_send: string;
  urgency_score: string;
}

/* --- Automation Agent Types --- */

export type TriggerType = 'email_received' | 'crm_lead_added' | 'schedule' | 'manual';
export type ActionType = 'send_email_reply' | 'update_crm' | 'run_research' | 'create_task';

export interface Trigger {
  type: TriggerType;
  conditions: string; // e.g. "subject contains 'Urgent'"
}

export interface Action {
  type: ActionType;
  parameters: string; // e.g. "priority: high"
}

export interface Workflow {
  id: string;
  workflow_name: string;
  trigger: Trigger;
  actions: Action[];
  status: 'active' | 'inactive';
}

export interface AutomationSuggestion {
  workflow_name: string;
  recommended_trigger: string;
  recommended_actions: string[];
  reasoning: string;
}

export interface ExecutionResult {
  workflow_name: string;
  steps_executed: string[];
  output_summary: string;
  success: boolean;
  timestamp: string;
}

/* --- Support Agent Types --- */

export interface SupportReplyOptions {
  professional: string;
  friendly: string;
  short_fix: string;
}

export interface SupportResponse {
  classification: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  urgency_level: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
  root_cause: string;
  suggested_resolution: string;
  internal_tasks: string[];
  reply_options: SupportReplyOptions;
  should_escalate: boolean;
  escalation_reason: string;
  faq_entry: string;
}

export interface SupportTicketInput {
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface FAQResponse {
  faqs: FAQItem[];
}

/* --- Analytics Agent Types --- */

export interface KPI {
  conversion_rate: string;
  lead_velocity: string;
  ticket_volume: string;
  avg_resolution_time: string;
  sentiment_score: string;
  email_response_speed: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface AnalyticsCharts {
  sentiment_trend: ChartPoint[];
  ticket_trend: ChartPoint[];
  lead_growth: ChartPoint[];
  response_time_trend: ChartPoint[];
}

export interface AnalyticsResponse {
  kpis: KPI;
  charts: AnalyticsCharts;
  insights: string[];
  forecast: string[];
  summary: string;
  warnings: string[];
  recommended_actions: string[];
}

/* --- Voice Agent Types --- */

export interface VoiceActionItem {
  title: string;
  owner: string;
  due_date: string;
  priority: string;
}

export interface VoiceEmailSuggestions {
  professional: string;
  friendly: string;
  short: string;
}

export interface FluxVoiceResponse {
  input_type: 'meeting' | 'call' | 'voice_command' | 'dictated_email' | 'notes';
  summary: string;
  participants: string[];
  key_points: string[];
  decisions: string[];
  action_items: VoiceActionItem[];
  suggested_follow_ups: string[];
  email_suggestion: VoiceEmailSuggestions;
  suggested_module_to_use: string; // e.g., "email", "crm", "support", "automation", "research", "none"
}

export interface VoiceCommandPlan {
  raw_command: string;
  interpreted_intent: string;
  target_module: string;
  parameters: Record<string, string>;
  natural_language_explanation: string;
}

/* --- FluxForge (Auto-App Builder) Types --- */

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface AppIntegration {
  menu_item: string;
  route_path: string;
  agent_usage: string[];
}

export interface AppPackage {
  app_name: string;
  app_description: string;
  recommended_route: string;
  file_structure: GeneratedFile[];
  integration: AppIntegration;
  run_instructions: string;
}

/* --- FluxAdmin (Admin Panel) Types --- */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface Team {
  id: string;
  name: string;
  members: number;
  lead: string;
}

export interface ApiKey {
  id: string;
  name: string;
  owner: string;
  created: string;
  prefix: string;
}

export interface SystemSettings {
  email_module: boolean;
  crm_module: boolean;
  research_module: boolean;
  automation_module: boolean;
  support_module: boolean;
  analytics_module: boolean;
  voice_module: boolean;
  forge_module: boolean;
  collab_module: boolean; // New
  analytics_refresh: '1h' | '6h' | '24h';
  automation_safety: 'Strict' | 'Flexible';
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'info' | 'warning' | 'error';
}

export interface AdminActionResponse {
  action_type: string;
  status: string;
  reasoning: string;
  suggested_next_steps: string[];
  affected_entities: string[];
}

/* --- FluxCollab (Collaboration Agent) Types --- */

export interface CollabAIResponse {
  event_summary: string;
  recommended_actions: string[];
  related_tasks: string[];
  affected_modules: string[];
}

export interface HintResponse {
  hints: string[];
  warnings: string[];
  opportunities: string[];
}

export interface CollabTask {
  id: string;
  title: string;
  owner: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface TeamMember {
  id: string;
  name: string;
  status: 'online' | 'away' | 'typing' | 'offline';
  role?: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'task' | 'note' | 'system' | 'comment';
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface Goal {
  id: string;
  text: string;
  progress: number; // 0-100
}
