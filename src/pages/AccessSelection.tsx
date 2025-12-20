import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ArrowRight, 
  ExternalLink, 
  Shield, 
  CheckCircle,
  Globe,
  Lock,
  Star,
  ChevronDown,
  Clock,
  HeadphonesIcon,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorLoginModal from '@/components/auth/VendorLoginModal';
import InternalAuthModal from '@/components/InternalAuthModal';

export default function AccessSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isInternalAuthModalOpen, setIsInternalAuthModalOpen] = useState(false);

  // Check if user came from a specific access type
  useEffect(() => {
    const accessType = searchParams.get('type');
    if (accessType === 'internal' || accessType === 'external') {
      setSelectedAccess(accessType);
    }
  }, [searchParams]);

  const handleAccessSelect = (accessType: 'internal' | 'external') => {
    setSelectedAccess(accessType);
    
    if (accessType === 'internal') {
      // Show internal authentication modal
      setIsInternalAuthModalOpen(true);
    } else {
      // Show login modal for vendor access
      setIsLoginModalOpen(true);
    }
  };

  const handleVendorLogin = (username: string, password: string) => {
    // Here you would typically validate credentials
    console.log('Vendor login attempt:', { username, password });
    
    // For now, just navigate to vendor portal
    setIsLoginModalOpen(false);
    navigate('/vendor');
  };

  const handleInternalAuth = (email: string) => {
    // Here you would typically validate the email
    console.log('Internal auth attempt:', { email });
    
    // Close modal and navigate to internal portal
    setIsInternalAuthModalOpen(false);
    navigate('/internal');
  };

  const scrollToSelection = () => {
    document.getElementById('access-selection')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Sophisticated Background Pattern */}
      <div className="fixed inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.8' fill-rule='evenodd'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/background.jpeg)',
            opacity: 0.15
          }}
        ></div>
        {/* Elegant overlay pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
          }}></div>
        </div>
        
        {/* Curved Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large curved shape - top right */}
          <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path
                d="M200,50 Q300,100 350,200 Q300,300 200,350 Q100,300 50,200 Q100,100 200,50 Z"
                fill="url(#gradient1)"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Full-width flowing lines */}
          <div className="absolute inset-0 w-full h-full opacity-[0.3]">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {/* Full screen spanning lines */}
              <path d="M0,30 Q25,25 50,30 Q75,35 100,30" stroke="#10b981" strokeWidth="0.1" fill="none" opacity="0.02" className="animate-pulse" />
              <path d="M0,45 Q30,40 60,45 Q90,50 100,45" stroke="#3b82f6" strokeWidth="0.08" fill="none" opacity="0.015" className="animate-pulse" style={{animationDelay: '1s'}} />
              <path d="M0,60 Q20,55 40,60 Q80,65 100,60" stroke="#06b6d4" strokeWidth="0.06" fill="none" opacity="0.01" className="animate-pulse" style={{animationDelay: '2s'}} />
              
              {/* Subtle vertical connections */}
              <path d="M25,0 Q27,50 25,100" stroke="#10b981" strokeWidth="0.05" fill="none" opacity="0.008" />
              <path d="M75,0 Q73,50 75,100" stroke="#3b82f6" strokeWidth="0.05" fill="none" opacity="0.008" />
              
              {/* Single diagonal accent */}
              <path d="M0,20 Q50,60 100,80" stroke="#8b5cf6" strokeWidth="0.02" fill="none" opacity="0.005" />
            </svg>
          </div>
          
          {/* Additional geometric elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-[0.5]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 95,35 95,65 50,95 5,65 5,35" fill="none" stroke="#10b981" strokeWidth="1" className="animate-spin" style={{animationDuration: '25s'}} />
              <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill="none" stroke="#3b82f6" strokeWidth="0.5" className="animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}} />
            </svg>
          </div>
          
          <div className="absolute top-3/4 right-1/3 w-24 h-24 opacity-[0.5]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="#06b6d4" strokeWidth="1" transform="rotate(45 50 50)" className="animate-pulse" />
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="#8b5cf6" strokeWidth="0.5" transform="rotate(45 50 50)" className="animate-pulse" style={{animationDelay: '1s'}} />
            </svg>
          </div>
          
          {/* Small curved shape - bottom left with more complexity */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 opacity-[0.8]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gradient2)" strokeWidth="2" className="animate-spin" style={{animationDuration: '30s'}} />
              <circle cx="100" cy="100" r="70" fill="none" stroke="url(#gradient2)" strokeWidth="1.5" className="animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}} />
              <circle cx="100" cy="100" r="50" fill="none" stroke="url(#gradient2)" strokeWidth="1" className="animate-spin" style={{animationDuration: '20s'}} />
              <circle cx="100" cy="100" r="30" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" className="animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Additional scattered elements */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16 opacity-[0.3]">
            <svg viewBox="0 0 50 50" className="w-full h-full animate-bounce" style={{animationDuration: '4s'}}>
              <circle cx="25" cy="25" r="20" fill="#10b981" opacity="0.3" />
              <circle cx="25" cy="25" r="10" fill="#3b82f6" opacity="0.5" />
            </svg>
          </div>
          
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 opacity-[0.3]">
            <svg viewBox="0 0 60 60" className="w-full h-full animate-pulse" style={{animationDelay: '2s'}}>
              <path d="M30,10 L50,30 L30,50 L10,30 Z" fill="none" stroke="#f59e0b" strokeWidth="1" />
              <path d="M30,20 L40,30 L30,40 L20,30 Z" fill="#ef4444" opacity="0.3" />
            </svg>
          </div>
          
          {/* Network connection lines */}
          <div className="absolute inset-0 opacity-[0.2]">
            <svg viewBox="0 0 1200 800" className="w-full h-full">
              <g stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.5">
                <line x1="100" y1="100" x2="300" y2="200" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                <line x1="300" y1="200" x2="500" y2="150" className="animate-pulse" style={{animationDelay: '1s'}} />
                <line x1="500" y1="150" x2="700" y2="250" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                <line x1="200" y1="300" x2="400" y2="400" className="animate-pulse" style={{animationDelay: '2s'}} />
                <line x1="600" y1="300" x2="800" y2="350" className="animate-pulse" style={{animationDelay: '2.5s'}} />
                <line x1="150" y1="500" x2="350" y2="600" className="animate-pulse" style={{animationDelay: '3s'}} />
                <line x1="750" y1="500" x2="950" y2="550" className="animate-pulse" style={{animationDelay: '3.5s'}} />
              </g>
            </svg>
          </div>
        </div>
        
        <Header transparent={false} />
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-32">
          <div className="text-center max-w-6xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in shadow-lg">
              <Shield className="h-5 w-5 text-emerald-400 mr-3" />
              <span className="text-white font-medium text-sm tracking-wide">ENTERPRISE SECURITY</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <span className="text-white">Vendor Contract</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Management Portal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in font-light" style={{animationDelay: '0.4s'}}>
              Streamline vendor onboarding and document management through secure contract-based workflows with automated compliance tracking.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-12 mb-16 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="font-medium">Compliance Ready</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Star className="h-5 w-5 text-cyan-400" />
                <span className="font-medium">AI-Powered Analytics</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative inline-block animate-fade-in" style={{animationDelay: '0.8s'}}>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              
              <Button 
                onClick={scrollToSelection}
                size="xl"
                className="relative bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-600/20 backdrop-blur-xl hover:from-blue-400/30 hover:via-cyan-400/30 hover:to-blue-500/30 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 px-16 py-8 group rounded-3xl border border-blue-300/30 hover:border-cyan-300/50 font-semibold text-lg overflow-hidden"
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-cyan-400/10 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative flex items-center gap-4">
                  <Zap className="h-6 w-6 text-blue-300 group-hover:text-cyan-300 transition-all duration-300 group-hover:rotate-12" />
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent font-bold tracking-wide">
                    Explore Portals
                  </span>
                  <ArrowRight className="h-6 w-6 text-blue-300 group-hover:text-cyan-300 group-hover:translate-x-2 transition-all duration-300" />
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Section Separator */}
      <div className="relative">
        <svg
          className="absolute top-0 w-full h-24 text-gray-50 transform rotate-180"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Access Selection Section */}
      <section id="access-selection" className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/background.jpeg)',
            opacity: 0.15
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 to-white/95"></div>
        
        {/* Decorative rounded elements */}
        <div className="absolute top-8 right-8 w-40 h-40 bg-gradient-to-br from-blue-200/30 via-green-200/20 to-rose-200/25 rounded-full blur-sm opacity-60 animate-pulse"></div>
        <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-br from-green-300/25 via-blue-300/20 to-rose-300/30 rounded-full blur-xs opacity-40"></div>
        
        <div className="absolute bottom-8 left-8 w-48 h-48 bg-gradient-to-tr from-rose-200/25 via-blue-200/20 to-green-200/30 rounded-full blur-sm opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-16 w-28 h-28 bg-gradient-to-tr from-blue-300/30 via-rose-300/20 to-green-300/25 rounded-full blur-xs opacity-35"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            {/* Enhanced Badge */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-green-400 to-rose-400 rounded-full blur opacity-20"></div>
              <div className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-50 via-green-50 to-rose-50 border border-blue-200/50 shadow-lg backdrop-blur-sm">
                <div className="relative">
                  <Lock className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="bg-gradient-to-r from-blue-600 via-green-600 to-rose-500 bg-clip-text text-transparent font-bold text-sm tracking-wider">
                  SECURE ACCESS PORTALS
                </span>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <div className="relative mb-6">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-green-700 bg-clip-text text-transparent">
                  Choose Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-rose-500 bg-clip-text text-transparent">
                  Portal Gateway
                </span>
              </h2>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Description */}
            <div className="relative">
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                <span className="bg-gradient-to-r from-gray-600 via-slate-700 to-gray-600 bg-clip-text text-transparent font-medium">
                  Access the portal that matches your role in the&nbsp;
                </span>
                <span className="bg-gradient-to-r from-blue-600 via-green-600 to-rose-500 bg-clip-text text-transparent font-semibold">
                vendor contract management workflow
                </span>
                <span className="bg-gradient-to-r from-gray-600 via-slate-700 to-gray-600 bg-clip-text text-transparent font-medium">
                  .
                </span>
              </p>
              
              {/* Subtle underline decoration */}
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-rose-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Access Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Internal Access Card */}
            <div 
              className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                selectedAccess === 'internal' 
                  ? 'ring-2 ring-blue-500 ring-opacity-50 border-blue-300' 
                  : 'hover:border-blue-200'
              }`}
              onClick={() => handleAccessSelect('internal')}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                  selectedAccess === 'internal' 
                    ? 'bg-blue-100 shadow-lg' 
                    : 'bg-gray-100 group-hover:bg-blue-50 group-hover:shadow-md'
                }`}>
                  <Building2 className={`h-8 w-8 transition-colors duration-300 ${
                    selectedAccess === 'internal' 
                      ? 'text-blue-600' 
                      : 'text-gray-600 group-hover:text-blue-600'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Internal Portal
                </h3>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  For procurement teams and administrators to register contract numbers, assign contract owners, and manage vendor onboarding workflows.
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    'Contract Registration',
                    'Vendor Assignment', 
                    'Document Tracking',
                    'Expiry Notifications'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className={`flex items-center font-semibold transition-colors duration-300 ${
                  selectedAccess === 'internal' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  <span>Access Internal Portal</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* External Access Card */}
            <div 
              className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                selectedAccess === 'external' 
                  ? 'ring-2 ring-emerald-500 ring-opacity-50 border-emerald-300' 
                  : 'hover:border-emerald-200'
              }`}
              onClick={() => handleAccessSelect('external')}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 ${
                  selectedAccess === 'external' 
                    ? 'bg-emerald-100 shadow-lg' 
                    : 'bg-gray-100 group-hover:bg-emerald-50 group-hover:shadow-md'
                }`}>
                  <Users className={`h-8 w-8 transition-colors duration-300 ${
                    selectedAccess === 'external' 
                      ? 'text-emerald-600' 
                      : 'text-gray-600 group-hover:text-emerald-600'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Vendor Portal
                </h3>
                
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Secure time-limited access for vendors to complete documentation and onboard personnel using their assigned contract numbers.
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    'Contract Number Mapping',
                    'Document Submission', 
                    'Personnel Onboarding',
                    'Secure Link Access'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className={`flex items-center font-semibold transition-colors duration-300 ${
                  selectedAccess === 'external' 
                    ? 'text-emerald-600' 
                    : 'text-gray-500 group-hover:text-emerald-600'
                }`}>
                  <span>Access Vendor Portal</span>
                  <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <span className="text-gray-600 mr-2">Need assistance?</span>
              <a href="mailto:support@seplatenergy.com" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/background.jpeg)',
            opacity: 0.25
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-white/85 to-gray-50/80"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Contract Management Excellence</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamlined vendor onboarding with automated document tracking, compliance monitoring, and secure time-limited access workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "99.9%", label: "Uptime", icon: Clock, gradient: "from-blue-500 to-blue-600" },
              { metric: "256-bit", label: "Encryption", icon: Shield, gradient: "from-emerald-500 to-emerald-600" },
              { metric: "24/7", label: "Support", icon: HeadphonesIcon, gradient: "from-purple-500 to-purple-600" },
              { metric: "ISO 27001", label: "Certified", icon: Award, gradient: "from-orange-500 to-orange-600" }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="font-bold text-3xl text-gray-900 mb-2">{item.metric}</div>
                <div className="text-sm text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Vendor Login Modal */}
      <VendorLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleVendorLogin}
      />
      
      {/* Internal Auth Modal */}
      <InternalAuthModal 
        isOpen={isInternalAuthModalOpen}
        onClose={() => setIsInternalAuthModalOpen(false)}
        onAuthenticate={handleInternalAuth}
      />
    </div>
  );
}