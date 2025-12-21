import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ForgetPasswordModal from './ForgetPasswordModal';

interface VendorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  onForgotPassword?: (email: string) => void;
}

export default function VendorLoginModal({ isOpen, onClose, onLogin, onForgotPassword }: VendorLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (email: string) => {
    if (onForgotPassword) {
      onForgotPassword(email);
    }
    setShowForgotPassword(false);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-3xl blur-sm opacity-15"></div>
        
        {/* Modal content */}
        <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl border border-green-500/30 shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-green-800/8 to-green-700/12"></div>
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
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-green-500/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600/30 to-green-700/40 rounded-2xl mb-4 backdrop-blur-sm border border-green-500/30">
                <Shield className="h-8 w-8 text-green-300" />
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
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-300 drop-shadow-sm" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.7)', 
                      borderColor: 'rgba(34, 197, 94, 0.4)',
                      color: 'white'
                    }}
                    className="pl-10 border-green-500/40 text-white placeholder-gray-300 focus:border-green-400/80 focus:ring-green-400/30 backdrop-blur-sm rounded-xl h-12 transition-colors [&:focus]:!bg-gray-900/70"
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-300 drop-shadow-sm" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.7)', 
                      borderColor: 'rgba(34, 197, 94, 0.4)',
                      color: 'white'
                    }}
                    className="pl-10 pr-10 border-green-500/40 text-white placeholder-gray-300 focus:border-green-400/80 focus:ring-green-400/30 backdrop-blur-sm rounded-xl h-12 transition-colors [&:focus]:!bg-gray-900/70"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-300 hover:text-green-200 transition-colors drop-shadow-sm"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Forgot password link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={openForgotPassword}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              
              {/* Login button */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-xl blur-sm opacity-25"></div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-sm border border-green-500/30 transition-all duration-300 group shadow-lg"
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
              <p className="text-gray-400 text-xs">
                Secure access powered by enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Forget Password Modal */}
      <ForgetPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
}