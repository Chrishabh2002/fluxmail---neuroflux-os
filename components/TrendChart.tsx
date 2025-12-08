
import React from 'react';
import { ChartPoint } from '../types';

interface Props {
  data: ChartPoint[];
  color: string;
  title: string;
  type?: 'line' | 'bar';
}

export const TrendChart: React.FC<Props> = ({ data, color, title, type = 'line' }) => {
  const height = 150;
  const width = 300;
  const padding = 20;

  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
  const minValue = Math.min(...data.map(d => d.value)) * 0.9;
  
  // Normalize points
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.value - minValue) / (maxValue - minValue)) * (height - 2 * padding);
    return { x, y, val: d.value, label: d.label };
  });

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 w-full text-left">{title}</h4>
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Grid Lines */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
            <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#334155" strokeWidth="1" />
            
            {type === 'line' && (
                <>
                    <path d={areaD} fill={color} fillOpacity="0.1" />
                    <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0f172a" stroke={color} strokeWidth="2" />
                    ))}
                </>
            )}

            {type === 'bar' && points.map((p, i) => {
                const barWidth = (width - 2 * padding) / data.length * 0.6;
                const barHeight = height - padding - p.y;
                return (
                    <rect 
                        key={i} 
                        x={p.x - barWidth / 2} 
                        y={p.y} 
                        width={barWidth} 
                        height={barHeight} 
                        fill={color} 
                        fillOpacity="0.8"
                        rx="2"
                    />
                );
            })}
        </svg>
        
        {/* X-Axis Labels */}
        <div className="flex justify-between px-2 mt-2">
            {points.filter((_, i) => i % Math.ceil(data.length / 4) === 0).map((p, i) => (
                <span key={i} className="text-[10px] text-slate-500 font-mono">{p.label}</span>
            ))}
        </div>
      </div>
    </div>
  );
};
