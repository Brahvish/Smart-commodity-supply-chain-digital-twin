import React, { useState, useRef, useEffect } from 'react';
import { REGIONS, COMMODITIES, TIME_RANGES } from '../../data/overview';
import type { OverviewDataSet } from '../../types/overview';

interface FilterCommandBarProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  selectedCommodity: string;
  onSelectCommodity: (commodity: string) => void;
  selectedTimeRange: string;
  onSelectTimeRange: (timeRange: string) => void;
  currentData: OverviewDataSet;
}

export const FilterCommandBar: React.FC<FilterCommandBarProps> = ({
  selectedRegion,
  onSelectRegion,
  selectedCommodity,
  onSelectCommodity,
  selectedTimeRange,
  onSelectTimeRange,
  currentData,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'region' | 'commodity' | 'time' | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportCSV = () => {
    // Generate CSV data from current view
    const headers = ['Category', 'Item', 'Value', 'Unit/Status', 'Details'];
    const rows = [
      ['KPI', currentData.kpis.inventory.title, currentData.kpis.inventory.value, currentData.kpis.inventory.unit ?? '', currentData.kpis.inventory.subtext],
      ['KPI', currentData.kpis.shipments.title, currentData.kpis.shipments.value, currentData.kpis.shipments.unit ?? '', currentData.kpis.shipments.subtext],
      ['KPI', currentData.kpis.serviceLevel.title, currentData.kpis.serviceLevel.value, '', currentData.kpis.serviceLevel.subtext],
      ['KPI', currentData.kpis.risk.title, currentData.kpis.risk.value, currentData.kpis.risk.unit ?? '', currentData.kpis.risk.subtext],
      ...currentData.regionalInventory.map(reg => ['Regional Inventory', reg.region, reg.volumeMT.toString(), `${reg.capacityLoad}%`, reg.trend]),
      ...currentData.priorityRisks.map(r => ['Priority Risk', r.title, r.severity, r.tagText, r.description]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `AgriCore_Overview_${selectedRegion.replace(/\s+/g, '_')}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={ref}
      className="w-full bg-surface-container-lowest rounded border border-outline-variant/40 px-space-md py-space-xs flex flex-wrap items-center justify-between gap-space-sm shadow-sm"
    >
      <div className="flex items-center flex-wrap gap-space-sm">
        {/* 1. Region Selector */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
            className="inline-flex items-center gap-space-xs h-8 px-space-sm rounded bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm transition-colors"
            type="button"
          >
            <span className="text-on-surface-variant font-medium">Region:</span>
            <span className="font-semibold text-primary">{selectedRegion}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
          </button>

          {openDropdown === 'region' && (
            <div className="absolute left-0 mt-1 w-48 bg-surface-container-lowest rounded border border-outline-variant/50 shadow-md z-30 py-1 font-body-sm text-body-sm">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    onSelectRegion(region);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-space-md py-1.5 hover:bg-surface-container-low transition-colors ${
                    selectedRegion === region
                      ? 'text-primary font-semibold bg-surface-container-low/60'
                      : 'text-on-surface'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Commodity Selector */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'commodity' ? null : 'commodity')}
            className="inline-flex items-center gap-space-xs h-8 px-space-sm rounded bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm transition-colors"
            type="button"
          >
            <span className="text-on-surface-variant font-medium">Commodity:</span>
            <span className="font-semibold text-primary">{selectedCommodity}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
          </button>

          {openDropdown === 'commodity' && (
            <div className="absolute left-0 mt-1 w-48 bg-surface-container-lowest rounded border border-outline-variant/50 shadow-md z-30 py-1 font-body-sm text-body-sm">
              {COMMODITIES.map((commodity) => (
                <button
                  key={commodity}
                  onClick={() => {
                    onSelectCommodity(commodity);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-space-md py-1.5 hover:bg-surface-container-low transition-colors ${
                    selectedCommodity === commodity
                      ? 'text-primary font-semibold bg-surface-container-low/60'
                      : 'text-on-surface'
                  }`}
                >
                  {commodity}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Time Period Selector */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
            className="inline-flex items-center gap-space-xs h-8 px-space-sm rounded bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
              calendar_today
            </span>
            <span className="font-semibold text-primary">{selectedTimeRange}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
          </button>

          {openDropdown === 'time' && (
            <div className="absolute left-0 mt-1 w-48 bg-surface-container-lowest rounded border border-outline-variant/50 shadow-md z-30 py-1 font-body-sm text-body-sm">
              {TIME_RANGES.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    onSelectTimeRange(range);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-space-md py-1.5 hover:bg-surface-container-low transition-colors ${
                    selectedTimeRange === range
                      ? 'text-primary font-semibold bg-surface-container-low/60'
                      : 'text-on-surface'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Network Indicator */}
        <div className="h-4 w-px bg-outline-variant/40 mx-space-2xs hidden sm:block"></div>
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high/60 text-on-primary-fixed-variant font-code-num-sm text-code-num-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span>Network Live (P-10)</span>
        </div>
      </div>

      {/* Export Report Action */}
      <div className="flex items-center gap-space-sm">
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-space-xs h-8 px-space-sm rounded bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-low text-on-surface font-body-sm text-body-sm font-medium transition-colors shadow-sm active:scale-98"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
            download
          </span>
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};
