import React from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badgeText?: string;
  badgeSeverity?: 'Critical' | 'High' | 'Medium' | 'Info';
  children: React.ReactNode;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  badgeText,
  badgeSeverity = 'Info',
  children,
}) => {
  if (!isOpen) return null;

  const getBadgeClass = () => {
    switch (badgeSeverity) {
      case 'Critical':
        return 'bg-[#fff1f2] text-[#be123c] border border-[#fecdd3]';
      case 'High':
        return 'bg-[#fffbeb] text-[#b45309] border border-[#fde68a]';
      case 'Medium':
        return 'bg-surface-container-high text-on-surface-variant border border-outline-variant';
      default:
        return 'bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded border border-outline-variant/60 shadow-xl overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-space-md py-space-sm border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/30">
          <div className="flex items-center gap-space-sm">
            <h3 className="font-headline-md text-headline-md text-primary font-semibold">
              {title}
            </h3>
            {badgeText && (
              <span
                className={`px-1.5 py-0.2 rounded font-code-num-sm text-[10px] uppercase font-bold tracking-wider ${getBadgeClass()}`}
              >
                {badgeText}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-space-md font-body-sm text-body-sm space-y-space-sm">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="px-space-md py-space-xs border-t border-outline-variant/30 bg-surface-container-low/20 flex justify-end">
          <button
            onClick={onClose}
            className="h-8 px-space-md rounded bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:bg-primary-container transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
