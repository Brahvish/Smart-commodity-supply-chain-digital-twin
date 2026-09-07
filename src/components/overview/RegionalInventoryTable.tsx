import React from 'react';
import type { RegionalInventoryItem } from '../../types/overview';

interface RegionalInventoryTableProps {
  items: RegionalInventoryItem[];
  selectedRegion?: string;
  onSelectRegion?: (region: string) => void;
}

export const RegionalInventoryTable: React.FC<RegionalInventoryTableProps> = ({
  items,
  selectedRegion,
  onSelectRegion,
}) => {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded border border-outline-variant/40 shadow-sm p-space-md">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-xs">
        <div>
          <h2 className="font-headline-md text-headline-md font-semibold text-primary">
            Inventory by Region
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Current grain tonnage and silo capacity utilization.
          </p>
        </div>
        <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
          {items.length} Active Hubs
        </span>
      </div>

      <div className="mt-space-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/40 text-on-surface-variant font-label-caps text-label-caps uppercase bg-surface-container-low/40">
              <th className="py-2 px-space-sm">Region</th>
              <th className="py-2 px-space-sm text-right">Volume (MT)</th>
              <th className="py-2 px-space-sm text-left pl-space-md">Capacity Load</th>
              <th className="py-2 px-space-sm text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
            {items.map((item) => {
              const isSelected = selectedRegion === item.region;
              const isHighCapacity = item.capacityLoad >= 85;
              const barColor = isHighCapacity ? 'bg-[#d97706]' : 'bg-[#059669]';
              const percentColor = isHighCapacity ? 'text-[#b45309] font-bold' : 'text-on-surface-variant';
              const trendColor = item.trendPositive ? 'text-[#047857]' : 'text-outline-variant';

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectRegion?.(item.region)}
                  className={`hover:bg-surface-container-low/30 transition-colors cursor-pointer ${
                    isSelected ? 'bg-surface-container-high/40' : ''
                  }`}
                  title={`Click to filter by ${item.region}`}
                >
                  <td className="py-2.5 px-space-sm font-medium text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>{item.region}</span>
                  </td>
                  <td className="py-2.5 px-space-sm text-right font-code-num-md text-code-num-md text-primary font-semibold">
                    {item.volumeMT.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-space-sm pl-space-md">
                    <div className="flex items-center gap-space-sm max-w-[200px]">
                      <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full ${barColor} rounded-full transition-all duration-300`}
                          style={{ width: `${item.capacityLoad}%` }}
                        />
                      </div>
                      <span
                        className={`font-code-num-sm text-code-num-sm w-8 text-right ${percentColor}`}
                      >
                        {item.capacityLoad}%
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-2.5 px-space-sm text-right font-code-num-sm text-code-num-sm font-semibold ${trendColor}`}
                  >
                    {item.trend}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
