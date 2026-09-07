import React, { useState } from 'react';
import type { PriorityRiskItem } from '../../types/overview';
import { DetailModal } from '../common/DetailModal';

interface PriorityRisksProps {
  risks: PriorityRiskItem[];
}

export const PriorityRisks: React.FC<PriorityRisksProps> = ({ risks }) => {
  const [selectedRisk, setSelectedRisk] = useState<PriorityRiskItem | null>(null);

  const getBorderColor = (severity: PriorityRiskItem['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'border-l-[#be123c]';
      case 'High':
        return 'border-l-[#b45309]';
      default:
        return 'border-l-outline';
    }
  };

  const getTagBadge = (severity: PriorityRiskItem['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3]';
      case 'High':
        return 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]';
      default:
        return 'bg-surface-container-high text-on-surface-variant border-outline-variant';
    }
  };

  const getTagTextColor = (severity: PriorityRiskItem['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-error';
      case 'High':
        return 'text-[#b45309]';
      default:
        return 'text-on-surface-variant';
    }
  };

  return (
    <>
      <div className="lg:col-span-5 bg-surface-container-lowest rounded border border-outline-variant/40 shadow-sm p-space-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-xs">
            <div>
              <h2 className="font-headline-md text-headline-md font-semibold text-primary">
                Priority Risks
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Active friction points requiring operational intervention.
              </p>
            </div>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-error-container text-on-error-container font-code-num-sm text-code-num-sm font-bold">
              {risks.length}
            </span>
          </div>

          <div className="mt-space-sm space-y-space-sm">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className={`p-space-sm rounded bg-surface-container-lowest border-l-4 ${getBorderColor(
                  risk.severity
                )} border border-outline-variant/40 shadow-2xs hover:bg-surface-container-low/20 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-1.5 py-0.2 rounded border font-code-num-sm text-[10px] uppercase font-bold tracking-wider ${getTagBadge(
                      risk.severity
                    )}`}
                  >
                    {risk.severity}
                  </span>
                  <span
                    className={`font-code-num-sm text-code-num-sm font-semibold ${getTagTextColor(
                      risk.severity
                    )}`}
                  >
                    {risk.tagText}
                  </span>
                </div>

                <div className="mt-1">
                  <span className="font-body-sm text-body-sm font-semibold text-primary block">
                    {risk.title}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-tight">
                    {risk.description}
                  </p>
                </div>

                <div className="mt-2 text-right">
                  <button
                    onClick={() => setSelectedRisk(risk)}
                    type="button"
                    className="font-body-sm text-body-sm text-secondary font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    {risk.actionText}{' '}
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightweight Operational Detail Modal */}
      {selectedRisk && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedRisk(null)}
          title={selectedRisk.title}
          badgeText={selectedRisk.severity}
          badgeSeverity={selectedRisk.severity}
        >
          <div className="space-y-space-sm">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block mb-0.5">
                Issue Summary
              </span>
              <p className="text-on-surface font-medium">{selectedRisk.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-space-sm p-space-sm rounded bg-surface-container-low/50 border border-outline-variant/30">
              <div>
                <span className="text-[11px] font-label-caps text-on-surface-variant block uppercase">
                  Location / Facility
                </span>
                <span className="font-code-num-sm text-[12px] text-primary font-semibold">
                  {selectedRisk.details.location}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-label-caps text-on-surface-variant block uppercase">
                  Commodity
                </span>
                <span className="font-code-num-sm text-[12px] text-primary font-semibold">
                  {selectedRisk.details.affectedProduct}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[11px] font-label-caps text-on-surface-variant block uppercase">
                  Telemetry ETA / Status
                </span>
                <span className="font-code-num-sm text-[12px] text-error font-medium">
                  {selectedRisk.details.eta}
                </span>
              </div>
            </div>

            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block mb-0.5">
                Operational Impact
              </span>
              <p className="text-on-surface-variant text-[12px]">
                {selectedRisk.details.impact}
              </p>
            </div>

            <div className="p-space-sm rounded bg-[#ecfdf5] border border-[#a7f3d0]">
              <span className="text-[11px] font-code-num-sm text-[#047857] font-bold block uppercase mb-0.5">
                Recommended Mitigation
              </span>
              <p className="text-[#065f46] text-[12px] leading-snug">
                {selectedRisk.details.recommendedMitigation}
              </p>
            </div>
          </div>
        </DetailModal>
      )}
    </>
  );
};
