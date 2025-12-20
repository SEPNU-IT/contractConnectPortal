import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, FileCheck, ArrowRight, Building2, UserCheck, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    icon: Shield,
    title: 'Security First',
    description: 'Background checks, certifications, and medical fitness records all in one place.',
  },
];

const roles = [
  { id: 'admin', label: 'Administrator', icon: Shield, description: 'Full system access and management' },
  { id: 'contract_owner', label: 'Contract Owner', icon: ClipboardCheck, description: 'Manage vendor invitations' },
  { id: 'vendor', label: 'Vendor', icon: UserCheck, description: 'Register and manage personnel' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Navigate to dashboard with selected role
    navigate(`/dashboard?role=${roleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="gradient-hero text-primary-foreground">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-2xl font-bold">CCMG</span>
          </div>
          <Button 
            variant="glass" 
            className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
          >
            Sign In
          </Button>
        </nav>

        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Contract & Vendor{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-300">
                Management Gateway
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
              Streamline your vendor onboarding, personnel management, and document compliance 
              tracking all in one powerful platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30"></div>
      </header>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to manage your entire vendor lifecycle from invitation to compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-xl border-2 border-border bg-card p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section id="roles" className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Select Your Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you want to access the system to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {roles.map((role, index) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={cn(
                  "rounded-xl border-2 bg-card p-8 text-left transition-all duration-300 hover:shadow-xl group animate-scale-in",
                  selectedRole === role.id 
                    ? "border-primary shadow-lg shadow-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "h-14 w-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
                  selectedRole === role.id
                    ? "gradient-primary shadow-md"
                    : "bg-primary/10 group-hover:bg-primary/20"
                )}>
                  <role.icon className={cn(
                    "h-7 w-7 transition-colors",
                    selectedRole === role.id ? "text-primary-foreground" : "text-primary"
                  )} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{role.label}</h3>
                <p className="text-muted-foreground">{role.description}</p>
                <div className={cn(
                  "mt-4 flex items-center text-sm font-medium transition-colors",
                  selectedRole === role.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">CCMG</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Contract & Vendor Management Gateway. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
