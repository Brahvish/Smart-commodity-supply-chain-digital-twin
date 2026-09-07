import React, { useState } from 'react';
import type { ActivityEventItem } from '../../types/overview';
import { DetailModal } from '../common/DetailModal';

interface RecentActivityTableProps {
  events: ActivityEventItem[];
}

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ events }) => {
  const [showAllActivityModal, setShowAllActivityModal] = useState(false);

  const getCategoryBadge = (category: ActivityEventItem['category']) => {
    switch (category) {
      case 'Logistics':
        return 'bg-secondary-fixed text-on-secondary-fixed-variant';
      case 'Inventory':
        return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
      case 'Procurement':
        return 'bg-surface-container-high text-on-surface-variant';
      case 'Forecasting':
        return 'bg-primary-fixed text-on-primary-fixed-variant';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded border border-outline-variant/40 shadow-sm p-space-md">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-xs">
          <div>
            <h2 className="font-headline-md text-headline-md font-semibold text-primary">
              Recent Activity
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Real-time telemetry feeds and operations events across the supply network.
            </p>
          </div>
          <button
            onClick={() => setShowAllActivityModal(true)}
            className="text-secondary font-body-sm text-body-sm font-semibold hover:underline inline-flex items-center gap-0.5"
            type="button"
          >
            View all activity{' '}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="mt-space-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40 text-on-surface-variant font-label-caps text-label-caps uppercase bg-surface-container-low/40">
                <th className="py-2 px-space-sm w-24">Time</th>
                <th className="py-2 px-space-sm">Event Description</th>
                <th className="py-2 px-space-sm w-36">Category</th>
                <th className="py-2 px-space-sm w-44 text-right">Actor / Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
              {events.map((evt) => (
                <tr
                  key={evt.id}
                  className="hover:bg-surface-container-low/30 transition-colors"
                >
                  <td className="py-2.5 px-space-sm font-code-num-sm text-code-num-sm text-on-surface-variant">
                    {evt.time}
                  </td>
                  <td className="py-2.5 px-space-sm">
                    <span className="font-medium text-on-surface">{evt.title}</span>
                    <span className="text-on-surface-variant text-body-sm ml-1">
                      {evt.subtitle}
                    </span>
                  </td>
                  <td className="py-2.5 px-space-sm">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded font-code-num-sm text-[11px] font-medium ${getCategoryBadge(
                        evt.category
                      )}`}
                    >
                      {evt.category}
                    </span>
                  </td>
                  <td
                    className={`py-2.5 px-space-sm text-right font-code-num-sm text-code-num-sm ${
                      evt.actor.includes('Vance')
                        ? 'font-body-sm text-primary font-medium'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {evt.actor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Activity Modal */}
      <DetailModal
        isOpen={showAllActivityModal}
        onClose={() => setShowAllActivityModal(false)}
        title="Complete Operations Audit Feed"
        badgeText="24 Events Today"
        badgeSeverity="Info"
      >
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {events.concat([
            {
              id: 'act-5',
              time: '08:45 AM',
              title: 'Rail Rake RR-904 dispatched',
              subtitle: '(Raichur Terminal -> Bangalore Hub +2,800 MT wheat)',
              category: 'Logistics',
              actor: 'Automated Dispatch',
            },
            {
              id: 'act-6',
              time: '08:12 AM',
              title: 'Moisture threshold check verified',
              subtitle: '(Mumbai Grain Terminal Silo #2 at 11.2% moisture)',
              category: 'Inventory',
              actor: 'Telemetry Sensor',
            },
            {
              id: 'act-7',
              time: '07:30 AM',
              title: 'Morning shift handoff signed',
              subtitle: '(All terminal status feeds verified)',
              category: 'Procurement',
              actor: 'S. Sharma',
            },
          ]).map((item) => (
            <div
              key={item.id}
              className="p-2 rounded bg-surface-container-low/40 border border-outline-variant/30 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-code-num-sm text-on-surface-variant">{item.time}</span>
                  <span className="font-semibold text-primary text-xs">{item.title}</span>
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">{item.subtitle}</span>
              </div>
              <span className="text-[10px] font-code-num-sm px-1.5 py-0.5 rounded bg-surface-container-high">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </DetailModal>
    </>
  );
};
