import React from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdatedText?: string;
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing,
  lastUpdatedText,
  children,
}) => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      <Sidebar />
      <div className="pl-[230px] flex flex-col min-h-screen w-full">
        <Header
          title={title}
          subtitle={subtitle}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
          lastUpdatedText={lastUpdatedText}
        />
        <main className="w-full pt-16 bg-background flex-1 px-space-xl py-space-lg">
          {children}
        </main>
      </div>
    </div>
  );
};
