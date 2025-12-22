import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, AlertTriangle, ArrowLeft, Home, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccessDeniedProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  requiredRole?: string;
  attemptedPage?: string;
}

export default function AccessDenied({ 
  isOpen, 
  onClose, 
  userRole = 'unknown', 
  requiredRole = 'authorized', 
  attemptedPage = 'this page' 
}: AccessDeniedProps) {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleGoHome = () => {
    handleClose();
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    handleClose();
    window.history.back();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-lg transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Glassy Modal Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-red-200/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='45' cy='45' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Header Section */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/80 to-red-600/80 rounded-full mb-6 shadow-lg backdrop-blur-sm">
              <AlertTriangle className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Access Denied</h2>
            <p className="text-white/80 text-lg">Insufficient Permissions</p>
          </div>

          {/* Content Section */}
          <div className="space-y-6 relative">
            {/* Error Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-red-200/30">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">Restricted Area</h4>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    You don't have permission to access <span className="font-medium text-white">{attemptedPage}</span>.
                  </p>
                  
                  {/* Role Information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Your Role:</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-white font-medium capitalize">
                        {userRole.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Required Role:</span>
                      <span className="px-3 py-1 bg-red-500/30 rounded-full text-white font-medium capitalize">
                        {requiredRole.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white/90 mb-1">Need Access?</h5>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Contact your system administrator to request additional permissions or role changes.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Button
                onClick={handleGoHome}
                className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg border border-white/20"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-600/20 to-orange-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}