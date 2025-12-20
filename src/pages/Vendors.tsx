import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VendorTable } from '@/components/vendors/VendorTable';
import { InviteVendorModal } from '@/components/vendors/InviteVendorModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import type { UserRole, Vendor, Department } from '@/types';

const mockVendors: Vendor[] = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    department: 'Information Technology',
    status: 'accepted',
    invitedBy: 'John Smith',
    invitedAt: new Date('2024-01-10'),
    registeredAt: new Date('2024-01-12'),
    personnelCount: 8,
  },
  {
    id: '2',
    companyName: 'Global Services Ltd',
    email: 'info@globalservices.com',
    department: 'Procurement',
    status: 'accepted',
    invitedBy: 'Jane Doe',
    invitedAt: new Date('2024-01-08'),
    registeredAt: new Date('2024-01-09'),
    personnelCount: 12,
  },
  {
    id: '3',
    companyName: 'Prime Contractors',
    email: 'admin@primecontractors.com',
    department: 'Operations',
    status: 'pending',
    invitedBy: 'John Smith',
    invitedAt: new Date('2024-01-15'),
    personnelCount: 0,
  },
  {
    id: '4',
    companyName: 'Legal Eagles LLP',
    email: 'office@legaleagles.com',
    department: 'Law',
    status: 'accepted',
    invitedBy: 'Jane Doe',
    invitedAt: new Date('2024-01-05'),
    registeredAt: new Date('2024-01-06'),
    personnelCount: 5,
  },
  {
    id: '5',
    companyName: 'Financial Advisors Inc',
    email: 'hello@financialadvisors.com',
    department: 'Finance',
    status: 'expired',
    invitedBy: 'John Smith',
    invitedAt: new Date('2023-12-01'),
    personnelCount: 0,
  },
];

export default function Vendors() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'contract_owner';
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);

  const filteredVendors = vendors.filter(vendor =>
    vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteVendor = (data: { email: string; companyName: string; department: Department }) => {
    const newVendor: Vendor = {
      id: String(vendors.length + 1),
      companyName: data.companyName,
      email: data.email,
      department: data.department,
      status: 'pending',
      invitedBy: 'Current User',
      invitedAt: new Date(),
      personnelCount: 0,
    };
    setVendors([newVendor, ...vendors]);
  };

  return (
    <DashboardLayout role={role} userName="Contract Owner">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vendors</h1>
            <p className="text-muted-foreground mt-1">
              Manage all vendors and their registration status
            </p>
          </div>
          <Button variant="hero" onClick={() => setIsInviteModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite Vendor
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Vendor Table */}
        <VendorTable vendors={filteredVendors} />

        {/* Invite Modal */}
        <InviteVendorModal
          open={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          onSubmit={handleInviteVendor}
        />
      </div>
    </DashboardLayout>
  );
}
