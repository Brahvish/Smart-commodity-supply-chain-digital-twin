import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview', path: '/overview', icon: 'grid_view' },
  { label: 'Control Tower', path: '/control-tower', icon: 'radar' },
  { label: 'Digital Twin', path: '/digital-twin', icon: 'hub' },
  { label: 'Forecasting', path: '/forecasting', icon: 'trending_up' },
  { label: 'Inventory', path: '/inventory', icon: 'inventory_2' },
  { label: 'Procurement', path: '/procurement', icon: 'shopping_bag' },
  { label: 'Shipments', path: '/shipments', icon: 'local_shipping' },
  { label: 'Warehouses', path: '/warehouses', icon: 'warehouse' },
  { label: 'Suppliers', path: '/suppliers', icon: 'domain' },
  { label: 'Analytics', path: '/analytics', icon: 'monitoring' },
  { label: 'Alerts', path: '/alerts', icon: 'warning' },
  { label: 'Scenario History', path: '/scenario-history', icon: 'history' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[230px] bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Logo & Name */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm border-b border-outline-variant/30">
          <img
            alt="Supply Chain Intelligence Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1X6T7_3OSm9HFLSj-bO5QnezCHoAY8fjOZISyjiODWA1dzbhkLi5f8Tcgiga5zkphFXLR6W26mc3zspwdoYZPHXkG7YrCYeprBv8qNd8hDeckN0jgf2d4exxyTUU2PgvfpB8HZwW-1Zyc8FTqxnGSbEhtldlwedtGKkBrVH2FmzAK6hBpH9akMUdayKTVje-vy_6X518kjoDXwJM1folEuYp_xJGnZBqDmAjQU7UhabK3V8vw_EXk56gEXS"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md leading-none text-primary font-semibold tracking-tight">
              AgriCore
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mt-space-2xs">
              Supply Intelligence
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-2xs">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-sm px-space-md py-space-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary font-medium rounded'
                    : 'rounded font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile and Settings */}
      <div className="p-space-sm border-t border-outline-variant/30 bg-surface-container-lowest">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-space-sm px-space-md py-space-sm rounded font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors mb-space-2xs ${
              isActive ? 'bg-surface-container-high text-primary font-medium' : ''
            }`
          }
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          <span>Settings</span>
        </NavLink>

        <div className="flex items-center gap-space-sm px-space-sm py-space-xs rounded bg-surface-container-low/50">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcFdPyQzijgsrhPf-y8ZApIVlq87SDU07w1a2IUv1ko2mBl83hECmx4k7p1Qt_2VFV8a2j-C6Ti0TVmYFOh-uCCRt1MdyrSIwIuLPEHv9-X4TRaWY89ZqTovQhegC6YEXCnH63RfAi4k-u_sWj_c0onLjOS2_JZ2eqvh3S8Zepw6DlA22__ax8bpiwEsAZLyMly-8g9XSrfvFUSJIL2SART2eaDZJLLPdiX7UfaRI7TospJ-dPJPEZFA"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate leading-tight">
              Marcus Vance
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant truncate leading-tight">
              Operations Lead
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
