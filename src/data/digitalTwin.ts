import type {
  ScenarioInfo,
  ScenarioParameters,
  ScenarioImpactPreview,
  SimulationNode,
  SimulationRoute,
  VarianceKPI,
  TrajectoryPoint,
  CriticalEntity,
  MitigationIntervention,
} from '../types/digitalTwin';

export const SCENARIO_PRESETS: ScenarioInfo[] = [
  {
    id: 'demand-surge',
    name: 'Demand Surge — South Region',
    description: 'Simulates sudden consumer wheat & soybean demand surge across Southern industrial milling corridor.',
    defaultParams: {
      demandVariance: 15,
      supplierCapacity: -5,
      corridorDisruption: 3,
      storageAvailability: -10,
    },
  },
  {
    id: 'monsoon-disruption',
    name: 'Monsoon Rail Disruption — Western Ghats',
    description: 'Simulates heavy rainfall and track washouts on the Western freight trunk corridor.',
    defaultParams: {
      demandVariance: 5,
      supplierCapacity: -12,
      corridorDisruption: 5,
      storageAvailability: -5,
    },
  },
  {
    id: 'silo-outage',
    name: 'Silo Outage & Congestion — Nagpur',
    description: 'Simulates mechanical elevator breakdown and localized grain intake halt at Central Nagpur Silo.',
    defaultParams: {
      demandVariance: 0,
      supplierCapacity: -8,
      corridorDisruption: 2,
      storageAvailability: -25,
    },
  },
  {
    id: 'port-freeze',
    name: 'Export Port Quota Freeze (Kandla / JNPT)',
    description: 'Simulates export quota bottleneck and berth congestion with inland container dwell delays.',
    defaultParams: {
      demandVariance: -10,
      supplierCapacity: 0,
      corridorDisruption: 4,
      storageAvailability: 12,
    },
  },
];

export const INITIAL_NODES: SimulationNode[] = [
  // Tier 1: Suppliers
  {
    id: 'SUP-01',
    tier: 1,
    name: 'Punjab Wheat Co',
    subtitle: '14,200 MT · 99%',
    status: 'healthy',
    statusLabel: 'Operating Optimal',
    currentInventoryMT: 14200,
    capacityMT: 14350,
    utilizationPercent: 99,
    category: 'Commercial Origin Co-op',
    location: 'Ludhiana, Punjab',
    primaryCommodity: 'Durum Wheat & Barley',
    safeBufferDays: 14,
  },
  {
    id: 'SUP-09',
    tier: 1,
    name: 'Mato Grosso Origin',
    subtitle: '22,000 MT · 98%',
    status: 'healthy',
    statusLabel: 'Operating Optimal',
    currentInventoryMT: 22000,
    capacityMT: 22500,
    utilizationPercent: 98,
    category: 'Import Terminal Feed',
    location: 'Santos / Maritime',
    primaryCommodity: 'Yellow Corn & Soybeans',
    safeBufferDays: 28,
  },
  {
    id: 'SUP-184',
    tier: 1,
    name: 'Karnataka Co-op',
    subtitle: '4,800 MT (-5%)',
    status: 'affected',
    statusLabel: 'Capacity Constrained',
    currentInventoryMT: 4800,
    capacityMT: 5050,
    utilizationPercent: 95,
    category: 'Regional Farming Union',
    location: 'Raichur, Karnataka',
    primaryCommodity: 'Milling Wheat',
    safeBufferDays: 4,
  },

  // Tier 2: Processing Centers
  {
    id: 'PRC-HYD',
    tier: 2,
    name: 'Hyderabad Proc.',
    subtitle: '3,400 MT/day',
    status: 'healthy',
    statusLabel: 'Throughput Normal',
    currentInventoryMT: 3400,
    capacityMT: 4000,
    utilizationPercent: 85,
    category: 'Grain Cleaning & Grading',
    location: 'Hyderabad, Telangana',
    primaryCommodity: 'Wheat & Grain Flours',
    safeBufferDays: 9,
  },
  {
    id: 'PRC-RAI',
    tier: 2,
    name: 'Raichur Terminal',
    subtitle: '+1.5d backlog',
    status: 'affected',
    statusLabel: 'Infeed Stagnation',
    currentInventoryMT: 2900,
    capacityMT: 3200,
    utilizationPercent: 91,
    category: 'Inland Transshipment Hub',
    location: 'Raichur, Karnataka',
    primaryCommodity: 'Coarse Grain Sort',
    safeBufferDays: 3,
  },

  // Tier 3: Warehouses & Silos
  {
    id: 'BLR-WH01',
    tier: 3,
    name: 'Bangalore Central',
    subtitle: '12.4k MT (87% cap)',
    status: 'critical',
    statusLabel: 'Critical Depletion Risk',
    currentInventoryMT: 12400,
    capacityMT: 14250,
    utilizationPercent: 87,
    inboundDelayDays: 3.2,
    stockoutWindowDays: 4.5,
    financialExposureINR: 4200000,
    category: 'Bulk Grain Silo & Terminal',
    location: 'Whitefield Corridor, Bangalore',
    primaryCommodity: 'Premium Hard Red Wheat',
    safeBufferDays: 4.5,
  },
  {
    id: 'MUM-HUB',
    tier: 3,
    name: 'Mumbai Logistics',
    subtitle: 'Buffer at 14%',
    status: 'affected',
    statusLabel: 'Low Buffer Warning',
    currentInventoryMT: 8900,
    capacityMT: 12000,
    utilizationPercent: 74,
    inboundDelayDays: 1.8,
    stockoutWindowDays: 8.0,
    financialExposureINR: 1950000,
    category: 'Portside Multi-modal Depot',
    location: 'Navi Mumbai, Maharashtra',
    primaryCommodity: 'Import Soy & Feed Wheat',
    safeBufferDays: 8,
  },
  {
    id: 'NGP-SILO',
    tier: 3,
    name: 'Nagpur Silo #4',
    subtitle: '18,500 MT Free',
    status: 'healthy',
    statusLabel: 'Surplus Capacity',
    currentInventoryMT: 26500,
    capacityMT: 45000,
    utilizationPercent: 59,
    category: 'Strategic Central Buffer Silo',
    location: 'Nagpur Industrial Area, Maharashtra',
    primaryCommodity: 'Raw Grain Storage',
    safeBufferDays: 32,
  },

  // Tier 4: Packaging & Mills
  {
    id: 'CHN-PLT',
    tier: 4,
    name: 'Chennai Mill Hub',
    subtitle: 'Low infeed alert',
    status: 'affected',
    statusLabel: 'Supply Lag',
    currentInventoryMT: 3100,
    capacityMT: 5000,
    utilizationPercent: 62,
    category: 'Industrial Flour Milling',
    location: 'Ambattur, Chennai',
    primaryCommodity: 'Fortified Flour',
    safeBufferDays: 5,
  },
  {
    id: 'PUN-PLT',
    tier: 4,
    name: 'Pune Milling Plant',
    subtitle: 'Steady run 94%',
    status: 'healthy',
    statusLabel: 'Nominal Schedule',
    currentInventoryMT: 6200,
    capacityMT: 6600,
    utilizationPercent: 94,
    category: 'Commercial Agro-Processing',
    location: 'Chakan, Pune',
    primaryCommodity: 'Bakery Grade Grain',
    safeBufferDays: 16,
  },

  // Tier 5: Demand Corridors / Distribution
  {
    id: 'SOUTH-DEM',
    tier: 5,
    name: 'South Region Dist.',
    subtitle: '+15% Surge Strain',
    status: 'critical',
    statusLabel: 'Stockout Danger: 3d',
    currentInventoryMT: 4100,
    capacityMT: 9500,
    utilizationPercent: 43,
    inboundDelayDays: 3.5,
    stockoutWindowDays: 3.0,
    financialExposureINR: 6100000,
    category: 'High-Velocity Retail Channel',
    location: 'Southern Hub (Karnataka & TN)',
    primaryCommodity: 'Consumer Packaged Flour',
    safeBufferDays: 3,
  },
  {
    id: 'WST-DEM',
    tier: 5,
    name: 'West Coast Retail',
    subtitle: 'OTIF at 98.4%',
    status: 'healthy',
    statusLabel: 'Service SLA Met',
    currentInventoryMT: 8400,
    capacityMT: 8800,
    utilizationPercent: 95,
    category: 'FMCG Distribution Depot',
    location: 'Western Corridor, Mumbai',
    primaryCommodity: 'Wholesale Grains',
    safeBufferDays: 22,
  },
];

export const INITIAL_ROUTES: SimulationRoute[] = [
  // Healthy routes
  {
    id: 'r-sup01-hyderabad',
    sourceId: 'SUP-01',
    targetId: 'PRC-HYD',
    status: 'healthy',
    pathD: 'M 120 70 C 180 70, 210 130, 270 130',
  },
  {
    id: 'r-sup09-hyderabad',
    sourceId: 'SUP-09',
    targetId: 'PRC-HYD',
    status: 'healthy',
    pathD: 'M 120 170 C 180 170, 210 130, 270 130',
  },
  {
    id: 'r-hyderabad-nagpur',
    sourceId: 'PRC-HYD',
    targetId: 'NGP-SILO',
    status: 'healthy',
    pathD: 'M 330 130 C 370 130, 400 240, 460 240',
  },
  {
    id: 'r-nagpur-pune',
    sourceId: 'NGP-SILO',
    targetId: 'PUN-PLT',
    status: 'healthy',
    pathD: 'M 520 240 C 560 240, 590 220, 650 220',
  },
  {
    id: 'r-pune-west',
    sourceId: 'PUN-PLT',
    targetId: 'WST-DEM',
    status: 'healthy',
    pathD: 'M 710 220 C 750 220, 780 230, 840 230',
  },

  // Affected routes
  {
    id: 'r-sup184-raichur',
    sourceId: 'SUP-184',
    targetId: 'PRC-RAI',
    status: 'affected',
    pathD: 'M 120 270 C 180 270, 210 250, 270 250',
  },
  {
    id: 'r-raichur-mumbai',
    sourceId: 'PRC-RAI',
    targetId: 'MUM-HUB',
    status: 'affected',
    pathD: 'M 330 250 C 370 250, 390 190, 440 180',
  },
  {
    id: 'r-mumbai-chennai',
    sourceId: 'MUM-HUB',
    targetId: 'CHN-PLT',
    status: 'affected',
    pathD: 'M 530 140 C 580 140, 610 130, 650 130',
  },

  // Critical bottleneck routes
  {
    id: 'r-critical-inbound',
    sourceId: 'SUP-184',
    targetId: 'PRC-RAI',
    status: 'critical',
    pathD: 'M 120 270 C 200 300, 260 270, 310 260',
  },
  {
    id: 'r-critical-blr',
    sourceId: 'PRC-RAI',
    targetId: 'BLR-WH01',
    status: 'critical',
    pathD: 'M 330 250 C 380 260, 400 120, 450 110',
  },
  {
    id: 'r-critical-blr-chennai',
    sourceId: 'BLR-WH01',
    targetId: 'CHN-PLT',
    status: 'critical',
    pathD: 'M 530 110 C 600 110, 640 100, 700 100',
    isAnimated: true,
  },
  {
    id: 'r-critical-chennai-south',
    sourceId: 'CHN-PLT',
    targetId: 'SOUTH-DEM',
    status: 'critical',
    pathD: 'M 720 100 C 770 100, 800 100, 840 100',
  },
];

export const CRITICAL_ENTITIES: CriticalEntity[] = [
  {
    id: 'ent-1',
    nodeId: 'BLR-WH01',
    severity: 'CRITICAL',
    name: 'Bangalore Central Warehouse',
    description: 'Projected stockout in 5 days due to +3d Western corridor delay and +15% demand surge.',
    exposure: 'Exposure: ₹4.2M',
    secondaryMetric: 'Buffer: 4.5d left',
  },
  {
    id: 'ent-2',
    severity: 'HIGH',
    name: 'Shipment SHP-4821 (Punjab Wheat)',
    description: 'Rail stoppage at Nagpur Junction; transit variance increases to +24h without expedited reroute.',
    exposure: '2,600 MT Hard Red Wheat',
    secondaryMetric: 'Delay: +18h',
  },
  {
    id: 'ent-3',
    nodeId: 'SUP-184',
    severity: 'MEDIUM',
    name: 'Supplier SUP-184 (Vidarbha Agro)',
    description: 'Delivery reliability drops to 78% under simulated -5% cooperative capacity restriction.',
    exposure: '3 processing plants impacted',
    secondaryMetric: 'SLA: 78.4%',
  },
];

export const MITIGATION_INTERVENTIONS: MitigationIntervention[] = [
  {
    id: 'mit-1',
    recNumber: '01',
    priority: 'HIGH',
    costINR: '₹180k',
    costNumeric: 180000,
    title: 'Inter-Depot Transfer: Hyderabad to Bangalore',
    description:
      'Move 4,200 MT buffer grain from Hyderabad Warehouse via green express highway corridor to replenish Bangalore silo prior to stockout window.',
    expectedImpact:
      'Reduces Bangalore stockout probability from 17% to 5%; completely preserves South Region fulfillment.',
    actionDetailLabel: 'Route Details',
    detailModalContent: {
      headline: 'Dedicated Hyderabad -> Bangalore Express Highway Corridor',
      routeOrOrigin: 'NH 44 Express Truckload Convoy (84 dedicated tipper trailers)',
      slaImpact: '+4.1 percentage points OTIF recovery across Southern Region',
      fleetRequirements: 'Consignment dispatches within 6 hours from Hyderabad Silo depot',
    },
  },
  {
    id: 'mit-2',
    recNumber: '02',
    priority: 'MEDIUM',
    costINR: '₹320k',
    costNumeric: 320000,
    title: 'Procure Secondary Allocation from Supplier SUP-210',
    description:
      'Increase secondary contract allocation by 2,500 MT from Madhya Pradesh cooperative to compensate for Vidarbha capacity constraint.',
    expectedImpact:
      'Improves projected OTIF service level by +3.2 percentage points; offsets supplier delay.',
    actionDetailLabel: 'Contract Terms',
    detailModalContent: {
      headline: 'Spot Purchase Secondary Addendum with MP Grain Federations',
      routeOrOrigin: 'Madhya Pradesh State Cooperative Warehouses (Bhopal/Indore)',
      slaImpact: '+3.2 percentage points OTIF recovery, zero quality deviation',
      fleetRequirements: 'Direct origin rake allocation under emergency procurement clause',
    },
  },
  {
    id: 'mit-3',
    recNumber: '03',
    priority: 'HIGH',
    costINR: '₹95k',
    costNumeric: 95000,
    title: 'Multimodal Corridor Reroute for SHP-4821',
    description:
      'Transfer stalled 2,600 MT wheat consignment from rail siding to dedicated fleet road haulage at Nagpur Junction.',
    expectedImpact:
      'Reduces transit delay from 18 hours to 6 hours, ensuring arrival prior to silo safety stock depletion.',
    actionDetailLabel: 'Fleet Telemetry',
    detailModalContent: {
      headline: 'Nagpur Rail Siding to Western Corridor Road Transshipment',
      routeOrOrigin: 'Nagpur ICD Freight Yard transloaded to 52 container vehicles',
      slaImpact: 'Prevents downstream production stoppage at Chennai Mill Hub',
      fleetRequirements: 'Pre-cleared green corridor transit permits arranged with state logistics desk',
    },
  },
];

/**
 * Deterministic calculation engine for the prototype
 */
export function calculateDynamicImpact(
  params: ScenarioParameters,
  appliedMitigationIds: string[] = []
): {
  impactPreview: ScenarioImpactPreview;
  kpis: VarianceKPI[];
  trajectory: TrajectoryPoint[];
  nodes: SimulationNode[];
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  projectedOtif: string;
  surchargeAmount: string;
  criticalBottlenecks: number;
  mitigationRecoveryPct: number;
} {
  const { demandVariance, supplierCapacity, corridorDisruption, storageAvailability } = params;

  // Number of applied interventions
  const mitCount = appliedMitigationIds.length;
  const isMit1 = appliedMitigationIds.includes('mit-1');
  const isMit2 = appliedMitigationIds.includes('mit-2');
  const isMit3 = appliedMitigationIds.includes('mit-3');

  // Baseline figures
  const baselineTotalInv = 82400; // MT
  const baselineCost = 14.2; // ₹M
  const baselineOtif = 96.8; // %

  // Deterministic impact calculation
  // Stress coefficient based on inputs
  const stressScore =
    Math.max(0, demandVariance * 0.8) +
    Math.abs(Math.min(0, supplierCapacity)) * 0.9 +
    corridorDisruption * 4.5 +
    Math.abs(Math.min(0, storageAvailability)) * 0.6;

  // Recovery credit from mitigations
  const recoveryScore = (isMit1 ? 26 : 0) + (isMit2 ? 20 : 0) + (isMit3 ? 18 : 0);
  const netStress = Math.max(0, stressScore - recoveryScore);

  // Dynamic Inventory calculation
  const invDepletionMT = Math.round((stressScore * 480) - (recoveryScore * 310));
  const simTotalInv = Math.max(38000, baselineTotalInv - invDepletionMT);
  const invDeltaPct = (((simTotalInv - baselineTotalInv) / baselineTotalInv) * 100).toFixed(1);

  // Dynamic Cost calculation
  const surchargeVal = Number((((stressScore * 0.09) - (recoveryScore * 0.045))).toFixed(1));
  const effectiveSurcharge = surchargeVal > 0.3 ? surchargeVal : 0.4;
  const simCost = (baselineCost + effectiveSurcharge).toFixed(1);

  // Stockout facilities
  const baseStockouts = 3;
  const addedStockouts = Math.max(0, Math.round(netStress * 0.32));
  const totalStockouts = baseStockouts + addedStockouts;

  // OTIF Calculation
  const otifDrop = Math.min(15, Number((netStress * 0.17).toFixed(1)));
  const simOtif = Math.min(98.5, Number((baselineOtif - otifDrop).toFixed(1)));

  // Risk Level
  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'HIGH';
  if (netStress < 14) {
    riskLevel = 'LOW';
  } else if (netStress < 28) {
    riskLevel = 'MODERATE';
  } else {
    riskLevel = 'HIGH';
  }

  // Critical bottlenecks count
  let criticalBottlenecks = 3;
  if (mitCount === 3) criticalBottlenecks = 0;
  else if (mitCount >= 1) criticalBottlenecks = Math.max(1, 3 - mitCount);

  // Breached nodes count
  const breachedNodes = Math.max(0, 3 - mitCount);

  // Impact Preview text
  const impactPreview: ScenarioImpactPreview = {
    demandDelta: `${demandVariance >= 0 ? '+' : ''}${demandVariance}%${demandVariance >= 15 ? ' (Severe)' : ''}`,
    supplyDelta: `${supplierCapacity >= 0 ? '+' : ''}${supplierCapacity}%`,
    corridorLatency: `+${corridorDisruption.toFixed(1)} days`,
    storageBuffer: `${storageAvailability >= 0 ? '+' : ''}${storageAvailability}%`,
    breachedNodes,
  };

  // 4 KPI Cards
  const kpis: VarianceKPI[] = [
    {
      id: 'kpi-inventory',
      title: 'TOTAL INVENTORY',
      icon: 'inventory_2',
      iconColor: 'text-rose-600',
      currentValue: simTotalInv.toLocaleString(),
      unit: 'MT',
      deltaValue: `${invDeltaPct}% (-${(baselineTotalInv - simTotalInv).toLocaleString()} MT)`,
      deltaType: Number(invDeltaPct) < 0 ? 'warning' : 'positive',
      baseline: `Baseline: ${baselineTotalInv.toLocaleString()} MT`,
      contextNote: `${breachedNodes > 0 ? `${breachedNodes} zones breach buffer` : 'All buffers stabilized'}`,
    },
    {
      id: 'kpi-cost',
      title: 'TRANSPORTATION COST',
      icon: 'local_shipping',
      iconColor: 'text-amber-600',
      currentValue: `₹${simCost}M`,
      deltaValue: `+${(((Number(simCost) - baselineCost) / baselineCost) * 100).toFixed(1)}% (+₹${effectiveSurcharge}M variance)`,
      deltaType: 'warning',
      baseline: `Baseline: ₹${baselineCost}M`,
      contextNote: isMit3 ? 'Expedited road bypass active' : 'Demurrage penalties active',
    },
    {
      id: 'kpi-stockout',
      title: 'STOCKOUT INCIDENTS',
      icon: 'report_problem',
      iconColor: totalStockouts > 5 ? 'text-rose-600' : 'text-amber-600',
      currentValue: `${totalStockouts}`,
      unit: 'facilities',
      deltaValue: `+${addedStockouts} facilities at risk`,
      deltaType: addedStockouts > 0 ? 'negative' : 'positive',
      baseline: `Baseline: ${baseStockouts} facilities`,
      contextNote: isMit1 ? 'South corridor secured' : 'South retail exposed',
    },
    {
      id: 'kpi-otif',
      title: 'SERVICE LEVEL (OTIF)',
      icon: 'verified',
      iconColor: simOtif >= 95 ? 'text-primary' : 'text-amber-600',
      currentValue: `${simOtif.toFixed(1)}%`,
      deltaValue: `${(simOtif - baselineOtif).toFixed(1)} pts (${simOtif < 95 ? 'Under 95% SLA' : 'SLA Satisfied'})`,
      deltaType: simOtif >= 95 ? 'positive' : 'warning',
      baseline: `Baseline: ${baselineOtif}%`,
      contextNote: mitCount > 0 ? 'Algorithmic recovery applied' : '12-day recovery lead',
    },
  ];

  // 30-Day Trajectory Curve
  const trajectory: TrajectoryPoint[] = [
    { day: 'Day 0', dayOffset: 0, baselineMT: 82400, simulatedMT: 82400, mitigatedMT: 82400, safetyThresholdMT: 50000 },
    { day: 'Day +5', dayOffset: 5, baselineMT: 83100, simulatedMT: isMit1 ? 62000 : 48500, mitigatedMT: 66000, safetyThresholdMT: 50000 },
    { day: 'Day +10', dayOffset: 10, baselineMT: 83800, simulatedMT: isMit1 ? 58000 : 42000, mitigatedMT: 68500, safetyThresholdMT: 50000 },
    { day: 'Day +15', dayOffset: 15, baselineMT: 84200, simulatedMT: isMit1 ? 57500 : 39500, mitigatedMT: 71000, safetyThresholdMT: 50000 },
    { day: 'Day +20', dayOffset: 20, baselineMT: 83600, simulatedMT: isMit1 ? 58500 : 38200, mitigatedMT: 73000, safetyThresholdMT: 50000 },
    { day: 'Day +25', dayOffset: 25, baselineMT: 84100, simulatedMT: isMit1 ? 61000 : 38000, mitigatedMT: 75500, safetyThresholdMT: 50000 },
    { day: 'Day +30', dayOffset: 30, baselineMT: 84500, simulatedMT: isMit1 ? 64000 : 39200, mitigatedMT: 78000, safetyThresholdMT: 50000 },
  ];

  // Dynamically update nodes based on applied mitigations
  const nodes: SimulationNode[] = INITIAL_NODES.map((node) => {
    const updated = { ...node };

    if (node.id === 'BLR-WH01') {
      if (isMit1) {
        updated.status = 'healthy';
        updated.statusLabel = 'Replenished via Bypass';
        updated.subtitle = '16.6k MT (Buffer Restored)';
        updated.stockoutWindowDays = 19.5;
        updated.financialExposureINR = 450000;
        updated.utilizationPercent = 94;
      }
    } else if (node.id === 'SOUTH-DEM') {
      if (isMit1) {
        updated.status = 'healthy';
        updated.statusLabel = 'Fulfillment Protected';
        updated.subtitle = 'OTIF Restored 97.2%';
        updated.stockoutWindowDays = 24.0;
        updated.financialExposureINR = 800000;
      }
    } else if (node.id === 'SUP-184') {
      if (isMit2) {
        updated.status = 'healthy';
        updated.statusLabel = 'Supplemented via SUP-210';
        updated.subtitle = '7,300 MT (Quota Met)';
      }
    } else if (node.id === 'PRC-RAI') {
      if (isMit3) {
        updated.status = 'healthy';
        updated.statusLabel = 'Transload Completed';
        updated.subtitle = 'Backlog Cleared';
      }
    }

    return updated;
  });

  const recoveryPct = Math.min(94, Math.round(recoveryScore * 1.4));

  return {
    impactPreview,
    kpis,
    trajectory,
    nodes,
    riskLevel,
    projectedOtif: `${simOtif.toFixed(1)}%`,
    surchargeAmount: `+₹${effectiveSurcharge}M`,
    criticalBottlenecks,
    mitigationRecoveryPct: recoveryPct,
  };
}
