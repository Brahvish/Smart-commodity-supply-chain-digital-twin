import React, { useState, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { controlTowerMockData } from '../data/controlTower';
import type { ControlTowerData } from '../types/controlTower';
import { ControlTowerKPIs } from '../components/controlTower/ControlTowerKPIs';
import { ControlTowerToolbar } from '../components/controlTower/ControlTowerToolbar';
import { NetworkTopologyGraph } from '../components/controlTower/NetworkTopologyGraph';
import { NetworkHealthIncidents } from '../components/controlTower/NetworkHealthIncidents';
import { ActiveShipmentsSection } from '../components/controlTower/ActiveShipmentsSection';

export const ControlTowerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('All Commodities');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global Network');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [selectedEntity, setSelectedEntity] = useState<string>('All Entities');
  const [isSimulationMode, setIsSimulationMode] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-t3-2'); // default Bangalore Central
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('SHP-4821');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdatedText, setLastUpdatedText] = useState<string>('1 minute ago • Live Pulse (P-10)');

  // Filtered dataset
  const currentData: ControlTowerData = useMemo(() => {
    let data = { ...controlTowerMockData };

    if (isSimulationMode) {
      data = {
        ...data,
        kpis: {
          ...data.kpis,
          delayedShipments: {
            total: 22,
            criticalCount: 6,
            avgDelay: '+6.8h simulated shock',
          },
          criticalIncidents: {
            total: 5,
            notice: 'Simulated Stress Scenario Active',
          },
          atRiskInventory: {
            value: '₹18.9M',
            volume: '62,800 MT volume exposed',
          },
        },
      };
    }

    return data;
  }, [isSimulationMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdatedText('Just now • Live Pulse (P-10)');
    }, 600);
  };

  return (
    <AppShell
      title="Supply Chain Control Tower"
      subtitle="Monitor network activity, disruptions, shipments, and operational bottlenecks in real time."
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      lastUpdatedText={lastUpdatedText}
    >
      <div className="flex flex-col w-full space-y-space-md">
        {/* Simulation Mode Banner if active */}
        {isSimulationMode && (
          <div className="w-full bg-amber-50 border border-amber-300 px-space-md py-2 rounded-lg flex items-center justify-between text-amber-900 text-body-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-600 animate-pulse">
                bolt
              </span>
              <span>
                <strong>Simulation Mode Active:</strong> Displaying modeled shock impact (+40% port dwell, +24h rail transit bottleneck).
              </span>
            </div>
            <button
              onClick={() => setIsSimulationMode(false)}
              className="text-xs text-amber-800 underline font-semibold hover:text-amber-950"
            >
              Exit Simulation
            </button>
          </div>
        )}

        {/* 1. Top Level KPI Status Strip */}
        <ControlTowerKPIs kpis={currentData.kpis} />

        {/* 2. Filter & Control Toolbar */}
        <ControlTowerToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCommodity={selectedCommodity}
          onCommodityChange={setSelectedCommodity}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedEntity={selectedEntity}
          onEntityChange={setSelectedEntity}
          isSimulationMode={isSimulationMode}
          onToggleSimulationMode={() => setIsSimulationMode(!isSimulationMode)}
          currentData={currentData}
        />

        {/* 3. Main Control Tower Workspace: 70% Left Network / 30% Right Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <NetworkTopologyGraph
            nodes={currentData.nodes}
            connections={currentData.connections}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            searchFilter={searchQuery}
          />
          <NetworkHealthIncidents
            incidents={currentData.incidents}
            onSelectShipmentIncident={(shpId) => setSelectedShipmentId(shpId)}
          />
        </section>

        {/* 4. Lower Section: Active Network Shipments & Selected Shipment Context Drawer */}
        <ActiveShipmentsSection
          shipments={currentData.shipments}
          selectedShipmentId={selectedShipmentId}
          onSelectShipment={setSelectedShipmentId}
        />
      </div>
    </AppShell>
  );
};
