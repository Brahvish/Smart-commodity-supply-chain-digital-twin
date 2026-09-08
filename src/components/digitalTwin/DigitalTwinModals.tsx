import React, { useState } from 'react';
import type { SimulationNode, ScenarioParameters } from '../../types/digitalTwin';

interface SaveScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioName: string;
  parameters: ScenarioParameters;
  onConfirmSave: (name: string, notes: string) => void;
}

export const SaveScenarioModal: React.FC<SaveScenarioModalProps> = ({
  isOpen,
  onClose,
  scenarioName,
  parameters,
  onConfirmSave,
}) => {
  const [name, setName] = useState(scenarioName);
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      onConfirmSave(name, notes);
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-2xl max-w-md w-full p-space-lg space-y-space-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-outline-variant/30 pb-space-sm">
          <div>
            <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-wider">
              SCENARIO ARCHIVE
            </span>
            <h3 className="font-headline-md text-headline-md text-primary font-bold mt-1">
              Save Scenario Simulation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary rounded"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isSaved ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h4 className="font-headline-md font-bold text-primary">Scenario Saved Successfully</h4>
            <p className="text-body-sm text-on-surface-variant">
              Archived in local workspace scenario ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-space-sm text-body-sm">
            <div>
              <label className="block text-on-surface-variant text-[12px] font-medium mb-1">
                Scenario Title
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded px-space-sm py-1.5 text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20 text-[11px] font-code-num-sm space-y-1">
              <div className="text-on-surface-variant font-medium">Recorded Stress Variables:</div>
              <div className="grid grid-cols-2 gap-1 text-on-surface">
                <span>Demand: {parameters.demandVariance >= 0 ? `+${parameters.demandVariance}%` : `${parameters.demandVariance}%`}</span>
                <span>Supply: {parameters.supplierCapacity >= 0 ? `+${parameters.supplierCapacity}%` : `${parameters.supplierCapacity}%`}</span>
                <span>Corridor: +{parameters.corridorDisruption}d delay</span>
                <span>Storage: {parameters.storageAvailability >= 0 ? `+${parameters.storageAvailability}%` : `${parameters.storageAvailability}%`}</span>
              </div>
            </div>

            <div>
              <label className="block text-on-surface-variant text-[12px] font-medium mb-1">
                Operational Notes &amp; Assumptions
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Document operational hypothesis, stress trigger, or sensitivity testing goals..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded px-space-sm py-1.5 text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-outline-variant/30">
              <button
                type="button"
                onClick={onClose}
                className="px-space-md py-1.5 rounded text-body-sm font-medium border border-outline-variant/40 hover:bg-surface-container-low"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-space-md py-1.5 rounded text-body-sm font-semibold bg-primary text-on-primary hover:bg-primary-container"
              >
                Save to Ledger
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface NodeLedgerModalProps {
  node: SimulationNode | null;
  onClose: () => void;
}

export const NodeLedgerModal: React.FC<NodeLedgerModalProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl shadow-2xl max-w-xl w-full p-space-lg space-y-space-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-outline-variant/30 pb-space-sm">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                  node.status === 'critical'
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : node.status === 'affected'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                }`}
              >
                {node.status.toUpperCase()}
              </span>
              <span className="font-code-num-sm text-[11px] text-on-surface-variant font-medium">
                TIER {node.tier} · {node.id}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold mt-1">
              {node.name}
            </h3>
            <p className="text-body-sm text-on-surface-variant">{node.category} — {node.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary rounded"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-code-num-sm text-[12px]">
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Current Storage / Load</span>
            <span className="font-bold text-primary">
              {node.currentInventoryMT ? `${node.currentInventoryMT.toLocaleString()} MT` : 'N/A'}
            </span>
          </div>
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Total Capacity</span>
            <span className="font-bold text-primary">
              {node.capacityMT ? `${node.capacityMT.toLocaleString()} MT` : 'N/A'}
            </span>
          </div>
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Simulated Utilization</span>
            <span
              className={`font-bold ${
                (node.utilizationPercent || 0) > 85 ? 'text-rose-700' : 'text-primary'
              }`}
            >
              {node.utilizationPercent ? `${node.utilizationPercent}%` : 'N/A'}
            </span>
          </div>
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Safe Buffer Days</span>
            <span className="font-bold text-primary">{node.safeBufferDays} Days</span>
          </div>
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Inbound Transit Variance</span>
            <span
              className={`font-bold ${
                (node.inboundDelayDays || 0) > 0 ? 'text-rose-700' : 'text-emerald-700'
              }`}
            >
              +{node.inboundDelayDays || 0.0} Days
            </span>
          </div>
          <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20">
            <span className="text-on-surface-variant text-[10px] block">Financial Exposure</span>
            <span className="font-bold text-primary">
              {node.financialExposureINR
                ? `₹${node.financialExposureINR.toLocaleString('en-IN')}`
                : '₹0'}
            </span>
          </div>
        </div>

        {/* Commodity Inventory Segregation */}
        <div className="space-y-1">
          <h4 className="font-headline-md text-[14px] text-primary font-semibold">
            Commodity Stock Ledger
          </h4>
          <div className="border border-outline-variant/30 rounded overflow-hidden text-[12px]">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-caps text-[10px] uppercase">
                <tr>
                  <th className="px-2 py-1.5">Grain Grade</th>
                  <th className="px-2 py-1.5">Allocated (MT)</th>
                  <th className="px-2 py-1.5">Quality Grade</th>
                  <th className="px-2 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-code-num-sm">
                <tr>
                  <td className="px-2 py-1.5 font-medium">{node.primaryCommodity} - Class 1</td>
                  <td className="px-2 py-1.5">{Math.round((node.currentInventoryMT || 8000) * 0.65).toLocaleString()} MT</td>
                  <td className="px-2 py-1.5 text-emerald-700 font-semibold">Grade A (99.2%)</td>
                  <td className="px-2 py-1.5 text-emerald-700">Available</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-medium">{node.primaryCommodity} - Standard</td>
                  <td className="px-2 py-1.5">{Math.round((node.currentInventoryMT || 8000) * 0.25).toLocaleString()} MT</td>
                  <td className="px-2 py-1.5 text-emerald-700 font-semibold">Grade B (96.5%)</td>
                  <td className="px-2 py-1.5 text-emerald-700">Available</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-medium">Strategic Safety Reserve</td>
                  <td className="px-2 py-1.5">{Math.round((node.currentInventoryMT || 8000) * 0.10).toLocaleString()} MT</td>
                  <td className="px-2 py-1.5 text-primary font-semibold">Reserve Lock</td>
                  <td className="px-2 py-1.5 text-rose-700 font-medium">Quarantined</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Node Sensor Readings */}
        <div className="p-space-xs bg-surface-container-low rounded border border-outline-variant/20 text-[11px] font-code-num-sm flex justify-between items-center text-on-surface-variant">
          <span>Telemetry Stream: Moisture 11.2% · Temp 22.4°C · Aeration Fans Active</span>
          <span className="text-emerald-700 font-medium">Live Telemetry Synchronized</span>
        </div>

        <div className="flex items-center justify-end pt-space-xs border-t border-outline-variant/30">
          <button
            onClick={onClose}
            className="px-space-md py-1.5 rounded text-body-sm font-semibold bg-primary text-on-primary hover:bg-primary-container"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
