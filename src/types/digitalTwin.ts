export type ScenarioPresetId =
  | 'demand-surge'
  | 'monsoon-disruption'
  | 'silo-outage'
  | 'port-freeze';

export interface ScenarioInfo {
  id: ScenarioPresetId;
  name: string;
  description: string;
  defaultParams: ScenarioParameters;
}

export interface ScenarioParameters {
  demandVariance: number;       // -15% to +30%
  supplierCapacity: number;     // -20% to +20%
  corridorDisruption: number;   // 0 to 7 days
  storageAvailability: number;  // -30% to +20%
}

export interface ScenarioImpactPreview {
  demandDelta: string;
  supplyDelta: string;
  corridorLatency: string;
  storageBuffer: string;
  breachedNodes: number;
}

export type NodeStatus = 'healthy' | 'affected' | 'critical';

export interface SimulationNode {
  id: string;
  tier: 1 | 2 | 3 | 4 | 5;
  name: string;
  subtitle: string;
  status: NodeStatus;
  statusLabel: string;
  currentInventoryMT?: number;
  capacityMT?: number;
  utilizationPercent?: number;
  inboundDelayDays?: number;
  stockoutWindowDays?: number;
  financialExposureINR?: number;
  category: string;
  location: string;
  primaryCommodity: string;
  safeBufferDays: number;
}

export interface SimulationRoute {
  id: string;
  sourceId: string;
  targetId: string;
  status: 'healthy' | 'affected' | 'critical';
  pathD: string;
  isAnimated?: boolean;
}

export interface VarianceKPI {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  currentValue: string;
  unit?: string;
  deltaValue: string;
  deltaType: 'positive' | 'negative' | 'warning';
  baseline: string;
  contextNote: string;
}

export interface TrajectoryPoint {
  day: string;
  dayOffset: number;
  baselineMT: number;
  simulatedMT: number;
  mitigatedMT: number;
  safetyThresholdMT: number;
}

export interface CriticalEntity {
  id: string;
  nodeId?: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  name: string;
  description: string;
  exposure: string;
  secondaryMetric: string;
}

export interface MitigationIntervention {
  id: string;
  recNumber: string;
  priority: 'HIGH' | 'MEDIUM';
  costINR: string;
  costNumeric: number;
  title: string;
  description: string;
  expectedImpact: string;
  actionDetailLabel: string;
  detailModalContent: {
    headline: string;
    routeOrOrigin: string;
    slaImpact: string;
    fleetRequirements: string;
  };
}

export interface SimulationExecutionState {
  isSimulating: boolean;
  lastExecutionTime: string;
  appliedMitigations: string[]; // array of intervention ids
}
