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
   Dynamic scenario simulation modeling demand shocks, port congestion, rail delays, and silo capacity constraints with deterministic impact analysis and mitigation playbooks.
4. **Demand Forecasting** (*"What is likely to happen next?"*)  
   Multi-horizon commodity demand forecasting, confidence intervals, seasonal index calibration, and procurement timing recommendations.

---

## 🚀 Key Features (Phase 1: Executive Overview)

- **Interactive Command & Filter Bar**:
  - Instant preset filtering across **Regions** (*Karnataka, Maharashtra, Punjab, Tamil Nadu, Andhra Pradesh*) and **Commodities** (*Soybeans, Wheat, Corn, Rice*).
  - Time-horizon selection (*Last 7 Days, Last 30 Days, Last 90 Days, Year to Date*).
  - **Client-Side CSV Export**: Instant, structured CSV export of current metrics, regional allocations, and risk logs (`AgriCore_Overview_[Region]_[Date].csv`).
- **Primary Operational KPIs**:
  - **Total Inventory**: Metric tonnage (MT), 41-day coverage benchmark, and rolling deltas.
  - **Active Shipments**: Total units in transit, delayed consignment flags, and on-time rate percentages.
  - **Service Level (OTIF)**: On-Time In-Full performance against internal targets.
  - **Supply Chain Risk**: Active alert counts categorized by severity (*Critical, Moderate*).
- **Supply vs. Demand Analytics**:
  - Dual-curve visualization with historical throughput vs. forecasted allocation.
  - **Monthly & Weekly Resolution**: Toggle between macro monthly planning and micro weekly execution.
  - Interactive features: "TODAY" temporal threshold, peak demand callout badge (*April at 92,400 MT*), and hover tooltips.
- **Network Health Diagnostics**:
  - Aggregate index score with 7-day rolling comparative deltas.
  - Node health progress indicators (*Suppliers, Warehouses, Shipments, Order Fulfillment*).
  - Interactive **Audit Log Modal** detailing 148 active telemetry edge nodes.
- **Regional Silo Inventory Table**:
  - Tabular breakdown of volume, capacity load percentage bars, and trend differentials.
  - **Click-to-Filter**: Selecting any regional row instantly filters the dashboard context.
- **Priority Friction Risks**:
  - Severity-accented operational alerts (*Bangalore Warehouse Stockout, Nhava Sheva Port Congestion, Supplier SUP-184 Variance*).
  - Focused **Operational Detail Drawers** containing facility locations, commodities, impact assessments, ETAs, and mitigation plans.
- **Recent Telemetry Activity Feed**:
  - Live operations stream across logistics, inventory, procurement, and forecasting.

---

## 🛠️ Technology Stack

- **Core Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Theme**: *Corporate / Modern High-Density* logistics command center aesthetic.
  - **Palette**: Deep maritime navy (`#001428`), primary container (`#0f2942`), cobalt secondary (`#4059aa`), slate steel (`#334155`), and strict semantic statuses (*Emerald Healthy, Amber Watch, Rose Critical*).
- **Typography**:
  - **Hanken Grotesk**: High-legibility geometric sans-serif for headlines, navigation, and body copy.
  - **JetBrains Mono**: Tabular figures, weights (MT), contract IDs, vessel tracking numbers, and percentages.
- **Iconography**: Google Material Symbols Outlined & Lucide React
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Data Visualizations**: Responsive SVG charting canvas with Recharts integration ready.

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
│   │   │   └── DetailModal.tsx           # Lightweight operational detail dialogs
│   │   ├── layout/
│   │   │   ├── AppShell.tsx              # Persistent layout shell
│   │   │   ├── Header.tsx                # Top navigation, telemetry indicator & notifications
│   │   │   └── Sidebar.tsx               # 12-module navigation, settings & user profile
│   │   └── overview/
│   │       ├── FilterCommandBar.tsx      # Dropdown filters & CSV report exporter
│   │       ├── KPICards.tsx              # Primary metric KPI widgets
│   │       ├── NetworkHealth.tsx         # Health scores & node audit modal
│   │       ├── PriorityRisks.tsx         # Severity cards with mitigation drawers
│   │       ├── RecentActivityTable.tsx   # Live telemetry events feed
│   │       ├── RegionalInventoryTable.tsx# Grain tonnage & capacity load table
│   │       └── SupplyDemandChart.tsx     # Interactive SVG time-series chart
│   ├── data/
│   │   └── overview.ts                   # Centralized mock datasets & filter presets
│   ├── pages/
│   │   ├── OverviewPage.tsx              # Executive Overview (Page 1)
│   │   └── PlaceholderPage.tsx           # Placeholders for Control Tower, Digital Twin, etc.
│   ├── types/
│   │   └── overview.ts                   # Domain TypeScript interfaces
│   ├── App.tsx                           # Routing configuration
│   ├── index.css                         # Tailwind CSS & scrollbar styling
│   └── main.tsx                          # Application entry point
├── index.html                            # Font preloading & metadata
├── tailwind.config.js                    # Design system tokens & typography scales
├── tsconfig.json                         # TypeScript compiler configuration
└── vite.config.ts                        # Vite bundler configuration
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

To produce an optimized production bundle:
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
- [ ] **Phase 2: Supply Chain Control Tower** — Interactive multi-echelon network topology graph, bottleneck tracing, and vessel/rail dispatch telemetry.
- [ ] **Phase 3: Digital Twin Simulation** — Dynamic what-if sandbox for supplier lead times, demand shocks, and inventory buffer calculations.
- [ ] **Phase 4: Demand Forecasting** — Multi-horizon commodity forecasting with ARIMA-Prophet confidence intervals and regional variance models.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
