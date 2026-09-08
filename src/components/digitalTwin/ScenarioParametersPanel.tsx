import React from 'react';
import type { ScenarioParameters, ScenarioImpactPreview } from '../../types/digitalTwin';

interface ScenarioParametersPanelProps {
  parameters: ScenarioParameters;
  onChangeParameter: (key: keyof ScenarioParameters, val: number) => void;
  impactPreview: ScenarioImpactPreview;
  onReSimulate: () => void;
  onResetParams: () => void;
  isSimulating: boolean;
}

export const ScenarioParametersPanel: React.FC<ScenarioParametersPanelProps> = ({
  parameters,
  onChangeParameter,
  impactPreview,
  onReSimulate,
  onResetParams,
  isSimulating,
}) => {
  return (
    <div className="xl:col-span-3 flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm gap-space-sm p-space-sm">
      <div className="flex items-start justify-between border-b border-outline-variant/30 pb-space-sm">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary font-semibold">Scenario Parameters</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Adjust stress variables to forecast cascading impact.
          </p>
        </div>
        <div className="text-on-surface-variant p-1 rounded hover:bg-surface-container-low transition-colors" title="Adjust Parameters">
          <span className="material-symbols-outlined text-[18px]">tune</span>
        </div>
      </div>

      {/* Sliders List */}
      <div className="space-y-space-xs">
        {/* Slider 1: Demand */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-body-sm">
            <span className="font-medium text-on-surface">Demand Variance</span>
            <span
              className={`px-space-xs py-0.5 rounded font-code-num-sm text-code-num-sm font-semibold ${
                parameters.demandVariance > 0
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface'
              }`}
            >
              {parameters.demandVariance >= 0 ? `+${parameters.demandVariance}%` : `${parameters.demandVariance}%`}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Change expected customer pull across South &amp; Central corridors.
          </p>
          <input
            type="range"
            min="-15"
            max="30"
            step="1"
            value={parameters.demandVariance}
            onChange={(e) => onChangeParameter('demandVariance', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer mt-1"
          />
          <div className="flex justify-between font-code-num-sm text-[10px] text-on-surface-variant">
            <span>-15%</span>
            <span>0%</span>
            <span>+30%</span>
          </div>
        </div>

        {/* Slider 2: Supplier Supply */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-body-sm">
            <span className="font-medium text-on-surface">Supplier Capacity</span>
            <span
              className={`px-space-xs py-0.5 rounded border font-code-num-sm text-code-num-sm font-semibold ${
                parameters.supplierCapacity < 0
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              {parameters.supplierCapacity >= 0 ? `+${parameters.supplierCapacity}%` : `${parameters.supplierCapacity}%`}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Simulated output reduction across Vidarbha &amp; Raichur cooperatives.
          </p>
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={parameters.supplierCapacity}
            onChange={(e) => onChangeParameter('supplierCapacity', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer mt-1"
          />
          <div className="flex justify-between font-code-num-sm text-[10px] text-on-surface-variant">
            <span>-20%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* Slider 3: Transit Corridor Delay */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-body-sm">
            <span className="font-medium text-on-surface">Corridor Disruption</span>
            <span
              className={`px-space-xs py-0.5 rounded border font-code-num-sm text-code-num-sm font-semibold ${
                parameters.corridorDisruption > 2
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              +{parameters.corridorDisruption} Days
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Add rail haulage transit delay on Western Ghats freight line.
          </p>
          <input
            type="range"
            min="0"
            max="7"
            step="1"
            value={parameters.corridorDisruption}
            onChange={(e) => onChangeParameter('corridorDisruption', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer mt-1"
          />
          <div className="flex justify-between font-code-num-sm text-[10px] text-on-surface-variant">
            <span>0d</span>
            <span>+3d</span>
            <span>+7d</span>
          </div>
        </div>

        {/* Slider 4: Warehouse Capacity */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-body-sm">
            <span className="font-medium text-on-surface">Storage Availability</span>
            <span
              className={`px-space-xs py-0.5 rounded border font-code-num-sm text-code-num-sm font-semibold ${
                parameters.storageAvailability < 0
                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              {parameters.storageAvailability >= 0 ? `+${parameters.storageAvailability}%` : `${parameters.storageAvailability}%`}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            Available silo and pallet footprint under seasonal crop peak.
          </p>
          <input
            type="range"
            min="-30"
            max="20"
            step="1"
            value={parameters.storageAvailability}
            onChange={(e) => onChangeParameter('storageAvailability', Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer mt-1"
          />
          <div className="flex justify-between font-code-num-sm text-[10px] text-on-surface-variant">
            <span>-30%</span>
            <span>0%</span>
            <span>+20%</span>
          </div>
        </div>
      </div>

      {/* Impact Preview Box */}
      <div className="p-space-sm bg-amber-50/70 border border-amber-200 rounded-lg flex flex-col gap-space-xs mt-auto">
        <div className="flex items-center gap-1.5 text-amber-900 font-semibold font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[16px] text-amber-700">warning</span>
          <span>Scenario Impact Preview</span>
        </div>

        <div className="grid grid-cols-2 gap-1 font-code-num-sm text-[11px] text-on-surface">
          <div className="bg-surface-container-lowest p-1 rounded border border-amber-200/50">
            <span className="text-on-surface-variant block text-[10px]">Demand Delta</span>
            <span
              className={`font-semibold ${
                parameters.demandVariance > 10 ? 'text-rose-700' : 'text-on-surface'
              }`}
            >
              {impactPreview.demandDelta}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-1 rounded border border-amber-200/50">
            <span className="text-on-surface-variant block text-[10px]">Supply Delta</span>
            <span
              className={`font-semibold ${
                parameters.supplierCapacity < 0 ? 'text-amber-800' : 'text-emerald-700'
              }`}
            >
              {impactPreview.supplyDelta}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-1 rounded border border-amber-200/50">
            <span className="text-on-surface-variant block text-[10px]">Corridor Latency</span>
            <span
              className={`font-semibold ${
                parameters.corridorDisruption > 2 ? 'text-rose-700' : 'text-on-surface'
              }`}
            >
              {impactPreview.corridorLatency}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-1 rounded border border-amber-200/50">
            <span className="text-on-surface-variant block text-[10px]">Storage Buffer</span>
            <span
              className={`font-semibold ${
                parameters.storageAvailability < 0 ? 'text-amber-800' : 'text-emerald-700'
              }`}
            >
              {impactPreview.storageBuffer}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-medium pt-1">
          {impactPreview.breachedNodes > 0 ? (
            <>
              <span className="material-symbols-outlined text-[14px] text-rose-700">error</span>
              <span className="text-rose-800">
                {impactPreview.breachedNodes} fulfillment node{impactPreview.breachedNodes > 1 ? 's' : ''} breach safety threshold
              </span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[14px] text-emerald-700">check_circle</span>
              <span className="text-emerald-800">All fulfillment nodes stabilized</span>
            </>
          )}
        </div>
      </div>

      {/* Panel Action Controls */}
      <div className="grid grid-cols-3 gap-space-xs pt-space-xs border-t border-outline-variant/30">
        <button
          onClick={onReSimulate}
          disabled={isSimulating}
          className="col-span-2 py-1.5 px-space-sm rounded font-body-sm text-body-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1 cursor-pointer"
          type="button"
        >
          <span className={`material-symbols-outlined text-[16px] ${isSimulating ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isSimulating ? 'Updating...' : 'Re-Simulate'}</span>
        </button>
        <button
          onClick={onResetParams}
          className="py-1.5 px-space-sm rounded font-body-sm text-body-sm font-medium bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
