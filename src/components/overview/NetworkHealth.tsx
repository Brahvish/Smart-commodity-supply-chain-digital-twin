import React, { useState } from 'react';
import type { NetworkHealthData } from '../../types/overview';
import { DetailModal } from '../common/DetailModal';

interface NetworkHealthProps {
  data: NetworkHealthData;
}

export const NetworkHealth: React.FC<NetworkHealthProps> = ({ data }) => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <>
      <div className="lg:col-span-4 bg-surface-container-lowest rounded border border-outline-variant/40 shadow-sm p-space-md flex flex-col justify-between">
        <div>
          <div className="border-b border-outline-variant/30 pb-space-xs">
            <h2 className="font-headline-md text-headline-md font-semibold text-primary">
              Network Health
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Operational health across primary node vectors.
            </p>
          </div>

          {/* Aggregate Network Health Score */}
          <div className="mt-space-md p-space-sm rounded bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block">
                Aggregate Health Index
              </span>
              <div className="flex items-baseline gap-space-xs mt-0.5">
                <span className="font-headline-xl text-headline-xl font-bold text-primary">
                  {data.aggregateIndex}
                </span>
                <span className="font-code-num-sm text-code-num-sm text-on-surface-variant font-medium">
                  / 100
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-code-num-sm text-code-num-sm font-semibold">
                {data.deltaPts}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {data.vsText}
              </span>
            </div>
          </div>

          {/* Category Progress Bars */}
          <div className="mt-space-md space-y-space-sm">
            {data.categories.map((cat) => {
              const isHealthy = cat.status === 'Healthy';
              const barColor = isHealthy ? 'bg-[#059669]' : 'bg-[#d97706]';
              const badgeClass = isHealthy
                ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]'
                : 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]';

              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-body-sm font-body-sm mb-1">
                    <span className="font-medium text-on-surface">{cat.name}</span>
                    <div className="flex items-center gap-space-sm">
                      <span className="font-code-num-sm text-code-num-sm text-on-surface font-semibold">
                        {cat.score}%
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded border font-code-num-sm text-[10px] uppercase font-bold tracking-wider ${badgeClass}`}
                      >
                        {cat.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-space-xs mt-space-md border-t border-outline-variant/30 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>
            Active Node Checks: <strong className="text-primary">{data.activeChecks}</strong>
          </span>
          <button
            onClick={() => setShowAuditModal(true)}
            className="text-secondary font-medium hover:underline inline-flex items-center gap-0.5"
            type="button"
          >
            Audit log <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Audit Log Modal */}
      <DetailModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        title="Network Audit Log"
        badgeText="Passed 148/148"
        badgeSeverity="High"
      >
        <div className="space-y-3">
          <p className="text-on-surface-variant">
            System diagnostic report generated across all 148 edge telemetry nodes and silo storage monitoring probes.
          </p>
          <div className="border border-outline-variant/40 rounded divide-y divide-outline-variant/20 bg-surface-container-low/20">
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-primary block">South Silo Telemetry Fleet</span>
                <span className="text-xs text-on-surface-variant">42 moisture & weight probes active</span>
              </div>
              <span className="text-xs font-code-num-sm text-[#047857] font-semibold">ONLINE (100%)</span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-primary block">Rail Corridor GPS Transponders</span>
                <span className="text-xs text-on-surface-variant">54 rakes transmitting coordinates</span>
              </div>
              <span className="text-xs font-code-num-sm text-[#047857] font-semibold">ONLINE (100%)</span>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-primary block">Port Container EDI Gateway</span>
                <span className="text-xs text-on-surface-variant">Nhava Sheva & Chennai terminal feeds</span>
              </div>
              <span className="text-xs font-code-num-sm text-[#b45309] font-semibold">LATENCY +14m</span>
            </div>
          </div>
        </div>
      </DetailModal>
    </>
  );
};
