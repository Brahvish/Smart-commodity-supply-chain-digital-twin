export type NodeTier = 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'tier5';

export type NodeStatus = 'healthy' | 'watch' | 'critical';

export interface NetworkNode {
  id: string;
  name: string;
  tier: NodeTier;
  tierLabel: string;
  type: 'supplier' | 'silo' | 'depot' | 'warehouse' | 'plant' | 'customer';
  icon: string;
  metricLabel: string;
  metricValue: string;
  status: NodeStatus;
  statusText: string;
  // Detail inspector properties
  capacityUtil?: string;
  currentInventory?: string;
  inboundShipments?: string;
  outboundUnits?: string;
  riskLevel?: string;
  warningNotice?: string;
}

export interface NetworkConnection {
  id: string;
  fromId: string;
  toId: string;
  pathD: string;
  color: string;
  marker: string;
  strokeWidth: number;
  strokeDasharray?: string;
  opacity: number;
}

export interface IncidentItem {
  id: string;
  severity: 'CRITICAL' | 'HIGH DELAY' | 'RELIABILITY';
  severityTag: string;
  title: string;
  description: string;
  exposure: string;
  actionText: string;
  actionType: 'resolve' | 'inspect' | 'review';
  details?: {
    location: string;
    impact: string;
    recommendedMitigation: string;
  };
}

export interface ShipmentItem {
  id: string;
  commodity: string;
  origin: string;
  destination: string;
  quantity: string;
  mode: 'Rail' | 'Sea' | 'Road';
  modeIcon: string;
  etaDelay: string;
  isDelayed: boolean;
  status: 'Delayed' | 'In Transit';
  statusColor: 'rose' | 'blue' | 'emerald';
  risk: 'Critical' | 'At Risk' | 'Low Risk' | 'Medium';
  carrier: string;
  currentLocation: string;
  locationNotice: string;
  originalEta: string;
  revisedEta: string;
  penaltyExposure: string;
}

export interface ControlTowerData {
  kpis: {
    networkStatus: { status: string; percent: string; subtext: string };
    activeShipments: { total: number; onTrack: number; percent: string };
    delayedShipments: { total: number; criticalCount: number; avgDelay: string };
    criticalIncidents: { total: number; notice: string };
    atRiskInventory: { value: string; volume: string };
  };
  nodes: NetworkNode[];
  connections: NetworkConnection[];
  incidents: IncidentItem[];
  shipments: ShipmentItem[];
}
