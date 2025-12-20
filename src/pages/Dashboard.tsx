import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ExpiryAlerts } from '@/components/dashboard/ExpiryAlerts';
import { Building2, Users, FileCheck, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import type { UserRole, DashboardStats } from '@/types';

const mockStats: Record<UserRole, DashboardStats> = {
  admin: {
    totalVendors: 48,
    activeVendors: 42,
    pendingInvitations: 6,
    totalPersonnel: 234,
    expiringDocuments: 12,
    expiredDocuments: 3,
  },
  contract_owner: {
    totalVendors: 15,
    activeVendors: 13,
    pendingInvitations: 2,
    totalPersonnel: 78,
    expiringDocuments: 5,
    expiredDocuments: 1,
  },
  vendor: {
    totalVendors: 1,
    activeVendors: 1,
    pendingInvitations: 0,
    totalPersonnel: 12,
    expiringDocuments: 2,
    expiredDocuments: 0,
  },
};

const roleNames: Record<UserRole, string> = {
  admin: 'System Administrator',
  contract_owner: 'Contract Owner',
  vendor: 'Vendor Manager',
};

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole || 'admin';
  const role = roleParam as UserRole;
  const stats = mockStats[role];

  return (
    <DashboardLayout role={role} userName={roleNames[role]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {roleNames[role]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your vendor management today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {role !== 'vendor' && (
            <>
              <StatsCard
                title="Total Vendors"
                value={stats.totalVendors}
                subtitle={`${stats.activeVendors} active`}
                icon={Building2}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Pending Invitations"
                value={stats.pendingInvitations}
                subtitle="Awaiting response"
                icon={Clock}
                variant={stats.pendingInvitations > 0 ? 'warning' : 'default'}
              />
            </>
          )}
          <StatsCard
            title="Total Personnel"
            value={stats.totalPersonnel}
            subtitle="Across all vendors"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Valid Documents"
            value={stats.totalPersonnel * 4 - stats.expiringDocuments - stats.expiredDocuments}
            subtitle="All compliant"
            icon={CheckCircle}
            variant="success"
          />
          <StatsCard
            title="Expiring Soon"
            value={stats.expiringDocuments}
            subtitle="Within 30 days"
            icon={AlertTriangle}
            variant={stats.expiringDocuments > 0 ? 'warning' : 'default'}
          />
          <StatsCard
            title="Expired Documents"
            value={stats.expiredDocuments}
            subtitle="Immediate action needed"
            icon={FileCheck}
            variant={stats.expiredDocuments > 0 ? 'danger' : 'success'}
          />
        </div>

        {/* Activity and Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RecentActivity />
          <ExpiryAlerts />
        </div>
      </div>
    </DashboardLayout>
  );
}
