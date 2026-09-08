import React from 'react';
import type { CriticalEntity } from '../../types/digitalTwin';
import { CRITICAL_ENTITIES } from '../../data/digitalTwin';

interface CriticalEntitiesListProps {
  onSelectEntityNode: (nodeId?: string) => void;
  hasMitigationsApplied: boolean;
}

export const CriticalEntitiesList: React.FC<CriticalEntitiesListProps> = ({
  onSelectEntityNode,
  hasMitigationsApplied,
}) => {
  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-xs">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">
            Critical Affected Entities
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Top operational entities demanding triage mitigation.
          </p>
        </div>
        <span
          className={`px-2 py-0.5 rounded border font-code-num-sm text-code-num-sm font-bold ${
            hasMitigationsApplied
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-100 text-rose-900 border-rose-200'
          }`}
        >
          {hasMitigationsApplied ? 'Mitigated' : `${CRITICAL_ENTITIES.length} Urgent`}
        </span>
      </div>

      <div className="divide-y divide-outline-variant/20 flex-1 flex flex-col justify-between my-space-xs">
        {CRITICAL_ENTITIES.map((entity: CriticalEntity) => {
          const isCritical = entity.severity === 'CRITICAL';
          const isHigh = entity.severity === 'HIGH';

          return (
            <div
              key={entity.id}
              onClick={() => onSelectEntityNode(entity.nodeId)}
              className="py-space-xs flex items-start justify-between gap-space-sm hover:bg-surface-container-low/40 p-1.5 rounded transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5 border ${
                    isCritical
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : isHigh
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {entity.severity}
                </span>

                <div>
                  <div className="font-body-sm font-semibold text-primary">{entity.name}</div>
                  <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
                    {entity.description}
                  </p>
                  <div
                    className={`flex items-center gap-3 text-code-num-sm text-[10px] font-medium mt-1 ${
                      isCritical
                        ? 'text-rose-800'
                        : isHigh
                        ? 'text-amber-900'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    <span>{entity.exposure}</span>
                    <span>•</span>
                    <span>{entity.secondaryMetric}</span>
                  </div>
                </div>
              </div>

              <button
                className="shrink-0 p-1 text-primary hover:bg-surface-container-high rounded transition-colors"
                title="Inspect in topology"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="pt-space-xs border-t border-outline-variant/20 flex justify-between items-center text-body-sm">
        <span className="text-on-surface-variant text-[11px]">
          12 monitored multi-tier nodes in network simulation
        </span>
        <span className="font-code-num-sm text-[11px] text-emerald-700 font-medium">
          {hasMitigationsApplied ? 'All entities stabilized' : 'Action required'}
        </span>
      </div>
    </div>
  );
};
