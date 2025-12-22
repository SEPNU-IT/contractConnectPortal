import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useEffect } from 'react';
import { Shield, Users, Settings, Database, Activity, Key } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { getAuthenticatedUser, getCurrentUser, getRoleNames } from '@/lib/auth';

export default function AdminPanel() {
  const authenticatedUser = getAuthenticatedUser();
  const currentUser = getCurrentUser();

  useEffect(() => {
    console.log('Admin Panel accessed by:', authenticatedUser);
  }, [authenticatedUser]);

  return (
    <DashboardLayout role={'admin'} userName={authenticatedUser?.name || 'Administrator'}>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            System Administration
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users, system settings, and administrative functions.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value={48}
            subtitle="Active system users"
            icon={Users}
            variant="default"
          />
          <StatsCard
            title="System Health"
            value="99.9%"
            subtitle="Uptime this month"
            icon={Activity}
            variant="success"
          />
          <StatsCard
            title="Active Sessions"
            value={23}
            subtitle="Currently logged in"
            icon={Key}
            variant="default"
          />
          <StatsCard
            title="Data Usage"
            value="2.4GB"
            subtitle="Storage consumed"
            icon={Database}
            variant="default"
          />
        </div>

        {/* Admin Functions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Management
            </h3>
            <p className="text-muted-foreground mb-4">
              Create, modify, and manage user accounts and permissions.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Total Administrators</span>
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Contract Owners</span>
                <span className="text-green-600 font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Vendors</span>
                <span className="text-purple-600 font-semibold">33</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              System Configuration
            </h3>
            <p className="text-muted-foreground mb-4">
              Configure system-wide settings and preferences.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Auto-backup</span>
                <span className="text-green-600 font-semibold">Enabled</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Notifications</span>
                <span className="text-blue-600 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">Security Level</span>
                <span className="text-red-600 font-semibold">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Information */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Administrator Access</h3>
          <p className="text-blue-700 text-sm">
            You are logged in as: <strong>{authenticatedUser?.name}</strong> ({authenticatedUser?.roles ? getRoleNames(authenticatedUser.roles) : 'Administrator'})
          </p>
          <p className="text-blue-600 text-xs mt-2">
            This page is only accessible to users with administrator privileges.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}