import { useState } from 'react';
import { X, Send, Building2, Mail, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Department } from '@/types';

interface InviteVendorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; companyName: string; department: Department }) => void;
}

const departments: Department[] = [
  'Procurement',
  'Information Technology',
  'Law',
  'Human Resources',
  'Finance',
  'Operations',
  'Marketing',
  'Sales',
];

export function InviteVendorModal({ open, onClose, onSubmit }: InviteVendorModalProps) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && companyName && department) {
      onSubmit({ email, companyName, department: department as Department });
      setEmail('');
      setCompanyName('');
      setDepartment('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Send className="h-5 w-5 text-primary-foreground" />
            </div>
            Invite New Vendor
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Vendor Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="vendor@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Department
            </Label>
            <Select value={department} onValueChange={(value) => setDepartment(value as Department)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
