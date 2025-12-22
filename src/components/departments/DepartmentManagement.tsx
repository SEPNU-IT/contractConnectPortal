import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AddDepartmentModal } from './AddDepartmentModal';
import { departmentService, type DepartmentEntity, type DepartmentStats } from '@/services/departmentService';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  Search,
  Plus,
  AlertCircle,
  Edit,
  Trash2,
  Power,
  MapPin,
  Calendar,
  Activity,
  BarChart3,
  FileText
} from 'lucide-react';
import type { Department } from '@/types';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

function StatsCard({ title, value, subtitle, icon, color, isActive = false, onClick }: StatsCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-white/50 ${
        isActive ? `ring-2 ${color.replace('text-', 'ring-').replace('-600', '-500')} bg-white/90` : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-800">{value}</p>
              {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <div className={`w-8 h-8 flex items-center justify-center ${color}`}>
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-white/70 backdrop-blur-sm border-white/50"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white/70 backdrop-blur-sm border-white/50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function DepartmentManagement() {
  const [departments, setDepartments] = useState<DepartmentEntity[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<DepartmentEntity[]>([]);
  const [statistics, setStatistics] = useState<DepartmentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const itemsPerPage = 21;

  // Load departments and statistics
  const loadDepartments = async () => {
    const result = await departmentService.getAllDepartments();
    if (result.success && result.data) {
      setDepartments(result.data);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to load departments",
        variant: "destructive",
      });
    }
  };

  const loadStatistics = async () => {
    const result = await departmentService.getStatistics();
    if (result.success && result.data) {
      setStatistics(result.data);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await Promise.all([loadDepartments(), loadStatistics()]);
      setIsLoading(false);
    };
    initialize();
  }, []);

  // Filter departments based on search and active filter
  useEffect(() => {
    let filtered = departments;

    // Apply status filter
    if (activeFilter === 'active') {
      filtered = filtered.filter(dept => dept.isActive);
    } else if (activeFilter === 'inactive') {
      filtered = filtered.filter(dept => !dept.isActive);
    }

    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(lowercaseSearch) ||
        dept.description.toLowerCase().includes(lowercaseSearch) ||
        dept.location.toLowerCase().includes(lowercaseSearch)
      );
    }

    setFilteredDepartments(filtered);
    setCurrentPage(1);
  }, [departments, searchTerm, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDepartments = filteredDepartments.slice(startIndex, startIndex + itemsPerPage);

  // Handle filter changes
  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setActiveFilter(filter);
  };

  // Add department
  const handleAddDepartment = async (departmentData: {
    name: string;
    description: string;
    location: string;
    isActive: boolean;
  }) => {
    setIsLoading(true);
    try {
      const result = await departmentService.addDepartment({
        ...departmentData,
        contractCount: 0,
        activeVendorCount: 0,
      });
      
      if (result.success) {
        await loadDepartments();
        await loadStatistics();
        
        toast({
          title: "Success",
          description: `${departmentData.name} department has been added successfully.`,
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add department.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding the department.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle department status
  const toggleDepartmentStatus = async (id: string) => {
    const department = departments.find(d => d.id === id);
    if (!department) return;

    try {
      const result = await departmentService.toggleDepartmentStatus(id);
      
      if (result.success) {
        await loadDepartments();
        await loadStatistics();
        
        toast({
          title: "Status Updated",
          description: `${department.name} has been ${department.isActive ? 'deactivated' : 'activated'}.`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department status.",
        variant: "destructive",
      });
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <>
      {/* Full viewport background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 -z-10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Department Management</h1>
            <p className="text-slate-600 mt-2">Manage departments, budgets, and organizational structure</p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Department
          </Button>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Total Departments"
              value={statistics.totalDepartments}
              subtitle="All departments"
              icon={<Building2 className="w-8 h-8" />}
              color="text-blue-600"
              isActive={activeFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            />
            <StatsCard
              title="Active Departments"
              value={statistics.activeDepartments}
              subtitle={`${Math.round((statistics.activeDepartments / statistics.totalDepartments) * 100)}% of total`}
              icon={<Activity className="w-8 h-8" />}
              color="text-green-600"
              isActive={activeFilter === 'active'}
              onClick={() => handleFilterChange('active')}
            />
            <StatsCard
              title="Total Contracts"
              value={formatNumber(statistics.totalContracts)}
              subtitle={`Avg ${statistics.averageContractsPerDept.toFixed(1)} per dept`}
              icon={<FileText className="w-8 h-8" />}
              color="text-purple-600"
            />
          </div>
        )}

        {/* Search and Filters */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search departments by name, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80"
                />
              </div>
              <div className="flex gap-2">
                <Badge 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  className={`cursor-pointer transition-all ${
                    activeFilter === 'all' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => handleFilterChange('all')}
                >
                  All ({departments.length})
                </Badge>
                <Badge 
                  variant={activeFilter === 'active' ? 'default' : 'outline'} 
                  className={`cursor-pointer transition-all ${
                    activeFilter === 'active' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => handleFilterChange('active')}
                >
                  Active ({departments.filter(d => d.isActive).length})
                </Badge>
                <Badge 
                  variant={activeFilter === 'inactive' ? 'default' : 'outline'} 
                  className={`cursor-pointer transition-all ${
                    activeFilter === 'inactive' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => handleFilterChange('inactive')}
                >
                  Inactive ({departments.filter(d => !d.isActive).length})
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Departments Grid */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Departments Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-500 mt-4">Loading departments...</p>
              </div>
            ) : paginatedDepartments.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500">
                  {filteredDepartments.length === 0 && departments.length > 0
                    ? `No ${activeFilter === 'all' ? '' : activeFilter} departments match your search`
                    : 'No departments found'
                  }
                </p>
                <p className="text-sm text-slate-400">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedDepartments.map((department) => (
                  <Card key={department.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-white/60">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              department.isActive 
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                                : 'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {department.name}
                              </h3>
                              <Badge 
                                variant={department.isActive ? 'default' : 'secondary'} 
                                className={`text-xs ${
                                  department.isActive 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {department.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 line-clamp-2">{department.description}</p>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                          <MapPin className="w-4 h-4" />
                          <span>{department.location}</span>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-800">{department.contractCount}</p>
                            <p className="text-xs text-slate-500">Contracts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-800">{department.activeVendorCount}</p>
                            <p className="text-xs text-slate-500">Vendors</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-slate-200">
                          <Button size="sm" variant="ghost" className="flex-1 border-b border-b-blue-300 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => toggleDepartmentStatus(department.id)}
                            className={`border-b rounded-lg hover:bg-slate-50 ${
                              department.isActive 
                                ? 'border-b-orange-300 text-orange-600 hover:text-orange-700 hover:bg-orange-50' 
                                : 'border-b-green-300 text-green-600 hover:text-green-700 hover:bg-green-50'
                            }`}
                          >
                            <Power className="w-3 h-3 mr-1" />
                            {department.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-slate-200">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Alert */}
        <Alert className="border-blue-200/50 bg-blue-50/70 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Note:</strong> Departments with active contracts cannot be deleted. 
            Deactivating a department will prevent new contracts from being assigned to it.
          </AlertDescription>
        </Alert>

        {/* Add Department Modal */}
        <AddDepartmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddDepartment}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}