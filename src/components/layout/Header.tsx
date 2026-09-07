import React, { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdatedText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
  lastUpdatedText = '2 minutes ago',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-[230px] right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 z-40 px-space-xl flex items-center justify-between">
      {/* Title & Context */}
      <div className="flex flex-col justify-center">
        <h1 className="font-headline-md text-headline-md text-primary font-semibold leading-tight">
          {title}
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant hidden md:block leading-tight">
          {subtitle}
        </p>
      </div>

      {/* Action Controls & User Area */}
      <div className="flex items-center gap-space-md shrink-0">
        {/* Telemetry status & refresh */}
        <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-low border border-outline-variant/30">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="font-code-num-sm text-code-num-sm text-on-surface-variant">
            Last updated: {lastUpdatedText}
          </span>
          <button
            aria-label="Refresh Data"
            className={`ml-space-2xs text-on-surface-variant hover:text-primary transition-all flex items-center ${
              isRefreshing ? 'animate-spin text-primary' : ''
            }`}
            type="button"
            onClick={onRefresh}
            title="Refresh network telemetry"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
          </button>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            aria-label="View Notifications"
            className="relative p-space-xs rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded border border-outline-variant/50 shadow-lg z-50 p-space-sm animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-xs mb-space-xs">
                <span className="font-headline-md text-[14px] font-semibold text-primary">Notifications</span>
                <span className="font-code-num-sm text-code-num-sm text-[#be123c] font-semibold">3 Unread</span>
              </div>
              <div className="space-y-space-xs">
                <div className="p-space-xs rounded bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-code-num-sm text-on-surface-variant">
                    <span className="font-semibold text-[#be123c]">CRITICAL</span>
                    <span>5m ago</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface font-medium mt-0.5">
                    Bangalore Silo Hub: Safety stock threshold breached (&lt;15%).
                  </p>
                </div>
                <div className="p-space-xs rounded bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-code-num-sm text-on-surface-variant">
                    <span className="font-semibold text-[#b45309]">DELAY</span>
                    <span>18m ago</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface font-medium mt-0.5">
                    SHP-4821 Nhava Sheva berthing queue extended +18h.
                  </p>
                </div>
                <div className="p-space-xs rounded bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-code-num-sm text-on-surface-variant">
                    <span className="font-semibold text-[#047857]">RESOLVED</span>
                    <span>1h ago</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface font-medium mt-0.5">
                    Raichur rail siding customs clearance granted.
                  </p>
                </div>
              </div>
              <div className="mt-space-xs pt-space-xs border-t border-outline-variant/20 text-center">
                <button
                  className="font-body-sm text-[11px] text-secondary font-semibold hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  Close notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-outline-variant/40 mx-space-2xs"></div>

        {/* Profile */}
        <div className="flex items-center gap-space-sm pl-space-2xs">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcFdPyQzijgsrhPf-y8ZApIVlq87SDU07w1a2IUv1ko2mBl83hECmx4k7p1Qt_2VFV8a2j-C6Ti0TVmYFOh-uCCRt1MdyrSIwIuLPEHv9-X4TRaWY89ZqTovQhegC6YEXCnH63RfAi4k-u_sWj_c0onLjOS2_JZ2eqvh3S8Zepw6DlA22__ax8bpiwEsAZLyMly-8g9XSrfvFUSJIL2SART2eaDZJLLPdiX7UfaRI7TospJ-dPJPEZFA"
          />
          <span className="hidden lg:block font-body-sm text-body-sm font-semibold text-on-surface">
            Marcus Vance
          </span>
        </div>
      </div>
    </header>
  );
};
