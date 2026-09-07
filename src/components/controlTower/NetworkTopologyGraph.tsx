import React, { useState } from 'react';
import type { NetworkNode, NetworkConnection } from '../../types/controlTower';
import { DetailModal } from '../common/DetailModal';

interface NetworkTopologyGraphProps {
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  searchFilter?: string;
}

export const NetworkTopologyGraph: React.FC<NetworkTopologyGraphProps> = ({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  searchFilter = '',
}) => {
  const [viewMode, setViewMode] = useState<'physical' | 'flow'>('physical');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showFullDetailsModal, setShowFullDetailsModal] = useState<boolean>(false);
  const [rebalancedNotice, setRebalancedNotice] = useState<string | null>(null);

  // Group nodes by tier
  const tier1Nodes = nodes.filter((n) => n.tier === 'tier1');
  const tier2Nodes = nodes.filter((n) => n.tier === 'tier2');
  const tier3Nodes = nodes.filter((n) => n.tier === 'tier3');
  const tier4Nodes = nodes.filter((n) => n.tier === 'tier4');
  const tier5Nodes = nodes.filter((n) => n.tier === 'tier5');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[6]; // default Bangalore Central

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  const handleRebalance = () => {
    setRebalancedNotice('Rebalance order dispatched: 1,800 MT allocated from Mysore depot.');
    setTimeout(() => setRebalancedNotice(null), 4000);
  };

  const isMatchingSearch = (node: NetworkNode) => {
    if (!searchFilter.trim()) return true;
    return (
      node.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      node.metricLabel.toLowerCase().includes(searchFilter.toLowerCase()) ||
      node.tierLabel.toLowerCase().includes(searchFilter.toLowerCase())
    );
  };

  return (
    <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-lg shadow-sm p-space-md">
      {/* Topology Graph Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-md text-headline-md text-primary font-semibold">
              End-to-End Network
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-code-num-sm bg-secondary-fixed text-on-secondary-fixed font-medium">
              LIVE TOPOLOGY
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Live operational view across suppliers, warehouses, plants, and customer demand.
          </p>
        </div>

        {/* View Mode & Zoom Controls */}
        <div className="flex items-center gap-space-xs shrink-0">
          <div className="flex items-center bg-surface-container-low rounded p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('physical')}
              className={`px-2 py-1 text-label-caps font-label-caps uppercase rounded transition-all ${
                viewMode === 'physical'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Physical Nodes
            </button>
            <button
              type="button"
              onClick={() => setViewMode('flow')}
              className={`px-2 py-1 text-label-caps font-label-caps uppercase rounded transition-all ${
                viewMode === 'flow'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Route Flow
            </button>
          </div>

          <div className="h-4 w-px bg-surface-container-high mx-1"></div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-surface-container-low rounded">
            <button
              onClick={handleZoomIn}
              className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95"
              title="Zoom In"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95"
              title="Zoom Out"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <button
              onClick={handleResetZoom}
              className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95"
              title="Fit Network"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">fit_screen</span>
            </button>
            <button
              onClick={handleResetZoom}
              className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95"
              title="Reset View"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            </button>
          </div>
        </div>
      </div>

      {rebalancedNotice && (
        <div className="mb-2 px-3 py-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {rebalancedNotice}
          </span>
          <button onClick={() => setRebalancedNotice(null)} className="text-emerald-900 font-bold">×</button>
        </div>
      )}

      {/* Topology Canvas Area */}
      <div className="relative w-full h-full min-h-[550px] bg-surface-container-low/40 rounded-lg overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Tier Column Labels */}
        <div className="grid grid-cols-5 w-full bg-surface-container-low/90 py-2 px-3 z-10 border-b border-outline-variant/30">
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-left">
            Tier 1: Suppliers
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-left">
            Tier 2: Collection
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-left">
            Tier 3: Hubs &amp; Depots
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-left">
            Tier 4: Processing
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-left">
            Tier 5: Demand Grid
          </div>
        </div>

        {/* Scalable Container */}
        <div
          className="relative flex-1 transition-transform duration-200 origin-center flex flex-col justify-between"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* SVG Topology Connections Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 850 550"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker id="arrow-gray" markerHeight="4" markerWidth="4" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
              </marker>
              <marker id="arrow-red" markerHeight="5" markerWidth="5" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ba1a1a" />
              </marker>
              <marker id="arrow-green" markerHeight="4" markerWidth="4" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
              </marker>
              <marker id="arrow-amber" markerHeight="4" markerWidth="4" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
              </marker>
            </defs>

            {connections.map((c) => (
              <path
                key={c.id}
                d={c.pathD}
                fill="none"
                markerEnd={c.marker}
                opacity={c.opacity}
                stroke={c.color}
                strokeDasharray={c.strokeDasharray}
                strokeWidth={c.strokeWidth}
              />
            ))}
          </svg>

          {/* HTML Interactive Node Layer */}
          <div className="relative flex-1 grid grid-cols-5 p-3 z-20">
            {/* Col 1: Tier 1 Origins */}
            <div className="flex flex-col justify-around pr-2">
              {tier1Nodes.map((node) => renderNodeCard(node))}
            </div>

            {/* Col 2: Tier 2 Collection & Silos */}
            <div className="flex flex-col justify-around px-2">
              {tier2Nodes.map((node) => renderNodeCard(node))}
            </div>

            {/* Col 3: Tier 3 Hubs & Depots (Contains Bangalore Central) */}
            <div className="flex flex-col justify-around px-2 relative">
              {tier3Nodes.map((node) => renderNodeCard(node))}
            </div>

            {/* Col 4: Tier 4 Processing Plants */}
            <div className="flex flex-col justify-around px-2">
              {tier4Nodes.map((node) => renderNodeCard(node))}
            </div>

            {/* Col 5: Tier 5 Customer Demand */}
            <div className="flex flex-col justify-around pl-2">
              {tier5Nodes.map((node) => renderNodeCard(node))}
            </div>
          </div>
        </div>

        {/* Legend Strip at Bottom */}
        <div className="w-full bg-surface-container-lowest/90 px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-10 border-t border-outline-variant/30">
          <div className="flex items-center gap-4 text-code-num-sm font-code-num-sm">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Healthy (142)
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> At Risk (14)
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-error"></span> Critical (3)
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Selected Focus
            </span>
          </div>
          <div className="flex items-center gap-3 text-code-num-sm font-code-num-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">psychiatry</span> Supplier
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warehouse</span> Warehouse
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">factory</span> Processing
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">store</span> Customer
            </span>
          </div>
        </div>
      </div>

      {/* Full Details Modal for Selected Node */}
      {selectedNode && (
        <DetailModal
          isOpen={showFullDetailsModal}
          onClose={() => setShowFullDetailsModal(false)}
          title={`${selectedNode.name} (${selectedNode.tierLabel})`}
          badgeText={selectedNode.riskLevel ?? selectedNode.statusText}
          badgeSeverity={selectedNode.status === 'critical' ? 'Critical' : selectedNode.status === 'watch' ? 'High' : 'Info'}
        >
          <div className="space-y-3">
            <p className="text-on-surface font-medium">{selectedNode.warningNotice || 'Node operating within standard operational tolerance parameters.'}</p>
            <div className="grid grid-cols-2 gap-2 bg-surface-container-low/40 p-3 rounded border border-outline-variant/30 text-xs">
              <div>
                <span className="text-on-surface-variant font-label-caps block uppercase">Node Type</span>
                <span className="font-semibold text-primary">{selectedNode.type.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-on-surface-variant font-label-caps block uppercase">Current Inventory</span>
                <span className="font-semibold text-primary">{selectedNode.currentInventory || 'N/A'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant font-label-caps block uppercase">Capacity Utilization</span>
                <span className="font-semibold text-amber-700">{selectedNode.capacityUtil || 'N/A'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant font-label-caps block uppercase">Inbound Shipments</span>
                <span className="font-semibold text-error">{selectedNode.inboundShipments || 'None delayed'}</span>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={() => {
                  handleRebalance();
                  setShowFullDetailsModal(false);
                }}
                className="w-full h-8 rounded bg-primary text-white font-body-sm font-medium hover:bg-primary-container"
              >
                Execute Priority Rebalance Order
              </button>
            </div>
          </div>
        </DetailModal>
      )}
    </div>
  );

  function renderNodeCard(node: NetworkNode) {
    const isSelected = selectedNodeId === node.id;
    const isCritical = node.status === 'critical';
    const isWatch = node.status === 'watch';
    const matchesSearch = isMatchingSearch(node);

    if (isSelected && isCritical) {
      // Selected Critical Node (e.g. Bangalore Central) with Docked Inspector Card
      return (
        <div key={node.id} className="relative">
          <div
            onClick={() => onSelectNode(node.id)}
            className={`bg-surface-container-lowest p-3 rounded-lg shadow-md bg-gradient-to-r from-error/5 to-transparent cursor-pointer border border-error/40 ring-1 ring-error/30 transition-all ${
              !matchesSearch ? 'opacity-40' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                <span className="font-body-md text-body-md font-semibold text-primary truncate">
                  {node.name}
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-code-num-sm bg-rose-100 text-rose-800 font-bold">
                {node.statusText}
              </span>
            </div>
            <div className="font-code-num-sm text-code-num-sm text-on-surface-variant flex justify-between mt-1.5">
              <span>{node.metricLabel}</span>
              <span className="text-error font-semibold">{node.metricValue}</span>
            </div>
          </div>

          {/* Floating Inspector Card docked right next to it */}
          <div className="absolute left-full top-[-60px] ml-3 w-64 bg-surface-container-lowest rounded-lg shadow-xl p-3 z-30 pointer-events-auto border border-outline-variant/30 animate-in fade-in">
            <div className="flex items-center justify-between pb-1.5 bg-surface-container-low/50 -mx-3 -mt-3 p-3 rounded-t-lg">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-error">warning</span>
                <span className="font-body-sm text-body-sm font-semibold text-primary truncate">
                  {node.name} WH
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-code-num-sm bg-rose-100 text-rose-800 font-semibold">
                {node.riskLevel || 'RISK LEVEL 4'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-1 font-code-num-sm text-code-num-sm">
              <div>
                <span className="text-on-surface-variant block text-[10px] font-label-caps uppercase">
                  Current Inv.
                </span>
                <span className="font-semibold text-primary">{node.currentInventory || '12,400 MT'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px] font-label-caps uppercase">
                  Capacity
                </span>
                <span className="font-semibold text-amber-700">{node.capacityUtil || '87% util'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px] font-label-caps uppercase">
                  Inbound
                </span>
                <span className="font-semibold text-error">{node.inboundShipments || '4 (1 Delayed)'}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block text-[10px] font-label-caps uppercase">
                  Outbound
                </span>
                <span className="font-semibold text-primary">{node.outboundUnits || '11 units'}</span>
              </div>
            </div>

            {node.warningNotice && (
              <div className="mt-2.5 p-1.5 bg-rose-50/80 rounded">
                <span className="font-label-caps text-label-caps text-rose-900 block font-semibold">
                  STOCKOUT WARNING
                </span>
                <p className="font-body-sm text-[11px] leading-tight text-rose-950 mt-0.5">
                  {node.warningNotice}
                </p>
              </div>
            )}

            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setShowFullDetailsModal(true)}
                className="font-code-num-sm text-[11px] text-secondary font-medium hover:underline"
                type="button"
              >
                Full Details →
              </button>
              <button
                onClick={handleRebalance}
                className="px-2.5 py-1 rounded bg-primary text-on-primary text-[11px] font-body-sm font-medium hover:bg-primary-container transition-colors"
                type="button"
              >
                Rebalance
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Standard Node Cards
    const statusColorClass = isCritical
      ? 'text-error font-semibold'
      : isWatch
      ? 'text-amber-700 font-semibold'
      : 'text-emerald-700 font-semibold';

    return (
      <div
        key={node.id}
        onClick={() => onSelectNode(node.id)}
        className={`bg-surface-container-lowest p-2.5 rounded-lg shadow-sm hover:shadow transition-all border cursor-pointer ${
          isSelected
            ? 'border-secondary ring-2 ring-secondary/30'
            : 'border-outline-variant/30 hover:border-outline-variant/60'
        } ${!matchesSearch ? 'opacity-40' : ''}`}
        title={`Click to inspect ${node.name}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">
            {node.icon}
          </span>
          <span className="font-body-md text-body-md font-semibold text-primary truncate">
            {node.name}
          </span>
        </div>
        <div className="font-code-num-sm text-code-num-sm text-on-surface-variant flex justify-between mt-1.5">
          <span className="truncate">{node.metricLabel}</span>
          <span className={statusColorClass}>{node.metricValue}</span>
        </div>
      </div>
    );
  }
};
