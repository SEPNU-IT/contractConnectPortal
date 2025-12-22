import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header transparent={false} />
      
      {/* Main Content with proper alignment matching header */}
      <main className="flex-1 pt-24 pb-8">
        <div className="container mx-auto px-6"> {/* Match header container alignment */}
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
