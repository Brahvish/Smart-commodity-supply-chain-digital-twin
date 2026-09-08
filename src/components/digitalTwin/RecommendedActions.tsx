import React, { useState } from 'react';
import type { MitigationIntervention } from '../../types/digitalTwin';
import { MITIGATION_INTERVENTIONS } from '../../data/digitalTwin';

interface RecommendedActionsProps {
  appliedMitigationIds: string[];
  onToggleMitigation: (id: string) => void;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  projectedOtif: string;
  surchargeAmount: string;
  criticalBottlenecks: number;
  mitigationRecoveryPct: number;
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({
  appliedMitigationIds,
  onToggleMitigation,
  riskLevel,
  projectedOtif,
  surchargeAmount,
  criticalBottlenecks,
  mitigationRecoveryPct,
}) => {
  const [selectedInterventionDetail, setSelectedInterventionDetail] = useState<MitigationIntervention | null>(null);

  return (
    <div className="space-y-space-xs">
      {/* Decision Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-space-sm bg-primary text-on-primary rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-space-lg text-body-sm">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                riskLevel === 'HIGH'
                  ? 'bg-rose-500 animate-ping'
                  : riskLevel === 'MODERATE'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />
            <span className="font-semibold">
              Scenario Risk:{' '}
              <span
                className={
                  riskLevel === 'HIGH'
                    ? 'text-rose-300 font-bold'
                    : riskLevel === 'MODERATE'
                    ? 'text-amber-200 font-bold'
                    : 'text-emerald-300 font-bold'
                }
              >
                {riskLevel}
              </span>
            </span>
          </div>

          <div className="hidden sm:block text-outline-variant">|</div>
          <div>
            Projected OTIF:{' '}
            <strong className="font-code-num-sm text-amber-200">{projectedOtif}</strong>
          </div>

          <div className="hidden sm:block text-outline-variant">|</div>
          <div>
            Additional Surcharge:{' '}
            <strong className="font-code-num-sm text-rose-200">{surchargeAmount}</strong>
          </div>

          <div className="hidden sm:block text-outline-variant">|</div>
          <div>
            Critical Bottlenecks:{' '}
            <strong className="font-code-num-sm">{criticalBottlenecks} Nodes</strong>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[12px] font-medium text-emerald-300 bg-primary-container px-2 py-0.5 rounded border border-primary-fixed-dim/20">
          <span className="material-symbols-outlined text-[15px]">auto_fix_high</span>
          <span>
            {appliedMitigationIds.length > 0
              ? `${appliedMitigationIds.length} mitigation${
                  appliedMitigationIds.length > 1 ? 's' : ''
                } active · ${mitigationRecoveryPct}% recovery`
              : 'Mitigation Potential: 84% recovery via 3 actions'}
          </span>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">
            Recommended Actions
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Algorithmic mitigation interventions evaluated by decision-support engine to neutralize simulated scenario impact.
          </p>
        </div>
      </div>

      {/* 3 Intervention Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {MITIGATION_INTERVENTIONS.map((action: MitigationIntervention) => {
          const isApplied = appliedMitigationIds.includes(action.id);
          const isHigh = action.priority === 'HIGH';

          return (
            <div
              key={action.id}
              className={`bg-surface-container-lowest rounded-lg border shadow-sm flex flex-col justify-between p-space-sm transition-all ${
                isApplied
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/10'
                  : 'border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-space-xs">
                  <span
                    className={`px-1.5 py-0.5 rounded border font-label-caps text-[9px] font-bold uppercase tracking-wide ${
                      isApplied
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : isHigh
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {isApplied
                      ? `APPLIED · RECOMMENDATION ${action.recNumber}`
                      : `RECOMMENDATION ${action.recNumber} · PRIORITY ${action.priority}`}
                  </span>
                  <span className="font-code-num-sm text-code-num-sm font-bold text-primary">
                    {action.costINR}
                  </span>
                </div>

                <h4 className="font-body-lg text-body-lg font-bold text-primary mt-space-xs">
                  {action.title}
                </h4>

                <p className="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                  {action.description}
                </p>

                <div
                  className={`mt-space-sm p-space-xs rounded border text-[11px] ${
                    isApplied
                      ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <strong className="font-semibold block">
                    {isApplied ? 'Applied Simulated Outcome:' : 'Expected Impact:'}
                  </strong>
                  {action.expectedImpact}
                </div>
              </div>

              <div className="flex items-center gap-space-xs border-t border-outline-variant/20 mt-space-sm pt-space-xs">
                <button
                  onClick={() => setSelectedInterventionDetail(action)}
                  className="flex-1 py-1.5 px-space-xs rounded text-body-sm font-body-sm font-medium bg-surface text-on-surface border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-center truncate cursor-pointer"
                  type="button"
                >
                  {action.actionDetailLabel}
                </button>
                <button
                  onClick={() => onToggleMitigation(action.id)}
                  className={`flex-1 py-1.5 px-space-xs rounded text-body-sm font-body-sm font-semibold transition-all text-center truncate cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-primary text-on-primary hover:bg-primary-container'
                  }`}
                  type="button"
                >
                  {isApplied ? 'Applied ✓ (Undo)' : 'Apply to Scenario'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Detail Dialog Modal */}
      {selectedInterventionDetail && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInterventionDetail(null)}
        >
          <div
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 pb-space-sm">
              <div>
                <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-wider">
                  ACTION SPECIFICATION · REC {selectedInterventionDetail.recNumber}
                </span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold mt-1">
                  {selectedInterventionDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInterventionDetail(null)}
                className="p-1 text-on-surface-variant hover:text-primary rounded"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-space-sm text-body-sm">
              <div className="p-space-sm bg-surface-container-low rounded border border-outline-variant/20">
                <span className="text-on-surface-variant text-[11px] block font-medium">Corridor / Allocation</span>
                <span className="font-semibold text-primary">{selectedInterventionDetail.detailModalContent.headline}</span>
              </div>

              <div className="space-y-2 font-code-num-sm text-[12px]">
                <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                  <span className="text-on-surface-variant">Estimated Operational Cost:</span>
                  <span className="font-bold text-primary">{selectedInterventionDetail.costINR}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                  <span className="text-on-surface-variant">Routing Logistics:</span>
                  <span className="font-medium text-right text-on-surface max-w-[280px]">
                    {selectedInterventionDetail.detailModalContent.routeOrOrigin}
                  </span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                  <span className="text-on-surface-variant">Projected Service Gain:</span>
                  <span className="font-semibold text-emerald-700 text-right max-w-[280px]">
                    {selectedInterventionDetail.detailModalContent.slaImpact}
                  </span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                  <span className="text-on-surface-variant">Deployment Window:</span>
                  <span className="font-medium text-right text-on-surface max-w-[280px]">
                    {selectedInterventionDetail.detailModalContent.fleetRequirements}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-outline-variant/30">
              <button
                onClick={() => setSelectedInterventionDetail(null)}
                className="px-space-md py-1.5 rounded text-body-sm font-medium border border-outline-variant/40 hover:bg-surface-container-low"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onToggleMitigation(selectedInterventionDetail.id);
                  setSelectedInterventionDetail(null);
                }}
                className="px-space-md py-1.5 rounded text-body-sm font-semibold bg-primary text-on-primary hover:bg-primary-container"
              >
                {appliedMitigationIds.includes(selectedInterventionDetail.id)
                  ? 'Remove from Scenario'
                  : 'Apply to Scenario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
