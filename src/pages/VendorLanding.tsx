import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ArrowRight, Building2, Users, FileCheck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const features = [
  {
    icon: Building2,
    title: 'Easy Registration',
    description: 'Simple and streamlined vendor registration process with guided workflows.',
  },
  {
    icon: Users,
    title: 'Personnel Management',
    description: 'Manage your team members with complete documentation and credential tracking.',
  },
  {
    icon: FileCheck,
    title: 'Document Upload',
    description: 'Upload and manage all required documents with automated compliance tracking.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your data is protected with enterprise-grade security and encryption.',
  },
];

export default function VendorLanding() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleVendorAccess = () => {
    setIsLoading(true);
    // Navigate to vendor registration/login
    navigate('/vendor/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        <Header transparent={false} />
        
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-foreground">
              Vendor Portal - {' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-300">
                CCMP System
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Welcome to the Contract & Vendor Management Gateway. Register your company and manage 
              your personnel documentation efficiently.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => document.getElementById('vendor-access')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need as a Vendor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Streamlined tools designed specifically for vendor registration, personnel management, and compliance tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 animate-slide-up transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Access Section */}
      <section id="vendor-access" className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vendor Access
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access your vendor portal to register your company and manage your personnel documentation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="group rounded-2xl bg-white p-12 text-center transition-all duration-500 hover:shadow-2xl animate-scale-in transform hover:-translate-y-2 border-2 border-gray-200 hover:border-blue-300">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto">
                <UserCheck className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                Vendor Portal
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Register your company and manage your personnel with complete documentation and credential tracking.
              </p>
              
              <Button
                size="xl"
                onClick={handleVendorAccess}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Access Vendor Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}