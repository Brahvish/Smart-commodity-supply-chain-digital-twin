import React from 'react';
import type { VarianceKPI } from '../../types/digitalTwin';

interface SimulationImpactVarianceProps {
  kpis: VarianceKPI[];
}

export const SimulationImpactVariance: React.FC<SimulationImpactVarianceProps> = ({ kpis }) => {
  return (
    <div className="space-y-space-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">
            Simulation Impact Variance
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Comparative variance between baseline live operations (P-10) and simulated stress conditions.
          </p>
        </div>
        <span className="text-code-num-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
          Horizon: 30 Days Out
        </span>
      </div>

      {/* 4 Comparison KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {kpi.title}
              </span>
              <span className={`material-symbols-outlined text-[18px] ${kpi.iconColor}`}>
                {kpi.icon}
              </span>
            </div>

            <div className="my-space-xs">
              <div className="font-code-num-lg text-headline-lg font-bold text-primary">
                {kpi.currentValue}{' '}
                {kpi.unit && (
                  <span className="text-body-sm font-normal text-on-surface-variant">
                    {kpi.unit}
                  </span>
                )}
              </div>
              <div
                className={`flex items-center gap-1 text-code-num-sm text-code-num-sm font-semibold mt-0.5 ${
                  kpi.deltaType === 'negative'
                    ? 'text-rose-700'
                    : kpi.deltaType === 'warning'
                    ? 'text-amber-800'
                    : 'text-emerald-700'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {kpi.deltaType === 'negative'
                    ? 'trending_down'
                    : kpi.deltaType === 'warning'
                    ? 'trending_up'
                    : 'check_circle'}
                </span>
                <span>{kpi.deltaValue}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-on-surface-variant border-t border-outline-variant/20 pt-1">
              <span>{kpi.baseline}</span>
              <span
                className={`font-medium ${
                  kpi.deltaType === 'negative'
                    ? 'text-rose-800'
                    : kpi.deltaType === 'warning'
                    ? 'text-amber-800'
                    : 'text-emerald-800'
                }`}
              >
                {kpi.contextNote}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
