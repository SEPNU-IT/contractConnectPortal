import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ClipboardCheck, ArrowRight, Building2, Users, FileCheck, Settings, BarChart3, Lock, Globe } from 'lucide-react';
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
    features: ['User Management', 'System Settings', 'Contract Owner Management', 'Full Dashboard Access'],
    color: 'wine'
  },
  { 
    id: 'contract_owner', 
    label: 'Contract Owner', 
    icon: ClipboardCheck, 
    description: 'Manage vendor invitations and oversee contract compliance',
    features: ['Vendor Invitations', 'Contract Management', 'Compliance Tracking', 'Vendor Dashboard'],
    color: 'sky'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-sky-50">
      <Header transparent={false} />
      
      {/* Main Container */}
      <div className="container mx-auto px-6 py-12">
        
        {/* Top Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-800 rounded-full mb-8 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-800 via-sky-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Internal Access Portal
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            Secure administrative interface for contract management and vendor oversight
          </p>
          
          {/* Decorative Separator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent max-w-md"></div>
            <div className="mx-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent max-w-md"></div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          
          {/* Left Column - Role Selection */}
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Choose Your Access Level</h2>
            <div className="grid gap-6">
              {internalRoles.map((role, index) => {
                const isWine = role.color === 'wine';
                return (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`group cursor-pointer relative overflow-hidden rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                      selectedRole === role.id 
                        ? 'border-rose-400 shadow-xl scale-[1.02]' 
                        : 'border-transparent hover:border-pink-200'
                    } ${
                      isWine 
                        ? 'bg-gradient-to-r from-rose-100 via-pink-50 to-rose-50 text-slate-800' 
                        : 'bg-gradient-to-r from-sky-100 via-sky-50 to-pink-100 text-slate-800'
                    }`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                      }}></div>
                    </div>
                    
                    <div className="relative flex items-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:scale-110 transition-transform ${
                        isWine 
                          ? 'bg-gradient-to-br from-rose-500 to-rose-600' 
                          : 'bg-gradient-to-br from-rose-500 to-rose-600'
                      }`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 ${isWine ? 'text-slate-800' : 'text-slate-800'}`}>
                          {role.label}
                        </h3>
                        <p className={`mb-4 leading-relaxed ${isWine ? 'text-slate-600' : 'text-slate-600'}`}>
                          {role.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-3 ${
                                isWine ? 'bg-rose-500' : 'bg-rose-500'
                              }`}></div>
                              <span className={`text-sm ${isWine ? 'text-slate-600' : 'text-slate-600'}`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <ArrowRight className={`h-8 w-8 group-hover:translate-x-2 transition-transform ${
                          isWine ? 'text-rose-600' : 'text-rose-600'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Column - Features & Stats */}
          <div className="col-span-12 lg:col-span-4">
            
            {/* Quick Features */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-sky-600" />
                System Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.title} className="flex items-start p-3 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 hover:from-sky-50 hover:to-rose-50 transition-all duration-300 group cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-rose-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{feature.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{feature.description.split(' ').slice(0, 6).join(' ')}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Statistics */}
            <div className="bg-gradient-to-br from-sky-100 to-pink-100 rounded-2xl p-6 border border-sky-200/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-rose-600" />
                System Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Active Contracts', value: '247', color: 'from-rose-400 to-rose-500' },
                  { label: 'Total Vendors', value: '89', color: 'from-sky-400 to-sky-500' },
                  { label: 'Pending Reviews', value: '12', color: 'from-pink-400 to-pink-500' },
                  { label: 'Uptime', value: '99.9%', color: 'from-rose-500 to-sky-500' }
                ].map((stat, idx) => (
                  <div key={stat.label} className="text-center">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md`}>
                      <span className="text-white font-bold text-sm">{stat.value.charAt(0)}</span>
                    </div>
                    <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Security Notice */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-rose-600 mr-2" />
            <span className="text-slate-800 font-semibold">Secure Environment Active</span>
          </div>
          <p className="text-slate-600 text-sm">
            All activities are monitored and logged for security compliance
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}