import { useState } from 'react';
import { UserPlus, User, Mail, Phone, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddPersonnelModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
  }) => void;
}

export function AddPersonnelModal({ open, onClose, onSubmit }: AddPersonnelModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', position: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-primary-foreground" />
            </div>
            Add New Personnel
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Position/Role
            </Label>
            <Input
              id="position"
              placeholder="Software Engineer"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Personnel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
