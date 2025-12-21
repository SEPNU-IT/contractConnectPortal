import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, Shield, LogOut, Bell } from 'lucide-react';

interface HeaderProps {
  transparent?: boolean;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export default function Header({ transparent = false, user }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLandingPage = location.pathname === '/';

  // Mock user data for development (assuming logged in)
  const currentUser = user || {
    name: "Iberedem Inyang",
    email: "iberedem.inyangn@seplatenergy.com",
    role: "Contract Owner",
    avatar: undefined
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    setDropdownOpen(false);
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className={cn(
      "w-full z-50 transition-all duration-300",
      transparent 
        ? "absolute top-0 left-0 right-0 bg-transparent" 
        : "relative bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
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
            transparent ? "bg-white/30" : "bg-gray-300"
          )}></div>
          
          {/* CCMG Branding */}
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
                : "text-gray-900"
            )}>
              CCMG
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            {/* User Profile Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10 backdrop-blur-sm",
                transparent ? "text-white" : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {/* User Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                transparent 
                  ? "bg-white/20 text-white" 
                  : "bg-gradient-to-br from-green-500 to-green-600 text-white"
              )}>
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  getInitials(currentUser.name)
                )}
              </div>
              
              {/* User Info */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className={cn(
                  "text-xs",
                  transparent ? "text-white/70" : "text-gray-500"
                )}>
                  {currentUser.role}
                </span>
              </div>
              
              {/* Dropdown Arrow */}
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-200",
                dropdownOpen ? "rotate-180" : ""
              )} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-xl overflow-hidden z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-medium">
                      {currentUser.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        getInitials(currentUser.name)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
                      <p className="text-sm text-gray-600 truncate" title={currentUser.email}>{currentUser.email}</p>
                      <p className="text-xs text-green-600 font-medium truncate">{currentUser.role}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Management</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/security');
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/notifications');
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </button>
                  
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}