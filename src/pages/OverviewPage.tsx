import React, { useState, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { defaultOverviewData, regionDataMap, commodityDataMap } from '../data/overview';
import type { OverviewDataSet } from '../types/overview';
import { FilterCommandBar } from '../components/overview/FilterCommandBar';
import { KPICards } from '../components/overview/KPICards';
import { SupplyDemandChart } from '../components/overview/SupplyDemandChart';
import { NetworkHealth } from '../components/overview/NetworkHealth';
import { RegionalInventoryTable } from '../components/overview/RegionalInventoryTable';
import { PriorityRisks } from '../components/overview/PriorityRisks';
import { RecentActivityTable } from '../components/overview/RecentActivityTable';

export const OverviewPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('All Commodities');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Last 30 Days');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdatedText, setLastUpdatedText] = useState<string>('2 minutes ago');

  // Compute active dataset by merging defaults with filter overlays
  const currentData: OverviewDataSet = useMemo(() => {
    let data = { ...defaultOverviewData };

    if (selectedRegion !== 'All Regions' && regionDataMap[selectedRegion]) {
      const overlay = regionDataMap[selectedRegion];
      data = {
        ...data,
        kpis: overlay.kpis ? { ...data.kpis, ...overlay.kpis } : data.kpis,
        supplyDemandSummary: overlay.supplyDemandSummary
          ? { ...data.supplyDemandSummary, ...overlay.supplyDemandSummary }
          : data.supplyDemandSummary,
      };
    }

    if (selectedCommodity !== 'All Commodities' && commodityDataMap[selectedCommodity]) {
      const overlay = commodityDataMap[selectedCommodity];
      data = {
        ...data,
        kpis: overlay.kpis ? { ...data.kpis, ...overlay.kpis } : data.kpis,
      };
    }

    return data;
  }, [selectedRegion, selectedCommodity]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdatedText('Just now');
    }, 600);
  };

  return (
    <AppShell
      title="Supply Chain Overview"
      subtitle="Monitor network performance, inventory position, demand, and operational risks across the supply chain."
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      lastUpdatedText={lastUpdatedText}
    >
      <div className="flex flex-col w-full space-y-space-md">
        {/* 1. FILTER & COMMAND BAR */}
        <FilterCommandBar
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          selectedCommodity={selectedCommodity}
          onSelectCommodity={setSelectedCommodity}
          selectedTimeRange={selectedTimeRange}
          onSelectTimeRange={setSelectedTimeRange}
          currentData={currentData}
        />

        {/* 2. PRIMARY KPI SECTION */}
        <KPICards kpis={currentData.kpis} />

        {/* 3. MAIN ANALYTICS AREA (Supply vs Demand & Network Health) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <SupplyDemandChart
            monthlyData={currentData.supplyDemandMonthly}
            weeklyData={currentData.supplyDemandWeekly}
            summary={currentData.supplyDemandSummary}
          />
          <NetworkHealth data={currentData.networkHealth} />
        </div>

        {/* 4. SECOND CONTENT ROW (Inventory by Region & Priority Risks) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <RegionalInventoryTable
            items={currentData.regionalInventory}
            selectedRegion={selectedRegion}
            onSelectRegion={(reg) =>
              setSelectedRegion(selectedRegion === reg ? 'All Regions' : reg)
            }
          />
          <PriorityRisks risks={currentData.priorityRisks} />
        </div>

        {/* 5. RECENT ACTIVITY TABLE */}
        <RecentActivityTable events={currentData.recentActivity} />
      </div>
    </AppShell>
  );
};
