import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  Shield, 
  BarChart3, 
  FileText, 
  LogOut,
  ChevronRight,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAuthenticatedUser, canAccessRole } from '@/lib/auth';

interface AdminDropdownProps {
  isLoggedIn: boolean;
  userName?: string;
  userEmail?: string;
}

const allMenuItems = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', color: 'text-blue-600', requiredRole: null },
      { label: 'Vendors Overview', icon: Building2, path: '/admin/vendors', color: 'text-green-600', requiredRole: 'contract_owner' },
      { label: 'Personnel Overview', icon: Users, path: '/admin/personnel', color: 'text-purple-600', requiredRole: 'contract_owner' },
    ]
  },
  {
    section: 'Management',
    items: [
      { label: 'Contract Owners', icon: Shield, path: '/admin/contract-owners', color: 'text-orange-600', requiredRole: 'admin' },
      { label: 'Department Management', icon: Building, path: '/admin/departments', color: 'text-indigo-600', requiredRole: 'admin' },
      { label: 'Admin Panel', icon: Settings, path: '/admin/panel', color: 'text-red-600', requiredRole: 'admin' },
    ]
  },
  {
    section: 'Reports & Analytics',
    items: [
      { label: 'System Reports', icon: BarChart3, path: '/admin/reports', color: 'text-indigo-600', requiredRole: 'admin' },
      { label: 'Audit Logs', icon: FileText, path: '/admin/audit', color: 'text-gray-600', requiredRole: 'admin' },
    ]
  }
];

export default function AdminDropdown({ isLoggedIn, userName, userEmail }: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const authenticatedUser = getAuthenticatedUser();

  // Check if user has selected an access level (role)
  const hasSelectedRole = authenticatedUser?.selectedRole !== undefined;

  // Check if we're on procurement pages
  const isProcurementPage = location.pathname.startsWith('/procurement');

  // Filter menu items based on user roles AND role selection
  const getFilteredMenuItems = () => {
    if (!authenticatedUser || !hasSelectedRole) return [];
    
    // If on procurement pages, only show Dashboard and Sign Out
    if (isProcurementPage) {
      return [{
        section: 'Main',
        items: [
          { label: 'Dashboard', icon: LayoutDashboard, path: '/procurement/dashboard', color: 'text-blue-600' }
        ]
      }];
    }
    
    return allMenuItems.map(section => ({
      ...section,
      items: section.items.filter(item => 
        !item.requiredRole || canAccessRole(item.requiredRole as any)
      )
    })).filter(section => section.items.length > 0);
  };

  const filteredMenuItems = getFilteredMenuItems();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          isOpen ? "bg-slate-100" : ""
        )}
        aria-label="Open menu"
      >
        <Menu className={cn(
          "w-5 h-5 text-slate-600 transition-transform duration-200",
          isOpen ? "rotate-90" : ""
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed top-16 right-0 w-96 bg-white rounded-l-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            {isLoggedIn && userName && userEmail ? (
              <>
                <p className="font-medium text-slate-900">{userName}</p>
                <p className="text-sm text-slate-600">{userEmail}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {authenticatedUser?.roles?.includes('admin' as any) ? 'System Administrator' : 'Contract Owner'}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-slate-500">No Active User</p>
                <p className="text-sm text-slate-400">Please log in to access features</p>
              </>
            )}
          </div>

          {/* Menu Sections */}
          {isLoggedIn ? (
            hasSelectedRole ? (
              <div className="py-2 max-h-96 overflow-y-auto">
                {filteredMenuItems.map((section, sectionIndex) => (
                  <div key={section.section}>
                    {sectionIndex > 0 && <div className="border-t border-slate-100 my-2" />}
                    
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        {section.section}
                      </p>
                      
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleMenuClick(item.path)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md hover:bg-slate-50 transition-colors duration-150 group"
                          >
                            <item.icon className={cn("w-4 h-4", item.color)} />
                            <span className="text-sm text-slate-700 group-hover:text-slate-900 flex-1">
                              {item.label}
                            </span>
                            <ChevronRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 px-4 text-center">
                <Shield className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <p className="text-slate-600 text-sm mb-2 font-medium">Access Level Required</p>
                <p className="text-slate-500 text-xs mb-3">Please select your access level from the internal landing page to view available menu options.</p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/internal');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Select Access Level
                </button>
              </div>
            )
          ) : (
            <div className="py-4 px-4 text-center">
              <p className="text-slate-500 text-sm mb-3">Please log in to access menu options</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Logout Section */}
          {isLoggedIn && (
            <div className="border-t border-slate-200 p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md hover:bg-red-50 transition-colors duration-150 group"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600 group-hover:text-red-700">
                  Sign Out
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}