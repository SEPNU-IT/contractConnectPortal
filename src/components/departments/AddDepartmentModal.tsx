import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, MapPin } from 'lucide-react';
import type { Department } from '@/types';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (department: {
    name: string;
    description: string;
    location: string;
    isActive: boolean;
  }) => Promise<boolean>;
  isLoading: boolean;
}



const officeLocations = [
  'Lagos Office - Floor 1',
  'Lagos Office - Floor 2',
  'Lagos Office - Floor 3',
  'Lagos Office - Floor 4',
  'Lagos Office - Floor 5',
  'Lagos Office - Floor 6',
  'Lagos Office - Floor 7',
  'Lagos Office - Floor 8',
  'Abuja Office - Floor 1',
  'Abuja Office - Floor 2',
  'Port Harcourt Office',
  'Warri Office',
  'Remote/Distributed',
];

export function AddDepartmentModal({ isOpen, onClose, onAdd, isLoading }: AddDepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Department name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await onAdd({
      name: formData.name,
      description: formData.description,
      location: formData.location,
      isActive: formData.isActive,
    });

    if (success) {
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      isActive: true,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            Add New Department
          </DialogTitle>
          <DialogDescription>
            Create a new department with all necessary information. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Department Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              Department Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter department name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Department Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the department's role and responsibilities..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`min-h-[80px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-600" />
              Office Location *
            </Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select office location" />
              </SelectTrigger>
              <SelectContent>
                {officeLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Department Status</Label>
            <Select 
              value={formData.isActive.toString()} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, isActive: value === 'true' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {isLoading ? 'Adding Department...' : 'Add Department'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}