import React from 'react';
import type { TrajectoryPoint } from '../../types/digitalTwin';

interface BeforeAfterTrajectoryChartProps {
  trajectory: TrajectoryPoint[];
  hasMitigationsApplied: boolean;
}

export const BeforeAfterTrajectoryChart: React.FC<BeforeAfterTrajectoryChartProps> = ({
  trajectory,
  hasMitigationsApplied,
}) => {
  const handleExportCSV = () => {
    const headers = ['Day', 'Baseline (MT)', 'Simulated (MT)', 'Min Safety Threshold (MT)'];
    const rows = trajectory.map((t) => [
      t.day,
      t.baselineMT,
      hasMitigationsApplied ? t.mitigatedMT : t.simulatedMT,
      t.safetyThresholdMT,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `agricore-simulation-trajectory-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Trajectory curve coordinates
  // Unmitigated drops below 50k at Day +4.8; Mitigated stays above 50k!
  const simulatedCurveD = hasMitigationsApplied
    ? 'M 55 52 C 90 56, 120 72, 160 76 C 220 78, 300 75, 380 72 C 450 70, 490 68, 520 66'
    : 'M 55 52 C 90 60, 120 95, 160 115 C 220 135, 300 130, 380 128 C 450 125, 490 120, 520 118';

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-space-xs border-b border-outline-variant/30 pb-space-xs">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">
            Before vs After Trajectory
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Simulated aggregate inventory depletion curve over 30-day projection horizon.
          </p>
        </div>
        <div className="flex items-center gap-space-sm font-code-num-sm text-[11px]">
          <span className="inline-flex items-center gap-1 text-primary">
            <span className="w-3 h-0.5 bg-primary rounded"></span>Baseline
          </span>
          <span
            className={`inline-flex items-center gap-1 ${
              hasMitigationsApplied ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            <span
              className={`w-3 h-0.5 border-dashed border-b ${
                hasMitigationsApplied ? 'bg-emerald-600 border-emerald-600' : 'bg-rose-600 border-rose-600'
              }`}
            ></span>
            {hasMitigationsApplied ? 'Mitigated' : 'Simulated'}
          </span>
          <span className="inline-flex items-center gap-1 text-outline">
            <span className="w-3 h-0.5 border-b border-dashed border-outline"></span>Min Safety
          </span>
        </div>
      </div>

      {/* SVG Chart Canvas */}
      <div className="w-full h-56 mt-space-sm relative">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 540 190">
          {/* Horizontal Gridlines & Y-Axis Scale */}
          <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="24" textAnchor="end" className="font-code-num-sm text-[10px]" fill="#94a3b8">
            100k
          </text>
          <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="64" textAnchor="end" className="font-code-num-sm text-[10px]" fill="#94a3b8">
            75k
          </text>

          {/* Safety Buffer Threshold (50k MT) */}
          <line x1="40" y1="100" x2="520" y2="100" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.2" />
          <text x="32" y="104" textAnchor="end" className="font-code-num-sm text-[10px]" fill="#64748b">
            50k
          </text>
          <text x="515" y="96" textAnchor="end" className="font-code-num-sm text-[9px]" fill="#64748b">
            Safety Threshold (50k MT)
          </text>

          <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="144" textAnchor="end" className="font-code-num-sm text-[10px]" fill="#94a3b8">
            25k
          </text>

          {/* Day 0 (Today) Vertical Line */}
          <line x1="55" y1="15" x2="55" y2="160" stroke="#64748b" strokeWidth="1.5" />
          <text x="55" y="12" textAnchor="middle" className="font-code-num-sm text-[9px] font-bold" fill="#0f2942">
            TODAY
          </text>

          {/* Critical Stockout Marker at Day +5 (visible if not mitigated) */}
          {!hasMitigationsApplied ? (
            <g>
              <line x1="135" y1="20" x2="135" y2="160" stroke="#f43f5e" strokeDasharray="2 2" strokeWidth="1.2" />
              <rect x="100" y="24" width="70" height="18" rx="2" fill="#fff1f2" stroke="#fecdd3" strokeWidth="0.8" />
              <text x="135" y="36" textAnchor="middle" className="font-code-num-sm text-[8px] font-bold" fill="#be123c">
                Day +5: Stockout
              </text>
            </g>
          ) : (
            <g>
              <line x1="135" y1="20" x2="135" y2="160" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1.2" />
              <rect x="95" y="24" width="80" height="18" rx="2" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
              <text x="135" y="36" textAnchor="middle" className="font-code-num-sm text-[8px] font-bold" fill="#065f46">
                Buffer Preserved
              </text>
            </g>
          )}

          {/* Baseline Curve: Healthy steady state (~82k-85k MT) */}
          <path d="M 55 52 C 120 50, 200 48, 280 50 C 360 52, 440 47, 520 49" fill="none" stroke="#0f2942" strokeWidth="2" />

          {/* Simulated or Mitigated Curve */}
          <path
            d={simulatedCurveD}
            fill="none"
            stroke={hasMitigationsApplied ? '#059669' : '#e11d48'}
            strokeDasharray="5 3"
            strokeWidth="2.5"
          />

          {/* X-Axis Labels */}
          <text x="55" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day 0</text>
          <text x="135" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +5</text>
          <text x="215" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +10</text>
          <text x="295" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +15</text>
          <text x="375" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +20</text>
          <text x="455" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +25</text>
          <text x="520" y="176" textAnchor="middle" className="font-code-num-sm text-[10px]" fill="#64748b">Day +30</text>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-xs text-[11px] text-on-surface-variant pt-space-xs border-t border-outline-variant/20 mt-space-xs">
        <span className="flex items-center gap-1">
          <span
            className={`material-symbols-outlined text-[14px] ${
              hasMitigationsApplied ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {hasMitigationsApplied ? 'check_circle' : 'schedule'}
          </span>
          <span>
            {hasMitigationsApplied ? (
              <>Buffer preserved through <strong>30-day projection</strong> via active dispatch mitigation.</>
            ) : (
              <>Buffer breach occurs on <strong>Day +4.8</strong> without active dispatch intervention.</>
            )}
          </span>
        </span>
        <button
          onClick={handleExportCSV}
          className="text-primary hover:underline font-medium cursor-pointer"
          type="button"
        >
          Export Simulation Vectors (CSV)
        </button>
      </div>
    </div>
  );
};
