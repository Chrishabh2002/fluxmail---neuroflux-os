import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title?: string;
  content: string;
  icon?: LucideIcon;
  variant?: 'default' | 'highlight' | 'accent';
}

export const ResearchCard: React.FC<Props> = ({ title, content, icon: Icon, variant = 'default' }) => {
  const styles = {
    default: "bg-slate-800/30 border-slate-700 text-slate-300",
    highlight: "bg-cyan-950/20 border-cyan-500/30 text-cyan-100",
    accent: "bg-indigo-950/20 border-indigo-500/30 text-indigo-100"
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[variant]} backdrop-blur-sm transition-all hover:border-opacity-60`}>
      <div className="flex items-start gap-3">
        {Icon && <Icon className="w-5 h-5 mt-0.5 opacity-80" />}
        <div className="flex-1">
          {title && <h4 className="font-semibold text-sm mb-1 opacity-90">{title}</h4>}
          <p className="text-sm leading-relaxed opacity-90">{content}</p>
        </div>
      </div>
    </div>
  );
};