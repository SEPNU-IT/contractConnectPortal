import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, UserCheck, Mail, Calendar, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import AddContractOwnerModal from '@/components/contractOwners/AddContractOwnerModal';
import { contractOwnerService, ContractOwner } from '@/lib/contractOwnerService';

export default function ContractOwnerManagement() {
  const [contractOwners, setContractOwners] = useState<ContractOwner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalContracts: 0
  });
  const { toast } = useToast();

  // Load contract owners on component mount
  useEffect(() => {
    loadContractOwners();
    loadStatistics();
  }, []);

  // Load contract owners from service
  const loadContractOwners = async () => {
    try {
      setIsLoadingData(true);
      const owners = await contractOwnerService.getContractOwners();
      setContractOwners(owners);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contract owners.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Load statistics from service
  const loadStatistics = async () => {
    try {
      const stats = await contractOwnerService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  // Filter contract owners based on search term and active status
  const filteredOwners = contractOwners.filter(owner => {
    const matchesSearch = owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'active' && owner.isActive) ||
      (activeFilter === 'inactive' && !owner.isActive);
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOwners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOwners = filteredOwners.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);

  // Handle filter change
  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setActiveFilter(filter);
  };

  // Add new contract owner
  const handleAddContractOwner = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await contractOwnerService.addContractOwner(email);
      
      if (result.success) {
        await loadContractOwners();
        await loadStatistics();
        
        toast({
          title: "Contract Owner Added",
          description: `${result.owner?.fullName} has been successfully added as a contract owner.`,
        });

        return true;
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add contract owner.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contract owner. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle contract owner active status
  const toggleOwnerStatus = async (id: string) => {
    const owner = contractOwners.find(o => o.id === id);
    if (!owner) return;

    try {
      const result = await contractOwnerService.updateOwnerStatus(id, !owner.isActive);
      
      if (result.success) {
        await loadContractOwners();
        await loadStatistics();
        
        toast({
          title: "Status Updated",
          description: `${owner.fullName} has been ${owner.isActive ? 'deactivated' : 'activated'}.`,
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
        description: "Failed to update owner status.",
        variant: "destructive",
      });
    }
  };

  // Remove contract owner
  const removeOwner = async (id: string) => {
    try {
      const result = await contractOwnerService.removeContractOwner(id);
      
      if (result.success) {
        await loadContractOwners();
        await loadStatistics();
        
        const owner = contractOwners.find(o => o.id === id);
        toast({
          title: "Contract Owner Removed",
          description: `${owner?.fullName} has been removed from the system.`,
        });
      } else {
        toast({
          title: "Cannot Remove",
          description: result.error || "Failed to remove contract owner.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove contract owner.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Full viewport background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 via-red-50 to-green-50 -z-10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-green-200/30 to-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Contract Owner Management</h1>
          <p className="text-slate-600 mt-2">Manage contract owners and their access permissions</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contract Owner
        </Button>
      </div>

      {/* Stats Cards - Clickable Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={() => handleFilterChange('all')}
          className={`text-left transition-all duration-200 transform hover:scale-105 ${
            activeFilter === 'all' ? 'ring-2 ring-red-500 ring-offset-2 rounded-xl' : ''
          }`}
        >
          <Card className={`border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-xl ${
            activeFilter === 'all' ? 'bg-gradient-to-br from-red-100 to-red-200' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700 mb-1">All Contract Owners</p>
                  <p className="text-3xl font-bold text-red-900">{statistics.total}</p>
                  <p className="text-xs text-red-600 mt-1">Click to view all</p>
                </div>
                <div className="p-3 bg-red-600 rounded-xl shadow-lg">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        <button
          onClick={() => handleFilterChange('active')}
          className={`text-left transition-all duration-200 transform hover:scale-105 ${
            activeFilter === 'active' ? 'ring-2 ring-green-500 ring-offset-2 rounded-xl' : ''
          }`}
        >
          <Card className={`border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl ${
            activeFilter === 'active' ? 'bg-gradient-to-br from-green-100 to-green-200' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-900">{statistics.active}</p>
                  <p className="text-xs text-green-600 mt-1">Click to view active</p>
                </div>
                <div className="p-3 bg-green-600 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        <button
          onClick={() => handleFilterChange('inactive')}
          className={`text-left transition-all duration-200 transform hover:scale-105 ${
            activeFilter === 'inactive' ? 'ring-2 ring-gray-500 ring-offset-2 rounded-xl' : ''
          }`}
        >
          <Card className={`border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-xl ${
            activeFilter === 'inactive' ? 'bg-gradient-to-br from-gray-100 to-gray-200' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Inactive</p>
                  <p className="text-3xl font-bold text-gray-900">{statistics.inactive}</p>
                  <p className="text-xs text-gray-600 mt-1">Click to view inactive</p>
                </div>
                <div className="p-3 bg-gray-600 rounded-xl shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </button>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Total Contracts</p>
                <p className="text-3xl font-bold text-orange-900">{statistics.totalContracts}</p>
                <p className="text-xs text-orange-600 mt-1">Contracts managed</p>
              </div>
              <div className="p-3 bg-orange-600 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md border border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="text-slate-800">Contract Owner Directory</CardTitle>
              {activeFilter !== 'all' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Showing: {activeFilter === 'active' ? 'Active Only' : 'Inactive Only'}
                </Badge>
              )}
            </div>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white/60 backdrop-blur-sm rounded-lg">
          <div className="space-y-4">
            {isLoadingData ? (
              <div className="text-center py-12">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-16 bg-slate-200 rounded"></div>
                  <div className="h-16 bg-slate-200 rounded"></div>
                  <div className="h-16 bg-slate-200 rounded"></div>
                </div>
                <p className="text-slate-500 mt-4">Loading contract owners...</p>
              </div>
            ) : paginatedOwners.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500">
                  {filteredOwners.length === 0 && contractOwners.length > 0
                    ? `No ${activeFilter === 'all' ? '' : activeFilter} contract owners match your search`
                    : 'No contract owners found'
                  }
                </p>
                <p className="text-sm text-slate-400">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              paginatedOwners.map((owner) => (
                <div key={owner.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        owner.isActive ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        {owner.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'U'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-800">{owner.fullName || 'Unknown User'}</h3>
                        <Badge variant={owner.isActive ? 'default' : 'secondary'} className={
                          owner.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }>
                          {owner.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{owner.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Added {new Date(owner.dateAdded).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span>{owner.contractsManaged} contracts</span>
                        </div>
                        {owner.lastLogin && (
                          <div className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            <span>Last login {new Date(owner.lastLogin).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOwnerStatus(owner.id)}
                      className={`border-0 hover:bg-opacity-10 ${
                        owner.isActive 
                          ? 'text-red-600 hover:bg-red-500' 
                          : 'text-green-600 hover:bg-green-500'
                      }`}
                    >
                      {owner.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOwner(owner.id)}
                      className="border-0 text-red-600 hover:bg-red-500 hover:bg-opacity-10"
                      disabled={owner.contractsManaged > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOwners.length)} of {filteredOwners.length} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-slate-200"
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 p-0 ${
                          currentPage === pageNum 
                            ? 'bg-red-600 border-red-600 text-white' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-slate-200"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Alert */}
      <Alert className="border-blue-200/50 bg-blue-50/70 backdrop-blur-sm">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Note:</strong> Contract owners with active contracts cannot be removed from the system. 
          Please reassign their contracts before attempting to remove them.
        </AlertDescription>
      </Alert>

      {/* Add Contract Owner Modal */}
      <AddContractOwnerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContractOwner}
        isLoading={isLoading}
      />
      </div>
    </>
  );
}