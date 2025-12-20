import { useState } from 'react';
import { X, Mail, Shield, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InternalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (email: string) => void;
}

export default function InternalAuthModal({ isOpen, onClose, onAuthenticate }: InternalAuthModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onAuthenticate(email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Glassy Modal Container */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='45' cy='45' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Header Section */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500/80 to-sky-500/80 rounded-2xl mb-6 shadow-lg backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Internal Access</h2>
            <p className="text-white/80 text-sm">Enter your administrative email to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/90 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-transparent backdrop-blur-sm"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 via-sky-500/10 to-pink-500/10 pointer-events-none"></div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-sky-600 hover:from-rose-700 hover:via-rose-600 hover:to-sky-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 relative">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-400 to-sky-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90 mb-1">Secure Access</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Your session will be encrypted and monitored for security compliance. Only authorized personnel may access this portal.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-sky-500/30 to-rose-500/30 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}