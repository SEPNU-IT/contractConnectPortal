// Contract Owner Service - Mock implementation
// This would typically be replaced with actual API calls

export interface ContractOwner {
  id: string;
  email: string;
  fullName?: string;
  isActive: boolean;
  dateAdded: string;
  addedBy: string;
  lastLogin?: string;
  contractsManaged: number;
}

export interface AzureUserLookupResult {
  fullName: string;
  isValid: boolean;
  department?: string;
  jobTitle?: string;
}

// Mock Azure AD user database
const mockAzureUsers: Record<string, AzureUserLookupResult> = {
  'john.doe@seplatenergy.com': {
    fullName: 'John Doe',
    isValid: true,
    department: 'Engineering',
    jobTitle: 'Senior Engineer'
  },
  'jane.smith@seplatenergy.com': {
    fullName: 'Jane Smith',
    isValid: true,
    department: 'Procurement',
    jobTitle: 'Procurement Manager'
  },
  'michael.johnson@seplatenergy.com': {
    fullName: 'Michael Johnson',
    isValid: true,
    department: 'Operations',
    jobTitle: 'Operations Manager'
  },
  'sarah.williams@seplatenergy.com': {
    fullName: 'Sarah Williams',
    isValid: true,
    department: 'Legal',
    jobTitle: 'Legal Counsel'
  },
  'david.brown@seplatenergy.com': {
    fullName: 'David Brown',
    isValid: true,
    department: 'Finance',
    jobTitle: 'Financial Analyst'
  },
  'emma.davis@seplatenergy.com': {
    fullName: 'Emma Davis',
    isValid: true,
    department: 'HR',
    jobTitle: 'HR Manager'
  },
  'test.user@seplatenergy.com': {
    fullName: 'Test User',
    isValid: true,
    department: 'IT',
    jobTitle: 'Test Account'
  },
  'alex.martinez@seplatenergy.com': {
    fullName: 'Alex Martinez',
    isValid: true,
    department: 'Security',
    jobTitle: 'Security Officer'
  },
  'lisa.anderson@seplatenergy.com': {
    fullName: 'Lisa Anderson',
    isValid: true,
    department: 'Quality Assurance',
    jobTitle: 'QA Manager'
  },
  'robert.taylor@seplatenergy.com': {
    fullName: 'Robert Taylor',
    isValid: true,
    department: 'Project Management',
    jobTitle: 'Project Manager'
  }
};

// Contract Owner Service Class
export class ContractOwnerService {
  private static instance: ContractOwnerService;
  private contractOwners: ContractOwner[] = [
    {
      id: '1',
      email: 'contract.owner@seplatenergy.com',
      fullName: 'John Contract Manager',
      isActive: true,
      dateAdded: '2024-01-15',
      addedBy: 'admin@seplatenergy.com',
      lastLogin: '2024-12-20',
      contractsManaged: 15
    },
    {
      id: '2',
      email: 'jane.smith@seplatenergy.com',
      fullName: 'Jane Smith',
      isActive: true,
      dateAdded: '2024-02-10',
      addedBy: 'admin@seplatenergy.com',
      lastLogin: '2024-12-19',
      contractsManaged: 8
    },
    {
      id: '3',
      email: 'michael.johnson@seplatenergy.com',
      fullName: 'Michael Johnson',
      isActive: false,
      dateAdded: '2024-03-05',
      addedBy: 'admin@seplatenergy.com',
      lastLogin: '2024-11-30',
      contractsManaged: 3
    },
    {
      id: '4',
      email: 'sarah.williams@seplatenergy.com',
      fullName: 'Sarah Williams',
      isActive: true,
      dateAdded: '2024-04-12',
      addedBy: 'admin@seplatenergy.com',
      lastLogin: '2024-12-21',
      contractsManaged: 22
    }
  ];

  // Singleton pattern
  public static getInstance(): ContractOwnerService {
    if (!ContractOwnerService.instance) {
      ContractOwnerService.instance = new ContractOwnerService();
    }
    return ContractOwnerService.instance;
  }

  // Get all contract owners
  public async getContractOwners(): Promise<ContractOwner[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.contractOwners];
  }

  // Search contract owners
  public async searchContractOwners(searchTerm: string): Promise<ContractOwner[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (!searchTerm.trim()) {
      return [...this.contractOwners];
    }

    const term = searchTerm.toLowerCase();
    return this.contractOwners.filter(owner =>
      owner.email.toLowerCase().includes(term) ||
      owner.fullName?.toLowerCase().includes(term) ||
      false
    );
  }

  // Lookup user in Azure AD
  public async lookupUserInAzure(email: string): Promise<AzureUserLookupResult> {
    // Simulate Azure AD API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const normalizedEmail = email.toLowerCase().trim();
    const result = mockAzureUsers[normalizedEmail];
    
    if (result) {
      return result;
    }
    
    // Return invalid result for unknown users
    return {
      fullName: 'Unknown User',
      isValid: false
    };
  }

  // Add new contract owner
  public async addContractOwner(email: string, addedBy: string = 'admin@seplatenergy.com'): Promise<{ success: boolean; owner?: ContractOwner; error?: string }> {
    try {
      // Check if email already exists
      const existingOwner = this.contractOwners.find(
        owner => owner.email.toLowerCase() === email.toLowerCase()
      );
      
      if (existingOwner) {
        return {
          success: false,
          error: 'Email address already exists as a contract owner'
        };
      }

      // Lookup user in Azure AD
      const azureResult = await this.lookupUserInAzure(email);
      
      if (!azureResult.isValid) {
        return {
          success: false,
          error: 'User not found in organization directory'
        };
      }

      // Create new contract owner
      const newOwner: ContractOwner = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        fullName: azureResult.fullName,
        isActive: true,
        dateAdded: new Date().toISOString().split('T')[0],
        addedBy: addedBy,
        contractsManaged: 0
      };

      this.contractOwners.push(newOwner);
      
      return {
        success: true,
        owner: newOwner
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to add contract owner'
      };
    }
  }

  // Update contract owner status
  public async updateOwnerStatus(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const ownerIndex = this.contractOwners.findIndex(owner => owner.id === id);
    
    if (ownerIndex === -1) {
      return {
        success: false,
        error: 'Contract owner not found'
      };
    }

    this.contractOwners[ownerIndex].isActive = isActive;
    
    return { success: true };
  }

  // Remove contract owner
  public async removeContractOwner(id: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const ownerIndex = this.contractOwners.findIndex(owner => owner.id === id);
    
    if (ownerIndex === -1) {
      return {
        success: false,
        error: 'Contract owner not found'
      };
    }

    const owner = this.contractOwners[ownerIndex];
    
    // Check if owner has active contracts
    if (owner.contractsManaged > 0) {
      return {
        success: false,
        error: `Cannot remove ${owner.fullName}. They are managing ${owner.contractsManaged} active contracts.`
      };
    }

    this.contractOwners.splice(ownerIndex, 1);
    
    return { success: true };
  }

  // Get contract owner by ID
  public async getContractOwnerById(id: string): Promise<ContractOwner | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const owner = this.contractOwners.find(owner => owner.id === id);
    return owner || null;
  }

  // Get contract owner by email
  public async getContractOwnerByEmail(email: string): Promise<ContractOwner | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const owner = this.contractOwners.find(
      owner => owner.email.toLowerCase() === email.toLowerCase()
    );
    return owner || null;
  }

  // Get statistics
  public async getStatistics(): Promise<{
    total: number;
    active: number;
    inactive: number;
    totalContracts: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const active = this.contractOwners.filter(owner => owner.isActive).length;
    const inactive = this.contractOwners.filter(owner => !owner.isActive).length;
    const totalContracts = this.contractOwners.reduce((sum, owner) => sum + owner.contractsManaged, 0);
    
    return {
      total: this.contractOwners.length,
      active,
      inactive,
      totalContracts
    };
  }
}

// Export singleton instance
export const contractOwnerService = ContractOwnerService.getInstance();