import React from 'react';
import type { ControlTowerData } from '../../types/controlTower';

interface ControlTowerKPIsProps {
  kpis: ControlTowerData['kpis'];
}

export const ControlTowerKPIs: React.FC<ControlTowerKPIsProps> = ({ kpis }) => {
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
      {/* 1. Network Status */}
      <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Network Status
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-code-num-sm bg-emerald-50 text-emerald-800 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            {kpis.networkStatus.percent}
          </span>
        </div>
        <div className="mt-1">
          <div className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
            {kpis.networkStatus.status}
          </div>
          <p className="font-code-num-sm text-code-num-sm text-on-surface-variant mt-0.5">
            {kpis.networkStatus.subtext}
          </p>
        </div>
      </div>

      {/* 2. Active Shipments */}
      <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Active Shipments
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
            local_shipping
          </span>
        </div>
        <div className="mt-1">
          <div className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight font-code-num-lg">
            {kpis.activeShipments.total}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
              {kpis.activeShipments.onTrack} on-track ({kpis.activeShipments.percent})
            </span>
          </div>
        </div>
      </div>

      {/* 3. Delayed Shipments */}
      <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Delayed Shipments
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-code-num-sm bg-amber-50 text-amber-800 font-medium">
            {kpis.delayedShipments.criticalCount} CRITICAL
          </span>
        </div>
        <div className="mt-1">
          <div className="font-headline-lg text-headline-lg text-amber-700 font-semibold tracking-tight font-code-num-lg">
            {kpis.delayedShipments.total}
          </div>
          <p className="font-code-num-sm text-code-num-sm text-on-surface-variant mt-0.5">
            {kpis.delayedShipments.avgDelay}
          </p>
        </div>
      </div>

      {/* 4. Critical Incidents */}
      <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Critical Incidents
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-code-num-sm bg-rose-50 text-rose-800 font-medium">
            URGENT
          </span>
        </div>
        <div className="mt-1">
          <div className="font-headline-lg text-headline-lg text-error font-semibold tracking-tight font-code-num-lg">
            {kpis.criticalIncidents.total}
          </div>
          <p className="font-code-num-sm text-code-num-sm text-error mt-0.5 font-medium">
            {kpis.criticalIncidents.notice}
          </p>
        </div>
      </div>

      {/* 5. At-Risk Inventory */}
      <div className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            At-Risk Inventory
          </span>
          <span className="material-symbols-outlined text-[18px] text-amber-600">
            report_problem
          </span>
        </div>
        <div className="mt-1">
          <div className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight font-code-num-lg">
            {kpis.atRiskInventory.value}
          </div>
          <p className="font-code-num-sm text-code-num-sm text-on-surface-variant mt-0.5">
            {kpis.atRiskInventory.volume}
          </p>
        </div>
      </div>
    </section>
  );
};
