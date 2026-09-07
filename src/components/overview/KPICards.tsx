import React from 'react';
import type { OverviewDataSet } from '../../types/overview';

interface KPICardsProps {
  kpis: OverviewDataSet['kpis'];
}

export const KPICards: React.FC<KPICardsProps> = ({ kpis }) => {
  const { inventory, shipments, serviceLevel, risk } = kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {/* Metric 1: Total Inventory */}
      <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant/40 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {inventory.title}
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">
            {inventory.icon}
          </span>
        </div>
        <div className="mt-space-sm">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              {inventory.value}
            </span>
            {inventory.unit && (
              <span className="font-code-num-sm text-code-num-sm text-on-surface-variant font-medium">
                {inventory.unit}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-space-2xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-code-num-sm text-code-num-sm font-semibold">
              <span className="material-symbols-outlined text-[13px] leading-none">
                {inventory.badgeIcon || 'arrow_upward'}
              </span>
              {inventory.badgeText}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {inventory.subtext}
            </span>
          </div>
        </div>
      </div>

      {/* Metric 2: Active Shipments */}
      <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant/40 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {shipments.title}
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">
            {shipments.icon}
          </span>
        </div>
        <div className="mt-space-sm">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              {shipments.value}
            </span>
            {shipments.unit && (
              <span className="font-code-num-sm text-code-num-sm text-on-surface-variant font-medium">
                {shipments.unit}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-space-2xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#b45309] border border-[#fde68a] font-code-num-sm text-code-num-sm font-semibold">
              <span className="material-symbols-outlined text-[13px] leading-none">
                {shipments.badgeIcon || 'warning'}
              </span>
              {shipments.badgeText}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {shipments.subtext}
            </span>
          </div>
        </div>
      </div>

      {/* Metric 3: Service Level */}
      <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant/40 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {serviceLevel.title}
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">
            {serviceLevel.icon}
          </span>
        </div>
        <div className="mt-space-sm">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              {serviceLevel.value}
            </span>
          </div>
          <div className="flex items-center justify-between mt-space-2xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-code-num-sm text-code-num-sm font-semibold">
              <span className="material-symbols-outlined text-[13px] leading-none">
                {serviceLevel.badgeIcon || 'arrow_upward'}
              </span>
              {serviceLevel.badgeText}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {serviceLevel.subtext}
            </span>
          </div>
        </div>
      </div>

      {/* Metric 4: Supply Chain Risk */}
      <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant/40 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            {risk.title}
          </span>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">
            {risk.icon}
          </span>
        </div>
        <div className="mt-space-sm">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              {risk.value}
            </span>
            {risk.unit && (
              <span className="font-code-num-sm text-code-num-sm text-on-surface-variant font-medium">
                {risk.unit}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-space-2xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] font-code-num-sm text-code-num-sm font-semibold">
              {risk.badgeText}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {risk.subtext}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
