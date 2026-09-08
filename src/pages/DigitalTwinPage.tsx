import React, { useState, useMemo, useRef } from 'react';
import { AppShell } from '../components/layout/AppShell';
import type {
  ScenarioPresetId,
  ScenarioParameters,
  SimulationNode,
} from '../types/digitalTwin';
import {
  SCENARIO_PRESETS,
  calculateDynamicImpact,
} from '../data/digitalTwin';
import { ScenarioHeaderBar } from '../components/digitalTwin/ScenarioHeaderBar';
import { ScenarioParametersPanel } from '../components/digitalTwin/ScenarioParametersPanel';
import { SimulatedNetworkTopology } from '../components/digitalTwin/SimulatedNetworkTopology';
import { SimulationImpactVariance } from '../components/digitalTwin/SimulationImpactVariance';
import { BeforeAfterTrajectoryChart } from '../components/digitalTwin/BeforeAfterTrajectoryChart';
import { CriticalEntitiesList } from '../components/digitalTwin/CriticalEntitiesList';
import { RecommendedActions } from '../components/digitalTwin/RecommendedActions';
import { SaveScenarioModal, NodeLedgerModal } from '../components/digitalTwin/DigitalTwinModals';

export const DigitalTwinPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPresetId>('demand-surge');
  const [parameters, setParameters] = useState<ScenarioParameters>(
    SCENARIO_PRESETS[0].defaultParams
  );
  const [appliedMitigationIds, setAppliedMitigationIds] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('BLR-WH01');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [lastExecutionTime, setLastExecutionTime] = useState<string>('4 mins ago');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [activeNodeForLedger, setActiveNodeForLedger] = useState<SimulationNode | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const recommendedActionsRef = useRef<HTMLDivElement>(null);

  // Deterministic calculation engine
  const simulationResults = useMemo(
    () => calculateDynamicImpact(parameters, appliedMitigationIds),
    [parameters, appliedMitigationIds]
  );

  const currentScenarioInfo = useMemo(
    () => SCENARIO_PRESETS.find((s) => s.id === selectedScenario) || SCENARIO_PRESETS[0],
    [selectedScenario]
  );

  const handleSelectScenario = (id: ScenarioPresetId) => {
    setSelectedScenario(id);
    const targetScenario = SCENARIO_PRESETS.find((s) => s.id === id);
    if (targetScenario) {
      setParameters({ ...targetScenario.defaultParams });
      setAppliedMitigationIds([]);
      setLastExecutionTime('Just now');
    }
  };

  const handleChangeParameter = (key: keyof ScenarioParameters, val: number) => {
    setParameters((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setLastExecutionTime('Just now');
      setToastMessage('Simulation completed with deterministic dynamic parameters.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 600);
  };

  const handleResetBaseline = () => {
    setParameters({ ...currentScenarioInfo.defaultParams });
    setAppliedMitigationIds([]);
    setLastExecutionTime('Just now');
    setToastMessage('Reset to default scenario baseline.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleMitigation = (id: string) => {
    setAppliedMitigationIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((m) => m !== id) : [...prev, id];
      const actionName = id === 'mit-1' ? 'Inter-Depot Transfer' : id === 'mit-2' ? 'SUP-210 Secondary Allocation' : 'SHP-4821 Multimodal Reroute';
      setToastMessage(exists ? `Removed ${actionName} from simulation.` : `Applied ${actionName} — network recovery simulated!`);
      setTimeout(() => setToastMessage(null), 3500);
      return next;
    });
  };

  const handleScrollToMitigation = () => {
    recommendedActionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectEntityNode = (nodeId?: string) => {
    if (nodeId) {
      setSelectedNodeId(nodeId);
      const matched = simulationResults.nodes.find((n) => n.id === nodeId);
      if (matched) {
        setActiveNodeForLedger(matched);
      }
    }
  };

  return (
    <AppShell
      title="Supply Chain Overview"
      subtitle="Monitor network performance, inventory position, demand, and operational risks across the supply chain."
    >
      <div className="flex flex-col w-full space-y-space-xs relative">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-primary text-on-primary px-4 py-2 rounded-lg shadow-xl border border-primary-fixed-dim/30 flex items-center gap-2 font-body-sm text-body-sm animate-fade-in">
            <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Scenario Header Bar & Status */}
        <ScenarioHeaderBar
          selectedScenario={selectedScenario}
          onSelectScenario={handleSelectScenario}
          isSimulating={isSimulating}
          onRunSimulation={handleRunSimulation}
          onResetBaseline={handleResetBaseline}
          onOpenSaveModal={() => setIsSaveModalOpen(true)}
          lastExecutionTime={lastExecutionTime}
        />

        {/* 2. Main Decision Workspace (Parameters Panel & Network Topology) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
          <ScenarioParametersPanel
            parameters={parameters}
            onChangeParameter={handleChangeParameter}
            impactPreview={simulationResults.impactPreview}
            onReSimulate={handleRunSimulation}
            onResetParams={handleResetBaseline}
            isSimulating={isSimulating}
          />
          <SimulatedNetworkTopology
            nodes={simulationResults.nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onOpenNodeLedger={(node) => setActiveNodeForLedger(node)}
            onMitigateNodeFocus={handleScrollToMitigation}
            criticalBottlenecks={simulationResults.criticalBottlenecks}
          />
        </div>

        {/* 3. Simulation Impact Variance Strip (4 Comparison KPI Cards) */}
        <SimulationImpactVariance kpis={simulationResults.kpis} />

        {/* 4. Before vs After Trajectory Curve & Critical Affected Entities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <BeforeAfterTrajectoryChart
            trajectory={simulationResults.trajectory}
            hasMitigationsApplied={appliedMitigationIds.length > 0}
          />
          <CriticalEntitiesList
            onSelectEntityNode={handleSelectEntityNode}
            hasMitigationsApplied={appliedMitigationIds.length > 0}
          />
        </div>

        {/* 5. Algorithmic Mitigation & Decision Summary */}
        <div ref={recommendedActionsRef}>
          <RecommendedActions
            appliedMitigationIds={appliedMitigationIds}
            onToggleMitigation={handleToggleMitigation}
            riskLevel={simulationResults.riskLevel}
            projectedOtif={simulationResults.projectedOtif}
            surchargeAmount={simulationResults.surchargeAmount}
            criticalBottlenecks={simulationResults.criticalBottlenecks}
            mitigationRecoveryPct={simulationResults.mitigationRecoveryPct}
          />
        </div>
      </div>

      {/* Save Scenario Modal */}
      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        scenarioName={currentScenarioInfo.name}
        parameters={parameters}
        onConfirmSave={(name) => {
          setToastMessage(`Scenario "${name}" saved successfully to ledger.`);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Node Ledger Modal */}
      <NodeLedgerModal
        node={activeNodeForLedger}
        onClose={() => setActiveNodeForLedger(null)}
      />
    </AppShell>
  );
};

export default DigitalTwinPage;
