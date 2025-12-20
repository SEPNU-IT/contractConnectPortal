import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Hash,
  LogOut,
  CheckCircle,
  AlertCircle,
  Building,
  Shield,
  TrendingUp
} from "lucide-react";

interface Contract {
  id: string;
  contractNumber: string;
  contractOwner: string;
  startDate: string;
  expiryDate: string;
  department: string;
  status: 'active' | 'expiring' | 'expired';
}

const mockContracts: Contract[] = [
  {
    id: '1',
    contractNumber: 'CNT-2024-001',
    contractOwner: 'John Smith',
    startDate: '2024-01-15',
    expiryDate: '2025-01-15',
    department: 'Information Technology',
    status: 'active'
  },
  {
    id: '2',
    contractNumber: 'CNT-2024-002',
    contractOwner: 'Sarah Johnson',
    startDate: '2024-03-01',
    expiryDate: '2024-12-31',
    department: 'Procurement',
    status: 'expiring'
  },
  {
    id: '3',
    contractNumber: 'CNT-2024-003',
    contractOwner: 'Michael Brown',
    startDate: '2023-06-01',
    expiryDate: '2024-06-01',
    department: 'Law',
    status: 'expired'
  },
  {
    id: '4',
    contractNumber: 'CNT-2024-004',
    contractOwner: 'Emily Davis',
    startDate: '2024-02-15',
    expiryDate: '2025-02-15',
    department: 'Finance',
    status: 'active'
  },
];

export default function ProcurementPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newContractNumber, setNewContractNumber] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);

  // Check if contract number exists
  const existingMatches = contracts.filter(c => 
    c.contractNumber.toLowerCase().includes(newContractNumber.toLowerCase()) && newContractNumber.length > 0
  );
  const exactMatch = contracts.some(c => 
    c.contractNumber.toLowerCase() === newContractNumber.toLowerCase()
  );

  // Filter contracts for display
  const filteredContracts = contracts.filter(c =>
    c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contractOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSSO = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsLoggedIn(true);
    }
  };

  const handleAddContract = () => {
    if (!exactMatch && newContractNumber.trim()) {
      const newContract: Contract = {
        id: Date.now().toString(),
        contractNumber: newContractNumber.toUpperCase(),
        contractOwner: 'Pending Assignment',
        startDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        department: 'Pending',
        status: 'active'
      };
      setContracts([newContract, ...contracts]);
      setNewContractNumber("");
      setShowAddForm(false);
    }
  };

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200 shadow-sm font-medium">Active</Badge>;
      case 'expiring':
        return <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200 shadow-sm font-medium">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 border border-rose-200 shadow-sm font-medium">Expired</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-blue-50">
        <Header transparent={false} />
        
        <div className="flex items-center justify-center px-4 py-20">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-32 left-20 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-800/5 rounded-full blur-2xl" />
          </div>
          
          <div className="relative w-full max-w-lg">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-blue-400 to-pink-400 rounded-3xl blur opacity-20"></div>
            
            <div className="relative bg-white/70 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 shadow-2xl">
              <div className="text-center mb-10">
                {/* Enhanced icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 rounded-2xl mx-auto mb-6 shadow-xl">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-pink-700 bg-clip-text text-transparent mb-3">
                  Procurement Portal
                </h1>
                <p className="text-slate-600 text-lg font-medium">Contract Number Management System</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-pink-50 border border-pink-200 rounded-full">
                  <Shield className="w-4 h-4 text-pink-600 mr-2" />
                  <span className="text-sm font-medium text-pink-700">Enterprise Secure Access</span>
                </div>
              </div>

              <form onSubmit={handleSSO} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 bg-white/50 border-slate-200 focus:border-blue-800 focus:ring-blue-800/20 rounded-xl text-lg px-4 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 via-blue-400 to-blue-800 rounded-xl blur opacity-30"></div>
                  <Button 
                    type="submit" 
                    className="relative w-full h-14 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg"
                    disabled={!email.includes('@')}
                  >
                    Continue with SSO
                  </Button>
                </div>

                <p className="text-xs text-center text-slate-500 leading-relaxed">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-blue-50">
      <Header transparent={false} />
      
      {/* Simple Portal Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Procurement Portal</h1>
                <p className="text-pink-200">Contract Management Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{email}</p>
                <p className="text-xs text-pink-200">Procurement Team</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLoggedIn(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Contracts', value: contracts.length, icon: FileText, gradient: 'from-blue-800 to-blue-900', bgGradient: 'from-pink-50 to-pink-100' },
            { label: 'Active Contracts', value: contracts.filter(c => c.status === 'active').length, icon: CheckCircle, gradient: 'from-emerald-500 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100' },
            { label: 'Expiring Soon', value: contracts.filter(c => c.status === 'expiring').length, icon: AlertCircle, gradient: 'from-amber-500 to-orange-500', bgGradient: 'from-amber-50 to-orange-100' },
            { label: 'Expired', value: contracts.filter(c => c.status === 'expired').length, icon: TrendingUp, gradient: 'from-rose-500 to-red-500', bgGradient: 'from-rose-50 to-red-100' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.bgGradient} border border-white/50 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Search and Add Section */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search contracts, owners, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/70 border-slate-200 focus:border-blue-800 focus:ring-blue-800/20 rounded-xl backdrop-blur-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-800 via-pink-400 to-blue-900 rounded-xl blur opacity-30"></div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 hover:from-blue-900 hover:via-blue-800 hover:to-blue-900 text-white font-semibold gap-2 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Add New Contract
              </Button>
            </div>
          </div>

          {/* Enhanced Add Contract Form */}
          {showAddForm && (
            <div className="mt-8 pt-8 border-t border-slate-200/50">
              <div className="bg-gradient-to-br from-pink-50/50 to-blue-50/50 rounded-2xl p-6 border border-pink-200">
                <div className="max-w-lg">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <Hash className="w-4 h-4 inline mr-2 text-blue-800" />
                    Enter New Contract Number
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="e.g., CNT-2024-005"
                        value={newContractNumber}
                        onChange={(e) => setNewContractNumber(e.target.value)}
                        className={`h-12 bg-white/70 border-2 rounded-xl backdrop-blur-sm transition-all ${
                          exactMatch 
                            ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-400/20' 
                            : 'border-slate-200 focus:border-blue-800 focus:ring-blue-800/20'
                        }`}
                      />
                      {exactMatch && (
                        <div className="absolute -bottom-6 left-0">
                          <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3" />
                            This contract number already exists
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-blue-800 rounded-xl blur opacity-30"></div>
                      <Button
                        onClick={handleAddContract}
                        disabled={exactMatch || !newContractNumber.trim()}
                        className="relative bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Add Contract
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced similar contracts preview */}
                  {existingMatches.length > 0 && !exactMatch && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Similar contracts found:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {existingMatches.slice(0, 5).map(c => (
                          <Badge key={c.id} className="bg-white border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors">
                            {c.contractNumber}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Contracts Table */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Contract Registry</h2>
            <p className="text-sm text-slate-600 mt-1">Manage and track all contract numbers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 via-pink-50 to-blue-50">
                <tr>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    <Hash className="w-4 h-4 inline mr-2" /> Contract Number
                  </th>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    <User className="w-4 h-4 inline mr-2" /> Contract Owner
                  </th>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    Department
                  </th>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    <Calendar className="w-4 h-4 inline mr-2" /> Start Date
                  </th>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    <Calendar className="w-4 h-4 inline mr-2" /> Expiry Date
                  </th>
                  <th className="text-left px-6 py-5 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {filteredContracts.map((contract) => (
                  <tr 
                    key={contract.id} 
                    className={`transition-all duration-200 ${
                      contract.status === 'expired' 
                        ? 'bg-red-200/90 hover:bg-red-300/90 border-l-8 border-l-red-600 shadow-lg shadow-red-200/50' 
                        : 'hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-blue-50/50'
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-800" />
                        </div>
                        <span className="font-mono font-semibold text-slate-800">{contract.contractNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-800 font-medium">{contract.contractOwner}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-600">{contract.department}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-600">{contract.startDate}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-slate-600">{contract.expiryDate}</span>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(contract.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredContracts.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No contracts found matching your search</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
