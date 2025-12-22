import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Users, 
  FileCheck, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Clock,
  Building2,
  ChevronRight,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAuthenticatedUser, getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserRole } from '@/types';

// Admin-specific mock data
const adminMockData = {
  totalContractOwners: 8,
  activeContractOwners: 7,
  totalSystemUsers: 156,
  systemUptime: 99.9,
  activeContracts: 23,
  totalVendorsSystemWide: 48,
  totalPersonnelSystemWide: 234,
  pendingApprovals: 12,
  documentsExpiringSoon: 18,
  monthlyGrowth: 15.3,
  avgResponseTime: 2.4,
};

// Quick links for easy navigation with Seplat brand colors
const quickLinks = [
  { title: 'Vendor Reports', icon: Building2, path: '/reports/vendors', color: 'bg-gradient-to-r from-red-600 to-red-700' },
  { title: 'Compliance Dashboard', icon: CheckCircle, path: '/compliance', color: 'bg-gradient-to-r from-green-600 to-green-700' },
  { title: 'Analytics Hub', icon: BarChart3, path: '/analytics', color: 'bg-gradient-to-r from-gray-600 to-gray-700' },
  { title: 'System Health', icon: Activity, path: '/health', color: 'bg-gradient-to-r from-orange-600 to-red-600' },
];

// Recent activity mock data
const recentActivities = [
  { action: 'New vendor registration', details: 'TechCorp Solutions completed onboarding', time: '2 mins ago', type: 'success' },
  { action: 'Document expiration alert', details: '5 certificates expiring in 7 days', time: '15 mins ago', type: 'warning' },
  { action: 'Contract owner added', details: 'Sarah Johnson joined as Contract Owner', time: '1 hour ago', type: 'info' },
  { action: 'System backup completed', details: 'Weekly backup finished successfully', time: '3 hours ago', type: 'success' },
];

// Chart data mock
const chartData = [
  { month: 'Jan', vendors: 35, personnel: 180, contracts: 18 },
  { month: 'Feb', vendors: 38, personnel: 195, contracts: 20 },
  { month: 'Mar', vendors: 42, personnel: 210, contracts: 21 },
  { month: 'Apr', vendors: 45, personnel: 225, contracts: 22 },
  { month: 'May', vendors: 48, personnel: 234, contracts: 23 },
];

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get authenticated user and current user
  const authenticatedUser = getAuthenticatedUser();
  const currentUser = getCurrentUser();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authenticatedUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [authenticatedUser, navigate, toast]);
  
  // Get role from URL or authenticated user's selected role
  const roleParam = searchParams.get('role') as UserRole;
  const selectedRole = authenticatedUser?.selectedRole || roleParam || 'admin';
  
  const userName = authenticatedUser?.name || 'User';
  
  if (!authenticatedUser) {
    return <div>Loading...</div>;
  }

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section with Seplat Brand Colors */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Here's your system overview and key metrics for today.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>{adminMockData.systemUptime}% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{adminMockData.monthlyGrowth}% Growth</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Key Performance Metrics with Seplat Brand Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 mb-1">Total Vendors</p>
                <p className="text-3xl font-bold text-red-900">{adminMockData.totalVendorsSystemWide}</p>
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-red-600 rounded-xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Active Personnel</p>
                <p className="text-3xl font-bold text-green-900">{adminMockData.totalPersonnelSystemWide}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8% from last month
                </p>
              </div>
              <div className="p-3 bg-green-600 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-300 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Pending Items</p>
                <p className="text-3xl font-bold text-gray-900">{adminMockData.pendingApprovals}</p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Requires attention
                </p>
              </div>
              <div className="p-3 bg-gray-600 rounded-xl shadow-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-100 hover:shadow-xl transition-all duration-300 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Avg Response</p>
                <p className="text-3xl font-bold text-orange-900">{adminMockData.avgResponseTime}h</p>
                <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Within target
                </p>
              </div>
              <div className="p-3 bg-orange-600 rounded-xl shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <BarChart3 className="w-5 h-5 text-red-600" />
              Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 flex items-end justify-around">
              {chartData.map((item, index) => (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-end">
                    <div 
                      className="w-4 bg-red-500 rounded-t shadow-md" 
                      style={{ height: `${(item.vendors / 50) * 100}px` }}
                    ></div>
                    <div 
                      className="w-4 bg-green-500 rounded-t shadow-md" 
                      style={{ height: `${(item.personnel / 250) * 100}px` }}
                    ></div>
                    <div 
                      className="w-4 bg-gray-500 rounded-t shadow-md" 
                      style={{ height: `${(item.contracts / 25) * 150}px` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded shadow-sm"></div>
                <span className="text-slate-600">Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded shadow-sm"></div>
                <span className="text-slate-600">Personnel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded shadow-sm"></div>
                <span className="text-slate-600">Contracts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Activity className="w-5 h-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-600 mt-1">{activity.details}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links with Seplat Brand Colors */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Globe className="w-5 h-5 text-red-600" />
            Quick Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/reports/vendors')}
              className="group flex items-center gap-4 p-4 rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Building2 className="w-6 h-6" />
              <span className="font-medium flex-1 text-left">Vendor Reports</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            
            <button
              onClick={() => navigate('/compliance')}
              className="group flex items-center gap-4 p-4 rounded-xl text-white bg-gradient-to-r from-green-600 to-green-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium flex-1 text-left">Compliance Dashboard</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            
            <button
              onClick={() => navigate('/analytics')}
              className="group flex items-center gap-4 p-4 rounded-xl text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BarChart3 className="w-6 h-6" />
              <span className="font-medium flex-1 text-left">Analytics Hub</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            
            <button
              onClick={() => navigate('/health')}
              className="group flex items-center gap-4 p-4 rounded-xl text-white bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Activity className="w-6 h-6" />
              <span className="font-medium flex-1 text-left">System Health</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContractOwnerDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section with Seplat Brand Colors */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-xl text-white/90">
            Your vendor management hub and compliance dashboard.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white/10 rounded-full"></div>
      </div>

      {/* Contract Owner Metrics with Seplat Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 mb-1">Your Vendors</p>
                <p className="text-3xl font-bold text-red-900">15</p>
              </div>
              <div className="p-3 bg-red-600 rounded-xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Personnel</p>
                <p className="text-3xl font-bold text-green-900">78</p>
              </div>
              <div className="p-3 bg-green-600 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Compliance</p>
                <p className="text-3xl font-bold text-gray-900">94%</p>
              </div>
              <div className="p-3 bg-gray-600 rounded-xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links for Contract Owner with Seplat Colors */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-slate-800">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:scale-105 transition-all shadow-lg">
              <Building2 className="w-5 h-5" />
              <span>Vendor Portal</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:scale-105 transition-all shadow-lg">
              <Users className="w-5 h-5" />
              <span>Personnel Mgmt</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:scale-105 transition-all shadow-lg">
              <FileCheck className="w-5 h-5" />
              <span>Compliance</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout role={selectedRole} userName={userName}>
      {selectedRole === 'admin' ? renderAdminDashboard() : renderContractOwnerDashboard()}
    </DashboardLayout>
  );
}
