import React from 'react';
import type { ScenarioPresetId } from '../../types/digitalTwin';
import { SCENARIO_PRESETS } from '../../data/digitalTwin';

interface ScenarioHeaderBarProps {
  selectedScenario: ScenarioPresetId;
  onSelectScenario: (id: ScenarioPresetId) => void;
  isSimulating: boolean;
  onRunSimulation: () => void;
  onResetBaseline: () => void;
  onOpenSaveModal: () => void;
  lastExecutionTime: string;
}

export const ScenarioHeaderBar: React.FC<ScenarioHeaderBarProps> = ({
  selectedScenario,
  onSelectScenario,
  isSimulating,
  onRunSimulation,
  onResetBaseline,
  onOpenSaveModal,
  lastExecutionTime,
}) => {
  return (
    <div className="space-y-space-xs">
      {/* Scenario Header Bar & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-space-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
              Digital Twin Workspace
            </h2>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded text-[10px] font-semibold bg-surface-container text-on-surface-variant border border-outline-variant/40">
              SIM-ENGINE v3.4
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Simulate multi-echelon supply-chain shocks, evaluate cascading risks, and trigger algorithmic mitigation.
          </p>
        </div>

        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={onOpenSaveModal}
            className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded text-body-sm font-body-sm font-medium bg-surface text-on-surface border border-outline-variant/50 hover:bg-surface-container-low transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Save Scenario</span>
          </button>
          <button
            onClick={onRunSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-space-xs px-space-md py-1.5 rounded text-body-sm font-body-sm font-semibold bg-primary-container text-on-primary hover:bg-primary transition-all shadow-sm cursor-pointer ${
              isSimulating ? 'opacity-80 cursor-wait' : ''
            }`}
            type="button"
          >
            <span className={`material-symbols-outlined text-[16px] ${isSimulating ? 'animate-spin' : ''}`}>
              {isSimulating ? 'sync' : 'play_arrow'}
            </span>
            <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Status & Quick Baseline Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm px-space-md py-space-xs bg-surface-container-lowest rounded border border-outline-variant/30 text-body-sm">
        <div className="flex flex-wrap items-center gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant">SCENARIO:</span>
            <div className="relative">
              <select
                value={selectedScenario}
                onChange={(e) => onSelectScenario(e.target.value as ScenarioPresetId)}
                className="appearance-none bg-surface-container-low border border-outline-variant/40 rounded px-space-sm py-1 pr-6 font-body-sm text-body-sm text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {SCENARIO_PRESETS.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2">
                expand_more
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-code-num-sm font-code-num-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{isSimulating ? 'Simulating Updates...' : 'Simulation Ready'}</span>
          </div>

          <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant font-code-num-sm text-code-num-sm">
            <span>Last execution: {lastExecutionTime}</span>
            <span className="text-outline-variant">•</span>
            <span>Baseline: Live Operations (P-10)</span>
            <span className="text-outline-variant">•</span>
            <span>Engine: Scenario-based deterministic simulation</span>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            onClick={onResetBaseline}
            className="inline-flex items-center gap-1 px-space-sm py-1 rounded text-body-sm font-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>
    </div>
  );
};
