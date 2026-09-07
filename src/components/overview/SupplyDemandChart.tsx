import React, { useState } from 'react';
import type { SupplyDemandPoint } from '../../types/overview';

interface SupplyDemandChartProps {
  monthlyData: SupplyDemandPoint[];
  weeklyData: SupplyDemandPoint[];
  summary: {
    deficitText: string;
    peakDemandText: string;
    model: string;
  };
}

export const SupplyDemandChart: React.FC<SupplyDemandChartProps> = ({
  monthlyData,
  weeklyData,
  summary,
}) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'weekly'>('monthly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeData = timeframe === 'monthly' ? monthlyData : weeklyData;

  // Coordinate mapping for 8 points across width 740, height 220
  // X range: 60 to 705
  const xCoords = [60, 150, 240, 330, 420, 515, 610, 705];
  // Y range: 100k MT = Y 20, 40k MT = Y 155, 0 = Y 190 (scaling: y = 190 - (val / 100000) * 170)
  const getY = (val: number | null) => {
    if (val === null) return 190;
    return Math.round(190 - (val / 110000) * 170);
  };

  // Build path strings
  // Historical supply (points 0..4)
  const histSupplyPts = activeData
    .slice(0, 5)
    .map((d, i) => `${xCoords[i]} ${getY(d.histSupply)}`);
  const histSupplyPath = histSupplyPts.length > 0 ? `M ${histSupplyPts.join(' L ')}` : '';

  // Forecast supply (points 4..7)
  const forecastSupplyPts = activeData
    .slice(4)
    .map((d, i) => `${xCoords[i + 4]} ${getY(d.forecastSupply)}`);
  const forecastSupplyPath = forecastSupplyPts.length > 0 ? `M ${forecastSupplyPts.join(' L ')}` : '';

  // Historical demand (points 0..4)
  const histDemandPts = activeData
    .slice(0, 5)
    .map((d, i) => `${xCoords[i]} ${getY(d.histDemand)}`);
  const histDemandPath = histDemandPts.length > 0 ? `M ${histDemandPts.join(' L ')}` : '';

  // Forecast demand (points 4..7)
  const forecastDemandPts = activeData
    .slice(4)
    .map((d, i) => `${xCoords[i + 4]} ${getY(d.forecastDemand)}`);
  const forecastDemandPath = forecastDemandPts.length > 0 ? `M ${forecastDemandPts.join(' L ')}` : '';

  const hoveredItem = hoveredIndex !== null ? activeData[hoveredIndex] : null;

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded border border-outline-variant/40 shadow-sm p-space-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-outline-variant/30 pb-space-xs">
          <div>
            <h2 className="font-headline-md text-headline-md font-semibold text-primary">
              Supply vs Demand
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Actual throughput and forecasted allocation across monitored aggregate tonnage.
            </p>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="inline-flex rounded border border-outline-variant/50 p-0.5 bg-surface-container-low text-on-surface">
              <button
                type="button"
                onClick={() => setTimeframe('monthly')}
                className={`px-space-sm py-0.5 rounded text-body-sm font-body-sm transition-all ${
                  timeframe === 'monthly'
                    ? 'font-medium bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('weekly')}
                className={`px-space-sm py-0.5 rounded text-body-sm font-body-sm transition-all ${
                  timeframe === 'weekly'
                    ? 'font-medium bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-space-md my-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#0f2942]"></span>
            <span>Hist. Supply</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#64748b]"></span>
            <span>Hist. Demand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0 border-b-2 border-dashed border-[#0f2942]"></span>
            <span>Forecast Supply</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0 border-b-2 border-dashed border-[#0284c7]"></span>
            <span>Forecast Demand</span>
          </div>
        </div>

        {/* SVG Chart Canvas */}
        <div className="w-full h-64 relative mt-space-xs select-none">
          <svg
            className="w-full h-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 740 220"
          >
            {/* Grid Lines */}
            <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="45" x2="730" y1="20" y2="20" />
            <text className="font-code-num-sm fill-slate-400" fontSize="10" textAnchor="end" x="38" y="24">
              100k
            </text>
            <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="45" x2="730" y1="65" y2="65" />
            <text className="font-code-num-sm fill-slate-400" fontSize="10" textAnchor="end" x="38" y="69">
              80k
            </text>
            <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="45" x2="730" y1="110" y2="110" />
            <text className="font-code-num-sm fill-slate-400" fontSize="10" textAnchor="end" x="38" y="114">
              60k
            </text>
            <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="45" x2="730" y1="155" y2="155" />
            <text className="font-code-num-sm fill-slate-400" fontSize="10" textAnchor="end" x="38" y="159">
              40k
            </text>
            <line stroke="#cbd5e1" strokeWidth="1" x1="45" x2="730" y1="190" y2="190" />

            {/* Forecast Background Shading */}
            <rect fill="#f8fafc" height="170" opacity="0.8" width="310" x="420" y="20" />

            {/* "Today" Divider line */}
            <line stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" x1="420" x2="420" y1="20" y2="190" />

            {/* Supply Curves */}
            {histSupplyPath && (
              <path
                d={histSupplyPath}
                stroke="#0f2942"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            )}
            {forecastSupplyPath && (
              <path
                d={forecastSupplyPath}
                stroke="#0f2942"
                strokeDasharray="5 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            )}

            {/* Demand Curves */}
            {histDemandPath && (
              <path
                d={histDemandPath}
                stroke="#64748b"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            )}
            {forecastDemandPath && (
              <path
                d={forecastDemandPath}
                stroke="#0284c7"
                strokeDasharray="5 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            )}

            {/* Circles for data points */}
            {activeData.map((point, i) => {
              const x = xCoords[i];
              const supplyVal = point.histSupply ?? point.forecastSupply;
              const demandVal = point.histDemand ?? point.forecastDemand;
              const isHist = i < 4;
              const isToday = i === 4;

              return (
                <g key={point.period}>
                  {supplyVal !== null && (
                    <circle
                      cx={x}
                      cy={getY(supplyVal)}
                      fill="#0f2942"
                      r={isToday ? 4.5 : 3}
                      stroke={isToday ? '#ffffff' : 'none'}
                      strokeWidth={isToday ? 2 : 0}
                    />
                  )}
                  {demandVal !== null && (
                    <circle
                      cx={x}
                      cy={getY(demandVal)}
                      fill={isHist ? '#64748b' : '#0284c7'}
                      r={isToday ? 4.5 : 3}
                      stroke={isToday ? '#ffffff' : 'none'}
                      strokeWidth={isToday ? 2 : 0}
                    />
                  )}
                  {/* Invisible hover overlay column for tooltip */}
                  <rect
                    x={x - 30}
                    y={10}
                    width={60}
                    height={190}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </g>
              );
            })}

            {/* Peak Callout Badge (April or W7) */}
            {activeData[6]?.peakLabel && (
              <g>
                <circle
                  cx={xCoords[6]}
                  cy={getY(activeData[6].forecastDemand)}
                  fill="#0284c7"
                  r="4"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <rect
                  fill="#0284c7"
                  height="17"
                  rx="2"
                  width="70"
                  x={xCoords[6] - 35}
                  y="10"
                />
                <text
                  className="font-code-num-sm fill-white font-medium"
                  fontSize="9.5"
                  textAnchor="middle"
                  x={xCoords[6]}
                  y="22"
                >
                  {activeData[6].peakLabel}
                </text>
              </g>
            )}

            {/* X-Axis Labels */}
            {activeData.map((point, i) => (
              <text
                key={point.period}
                className={`font-code-num-sm ${
                  i === 4 ? 'fill-primary font-bold' : 'fill-slate-500'
                }`}
                fontSize="11"
                textAnchor="middle"
                x={xCoords[i]}
                y="206"
              >
                {point.period}
              </text>
            ))}

            {/* "TODAY" marker badge */}
            <rect fill="#334155" height="15" rx="2" width="44" x="398" y="4" />
            <text
              className="font-code-num-sm fill-white font-medium"
              fontSize="9"
              textAnchor="middle"
              x="420"
              y="15"
            >
              TODAY
            </text>
          </svg>

          {/* Interactive Tooltip Overlay */}
          {hoveredItem && hoveredIndex !== null && (
            <div
              className="absolute pointer-events-none bg-primary text-on-primary rounded px-2.5 py-1.5 shadow-md text-left z-20 transition-all font-code-num-sm"
              style={{
                left: `${(xCoords[hoveredIndex] / 740) * 100}%`,
                top: '40px',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="text-[10px] text-on-primary-container font-semibold uppercase">
                {hoveredItem.period}
              </div>
              <div className="text-[12px] flex items-center justify-between gap-3 text-white">
                <span>Supply:</span>
                <span className="font-bold">
                  {(hoveredItem.histSupply ?? hoveredItem.forecastSupply)?.toLocaleString()} MT
                </span>
              </div>
              <div className="text-[12px] flex items-center justify-between gap-3 text-secondary-fixed">
                <span>Demand:</span>
                <span className="font-bold">
                  {(hoveredItem.histDemand ?? hoveredItem.forecastDemand)?.toLocaleString()} MT
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Summary Footer */}
      <div className="mt-space-sm pt-space-xs border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-space-md">
          <span>
            Projected Q2 Deficit:{' '}
            <strong className="text-primary font-semibold">{summary.deficitText}</strong>
          </span>
          <span className="text-outline-variant/70">|</span>
          <span>
            Peak Demand:{' '}
            <strong className="text-primary font-semibold">{summary.peakDemandText}</strong>
          </span>
        </div>
        <span className="font-code-num-sm text-code-num-sm text-on-surface-variant/80">
          Model: {summary.model}
        </span>
      </div>
    </div>
  );
};
