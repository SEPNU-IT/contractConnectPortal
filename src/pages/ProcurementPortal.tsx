import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Building, Shield } from "lucide-react";

export default function ProcurementPortal() {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");

  const handleSSO = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      // Navigate to dashboard with email parameter
      navigate(`/procurement/dashboard?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-blue-50">
      <Header transparent={false} />
      
      <div className="flex items-center justify-center px-4 pt-28 pb-20">
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
