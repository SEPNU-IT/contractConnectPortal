import React, { useState } from 'react';
import { X, Mail, Search, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AddContractOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string) => Promise<boolean>;
  isLoading?: boolean;
}

export default function AddContractOwnerModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false
}: AddContractOwnerModalProps) {
  const [email, setEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const seplatEmailRegex = /^[^\s@]+@seplatenergy\.com$/;

  // Reset form when modal closes
  const handleClose = () => {
    setEmail('');
    setValidationMessage('');
    setValidationStatus('idle');
    setIsValidating(false);
    onClose();
  };

  // Validate email format and domain
  const validateEmail = (emailValue: string) => {
    if (!emailValue.trim()) {
      setValidationMessage('');
      setValidationStatus('idle');
      return;
    }

    if (!emailRegex.test(emailValue)) {
      setValidationMessage('Please enter a valid email address');
      setValidationStatus('invalid');
      return;
    }

    if (!seplatEmailRegex.test(emailValue)) {
      setValidationMessage('Email must be from seplatenergy.com domain');
      setValidationStatus('invalid');
      return;
    }

    setValidationMessage('Email format is valid');
    setValidationStatus('valid');
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validationStatus !== 'valid' || !email.trim()) {
      return;
    }

    setIsValidating(true);
    
    try {
      const success = await onAdd(email.trim().toLowerCase());
      if (success) {
        handleClose();
      }
    } catch (error) {
      console.error('Error adding contract owner:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const isFormValid = validationStatus === 'valid' && email.trim();
  const isProcessing = isLoading || isValidating;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Mail className="w-5 h-5 text-red-600" />
            Add Contract Owner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Information Alert */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Enter the email address of the user you want to add as a contract owner. 
              The system will automatically fetch their details from Active Directory.
            </AlertDescription>
          </Alert>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="user@seplatenergy.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 ${
                    validationStatus === 'valid' ? 'border-green-300 focus:border-green-500' :
                    validationStatus === 'invalid' ? 'border-red-300 focus:border-red-500' : ''
                  }`}
                  disabled={isProcessing}
                  autoComplete="email"
                />
                {validationStatus === 'valid' && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                )}
              </div>
              
              {/* Validation Message */}
              {validationMessage && (
                <p className={`text-sm ${
                  validationStatus === 'valid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validationMessage}
                </p>
              )}
            </div>

            {/* Email Domain Information */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Email Requirements:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Must be a valid email address
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  Must belong to @seplatenergy.com domain
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  User must exist in Active Directory
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isProcessing}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isValidating ? 'Validating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Add Contract Owner
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Processing Information */}
          {isProcessing && (
            <Alert className="border-amber-200 bg-amber-50">
              <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
              <AlertDescription className="text-amber-800">
                {isValidating 
                  ? 'Checking user details in Active Directory...' 
                  : 'Adding contract owner to the system...'
                }
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}