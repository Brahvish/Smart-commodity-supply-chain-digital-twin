import React, { useState } from 'react';
import type { SimulationNode, SimulationRoute } from '../../types/digitalTwin';
import { INITIAL_ROUTES } from '../../data/digitalTwin';

interface SimulatedNetworkTopologyProps {
  nodes: SimulationNode[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onOpenNodeLedger: (node: SimulationNode) => void;
  onMitigateNodeFocus: () => void;
  criticalBottlenecks: number;
}

export const SimulatedNetworkTopology: React.FC<SimulatedNetworkTopologyProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onOpenNodeLedger,
  onMitigateNodeFocus,
  criticalBottlenecks,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[5]; // Default BLR-WH01

  // Group nodes by tier
  const tier1Nodes = nodes.filter((n) => n.tier === 1);
  const tier2Nodes = nodes.filter((n) => n.tier === 2);
  const tier3Nodes = nodes.filter((n) => n.tier === 3);
  const tier4Nodes = nodes.filter((n) => n.tier === 4);
  const tier5Nodes = nodes.filter((n) => n.tier === 5);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(130, z + 10));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(75, z - 10));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="xl:col-span-9 flex flex-col bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm relative overflow-hidden p-space-sm">
      {/* Network Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs">
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Simulated Supply Chain Network
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-code-num-sm font-code-num-sm">
                Simulation Completed
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              12 interactive nodes across 5 network echelons ·{' '}
              <span className={criticalBottlenecks > 0 ? 'text-rose-700 font-semibold' : 'text-emerald-700 font-semibold'}>
                {criticalBottlenecks > 0
                  ? `${criticalBottlenecks} critical throughput bottlenecks detected`
                  : 'Bottlenecks resolved via mitigation'}
              </span>
            </p>
          </div>
        </div>

        {/* Controls & Legend */}
        <div className="flex items-center gap-space-md">
          {/* Status Legend */}
          <div className="hidden sm:flex items-center gap-space-sm font-code-num-sm text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>Healthy
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>Affected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>Critical
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-primary-fixed"></span>Selected
            </span>
          </div>

          {/* Network Zoom / Reset Buttons */}
          <div className="flex items-center bg-surface-container-low rounded border border-outline-variant/40 p-0.5">
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-surface-container-lowest rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Zoom In"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-surface-container-lowest rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Zoom Out"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_out</span>
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 hover:bg-surface-container-lowest rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Fit Network View"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">fit_screen</span>
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 hover:bg-surface-container-lowest rounded text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Reset Viewport"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logical 5-Tier Echelon Bar */}
      <div className="grid grid-cols-5 gap-2 pt-space-xs pb-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-center border-b border-outline-variant/20 bg-surface/50 rounded-t mt-space-xs">
        <div>Tier 1: Suppliers</div>
        <div>Tier 2: Processing</div>
        <div>Tier 3: Warehouses / Silos</div>
        <div>Tier 4: Packaging &amp; Mills</div>
        <div>Tier 5: Demand Corridors</div>
      </div>

      {/* Network Canvas Area with SVG Graph & Nodes */}
      <div className="relative w-full h-[410px] bg-slate-50/50 rounded border border-outline-variant/20 mt-space-xs overflow-hidden">
        <div
          className="w-full h-full relative transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Background Grid Watermark Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="twinGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.75" fill="#94a3b8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#twinGrid)" />
          </svg>

          {/* SVG Routing Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 400" preserveAspectRatio="none">
            {INITIAL_ROUTES.map((route: SimulationRoute) => {
              if (route.status === 'healthy') {
                return (
                  <path
                    key={route.id}
                    d={route.pathD}
                    fill="none"
                    stroke="#94a3b8"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                );
              }
              if (route.status === 'affected') {
                return (
                  <path
                    key={route.id}
                    d={route.pathD}
                    fill="none"
                    stroke="#f59e0b"
                    strokeDasharray="4 3"
                    strokeWidth="2"
                  />
                );
              }
              // Critical routes
              return (
                <g key={route.id}>
                  <path
                    d={route.pathD}
                    fill="none"
                    stroke={criticalBottlenecks > 0 ? '#ef4444' : '#10b981'}
                    strokeDasharray={criticalBottlenecks > 0 ? '5 3' : undefined}
                    strokeWidth={criticalBottlenecks > 0 ? '2.5' : '1.5'}
                  />
                  {route.isAnimated && criticalBottlenecks > 0 && (
                    <circle cx="620" cy="105" r="4" fill="#ef4444">
                      <animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values="1;0.2;1" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tier 1: Suppliers */}
          <div className="absolute left-4 top-8 flex flex-col gap-3 z-10">
            {tier1Nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-32 p-2 rounded cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'border-2 border-primary ring-2 ring-primary/20 bg-primary-fixed/20'
                      : node.status === 'affected'
                      ? 'bg-amber-50/90 border border-amber-300 hover:border-amber-500'
                      : 'bg-surface-container-lowest border border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'critical'
                          ? 'bg-rose-600 animate-ping'
                          : node.status === 'affected'
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-code-num-sm text-[9px] text-on-surface-variant font-medium">
                      {node.id}
                    </span>
                  </div>
                  <div className="font-body-sm font-semibold text-primary truncate mt-0.5">
                    {node.name}
                  </div>
                  <div
                    className={`font-code-num-sm text-[10px] ${
                      node.status === 'affected' ? 'text-amber-800 font-medium' : 'text-emerald-700'
                    }`}
                  >
                    {node.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier 2: Processing Centers */}
          <div className="absolute left-48 sm:left-56 top-16 flex flex-col gap-10 z-10">
            {tier2Nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-32 p-2 rounded cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'border-2 border-primary ring-2 ring-primary/20 bg-primary-fixed/20'
                      : node.status === 'affected'
                      ? 'bg-amber-50/90 border border-amber-300 hover:border-amber-500'
                      : 'bg-surface-container-lowest border border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'critical'
                          ? 'bg-rose-600 animate-ping'
                          : node.status === 'affected'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-code-num-sm text-[9px] text-on-surface-variant font-medium">
                      {node.id}
                    </span>
                  </div>
                  <div className="font-body-sm font-semibold text-primary truncate mt-0.5">
                    {node.name}
                  </div>
                  <div
                    className={`font-code-num-sm text-[10px] ${
                      node.status === 'affected' ? 'text-amber-800 font-medium' : 'text-emerald-700'
                    }`}
                  >
                    {node.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier 3: Warehouses & Silos */}
          <div className="absolute left-[360px] sm:left-[415px] top-6 flex flex-col gap-4 z-10">
            {tier3Nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCritical = node.status === 'critical';
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-36 p-2 rounded-lg cursor-pointer transition-all relative ${
                    isCritical
                      ? 'bg-rose-50/95 border-2 border-primary shadow-md ring-2 ring-primary/20'
                      : isSelected
                      ? 'bg-surface-container-lowest border-2 border-primary shadow-md ring-2 ring-primary/20'
                      : node.status === 'affected'
                      ? 'bg-amber-50/90 border border-amber-300 shadow-sm hover:border-amber-500'
                      : 'bg-surface-container-lowest border border-outline-variant/40 shadow-sm hover:border-primary'
                  }`}
                >
                  {isCritical && (
                    <div className="absolute -top-2.5 right-2 px-1.5 py-0.2 rounded bg-rose-700 text-white font-code-num-sm text-[9px] font-bold tracking-wider">
                      CRITICAL
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-600 animate-pulse'
                          : node.status === 'affected'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span
                      className={`font-code-num-sm text-[10px] font-bold ${
                        isCritical ? 'text-rose-950' : 'text-on-surface-variant'
                      }`}
                    >
                      {node.id}
                    </span>
                  </div>
                  <div className="font-body-sm font-bold text-primary truncate mt-0.5">
                    {node.name}
                  </div>
                  <div
                    className={`font-code-num-sm text-[10px] ${
                      isCritical
                        ? 'text-rose-800 font-medium'
                        : node.status === 'affected'
                        ? 'text-amber-800'
                        : 'text-emerald-700'
                    }`}
                  >
                    {node.subtitle}
                  </div>
                  {isCritical && (
                    <div className="font-code-num-sm text-[10px] text-rose-900 font-semibold mt-0.5">
                      Stockout: T-minus {node.stockoutWindowDays}d
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tier 4: Packaging & Mills */}
          <div className="absolute left-[540px] sm:left-[620px] top-12 flex flex-col gap-10 z-10">
            {tier4Nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-34 p-2 rounded cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'border-2 border-primary ring-2 ring-primary/20 bg-primary-fixed/20'
                      : node.status === 'affected'
                      ? 'bg-amber-50/90 border border-amber-300 hover:border-amber-500'
                      : 'bg-surface-container-lowest border border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'critical'
                          ? 'bg-rose-600 animate-ping'
                          : node.status === 'affected'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-code-num-sm text-[9px] text-on-surface-variant font-medium">
                      {node.id}
                    </span>
                  </div>
                  <div className="font-body-sm font-semibold text-primary truncate mt-0.5">
                    {node.name}
                  </div>
                  <div
                    className={`font-code-num-sm text-[10px] ${
                      node.status === 'affected' ? 'text-amber-800 font-medium' : 'text-emerald-700'
                    }`}
                  >
                    {node.subtitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier 5: Demand Corridors */}
          <div className="absolute right-4 top-10 flex flex-col gap-12 z-10">
            {tier5Nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCritical = node.status === 'critical';
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-36 p-2 rounded-lg cursor-pointer transition-all shadow-sm ${
                    isCritical
                      ? 'bg-rose-50 border-2 border-rose-500'
                      : isSelected
                      ? 'bg-surface-container-lowest border-2 border-primary ring-2 ring-primary/20'
                      : 'bg-surface-container-lowest border border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCritical ? 'bg-rose-600 animate-ping' : 'bg-emerald-500'
                      }`}
                    />
                    <span
                      className={`font-code-num-sm text-[9px] font-bold ${
                        isCritical ? 'text-rose-900' : 'text-on-surface-variant'
                      }`}
                    >
                      {node.id}
                    </span>
                  </div>
                  <div
                    className={`font-body-sm font-bold truncate mt-0.5 ${
                      isCritical ? 'text-rose-950' : 'text-primary'
                    }`}
                  >
                    {node.name}
                  </div>
                  <div
                    className={`font-code-num-sm text-[10px] ${
                      isCritical ? 'text-rose-800 font-semibold' : 'text-emerald-700'
                    }`}
                  >
                    {node.subtitle}
                  </div>
                  {isCritical && (
                    <span className="text-[9px] text-rose-600 font-medium block">
                      Danger: {node.stockoutWindowDays || 3}d out
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Docked Inspection Flyout Panel */}
        <div className="absolute bottom-2 left-2 right-2 sm:left-auto sm:right-3 sm:w-80 bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-lg border border-outline-variant/50 shadow-md z-20">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-1">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  selectedNode.status === 'critical'
                    ? 'bg-rose-600 animate-pulse'
                    : selectedNode.status === 'affected'
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
              />
              <span
                className={`font-label-caps text-[10px] font-bold uppercase tracking-wide ${
                  selectedNode.status === 'critical'
                    ? 'text-rose-800'
                    : selectedNode.status === 'affected'
                    ? 'text-amber-800'
                    : 'text-emerald-800'
                }`}
              >
                {selectedNode.status === 'critical'
                  ? 'CRITICAL RISK · INSPECTION'
                  : selectedNode.status === 'affected'
                  ? 'MONITORING · INSPECTION'
                  : 'OPERATIONAL · INSPECTION'}
              </span>
            </div>
            <span className="font-code-num-sm text-[10px] text-on-surface-variant font-medium">
              {selectedNode.id}
            </span>
          </div>

          <div className="mt-1">
            <div className="font-headline-md text-headline-md text-primary font-semibold leading-tight truncate">
              {selectedNode.name}
            </div>
            <span className="text-[11px] text-on-surface-variant block truncate">
              {selectedNode.category}
            </span>
          </div>

          {/* Compact Telemetry Grid */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-code-num-sm text-[11px]">
            <div className="flex justify-between border-b border-outline-variant/20 pb-0.5">
              <span className="text-on-surface-variant">Current Inventory:</span>
              <span className="font-semibold text-on-surface">
                {selectedNode.currentInventoryMT ? `${selectedNode.currentInventoryMT.toLocaleString()} MT` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-0.5">
              <span className="text-on-surface-variant">Sim. Utilization:</span>
              <span
                className={`font-semibold ${
                  (selectedNode.utilizationPercent || 0) > 80 ? 'text-rose-700' : 'text-on-surface'
                }`}
              >
                {selectedNode.utilizationPercent ? `${selectedNode.utilizationPercent}% Cap` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-0.5">
              <span className="text-on-surface-variant">Inbound Delay:</span>
              <span
                className={`font-semibold ${
                  (selectedNode.inboundDelayDays || 0) > 0 ? 'text-rose-700' : 'text-emerald-700'
                }`}
              >
                +{selectedNode.inboundDelayDays || 0.0} Days
              </span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-0.5">
              <span className="text-on-surface-variant">Stockout Window:</span>
              <span
                className={`font-bold ${
                  (selectedNode.stockoutWindowDays || 10) < 6 ? 'text-rose-700' : 'text-emerald-700'
                }`}
              >
                {selectedNode.stockoutWindowDays ? `${selectedNode.stockoutWindowDays} Days` : '> 20 Days'}
              </span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-0.5 col-span-2">
              <span className="text-on-surface-variant">Financial Exposure:</span>
              <span className="font-bold text-on-surface">
                {selectedNode.financialExposureINR
                  ? `₹${selectedNode.financialExposureINR.toLocaleString('en-IN')}`
                  : '₹0'}
              </span>
            </div>
          </div>

          {/* Quick Action Cluster */}
          <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-outline-variant/20">
            <button
              onClick={() => onOpenNodeLedger(selectedNode)}
              className="flex-1 py-1 px-1.5 rounded text-[11px] font-body-sm font-medium bg-surface text-on-surface border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-center truncate cursor-pointer"
              type="button"
            >
              Node Ledger
            </button>
            <button
              onClick={onMitigateNodeFocus}
              className="flex-1 py-1 px-1.5 rounded text-[11px] font-body-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-colors text-center truncate cursor-pointer"
              type="button"
            >
              Mitigate Node →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
