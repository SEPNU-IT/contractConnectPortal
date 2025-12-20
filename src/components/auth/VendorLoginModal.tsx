import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VendorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export default function VendorLoginModal({ isOpen, onClose, onLogin }: VendorLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-green-400 to-rose-400 rounded-3xl blur opacity-20 animate-pulse"></div>
        
        {/* Modal content */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-rose-500/5"></div>
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          {/* Close button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm z-10 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl mb-4 backdrop-blur-sm border border-white/10">
                <Shield className="h-8 w-8 text-white" />
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                Vendor Portal Access
              </h2>
              <p className="text-white/70 text-sm">
                Enter your credentials to access the vendor portal
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/90 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-800" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20 backdrop-blur-sm rounded-xl h-12"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-800" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20 backdrop-blur-sm rounded-xl h-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Forgot password link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              
              {/* Login button */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-green-400 to-rose-400 rounded-xl blur opacity-30"></div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-blue-500/80 via-green-500/80 to-blue-600/80 hover:from-blue-400/90 hover:via-green-400/90 hover:to-blue-500/90 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Access Portal</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/50 text-xs">
                Secure access powered by enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}