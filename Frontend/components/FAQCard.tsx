
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQCard: React.FC<{ faq: FAQItem }> = ({ faq }) => (
  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-colors">
    <div className="flex items-start gap-3">
      <HelpCircle className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-1">{faq.question}</h4>
        <p className="text-sm text-slate-400 leading-relaxed mb-2">{faq.answer}</p>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          {faq.category}
        </span>
      </div>
    </div>
  </div>
);
