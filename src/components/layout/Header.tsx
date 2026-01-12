import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AdminDropdown from '@/components/rightPane/AdminDropdown';
import { getAuthenticatedUser } from '@/lib/auth';

interface HeaderProps {
  transparent?: boolean;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export default function Header({ transparent = false, notificationCount = 0, onNotificationClick }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/';
  const authenticatedUser = getAuthenticatedUser();
  
  // Show actual login state
  const isLoggedIn = !!authenticatedUser;
  const displayName = authenticatedUser?.name || "No Active User";
  const displayEmail = authenticatedUser?.email || "";

  return (
    <nav className={cn(
      "w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0",
      transparent 
        ? "bg-transparent" 
        : "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    )}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          {/* Seplat Logo */}
          <div className="flex items-center">
            <img 
              src="/SeplatLogoClear.png" 
              alt="Seplat Energy" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Divider */}
          <div className={cn(
            "h-8 w-px transition-colors",
            transparent ? "bg-white/30" : "bg-slate-300"
          )}></div>
          
          {/* CCMP Branding */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105",
              transparent 
                ? "bg-white text-blue-600" 
                : "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
            )}>
              <span className="text-xl font-bold">C</span>
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              transparent 
                ? "text-white" 
                : "text-slate-800"
            )}>
              CCMP
            </span>
          </div>
        </div>

        {/* Right Side - User Info and Navigation */}
        <div className="flex items-center gap-4">
          {!isLandingPage && (
            <>
              {/* Notifications */}
              <button
                onClick={onNotificationClick}
                className={cn(
                  "relative p-2 rounded-lg transition-colors",
                  transparent 
                    ? "text-white hover:bg-white/10" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </button>

              {/* User Name Display */}
              <div className={cn(
                "text-sm font-medium px-3 py-2",
                transparent ? "text-white" : "text-slate-700",
                !isLoggedIn && "text-slate-500"
              )}>
                {displayName}
              </div>

              {/* Admin Dropdown Menu - Separate from name */}
              <AdminDropdown 
                isLoggedIn={isLoggedIn}
                userName={authenticatedUser?.name}
                userEmail={authenticatedUser?.email}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}