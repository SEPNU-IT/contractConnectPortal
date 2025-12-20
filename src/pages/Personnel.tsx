import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PersonnelCard } from '@/components/personnel/PersonnelCard';
import { AddPersonnelModal } from '@/components/personnel/AddPersonnelModal';
import { DocumentUploadModal } from '@/components/documents/DocumentUploadModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Grid, List } from 'lucide-react';
import type { UserRole, Personnel, DocumentType } from '@/types';
import { cn } from '@/lib/utils';

const mockPersonnel: Personnel[] = [
  {
    id: '1',
    vendorId: '1',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@techcorp.com',
    position: 'Senior Engineer',
    phone: '+1 (555) 123-4567',
    documents: [
      { id: 'd1', personnelId: '1', type: 'security_background_check', fileName: 'bg_check.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-01-15'), status: 'expired' },
      { id: 'd2', personnelId: '1', type: 'medical_fitness', fileName: 'medical.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-06-01'), status: 'valid' },
      { id: 'd3', personnelId: '1', type: 'professional_certification', fileName: 'cert.pdf', uploadedAt: new Date(), expiryDate: new Date('2025-01-01'), status: 'valid' },
    ],
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '2',
    vendorId: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    position: 'Project Manager',
    phone: '+1 (555) 234-5678',
    documents: [
      { id: 'd4', personnelId: '2', type: 'security_background_check', fileName: 'bg_check.pdf', uploadedAt: new Date(), expiryDate: new Date('2025-03-01'), status: 'valid' },
      { id: 'd5', personnelId: '2', type: 'medical_fitness', fileName: 'medical.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-02-01'), status: 'expiring' },
    ],
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    vendorId: '2',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@globalservices.com',
    position: 'Consultant',
    phone: '+1 (555) 345-6789',
    documents: [
      { id: 'd6', personnelId: '3', type: 'security_background_check', fileName: 'bg_check.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-08-01'), status: 'valid' },
      { id: 'd7', personnelId: '3', type: 'professional_certification', fileName: 'cert.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-02-15'), status: 'expiring' },
      { id: 'd8', personnelId: '3', type: 'school_credentials', fileName: 'degree.pdf', uploadedAt: new Date(), expiryDate: new Date('2099-01-01'), status: 'valid' },
    ],
    createdAt: new Date('2024-01-09'),
  },
  {
    id: '4',
    vendorId: '2',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@globalservices.com',
    position: 'Analyst',
    phone: '+1 (555) 456-7890',
    documents: [
      { id: 'd9', personnelId: '4', type: 'security_background_check', fileName: 'bg_check.pdf', uploadedAt: new Date(), expiryDate: new Date('2025-01-01'), status: 'valid' },
      { id: 'd10', personnelId: '4', type: 'medical_fitness', fileName: 'medical.pdf', uploadedAt: new Date(), expiryDate: new Date('2024-12-01'), status: 'valid' },
    ],
    createdAt: new Date('2024-01-09'),
  },
];

export default function PersonnelPage() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'vendor';
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);

  const filteredPersonnel = personnel.filter(p =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPersonnel = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
  }) => {
    const newPersonnel: Personnel = {
      id: String(personnel.length + 1),
      vendorId: '1',
      ...data,
      documents: [],
      createdAt: new Date(),
    };
    setPersonnel([newPersonnel, ...personnel]);
  };

  const handleViewDocuments = (personnelId: string) => {
    const person = personnel.find(p => p.id === personnelId);
    if (person) {
      setSelectedPersonnel(person);
      setIsDocumentModalOpen(true);
    }
  };

  const handleDocumentUpload = (data: {
    type: DocumentType;
    file: File | null;
    expiryDate: string;
  }) => {
    // Handle document upload logic
    console.log('Document uploaded:', data);
  };

  return (
    <DashboardLayout role={role} userName="Vendor Manager">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Personnel</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their credentials
            </p>
          </div>
          <Button variant="hero" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Personnel
          </Button>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search personnel..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 border-2 border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Personnel Grid/List */}
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {filteredPersonnel.map((person, index) => (
            <div 
              key={person.id}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PersonnelCard
                personnel={person}
                onViewDocuments={handleViewDocuments}
              />
            </div>
          ))}
        </div>

        {filteredPersonnel.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No personnel found matching your search.</p>
          </div>
        )}

        {/* Modals */}
        <AddPersonnelModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddPersonnel}
        />

        {selectedPersonnel && (
          <DocumentUploadModal
            open={isDocumentModalOpen}
            onClose={() => {
              setIsDocumentModalOpen(false);
              setSelectedPersonnel(null);
            }}
            personnelName={`${selectedPersonnel.firstName} ${selectedPersonnel.lastName}`}
            onSubmit={handleDocumentUpload}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
