export type UserRole = 'admin' | 'contract_owner' | 'vendor';

export type Department = 
  | 'Procurement'
  | 'Information Technology'
  | 'Law'
  | 'Human Resources'
  | 'Finance'
  | 'Operations'
  | 'Marketing'
  | 'Sales';

export type InvitationStatus = 'pending' | 'accepted' | 'expired';

export type DocumentStatus = 'valid' | 'expiring' | 'expired';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  companyName: string;
  email: string;
  department: Department;
  status: InvitationStatus;
  invitedBy: string;
  invitedAt: Date;
  registeredAt?: Date;
  address?: string;
  phone?: string;
  personnelCount: number;
}

export interface Personnel {
  id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone: string;
  documents: Document[];
  createdAt: Date;
}

export interface Document {
  id: string;
  personnelId: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: Date;
  expiryDate: Date;
  status: DocumentStatus;
}

export type DocumentType = 
  | 'security_background_check'
  | 'medical_fitness'
  | 'professional_certification'
  | 'school_credentials';

export interface DashboardStats {
  totalVendors: number;
  activeVendors: number;
  pendingInvitations: number;
  totalPersonnel: number;
  expiringDocuments: number;
  expiredDocuments: number;
}
