import React, { useState } from 'react';
import type { ShipmentItem } from '../../types/controlTower';
import { DetailModal } from '../common/DetailModal';

interface ActiveShipmentsSectionProps {
  shipments: ShipmentItem[];
  selectedShipmentId: string;
  onSelectShipment: (shipmentId: string) => void;
}

export const ActiveShipmentsSection: React.FC<ActiveShipmentsSectionProps> = ({
  shipments,
  selectedShipmentId,
  onSelectShipment,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'delayed' | 'intransit' | 'atrisk'>('all');
  const [activeModal, setActiveModal] = useState<'reroute' | 'carrier' | 'telemetry' | null>(null);
  const [rerouteConfirmed, setRerouteConfirmed] = useState(false);

  const filteredShipments = shipments.filter((s) => {
    if (activeTab === 'delayed') return s.isDelayed;
    if (activeTab === 'intransit') return s.status === 'In Transit';
    if (activeTab === 'atrisk') return s.risk === 'Critical' || s.risk === 'At Risk';
    return true;
  });

  const selectedShipment =
    shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  const handleExecuteReroute = () => {
    setRerouteConfirmed(true);
    setTimeout(() => {
      setActiveModal(null);
      setRerouteConfirmed(false);
    }, 2000);
  };

  return (
    <>
      <section className="bg-surface-container-lowest rounded-lg shadow-sm p-space-md flex flex-col">
        {/* Header with tab switches */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-headline-md text-primary font-semibold">
                Active Network Shipments
              </h2>
              <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                ({shipments.length} Active Shipments Across Corridors)
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              High-frequency telemetry from freight rail, sea freight, and highway fleet GPS.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 text-code-num-sm font-code-num-sm rounded transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-on-primary font-medium'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
              }`}
              type="button"
            >
              All ({shipments.length})
            </button>
            <button
              onClick={() => setActiveTab('delayed')}
              className={`px-3 py-1 text-code-num-sm font-code-num-sm rounded transition-all ${
                activeTab === 'delayed'
                  ? 'bg-primary text-on-primary font-medium'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
              }`}
              type="button"
            >
              Delayed (14)
            </button>
            <button
              onClick={() => setActiveTab('intransit')}
              className={`px-3 py-1 text-code-num-sm font-code-num-sm rounded transition-all ${
                activeTab === 'intransit'
                  ? 'bg-primary text-on-primary font-medium'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
              }`}
              type="button"
            >
              In Transit (158)
            </button>
            <button
              onClick={() => setActiveTab('atrisk')}
              className={`px-3 py-1 text-code-num-sm font-code-num-sm rounded transition-all ${
                activeTab === 'atrisk'
                  ? 'bg-primary text-on-primary font-medium'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
              }`}
              type="button"
            >
              At Risk (14)
            </button>
          </div>
        </div>

        {/* 2-Column Split: Table on Left (65%), Slide-Over Inspector Drawer on Right (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md pt-space-xs">
          {/* Data Table */}
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps uppercase">
                  <th className="py-2.5 px-3">Shipment</th>
                  <th className="py-2.5 px-3">Commodity</th>
                  <th className="py-2.5 px-3">Origin</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3 text-right">Quantity</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3 text-right">ETA / Delay</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Risk</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-body-sm divide-y divide-outline-variant/20">
                {filteredShipments.map((s) => {
                  const isSelected = selectedShipment.id === s.id;
                  const isDelay = s.isDelayed;

                  return (
                    <tr
                      key={s.id}
                      onClick={() => onSelectShipment(s.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-secondary-fixed/30 hover:bg-secondary-fixed/40'
                          : 'hover:bg-surface-container-low/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-code-num-sm text-code-num-sm font-semibold text-primary">
                        <span className="flex items-center gap-1.5">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          )}
                          {s.id}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">{s.commodity}</td>
                      <td className="py-2.5 px-3 text-on-surface-variant">{s.origin}</td>
                      <td className="py-2.5 px-3 font-medium text-primary">{s.destination}</td>
                      <td className="py-2.5 px-3 text-right font-code-num-sm text-code-num-sm">
                        {s.quantity}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 text-on-surface-variant font-code-num-sm text-code-num-sm">
                          <span className="material-symbols-outlined text-[15px]">
                            {s.modeIcon}
                          </span>{' '}
                          {s.mode}
                        </span>
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-code-num-sm text-code-num-sm font-semibold ${
                          isDelay ? 'text-error' : 'text-on-surface'
                        }`}
                      >
                        {s.etaDelay}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-code-num-sm font-semibold ${
                            s.status === 'Delayed'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-code-num-sm font-medium ${
                            s.risk === 'Critical'
                              ? 'bg-error text-on-error'
                              : s.risk === 'At Risk'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {s.risk}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          className={`font-code-num-sm text-code-num-sm hover:underline cursor-pointer ${
                            isSelected
                              ? 'text-primary font-semibold'
                              : 'text-secondary font-medium'
                          }`}
                          type="button"
                        >
                          {isSelected ? 'Selected' : 'View'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Shipment Detail Contextual Drawer (SHP-4821 Focus) */}
          <div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between border border-outline-variant/30">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedShipment.isDelayed ? 'bg-error animate-pulse' : 'bg-emerald-600'
                    }`}
                  ></span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Selected Consignment
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-code-num-sm font-bold ${
                    selectedShipment.isDelayed
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedShipment.isDelayed ? 'CRITICAL DELAY +18H' : 'ON SCHEDULE'}
                </span>
              </div>

              <div className="mt-space-xs">
                <div className="font-headline-md text-headline-md font-semibold text-primary">
                  {selectedShipment.id}
                </div>
                <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                  <span>{selectedShipment.origin}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  <span className="font-semibold text-primary">{selectedShipment.destination}</span>
                </div>
              </div>

              {/* Live Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2 mt-space-md p-2.5 bg-surface-container-lowest rounded border border-outline-variant/30">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">
                    Commodity
                  </span>
                  <span className="font-code-num-sm text-code-num-sm font-semibold text-primary">
                    {selectedShipment.commodity} ({selectedShipment.quantity})
                  </span>
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">
                    Carrier Unit
                  </span>
                  <span className="font-code-num-sm text-code-num-sm font-semibold text-primary">
                    {selectedShipment.carrier}
                  </span>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">
                    Current Track Location
                  </span>
                  <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-primary font-medium">
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        selectedShipment.isDelayed ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {selectedShipment.isDelayed ? 'fmd_bad' : 'navigation'}
                    </span>
                    <span>{selectedShipment.currentLocation}</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    {selectedShipment.locationNotice}
                  </p>
                </div>
              </div>

              {/* Schedule Comparison Strip */}
              <div className="mt-space-sm p-2 bg-surface-container-lowest rounded font-code-num-sm text-code-num-sm flex items-center justify-between border border-outline-variant/30">
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase font-label-caps">
                    Original ETA
                  </span>
                  <span className="text-primary font-medium">{selectedShipment.originalEta}</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-error">
                  trending_flat
                </span>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase font-label-caps">
                    Revised ETA
                  </span>
                  <span
                    className={`font-bold ${
                      selectedShipment.isDelayed ? 'text-error' : 'text-emerald-700'
                    }`}
                  >
                    {selectedShipment.revisedEta}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase font-label-caps">
                    Contract Exposure
                  </span>
                  <span
                    className={`font-bold ${
                      selectedShipment.isDelayed ? 'text-amber-800' : 'text-on-surface-variant'
                    }`}
                  >
                    {selectedShipment.penaltyExposure}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-space-md pt-space-xs space-y-space-xs">
              <button
                onClick={() => setActiveModal('reroute')}
                className="w-full h-8 px-3 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors text-body-sm font-body-sm font-medium flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">alt_route</span>
                <span>Reroute via Road Corridor</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModal('carrier')}
                  className="h-8 px-2 rounded bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors text-body-sm font-body-sm font-medium flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                  <span>Contact Carrier</span>
                </button>

                <button
                  onClick={() => setActiveModal('telemetry')}
                  className="h-8 px-2 rounded bg-surface-container-lowest text-secondary hover:bg-surface-container transition-colors text-body-sm font-body-sm font-medium flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span>Full Telemetry →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Modals */}
      {activeModal === 'reroute' && (
        <DetailModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Emergency Reroute: ${selectedShipment.id}`}
          badgeText="Active Dispatch"
          badgeSeverity="Critical"
        >
          <div className="space-y-3">
            <p className="text-on-surface font-medium">
              Authorize emergency intermodal transfer to bypass Nagpur Central rail gridlock.
            </p>
            <div className="bg-surface-container-low/50 p-2.5 rounded border border-outline-variant/30 text-xs space-y-1">
              <div><span className="text-on-surface-variant">Origin Silo:</span> <span className="font-semibold text-primary">{selectedShipment.origin}</span></div>
              <div><span className="text-on-surface-variant">Intermodal Transload Point:</span> <span className="font-semibold text-primary">Nagpur Dry Port ICD</span></div>
              <div><span className="text-on-surface-variant">Fleet Requirement:</span> <span className="font-semibold text-primary">52 Heavy Commercial Trailers (2,600 MT)</span></div>
              <div><span className="text-on-surface-variant">Estimated Highway ETA:</span> <span className="text-emerald-700 font-bold">Sep 8, 08:30 IST (-3.5h gain)</span></div>
            </div>
            {rerouteConfirmed ? (
              <div className="p-2 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold text-center">
                ✓ Reroute Dispatch Authorized & Transmit to Carrier
              </div>
            ) : (
              <button
                onClick={handleExecuteReroute}
                className="w-full h-8 rounded bg-primary text-white font-medium text-xs hover:bg-primary-container"
              >
                Confirm & Dispatch Road Fleet
              </button>
            )}
          </div>
        </DetailModal>
      )}

      {activeModal === 'carrier' && (
        <DetailModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Carrier Liaison: ${selectedShipment.carrier}`}
          badgeText="Direct EDI"
          badgeSeverity="Info"
        >
          <div className="space-y-3 text-xs">
            <p className="text-on-surface font-medium">Direct operations liaison channel for freight movement coordinator:</p>
            <div className="bg-surface-container-low/50 p-3 rounded border border-outline-variant/30 space-y-2">
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-label-caps">Operating Desk:</span>
                <span className="font-semibold text-primary">Central Railway Freight Operations Control (Nagpur)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-label-caps">Duty Officer:</span>
                <span className="font-semibold text-primary">Chief Controller R. K. Nair</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-label-caps">Direct Hot Line:</span>
                <span className="font-code-num-sm font-semibold text-secondary">+91 (712) 256-8491</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-label-caps">EDI Message Status:</span>
                <span className="font-code-num-sm text-emerald-700 font-semibold">ACK RECEIVED (04:18 IST)</span>
              </div>
            </div>
          </div>
        </DetailModal>
      )}

      {activeModal === 'telemetry' && (
        <DetailModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={`Telemetry Stream: ${selectedShipment.id}`}
          badgeText="GPS + Telematics"
          badgeSeverity="Info"
        >
          <div className="space-y-3 text-xs">
            <div className="bg-surface-container-low/50 p-3 rounded border border-outline-variant/30 space-y-2 font-code-num-sm">
              <div className="flex justify-between"><span>Lat/Long:</span><span className="font-bold text-primary">21.1458° N, 79.0882° E</span></div>
              <div className="flex justify-between"><span>Speed:</span><span className="font-bold text-error">0.0 km/h (Stationary 3h 42m)</span></div>
              <div className="flex justify-between"><span>Ambient Temperature:</span><span className="font-bold text-primary">28.4°C</span></div>
              <div className="flex justify-between"><span>Hopper Moisture:</span><span className="font-bold text-emerald-700">11.8% (Target &lt;14%)</span></div>
              <div className="flex justify-between"><span>Brake Pressure:</span><span className="font-bold text-primary">5.2 bar (Nominal)</span></div>
            </div>
          </div>
        </DetailModal>
      )}
    </>
  );
};
