import type { Department as DepartmentString } from '@/types';

export interface DepartmentEntity {
  id: string;
  name: string;
  description: string;
  contractCount: number;
  activeVendorCount: number;
  isActive: boolean;
  createdAt: Date;
  lastModified: Date;
  location: string;
}

export interface DepartmentStats {
  totalDepartments: number;
  activeDepartments: number;
  inactiveDepartments: number;
  totalContracts: number;
  averageContractsPerDept: number;
}

class DepartmentService {
  private departments: DepartmentEntity[] = [
    {
      id: '1',
      name: 'Procurement',
      description: 'Manages vendor relationships, purchasing, and contract negotiations',
      contractCount: 45,
      activeVendorCount: 12,
      isActive: true,
      createdAt: new Date('2023-01-15'),
      lastModified: new Date('2024-11-15'),
      location: 'Lagos Office - Floor 3'
    },
    {
      id: '2',
      name: 'Information Technology',
      description: 'Technology infrastructure, software development, and digital transformation',
      contractCount: 28,
      activeVendorCount: 8,
      isActive: true,
      createdAt: new Date('2023-02-01'),
      lastModified: new Date('2024-12-01'),
      location: 'Lagos Office - Floor 5'
    },
    {
      id: '3',
      name: 'Law',
      description: 'Legal compliance, contract review, and regulatory affairs',
      contractCount: 67,
      activeVendorCount: 15,
      isActive: true,
      createdAt: new Date('2023-01-10'),
      lastModified: new Date('2024-11-20'),
      location: 'Abuja Office - Floor 2'
    },
    {
      id: '4',
      name: 'Human Resources',
      description: 'Personnel management, recruitment, training, and employee relations',
      contractCount: 23,
      activeVendorCount: 6,
      isActive: true,
      createdAt: new Date('2023-01-20'),
      lastModified: new Date('2024-10-30'),
      location: 'Lagos Office - Floor 4'
    },
    {
      id: '5',
      name: 'Finance',
      description: 'Financial planning, budgeting, accounting, and financial reporting',
      contractCount: 34,
      activeVendorCount: 9,
      isActive: true,
      createdAt: new Date('2023-01-05'),
      lastModified: new Date('2024-12-10'),
      location: 'Lagos Office - Floor 2'
    },
    {
      id: '6',
      name: 'Operations',
      description: 'Field operations, drilling, production, and maintenance services',
      contractCount: 89,
      activeVendorCount: 25,
      isActive: true,
      createdAt: new Date('2023-01-08'),
      lastModified: new Date('2024-12-15'),
      location: 'Port Harcourt Office'
    },
    {
      id: '7',
      name: 'Marketing',
      description: 'Brand management, communications, and market research',
      contractCount: 18,
      activeVendorCount: 5,
      isActive: true,
      createdAt: new Date('2023-03-01'),
      lastModified: new Date('2024-11-25'),
      location: 'Lagos Office - Floor 6'
    },
    {
      id: '8',
      name: 'Sales',
      description: 'Revenue generation, client relationships, and business development',
      contractCount: 41,
      activeVendorCount: 11,
      isActive: true,
      createdAt: new Date('2023-02-15'),
      lastModified: new Date('2024-12-05'),
      location: 'Lagos Office - Floor 7'
    },
    {
      id: '9',
      name: 'Finance',
      description: 'Additional finance operations and budget management',
      contractCount: 12,
      activeVendorCount: 3,
      isActive: false,
      createdAt: new Date('2023-04-01'),
      lastModified: new Date('2024-08-15'),
      location: 'Lagos Office - Floor 8'
    }
  ];

  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getAllDepartments(): Promise<{ success: boolean; data?: DepartmentEntity[]; error?: string }> {
    try {
      await this.delay(500);
      return { success: true, data: [...this.departments] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch departments' };
    }
  }

  async getDepartmentById(id: string): Promise<{ success: boolean; data?: DepartmentEntity; error?: string }> {
    try {
      await this.delay(300);
      const department = this.departments.find(d => d.id === id);
      if (department) {
        return { success: true, data: department };
      }
      return { success: false, error: 'Department not found' };
    } catch (error) {
      return { success: false, error: 'Failed to fetch department' };
    }
  }

  async addDepartment(department: Omit<DepartmentEntity, 'id' | 'createdAt' | 'lastModified'>): Promise<{ success: boolean; data?: DepartmentEntity; error?: string }> {
    try {
      await this.delay(800);
      
      // Check if department name already exists
      const existingDept = this.departments.find(d => 
        d.name.toLowerCase() === department.name.toLowerCase()
      );
      if (existingDept) {
        return { success: false, error: 'Department name already exists' };
      }

      const newDepartment: DepartmentEntity = {
        ...department,
        id: (this.departments.length + 1).toString(),
        createdAt: new Date(),
        lastModified: new Date()
      };

      this.departments.push(newDepartment);
      return { success: true, data: newDepartment };
    } catch (error) {
      return { success: false, error: 'Failed to add department' };
    }
  }

  async updateDepartment(id: string, updates: Partial<Omit<DepartmentEntity, 'id' | 'createdAt'>>): Promise<{ success: boolean; data?: DepartmentEntity; error?: string }> {
    try {
      await this.delay(700);
      
      const departmentIndex = this.departments.findIndex(d => d.id === id);
      if (departmentIndex === -1) {
        return { success: false, error: 'Department not found' };
      }

      // Check if updating name and new name already exists
      if (updates.name) {
        const existingDept = this.departments.find(d => 
          d.id !== id && d.name.toLowerCase() === updates.name!.toLowerCase()
        );
        if (existingDept) {
          return { success: false, error: 'Department name already exists' };
        }
      }

      const updatedDepartment = {
        ...this.departments[departmentIndex],
        ...updates,
        lastModified: new Date()
      };

      this.departments[departmentIndex] = updatedDepartment;
      return { success: true, data: updatedDepartment };
    } catch (error) {
      return { success: false, error: 'Failed to update department' };
    }
  }

  async deleteDepartment(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.delay(600);
      
      const departmentIndex = this.departments.findIndex(d => d.id === id);
      if (departmentIndex === -1) {
        return { success: false, error: 'Department not found' };
      }

      const department = this.departments[departmentIndex];
      if (department.contractCount > 0) {
        return { success: false, error: 'Cannot delete department with active contracts' };
      }

      this.departments.splice(departmentIndex, 1);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete department' };
    }
  }

  async toggleDepartmentStatus(id: string): Promise<{ success: boolean; data?: DepartmentEntity; error?: string }> {
    try {
      await this.delay(400);
      
      const departmentIndex = this.departments.findIndex(d => d.id === id);
      if (departmentIndex === -1) {
        return { success: false, error: 'Department not found' };
      }

      const department = this.departments[departmentIndex];
      const updatedDepartment = {
        ...department,
        isActive: !department.isActive,
        lastModified: new Date()
      };

      this.departments[departmentIndex] = updatedDepartment;
      return { success: true, data: updatedDepartment };
    } catch (error) {
      return { success: false, error: 'Failed to update department status' };
    }
  }

  async getStatistics(): Promise<{ success: boolean; data?: DepartmentStats; error?: string }> {
    try {
      await this.delay(300);
      
      const totalDepartments = this.departments.length;
      const activeDepartments = this.departments.filter(d => d.isActive).length;
      const inactiveDepartments = totalDepartments - activeDepartments;
      const totalContracts = this.departments.reduce((sum, d) => sum + d.contractCount, 0);
      const averageContractsPerDept = totalDepartments > 0 ? totalContracts / totalDepartments : 0;

      const stats: DepartmentStats = {
        totalDepartments,
        activeDepartments,
        inactiveDepartments,
        totalContracts,
        averageContractsPerDept
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to fetch statistics' };
    }
  }

  // Get available department names for dropdowns
  getActiveDepartmentNames(): string[] {
    return this.departments
      .filter(d => d.isActive)
      .map(d => d.name);
  }

  // Search departments
  async searchDepartments(query: string): Promise<{ success: boolean; data?: DepartmentEntity[]; error?: string }> {
    try {
      await this.delay(400);
      
      const lowercaseQuery = query.toLowerCase();
      const filtered = this.departments.filter(d => 
        d.name.toLowerCase().includes(lowercaseQuery) ||
        d.description.toLowerCase().includes(lowercaseQuery) ||
        d.location.toLowerCase().includes(lowercaseQuery)
      );

      return { success: true, data: filtered };
    } catch (error) {
      return { success: false, error: 'Failed to search departments' };
    }
  }
}

export const departmentService = new DepartmentService();