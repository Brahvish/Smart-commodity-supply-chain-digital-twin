import React from 'react';
import { AppShell } from '../components/layout/AppShell';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  badge = 'Ready for MCP Integration',
  description,
}) => {
  return (
    <AppShell title={title} subtitle={subtitle}>
      <div className="w-full h-[600px] flex flex-col items-center justify-center rounded border border-outline-variant/40 bg-surface-container-lowest p-space-xl text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-space-md border border-outline-variant/30">
          <span className="material-symbols-outlined text-[30px]">hourglass_top</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-high/80 text-on-primary-fixed-variant font-code-num-sm text-code-num-sm uppercase font-semibold mb-space-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span>{badge}</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-primary font-semibold mb-space-xs">
          {title}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-space-lg">
          {description}
        </p>
        <div className="flex items-center gap-space-sm text-on-surface-variant font-code-num-sm text-code-num-sm">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>Awaiting Stitch screen integration via MCP</span>
        </div>
      </div>
    </AppShell>
  );
};
