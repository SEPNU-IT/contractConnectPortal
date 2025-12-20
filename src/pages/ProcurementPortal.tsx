import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Hash,
  LogOut,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Contract {
  id: string;
  contractNumber: string;
  contractOwner: string;
  startDate: string;
  expiryDate: string;
  department: string;
  status: 'active' | 'expiring' | 'expired';
  value: string;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    contractNumber: 'CNT-2024-001',
    contractOwner: 'John Smith',
    startDate: '2024-01-15',
    expiryDate: '2025-01-15',
    department: 'Information Technology',
    status: 'active',
    value: '$250,000'
  },
  {
    id: '2',
    contractNumber: 'CNT-2024-002',
    contractOwner: 'Sarah Johnson',
    startDate: '2024-03-01',
    expiryDate: '2024-12-31',
    department: 'Procurement',
    status: 'expiring',
    value: '$180,000'
  },
  {
    id: '3',
    contractNumber: 'CNT-2024-003',
    contractOwner: 'Michael Brown',
    startDate: '2023-06-01',
    expiryDate: '2024-06-01',
    department: 'Law',
    status: 'expired',
    value: '$95,000'
  },
  {
    id: '4',
    contractNumber: 'CNT-2024-004',
    contractOwner: 'Emily Davis',
    startDate: '2024-02-15',
    expiryDate: '2025-02-15',
    department: 'Finance',
    status: 'active',
    value: '$320,000'
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
        status: 'active',
        value: 'TBD'
      };
      setContracts([newContract, ...contracts]);
      setNewContractNumber("");
      setShowAddForm(false);
    }
  };

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case 'expiring':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Expired</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Procurement Portal</h1>
              <p className="text-muted-foreground text-sm">Contract Number Management System</p>
            </div>

            <form onSubmit={handleSSO} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Work Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={!email.includes('@')}
              >
                Continue with SSO
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Procurement Portal</h1>
              <p className="text-xs text-muted-foreground">Contract Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{email}</p>
              <p className="text-xs text-muted-foreground">Procurement Team</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLoggedIn(false)}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Contracts', value: contracts.length, icon: FileText, color: 'primary' },
            { label: 'Active', value: contracts.filter(c => c.status === 'active').length, icon: CheckCircle, color: 'primary' },
            { label: 'Expiring Soon', value: contracts.filter(c => c.status === 'expiring').length, icon: AlertCircle, color: 'warning' },
            { label: 'Expired', value: contracts.filter(c => c.status === 'expired').length, icon: AlertCircle, color: 'destructive' },
          ].map((stat, i) => (
            <div key={i} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Add Section */}
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search contracts, owners, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border/50"
              />
            </div>

            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Contract
            </Button>
          </div>

          {/* Add Contract Form */}
          {showAddForm && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="max-w-lg">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
                  Enter New Contract Number
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="e.g., CNT-2024-005"
                      value={newContractNumber}
                      onChange={(e) => setNewContractNumber(e.target.value)}
                      className={`h-11 bg-background/50 ${exactMatch ? 'border-destructive focus:border-destructive' : 'border-border/50'}`}
                    />
                    {exactMatch && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        This contract number already exists
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleAddContract}
                    disabled={exactMatch || !newContractNumber.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Contract
                  </Button>
                </div>

                {/* Similar contracts preview */}
                {existingMatches.length > 0 && !exactMatch && (
                  <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <p className="text-xs font-medium text-warning mb-2">Similar contracts found:</p>
                    <div className="flex flex-wrap gap-2">
                      {existingMatches.slice(0, 5).map(c => (
                        <Badge key={c.id} variant="outline" className="text-xs">
                          {c.contractNumber}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contracts Table */}
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">Contract Registry</h2>
            <p className="text-sm text-muted-foreground">Manage and track all contract numbers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Hash className="w-3 h-3 inline mr-1" /> Contract Number
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <User className="w-3 h-3 inline mr-1" /> Contract Owner
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Department
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="w-3 h-3 inline mr-1" /> Start Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="w-3 h-3 inline mr-1" /> Expiry Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-primary">{contract.contractNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground">{contract.contractOwner}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">{contract.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">{contract.startDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">{contract.expiryDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{contract.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(contract.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredContracts.length === 0 && (
              <div className="px-6 py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No contracts found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
