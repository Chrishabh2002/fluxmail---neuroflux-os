
import React, { useState } from 'react';
import { analyzeDataset } from '../services/geminiService';
import { AnalyticsResponse } from '../types';
import { KpiCard } from './KpiCard';
import { TrendChart } from './TrendChart';
import { InsightsList } from './InsightsList';
import { BusinessSummary } from './BusinessSummary';
import { 
  BarChart3, 
  PieChart, 
  UploadCloud, 
  Sparkles, 
  Database,
  Users,
  MessageSquare,
  Zap,
  Clock,
  Activity
} from 'lucide-react';

export const AnalyticsPanel: React.FC = () => {
  const [dataInput, setDataInput] = useState('');
  const [result, setResult] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!dataInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Parse JSON to ensure validity before sending
      let parsedData;
      try {
        parsedData = JSON.parse(dataInput);
      } catch (e) {
        throw new Error("Invalid JSON format. Please check your syntax.");
      }

      const response = await analyzeDataset(parsedData);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    const sample = {
      period: "Last 7 Days",
      email_stats: {
        received: 1450,
        responded: 1380,
        avg_response_time_mins: 24,
        sentiment_breakdown: { positive: 60, neutral: 30, negative: 10 }
      },
      crm_stats: {
        leads_added: 45,
        deals_closed: 8,
        total_revenue_new: 85000,
        lead_velocity_score: 8.5
      },
      support_stats: {
        tickets_opened: 120,
        tickets_resolved: 115,
        avg_resolution_time_hours: 3.5,
        satisfaction_score: 4.8
      },
      daily_trends: [
        { day: "Mon", sentiment: 0.8, tickets: 25, response_time: 30 },
        { day: "Tue", sentiment: 0.7, tickets: 30, response_time: 45 },
        { day: "Wed", sentiment: 0.85, tickets: 20, response_time: 20 },
        { day: "Thu", sentiment: 0.9, tickets: 15, response_time: 15 },
        { day: "Fri", sentiment: 0.6, tickets: 35, response_time: 50 },
        { day: "Sat", sentiment: 0.95, tickets: 5, response_time: 10 },
        { day: "Sun", sentiment: 0.95, tickets: 2, response_time: 10 }
      ]
    };
    setDataInput(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      
      {/* Left Input */}
      <div className="lg:col-span-4 h-full flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col shadow-xl">
           <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Database className="w-4 h-4" /> Data Source
                </h2>
                <button onClick={loadSampleData} className="text-xs text-cyan-600 hover:text-cyan-400 font-mono px-2 py-1 rounded hover:bg-cyan-950/30 transition-colors">
                    LOAD_MOCK_DATA
                </button>
            </div>

            <div className="flex-1 flex flex-col">
                <label className="text-xs text-slate-500 font-mono ml-1 mb-2">RAW JSON DATASET</label>
                <textarea 
                    className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
                    placeholder="{ 'sales': 100, 'leads': 50 ... }"
                    value={dataInput}
                    onChange={(e) => setDataInput(e.target.value)}
                />
            </div>

            <div className="mt-6">
                <button 
                    onClick={handleAnalyze}
                    disabled={loading || !dataInput}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                        loading || !dataInput
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-900/20'
                    }`}
                >
                    {loading ? (
                        <>
                            <Activity className="w-5 h-5 animate-spin" />
                            COMPUTING METRICS...
                        </>
                    ) : (
                        <>
                            <PieChart className="w-5 h-5" />
                            GENERATE DASHBOARD
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>

      {/* Right Dashboard */}
      <div className="lg:col-span-8 h-full flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 shadow-xl overflow-y-auto custom-scrollbar relative">
             {error && (
                <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-20 backdrop-blur-sm p-8">
                    <div className="bg-red-950/50 border border-red-500/30 p-6 rounded-xl text-center">
                        <p className="text-red-300 mb-4">{error}</p>
                        <button onClick={() => setError(null)} className="px-4 py-2 bg-red-900/40 rounded text-red-200 text-sm">Dismiss</button>
                    </div>
                </div>
            )}

            {!result && !loading && (
                 <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-10 h-10 opacity-30" />
                    </div>
                    <p className="font-mono text-sm opacity-50">NO DATASET LOADED</p>
                </div>
            )}

            {loading && (
                 <div className="h-full flex flex-col items-center justify-center text-pink-400 space-y-6">
                    <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
                    <div className="text-center space-y-1">
                        <p className="text-lg font-mono">FLUX_ANALYTICS ENGINE</p>
                        <p className="text-xs text-slate-500">Forecasting trends & detecting anomalies...</p>
                    </div>
                </div>
            )}

            {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Executive Summary */}
                    <BusinessSummary summary={result.summary} />

                    {/* KPI Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <KpiCard title="Conversion Rate" value={result.kpis.conversion_rate} trend="up" color="text-emerald-400" icon={Zap} />
                        <KpiCard title="Lead Velocity" value={result.kpis.lead_velocity} trend="up" color="text-blue-400" icon={Users} />
                        <KpiCard title="Ticket Volume" value={result.kpis.ticket_volume} trend="down" color="text-orange-400" icon={MessageSquare} />
                        <KpiCard title="Avg Resolution" value={result.kpis.avg_resolution_time} trend="down" color="text-purple-400" icon={Clock} />
                        <KpiCard title="Sentiment Score" value={result.kpis.sentiment_score} trend="neutral" color="text-pink-400" icon={Sparkles} />
                        <KpiCard title="Response Speed" value={result.kpis.email_response_speed} trend="up" color="text-cyan-400" icon={Zap} />
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TrendChart title="Sentiment Trend (7 Days)" data={result.charts.sentiment_trend} color="#f472b6" type="line" />
                        <TrendChart title="Ticket Volume Trend" data={result.charts.ticket_trend} color="#fb923c" type="bar" />
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <TrendChart title="Lead Growth Velocity" data={result.charts.lead_growth} color="#60a5fa" type="line" />
                         <TrendChart title="Response Time Analysis" data={result.charts.response_time_trend} color="#c084fc" type="bar" />
                    </div>

                    {/* Deep Insights */}
                    <InsightsList 
                        insights={result.insights}
                        warnings={result.warnings}
                        recommendations={result.recommended_actions}
                    />

                    {/* Forecast */}
                    {result.forecast.length > 0 && (
                        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                             <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                <Sparkles className="w-4 h-4 text-yellow-400" /> AI Future Forecast
                             </h4>
                             <ul className="space-y-2">
                                {result.forecast.map((f, i) => (
                                    <li key={i} className="text-sm text-slate-400 italic">"{f}"</li>
                                ))}
                             </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
