import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  Shield
} from 'lucide-react';
import type { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  userName: string;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'contract_owner', 'vendor'] },
  { label: 'Vendors', icon: Building2, path: '/vendors', roles: ['admin', 'contract_owner'] },
  { label: 'Invitations', icon: Send, path: '/invitations', roles: ['contract_owner'] },
  { label: 'Personnel', icon: Users, path: '/personnel', roles: ['admin', 'vendor'] },
  { label: 'Documents', icon: FileText, path: '/documents', roles: ['admin', 'vendor'] },
  { label: 'Expiry Alerts', icon: AlertTriangle, path: '/alerts', roles: ['admin', 'contract_owner', 'vendor'] },
  { label: 'Admin Panel', icon: Shield, path: '/admin', roles: ['admin'] },
  { label: 'Settings', icon: Settings, path: '/settings', roles: ['admin', 'contract_owner', 'vendor'] },
];

export function Sidebar({ role, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">CCMG</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">C</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "animate-scale-in")} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center gap-3 mb-3",
          collapsed && "justify-center"
        )}>
          <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-sidebar-accent-foreground">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{role.replace('_', ' ')}</p>
            </div>
          )}
        </div>
        <Button 
          variant="ghost" 
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "px-0"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
