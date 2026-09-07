export interface KPICardData {
  title: string;
  icon: string;
  value: string;
  unit?: string;
  badgeText: string;
  badgeType: 'healthy' | 'watch' | 'critical';
  badgeIcon?: string;
  subtext: string;
}

export interface SupplyDemandPoint {
  period: string; // e.g., 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'
  histSupply: number | null;
  forecastSupply: number | null;
  histDemand: number | null;
  forecastDemand: number | null;
  isToday?: boolean;
  peakLabel?: string;
}

export interface NetworkHealthCategory {
  name: string;
  score: number;
  status: 'Healthy' | 'Watch' | 'Critical';
}

export interface NetworkHealthData {
  aggregateIndex: number;
  deltaPts: string;
  vsText: string;
  activeChecks: string;
  categories: NetworkHealthCategory[];
}

export interface RegionalInventoryItem {
  id: string;
  region: string;
  volumeMT: number;
  capacityLoad: number; // 0-100
  trend: string;
  trendPositive: boolean;
}

export interface PriorityRiskItem {
  id: string;
  severity: 'Critical' | 'High' | 'Medium';
  tagText: string;
  title: string;
  description: string;
  actionText: string;
  entityType: 'inventory' | 'shipment' | 'supplier';
  details: {
    location?: string;
    affectedProduct?: string;
    impact?: string;
    eta?: string;
    recommendedMitigation: string;
  };
}

export interface ActivityEventItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  category: 'Logistics' | 'Inventory' | 'Procurement' | 'Forecasting';
  actor: string;
}

export interface OverviewDataSet {
  kpis: {
    inventory: KPICardData;
    shipments: KPICardData;
    serviceLevel: KPICardData;
    risk: KPICardData;
  };
  supplyDemandMonthly: SupplyDemandPoint[];
  supplyDemandWeekly: SupplyDemandPoint[];
  supplyDemandSummary: {
    deficitText: string;
    peakDemandText: string;
    model: string;
  };
  networkHealth: NetworkHealthData;
  regionalInventory: RegionalInventoryItem[];
  priorityRisks: PriorityRiskItem[];
  recentActivity: ActivityEventItem[];
}
