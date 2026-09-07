import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OverviewPage } from './pages/OverviewPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to /overview */}
        <Route path="/" element={<Navigate to="/overview" replace />} />

        {/* Page 1: Executive Overview */}
        <Route path="/overview" element={<OverviewPage />} />

        {/* Page 2: Minimal Placeholder ready for MCP integration */}
        <Route
          path="/control-tower"
          element={
            <PlaceholderPage
              title="Supply Chain Control Tower"
              subtitle="End-to-end multi-tier network visibility, incident tracking, and active shipments monitoring."
              description="Real-time multi-echelon network topology, route maps, bottleneck tracing, and active shipment dispatch telemetry."
            />
          }
        />

        {/* Page 3: Minimal Placeholder ready for MCP integration */}
        <Route
          path="/digital-twin"
          element={
            <PlaceholderPage
              title="Digital Twin Simulation"
              subtitle="Supply chain simulation, what-if scenario testing, and impact analysis."
              description="Dynamic simulation sandbox to model demand surges, supplier lead time disruptions, and inventory buffers."
            />
          }
        />

        {/* Page 4: Minimal Placeholder ready for MCP integration */}
        <Route
          path="/forecasting"
          element={
            <PlaceholderPage
              title="Demand Forecasting"
              subtitle="Multi-horizon commodity demand forecasting, confidence intervals, and regional models."
              description="AI-assisted seasonal demand projection, regional variance analysis, and procurement timing recommendations."
            />
          }
        />

        {/* Additional Sidebar Routes: Polished Coming Soon */}
        <Route
          path="/inventory"
          element={
            <PlaceholderPage
              title="Inventory Management"
              subtitle="Real-time multi-facility grain inventory tracking and safety stock thresholds."
              badge="Enterprise Module"
              description="Silo capacity management, grain grade segregation, moisture telemetry, and automated reorder triggers."
            />
          }
        />
        <Route
          path="/procurement"
          element={
            <PlaceholderPage
              title="Procurement & Sourcing"
              subtitle="Direct origin contracts, cooperative allocations, and spot market purchasing."
              badge="Enterprise Module"
              description="Supplier quota balancing, multi-origin volume fulfillment, and contract compliance monitoring."
            />
          }
        />
        <Route
          path="/shipments"
          element={
            <PlaceholderPage
              title="Shipments & Logistics"
              subtitle="Intermodal transit orchestration across rail, maritime vessels, and highway corridors."
              badge="Enterprise Module"
              description="Live consignment tracking, port dwell monitoring, customs status, and carrier performance analytics."
            />
          }
        />
        <Route
          path="/warehouses"
          element={
            <PlaceholderPage
              title="Warehouses & Terminals"
              subtitle="Terminal throughput, silo aeration telemetry, and inland container depot operations."
              badge="Enterprise Module"
              description="Storage bin allocation, turnaround metrics, offloading queues, and facility maintenance schedules."
            />
          }
        />
        <Route
          path="/suppliers"
          element={
            <PlaceholderPage
              title="Supplier Directory"
              subtitle="Verified agricultural co-operatives, commercial farms, and origin processors."
              badge="Enterprise Module"
              description="Quality grading scores, delivery reliability indexes, and historical fulfillment performance."
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <PlaceholderPage
              title="Supply Chain Analytics"
              subtitle="Cross-network efficiency metrics, unit economics, and carbon intensity tracking."
              badge="Enterprise Module"
              description="Custom report builder, financial exposure indexes, and historical operational dashboards."
            />
          }
        />
        <Route
          path="/alerts"
          element={
            <PlaceholderPage
              title="System Alerts & Warnings"
              subtitle="Centralized operational friction logs and automated anomaly alerts."
              badge="Enterprise Module"
              description="Configure threshold alerts, telemetry triggers, and escalations across operational departments."
            />
          }
        />
        <Route
          path="/scenario-history"
          element={
            <PlaceholderPage
              title="Scenario History"
              subtitle="Historical simulations, sensitivity runs, and applied decision playbooks."
              badge="Enterprise Module"
              description="Review past what-if simulations, outcome audits, and historical resilience benchmark reports."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <PlaceholderPage
              title="System Settings"
              subtitle="Platform configuration, telemetry thresholds, and user management."
              badge="Enterprise Settings"
              description="Manage API connectors, telemetry sensor frequencies, user roles, and organizational units."
            />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
