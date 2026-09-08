# AgriCore — Supply Chain Intelligence

> **Enterprise Decision-Support & Smart Commodity Supply Chain Digital Twin**

AgriCore is an enterprise-grade supply-chain intelligence and decision-support platform designed for trade desks, logistics directors, procurement heads, and field operations managers coordinating bulk agricultural commodity movement across port terminals, rail corridors, silo networks, and regional processing facilities.

---

## 🌟 The Product Story

AgriCore is structured around four interconnected operational pillars that provide a continuous situational narrative:

1. **Executive Overview** (*"What is happening?"*)  
   Real-time global situational awareness: aggregate network health, inventory buffers, supply vs. demand balance, friction points, and telemetry feeds.
2. **Control Tower** (*"Where is the problem?"*)  
   Multi-tier network topology, route tracking, bottleneck isolation, and active shipment consignment dispatch telemetry.
3. **Digital Twin** (*"What happens if we change something?"*)  
   Scenario-based deterministic simulation modeling demand shocks, port congestion, rail delays, and silo capacity constraints with dynamic impact analysis and algorithmic mitigation playbooks.
4. **Demand Forecasting** (*"What is likely to happen next?"*)  
   Multi-horizon commodity demand forecasting, confidence intervals, seasonal index calibration, and procurement timing recommendations.

---

## 🚀 Implemented Modules & Features

### 1. Executive Overview (`/overview`)
- **Command & Filter Bar**:
  - Instant preset filtering across **Regions** (*Karnataka, Maharashtra, Punjab, Tamil Nadu, Andhra Pradesh*) and **Commodities** (*Soybeans, Wheat, Corn, Rice, All Commodities*).
  - Time-horizon selection (*Last 7 Days, Last 30 Days, Last 90 Days, Year to Date*).
  - **Client-Side CSV Export**: Instant export of current metrics, regional allocations, and risk logs.
- **Primary Operational KPIs**:
  - **Total Inventory**: Metric tonnage (MT), 41-day coverage benchmark, and rolling deltas.
  - **Active Shipments**: Units in transit, delayed consignment flags, and on-time rate percentages.
  - **Service Level (OTIF)**: On-Time In-Full performance against internal targets.
  - **Supply Chain Risk**: Active alert counts categorized by severity (*Critical, Moderate*).
- **Supply vs. Demand Analytics**:
  - Dual-curve visualization with historical throughput vs. forecasted allocation.
  - **Monthly & Weekly Resolution**: Toggle between macro monthly planning and micro weekly execution.
  - Interactive "TODAY" temporal threshold, peak demand callout badge (*April at 92,400 MT*), and hover tooltips.
- **Network Health Diagnostics**:
  - Aggregate index score with 7-day rolling comparative deltas.
  - Node health breakdown (*Suppliers, Warehouses, Shipments, Order Fulfillment*).
  - Interactive **Audit Log Modal** detailing active telemetry edge nodes.
- **Regional Silo Inventory Table**:
  - Tabular breakdown of volume, capacity load percentage bars, and trend differentials.
  - **Click-to-Filter**: Selecting any regional row instantly filters the dashboard context.
- **Priority Friction Risks**:
  - Severity-accented operational alerts (*Bangalore Warehouse Stockout, Nhava Sheva Port Congestion, Supplier SUP-184 Variance*).
  - Focused **Operational Detail Drawers** containing facility locations, commodities, impact assessments, ETAs, and mitigation plans.
- **Recent Telemetry Activity Feed**:
  - Live operations stream across logistics, inventory, procurement, and forecasting.

---

### 2. Supply Chain Control Tower (`/control-tower`)
- **Top KPI Status Strip**:
  - 5 High-density cards: **Network Status** (Operational 92.2%), **Active Shipments** (186, 92.4% on-track), **Delayed Shipments** (14, 3 Critical, +4.2h variance), **Critical Incidents** (3, immediate triage required), and **At-Risk Inventory** (₹12.4M, 41,200 MT volume exposed).
- **Control Toolbar**:
  - Global search across nodes, routes, and shipments.
  - Multi-facet dropdown filters: Commodity, Region, Status, and Entity.
  - **Simulation Mode Toggle**: Instantly models stress-test conditions with updated operational metrics and an active warning banner.
  - **Export Snapshot**: One-click download of comprehensive network telemetry snapshot in CSV format.
- **End-to-End Network Topology**:
  - 5-Tier layout (*Tier 1: Suppliers, Tier 2: Collection Centers, Tier 3: Processing Hubs & Depots, Tier 4: Packaging & Distribution, Tier 5: Demand Grid*).
  - Curved SVG route flow paths color-coded for Healthy (slate), In-Transit (blue), Watch (amber), and Disrupted (rose dashed).
  - Interactive Zoom controls (Zoom In, Zoom Out, Reset Viewport).
  - Interactive node selection with live state synchronization across the dashboard.
- **Selected Node Inspector**:
  - Docked flyout inspector for **Bangalore Central Silo & Depot** displaying current inventory (12,400 MT), capacity utilization (87%), inbound/outbound queues, and stockout warning notices.
  - Node Details & Inventory Rebalance action triggers.
- **Network Health & Incident Triage**:
  - Visual health progression across network tiers with a centralized **Incident Triage Board Modal** for dispatch operations.
- **Active Consignments Table & Context Drawer**:
  - Filterable tabs (*All, Delayed, In Transit, At Risk*).
  - Interactive table where selecting any consignment opens the **Consignment Telemetry Drawer** (*SHP-4821, SHP-4822, etc.*).
  - Working operational actions: **Emergency Reroute via Road Corridor Modal**, **Direct Carrier Contact Line**, and **Live Sensor Stream**.

---

### 3. Digital Twin Workspace (`/digital-twin`)
- **Scenario Header Bar & Status**:
  - Preset scenario dropdown:
    1. *Demand Surge — South Region*
    2. *Monsoon Rail Disruption — Western Ghats*
    3. *Silo Outage & Congestion — Nagpur*
    4. *Export Port Quota Freeze (Kandla / JNPT)*
  - `SIM-ENGINE v3.4` badge, pulsing `Simulation Ready` indicator, execution timestamp, and engine metadata (*Scenario-based deterministic simulation*).
  - **Run Simulation**: Executes deterministic multi-echelon calculation with animated loading state.
  - **Save Scenario**: Opens the Scenario Archive modal with recorded parameters and user operational notes.
- **Scenario Parameters Panel**:
  - 4 Responsive stress-variable sliders:
    - **Demand Variance** (-15% to +30%)
    - **Supplier Capacity** (-20% to +20%)
    - **Corridor Disruption** (0 to 7 days delay)
    - **Storage Availability** (-30% to +20%)
  - Real-time **Scenario Impact Preview**: Instant calculation of demand delta, supply delta, corridor latency, storage buffer, and safety threshold breach counts.
  - `Re-Simulate` and `Reset Baseline` controls.
- **Simulated Network Topology (Hero Visualization)**:
  - 12 Interactive nodes positioned across 5 echelons (*Tier 1 Suppliers, Tier 2 Processing Centers, Tier 3 Warehouses & Silos, Tier 4 Packaging & Mills, Tier 5 Demand Corridors*).
  - Curved SVG route connectors color-coded for Healthy, Affected (amber dashed), and Critical (rose dashed).
  - Real SVG animated pulse marker traveling continuously along critical bottleneck corridors.
  - Interactive node clicking updates the docked flyout inspection panel.
- **Docked Inspector & Node Ledger**:
  - Inspects key telemetry: Current Inventory, Simulated Utilization %, Inbound Delay Days, Stockout Window, and Financial Exposure (₹).
  - **Node Ledger Modal**: Complete commodity stock segregation breakdown (*Grade A Premium, Grade B Standard, Quarantined Reserve Lock*) with real-time temperature, moisture, and aeration telemetry.
- **Simulation Impact Variance Strip**:
  - 4 Comparative KPI cards evaluated against Live Operations baseline (P-10):
    - **Total Inventory**: Metric tonnage, % delta, and buffer breach indicators.
    - **Transportation Cost**: Dynamic cost in ₹M, demurrage penalty variance, and baseline comparison.
    - **Stockout Incidents**: Total at-risk facilities count with severity alerts.
    - **Service Level (OTIF)**: Dynamic service level % and SLA delta benchmarked against 95% target.
- **Before vs. After Trajectory Curve**:
  - 30-Day aggregate inventory depletion SVG chart comparing Baseline operations vs. Simulated stress vs. Mitigated recovery.
  - Visual 50,000 MT Minimum Safety Buffer threshold line with temporal Day +5 Stockout callout badge.
  - **Export Simulation Vectors (CSV)**: Downloads 30-day projection time-series dataset.
- **Critical Affected Entities**:
  - Prioritized operational ranking (*Bangalore Central Warehouse, Shipment SHP-4821, Supplier SUP-184*).
  - Click-to-focus interaction that selects and highlights the entity on the network topology canvas.
- **Algorithmic Mitigation & Simulated Recovery**:
  - **Decision Summary Bar**: Real-time tracking of Scenario Risk (*HIGH / MODERATE / LOW*), Projected OTIF, Additional Surcharge, and Critical Bottlenecks.
  - 3 Actionable intervention cards with realistic agricultural logistics solutions:
    - *Recommendation 01*: Inter-Depot Transfer: Hyderabad to Bangalore (₹180k)
    - *Recommendation 02*: Procure Secondary Allocation from Supplier SUP-210 (₹320k)
    - *Recommendation 03*: Multimodal Corridor Reroute for SHP-4821 (₹95k)
  - **Apply to Scenario**: Individual toggles that update the simulated scenario state locally, demonstrating recovery: risk drops from `HIGH` to `MODERATE`, OTIF recovers from `89.2%` to `93.2%`, stockout facilities decrease, and the trajectory curve shifts to `Buffer Preserved`.
  - **Action Details Modal**: Displays corridor specifications, dispatch lead times, fleet requirements, and SLA gains.

---

## 🛠️ Technology Stack

- **Core Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Theme**: High-density enterprise logistics command center aesthetic.
  - **Palette**: Deep maritime navy (`#001428`), primary container (`#0f2942`), cobalt secondary (`#4059aa`), surface variations, and strict semantic statuses (*Emerald Healthy, Amber Watch, Rose Critical*).
- **Typography**:
  - **Hanken Grotesk**: High-legibility geometric sans-serif for headlines, navigation, and body copy.
  - **JetBrains Mono**: Tabular figures, metric units (MT), telemetry codes, financial exposure (₹), and percentages.
- **Iconography**: Google Material Symbols Outlined & Lucide React
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Data Visualizations**: Precision SVG charting, coordinate curve modeling, and animated flow paths.

---

## 📂 Project Architecture

```text
caargill-project/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── DetailModal.tsx                   # Reusable operational detail dialogs
│   │   ├── layout/
│   │   │   ├── AppShell.tsx                      # Persistent application shell
│   │   │   ├── Header.tsx                        # Top navigation, telemetry indicator & notifications
│   │   │   └── Sidebar.tsx                       # 12-module navigation, settings & user profile
│   │   ├── overview/
│   │   │   ├── FilterCommandBar.tsx              # Dropdown filters & CSV report exporter
│   │   │   ├── KPICards.tsx                      # Primary metric KPI widgets
│   │   │   ├── NetworkHealth.tsx                 # Health scores & node audit modal
│   │   │   ├── PriorityRisks.tsx                 # Severity cards with mitigation drawers
│   │   │   ├── RecentActivityTable.tsx           # Live telemetry events feed
│   │   │   ├── RegionalInventoryTable.tsx        # Grain tonnage & capacity load table
│   │   │   └── SupplyDemandChart.tsx             # Interactive SVG time-series chart
│   │   ├── controlTower/
│   │   │   ├── ControlTowerKPIs.tsx              # 5 High-density operational KPI cards
│   │   │   ├── ControlTowerToolbar.tsx           # Filter bar, search, simulation mode & snapshot
│   │   │   ├── NetworkTopologyGraph.tsx          # 5-Tier SVG network topology & docked inspector
│   │   │   ├── NetworkHealthIncidents.tsx        # Health progress & centralized incident triage board
│   │   │   └── ActiveShipmentsSection.tsx        # Shipments table & consignment telemetry drawer
│   │   └── digitalTwin/
│   │       ├── ScenarioHeaderBar.tsx             # Preset selector, simulation run & save triggers
│   │       ├── ScenarioParametersPanel.tsx       # 4 Stress sliders & real-time impact preview
│   │       ├── SimulatedNetworkTopology.tsx      # 12-Node 5-tier topology with SVG routes & pulse
│   │       ├── SimulationImpactVariance.tsx      # 4 Comparative KPI cards against baseline P-10
│   │       ├── BeforeAfterTrajectoryChart.tsx    # 30-day inventory depletion curve & CSV export
│   │       ├── CriticalEntitiesList.tsx          # Prioritized entity triage ranking
│   │       ├── RecommendedActions.tsx            # Decision summary & 3 algorithmic mitigation cards
│   │       └── DigitalTwinModals.tsx             # Save Scenario & Node Ledger modals
│   ├── data/
│   │   ├── overview.ts                           # Mock data for Executive Overview
│   │   ├── controlTower.ts                       # Mock data for Control Tower topology & shipments
│   │   └── digitalTwin.ts                        # Scenario presets, 12 nodes & deterministic engine
│   ├── pages/
│   │   ├── OverviewPage.tsx                      # Executive Overview (Page 1)
│   │   ├── ControlTowerPage.tsx                  # Control Tower (Page 2)
│   │   ├── DigitalTwinPage.tsx                   # Digital Twin Workspace (Page 3)
│   │   └── PlaceholderPage.tsx                   # Polished placeholder for Forecasting & modules
│   ├── types/
│   │   ├── overview.ts                           # Overview domain types
│   │   ├── controlTower.ts                       # Control Tower domain types
│   │   └── digitalTwin.ts                        # Digital Twin domain types
│   ├── App.tsx                                   # Routing configuration
│   ├── index.css                                 # Tailwind CSS & scrollbar styling
│   └── main.tsx                                  # Application entry point
├── index.html                                    # Font preloading & metadata
├── tailwind.config.js                            # Design system tokens & typography scales
├── tsconfig.json                                 # TypeScript compiler configuration
└── vite.config.ts                                # Vite bundler configuration
```

---

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or later)
- `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Brahvish/Smart-commodity-supply-chain-digital-twin.git
   cd Smart-commodity-supply-chain-digital-twin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

### Production Build

To build the optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🗺️ Roadmap

- [x] **Phase 1: Executive Overview** — Global network KPIs, Supply vs. Demand curves, Regional Silo distribution, Priority friction alerts, and CSV export.
- [x] **Phase 2: Supply Chain Control Tower** — Multi-tier topology graph, bottleneck isolation, incident triage board, and active shipment consignment dispatch telemetry.
- [x] **Phase 3: Digital Twin Simulation** — Scenario-based deterministic simulation sandbox, parameter sliders, 12-node topology with animated bottlenecks, 30-day trajectory curve, and algorithmic mitigation recovery.
- [ ] **Phase 4: Demand Forecasting** — Multi-horizon commodity demand forecasting with seasonal indices, confidence intervals, and regional variance models.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
