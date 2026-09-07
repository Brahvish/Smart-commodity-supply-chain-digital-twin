import React from 'react';
import type { ControlTowerData } from '../../types/controlTower';

interface ControlTowerToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCommodity: string;
  onCommodityChange: (commodity: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedEntity: string;
  onEntityChange: (entity: string) => void;
  isSimulationMode: boolean;
  onToggleSimulationMode: () => void;
  currentData: ControlTowerData;
}

export const ControlTowerToolbar: React.FC<ControlTowerToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCommodity,
  onCommodityChange,
  selectedRegion,
  onRegionChange,
  selectedStatus,
  onStatusChange,
  selectedEntity,
  onEntityChange,
  isSimulationMode,
  onToggleSimulationMode,
  currentData,
}) => {
  const handleExportSnapshot = () => {
    const headers = ['Category', 'Name / ID', 'Type / Commodity', 'Status / Metric', 'Location / Route', 'Risk / Exposure'];
    const rows = [
      ['KPI', 'Network Status', kpisSummary(currentData.kpis), currentData.kpis.networkStatus.percent, 'All 5 Sectors', 'Optimal'],
      ['KPI', 'Active Shipments', `${currentData.kpis.activeShipments.total} units`, `${currentData.kpis.activeShipments.percent} on-track`, 'Network', '14 Delayed'],
      ...currentData.nodes.map(n => ['Node', n.name, n.tierLabel, `${n.metricLabel}: ${n.metricValue}`, n.type, n.statusText]),
      ...currentData.shipments.map(s => ['Shipment', s.id, s.commodity, s.status, `${s.origin} -> ${s.destination}`, s.penaltyExposure]),
      ...currentData.incidents.map(i => ['Incident', i.title, i.severity, i.severityTag, i.description, i.exposure]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `AgriCore_ControlTower_Snapshot_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function kpisSummary(kpis: ControlTowerData['kpis']) {
    return `${kpis.networkStatus.status} (${kpis.activeShipments.total} Shipments, ${kpis.criticalIncidents.total} Incidents)`;
  }

  return (
    <section className="bg-surface-container-lowest px-space-md py-1.5 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-space-sm">
      <div className="flex flex-wrap items-center gap-space-xs flex-1 min-w-[280px]">
        {/* Search Input */}
        <div className="relative flex items-center min-w-[240px] flex-1 sm:flex-none">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute left-2.5 pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-body-sm font-body-sm bg-surface-container-low text-on-surface rounded placeholder-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest transition-colors border border-transparent focus:border-outline-variant"
            placeholder="Search nodes, shipments, corridors..."
            type="text"
          />
        </div>

        <div className="h-4 w-px bg-surface-container-high mx-space-2xs hidden md:block"></div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Commodity Select */}
          <select
            value={selectedCommodity}
            onChange={(e) => onCommodityChange(e.target.value)}
            className="h-8 px-2.5 text-body-sm font-body-sm bg-surface-container-low text-on-surface rounded hover:bg-surface-container focus:outline-none cursor-pointer border border-outline-variant/30"
          >
            <option value="All Commodities">Commodity: All Commodities</option>
            <option value="Hard Red Wheat">Hard Red Wheat</option>
            <option value="Yellow Corn">Yellow Corn</option>
            <option value="Soybeans">Soybeans</option>
            <option value="Arabica Coffee">Arabica Coffee</option>
            <option value="Durum Wheat">Durum Wheat</option>
          </select>

          {/* Region Select */}
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="h-8 px-2.5 text-body-sm font-body-sm bg-surface-container-low text-on-surface rounded hover:bg-surface-container focus:outline-none cursor-pointer border border-outline-variant/30"
          >
            <option value="Global Network">Region: Global Network</option>
            <option value="South Asia (India)">South Asia (India)</option>
            <option value="Latin America Hubs">Latin America Hubs</option>
            <option value="North American Corridors">North American Corridors</option>
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-8 px-2.5 text-body-sm font-body-sm bg-surface-container-low text-on-surface rounded hover:bg-surface-container focus:outline-none cursor-pointer border border-outline-variant/30"
          >
            <option value="All Statuses">Status: All Statuses</option>
            <option value="Optimal">Optimal</option>
            <option value="Watch">Watch (At Risk)</option>
            <option value="Critical Delay">Critical Delay</option>
          </select>

          {/* Entity Select */}
          <select
            value={selectedEntity}
            onChange={(e) => onEntityChange(e.target.value)}
            className="h-8 px-2.5 text-body-sm font-body-sm bg-surface-container-low text-on-surface rounded hover:bg-surface-container focus:outline-none cursor-pointer border border-outline-variant/30"
          >
            <option value="All Entities">Entity: All Entities</option>
            <option value="Origin Suppliers">Origin Suppliers</option>
            <option value="Processing Silos">Processing Silos</option>
            <option value="Distribution Warehouses">Distribution Warehouses</option>
            <option value="Milling Plants">Milling Plants</option>
            <option value="Demand Nodes">Demand Nodes</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-space-xs shrink-0">
        <button
          onClick={onToggleSimulationMode}
          className={`h-8 px-3 rounded transition-colors text-body-sm font-body-sm font-medium flex items-center gap-1.5 ${
            isSimulationMode
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-surface-container-low text-primary hover:bg-surface-container'
          }`}
          type="button"
          title="Toggle sandbox simulation mode"
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>{isSimulationMode ? 'Simulation Active' : 'Simulation Mode'}</span>
        </button>

        <button
          onClick={handleExportSnapshot}
          className="h-8 px-3 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors text-body-sm font-body-sm font-medium flex items-center gap-1.5 shadow-sm active:scale-98"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Export Snapshot</span>
        </button>
      </div>
    </section>
  );
};
