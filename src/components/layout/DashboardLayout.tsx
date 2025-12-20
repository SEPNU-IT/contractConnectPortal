import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} userName={userName} />
      <main 
        className={cn(
          "transition-all duration-300 min-h-screen",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
