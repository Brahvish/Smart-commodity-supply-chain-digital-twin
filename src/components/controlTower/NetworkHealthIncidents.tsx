import React, { useState } from 'react';
import type { IncidentItem } from '../../types/controlTower';
import { DetailModal } from '../common/DetailModal';

interface NetworkHealthIncidentsProps {
  incidents: IncidentItem[];
  onSelectShipmentIncident?: (shipmentId: string) => void;
}

export const NetworkHealthIncidents: React.FC<NetworkHealthIncidentsProps> = ({
  incidents,
  onSelectShipmentIncident,
}) => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);
  const [showTriageBoard, setShowTriageBoard] = useState(false);

  return (
    <>
      <div className="lg:col-span-4 flex flex-col space-y-space-md">
        {/* Network Health Card */}
        <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-space-xs">
            <div>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Network Health
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Operational health across active network
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-code-num-sm bg-emerald-50 text-emerald-800 font-medium">
              +0.8 pts 7d
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-space-sm pb-space-xs">
            <span className="font-code-num-lg text-2xl font-bold text-primary">92.2</span>
            <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
              / 100 benchmark
            </span>
          </div>

          {/* Metric Breakdown with precise progress indicators */}
          <div className="space-y-space-sm mt-space-xs">
            <div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface font-medium">Suppliers Tier</span>
                <div className="flex items-center gap-2">
                  <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                    94%
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-code-num-sm bg-emerald-50 text-emerald-800 font-medium">
                    HEALTHY
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface font-medium">Warehouses &amp; Silos</span>
                <div className="flex items-center gap-2">
                  <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                    87%
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-code-num-sm bg-amber-50 text-amber-800 font-medium">
                    WATCH
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface font-medium">Shipments &amp; Logistics</span>
                <div className="flex items-center gap-2">
                  <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                    91%
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-code-num-sm bg-emerald-50 text-emerald-800 font-medium">
                    HEALTHY
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-body-sm font-body-sm">
                <span className="text-on-surface font-medium">Order Fulfillment SLA</span>
                <div className="flex items-center gap-2">
                  <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                    97%
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-code-num-sm bg-emerald-50 text-emerald-800 font-medium">
                    HEALTHY
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '97%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Incidents Card */}
        <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col flex-1">
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-2">
              <h3 className="font-headline-md text-headline-md text-primary font-semibold">
                Priority Incidents
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-code-num-sm bg-rose-100 text-rose-800 font-semibold">
                {incidents.length} ACTIVE
              </span>
            </div>
            <button
              onClick={() => setShowTriageBoard(true)}
              className="font-code-num-sm text-code-num-sm text-secondary hover:underline cursor-pointer"
              type="button"
            >
              Triage Board
            </button>
          </div>

          <div className="space-y-2 mt-space-sm flex-1 flex flex-col justify-between">
            {incidents.map((incident) => {
              const isCritical = incident.severity === 'CRITICAL';
              const isHigh = incident.severity === 'HIGH DELAY';
              const badgeClass = isCritical
                ? 'bg-rose-100 text-rose-800 font-bold'
                : isHigh
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'bg-blue-100 text-blue-900 font-bold';

              return (
                <div
                  key={incident.id}
                  className="bg-surface-container-low/60 p-2.5 rounded-lg flex flex-col justify-between hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-code-num-sm ${badgeClass}`}
                    >
                      {incident.severity}
                    </span>
                    <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
                      {incident.severityTag}
                    </span>
                  </div>
                  <h4 className="font-body-md text-body-md font-semibold text-primary mt-1">
                    {incident.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {incident.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span
                      className={`font-code-num-sm text-code-num-sm font-medium ${
                        isCritical ? 'text-error' : isHigh ? 'text-amber-800' : 'text-on-surface-variant'
                      }`}
                    >
                      {incident.exposure}
                    </span>
                    <button
                      onClick={() => {
                        if (incident.id === 'inc-2' && onSelectShipmentIncident) {
                          onSelectShipmentIncident('SHP-4821');
                        }
                        setSelectedIncident(incident);
                      }}
                      className="font-code-num-sm text-code-num-sm text-primary font-semibold flex items-center hover:underline cursor-pointer"
                      type="button"
                    >
                      {incident.actionText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal for Incident Action */}
      {selectedIncident && (
        <DetailModal
          isOpen={true}
          onClose={() => setSelectedIncident(null)}
          title={selectedIncident.title}
          badgeText={selectedIncident.severity}
          badgeSeverity={selectedIncident.severity === 'CRITICAL' ? 'Critical' : 'High'}
        >
          <div className="space-y-3">
            <p className="text-on-surface font-medium">{selectedIncident.description}</p>
            <div className="bg-surface-container-low/50 p-2.5 rounded border border-outline-variant/30 text-xs space-y-1">
              <div><span className="text-on-surface-variant font-label-caps uppercase">Location:</span> <span className="font-semibold text-primary">{selectedIncident.details?.location}</span></div>
              <div><span className="text-on-surface-variant font-label-caps uppercase">Operational Impact:</span> <span className="text-error font-medium">{selectedIncident.details?.impact}</span></div>
            </div>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-code-num-sm text-emerald-800 font-bold block uppercase">Recommended Playbook</span>
              <p className="text-xs text-emerald-950 mt-0.5">{selectedIncident.details?.recommendedMitigation}</p>
            </div>
          </div>
        </DetailModal>
      )}

      {/* Triage Board Modal */}
      {showTriageBoard && (
        <DetailModal
          isOpen={true}
          onClose={() => setShowTriageBoard(false)}
          title="Network Incident Triage Board"
          badgeText="Active Operations"
          badgeSeverity="High"
        >
          <div className="space-y-2 max-h-80 overflow-y-auto">
            <p className="text-xs text-on-surface-variant">Live incident triage queue for central dispatch coordinators:</p>
            {incidents.map((inc) => (
              <div key={inc.id} className="p-2 bg-surface-container-low/50 rounded border border-outline-variant/30 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-primary block">{inc.title}</span>
                  <span className="text-on-surface-variant">{inc.description}</span>
                </div>
                <span className="font-code-num-sm text-error font-bold">{inc.severityTag}</span>
              </div>
            ))}
          </div>
        </DetailModal>
      )}
    </>
  );
};
