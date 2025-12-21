import React, { useState } from 'react';
import { X, Mail, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function ForgetPasswordModal({ isOpen, onClose, onSubmit }: ForgetPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email validation function
  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailValue.trim()) {
      setEmailError('Email address is required');
      return false;
    }
    
    if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    if (emailValue.length > 254) {
      setEmailError('Email address is too long');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError && value.trim()) {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(email);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto close after success message
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setEmailError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
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
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-green-500/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative p-8">
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600/30 to-green-700/40 rounded-2xl mb-4 backdrop-blur-sm border border-green-500/30">
                    <Shield className="h-8 w-8 text-green-300" />
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Reset Password
                  </h2>
                  <p className="text-white/70 text-sm">
                    Enter your email address and we'll send you a secure link to reset your password
                  </p>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-300 drop-shadow-sm" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => email && validateEmail(email)}
                        style={{ 
                          backgroundColor: 'rgba(17, 24, 39, 0.7)', 
                          borderColor: emailError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.4)',
                          color: 'white'
                        }}
                        className={`pl-10 text-white placeholder-gray-300 focus:ring-green-400/30 backdrop-blur-sm rounded-xl h-12 transition-colors ${
                          emailError ? 'focus:border-red-400/70' : 'focus:border-green-400/80'
                        }`}
                        placeholder="Enter your email address"
                        autoComplete="email"
                      />
                    </div>
                    
                    {/* Email validation error */}
                    {emailError && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit button */}
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-xl blur-sm opacity-25"></div>
                    <Button
                      type="submit"
                      disabled={isLoading || !!emailError}
                      className="relative w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-500 hover:via-green-600 hover:to-green-700 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-sm border border-green-500/30 transition-all duration-300 group shadow-lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending Reset Link...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span>Send Reset Link</span>
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
                
                {/* Back to login link */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600/30 to-green-700/40 rounded-2xl mb-4 backdrop-blur-sm border border-green-500/30">
                  <CheckCircle className="h-8 w-8 text-green-300" />
                </div>
                
                {/* Success Message */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  Check Your Email
                </h2>
                <p className="text-white/70 text-sm mb-4">
                  We've sent a password reset link to
                </p>
                <p className="text-green-300 font-medium mb-6">
                  {email}
                </p>
                <p className="text-white/60 text-xs">
                  If you don't see the email, check your spam folder or contact support
                </p>
              </div>
            )}
            
            {/* Footer */}
            {!isSuccess && (
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-xs">
                  Reset link expires in 15 minutes for security
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}