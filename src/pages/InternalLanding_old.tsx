import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ClipboardCheck, ArrowRight, Building2, Users, FileCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const features = [
  {
    icon: Building2,
    title: 'Vendor Management',
    description: 'Streamline vendor onboarding with automated invitations and registration workflows.',
  },
  {
    icon: Users,
    title: 'Personnel Tracking',
    description: 'Manage vendor personnel with complete documentation and credential tracking.',
  },
  {
    icon: FileCheck,
    title: 'Document Compliance',
    description: 'Track document expiry dates and ensure all credentials remain valid and up-to-date.',
  },
  {
    icon: Settings,
    title: 'System Administration',
    description: 'Complete system control with user management, settings, and configuration options.',
  },
];

const internalRoles = [
  { 
    id: 'admin', 
    label: 'Administrator', 
    icon: Shield, 
    description: 'Full system access and management including user administration',
    features: ['User Management', 'System Settings', 'Contract Owner Management', 'Full Dashboard Access']
  },
  { 
    id: 'contract_owner', 
    label: 'Contract Owner', 
    icon: ClipboardCheck, 
    description: 'Manage vendor invitations and oversee contract compliance',
    features: ['Vendor Invitations', 'Contract Management', 'Compliance Tracking', 'Vendor Dashboard']
  },
];

export default function InternalLanding() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Navigate to internal authentication
    navigate(`/internal/auth?role=${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl" />
      </div>
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 overflow-hidden">
        {/* Hero background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <Header transparent={false} />
        
        
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-sky-200/50 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-700 via-sky-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Contract Management System
                  </h1>
                  <p className="text-slate-600 text-lg">Secure administrative dashboard for internal operations</p>
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-rose-400 via-sky-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-xl">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Role Selection Cards */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {internalRoles.map((role, index) => {
              const bgColors = [
                'from-rose-500 to-rose-600',
                'from-sky-500 to-sky-600'
              ];
              const lightColors = [
                'from-rose-50 to-pink-50',
                'from-sky-50 to-cyan-50'
              ];
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`group cursor-pointer bg-gradient-to-br ${lightColors[index]} rounded-3xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    selectedRole === role.id 
                      ? 'border-rose-400 shadow-xl' 
                      : 'border-sky-200/50 hover:border-pink-300'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${bgColors[index]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{role.label}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{role.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-slate-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${bgColors[index]} rounded-full mr-3`}></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-slate-700 font-semibold group-hover:text-rose-600 transition-colors">
                    <span>Access Portal</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}