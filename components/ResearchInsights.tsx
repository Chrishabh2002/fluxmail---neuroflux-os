import React from 'react';
import { ResearchResponse } from '../types';
import { ResearchCard } from './ResearchCard';
import { RiskCard } from './RiskCard';
import { OpportunityCard } from './OpportunityCard';
import { CompetitiveTable } from './CompetitiveTable';
import { 
  Lightbulb, 
  Target, 
  ListChecks, 
  ShieldAlert, 
  TrendingUp,
  LayoutDashboard,
  BrainCircuit
} from 'lucide-react';

interface Props {
  data: ResearchResponse;
}

export const ResearchInsights: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Summary */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Executive Summary
            </h3>
            <span className="text-xs bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-slate-400">
                Tone: {data.tone}
            </span>
        </div>
        <p className="text-lg text-slate-100 leading-relaxed font-light">{data.summary}</p>
      </div>

      {/* Deep Insights */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> Deep Insights
        </h3>
        <div className="grid gap-3">
            {data.deep_insights.map((insight, i) => (
                <ResearchCard key={i} content={insight} variant="highlight" />
            ))}
        </div>
      </div>

      {/* Key Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4" /> Key Points
            </h3>
            {data.key_points.map((point, i) => (
                <ResearchCard key={i} content={point} />
            ))}
        </div>
        
        <div className="space-y-3">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Actionable Recs
            </h3>
            {data.actionable_recommendations.map((rec, i) => (
                <ResearchCard key={i} content={rec} variant="accent" />
            ))}
        </div>
      </div>

      {/* Risks & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-red-400/80 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Risks & Threats
            </h3>
            {data.risks.map((risk, i) => (
                <RiskCard key={i} content={risk} />
            ))}
        </div>
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-400/80 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Opportunities
            </h3>
            {data.opportunities.map((opp, i) => (
                <OpportunityCard key={i} content={opp} />
            ))}
        </div>
      </div>

      {/* Competitive Landscape */}
      {data.competitive_landscape.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Competitive Landscape
            </h3>
            <CompetitiveTable competitors={data.competitive_landscape} />
          </div>
      )}

      {/* Next Steps */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
         <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
            <ListChecks className="w-4 h-4" /> Suggested Next Steps
         </h3>
         <ul className="space-y-2">
            {data.suggested_next_steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-cyan-500 font-bold">•</span>
                    {step}
                </li>
            ))}
         </ul>
      </div>

    </div>
  );
};