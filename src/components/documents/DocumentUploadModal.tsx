import { useState } from 'react';
import { Upload, FileText, Calendar, Shield, Heart, Award, GraduationCap } from 'lucide-react';
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
import type { DocumentType } from '@/types';

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  personnelName: string;
  onSubmit: (data: {
    type: DocumentType;
    file: File | null;
    expiryDate: string;
  }) => void;
}

const documentTypes: { value: DocumentType; label: string; icon: React.ElementType }[] = [
  { value: 'security_background_check', label: 'Security Background Check', icon: Shield },
  { value: 'medical_fitness', label: 'Medical Fitness Certificate', icon: Heart },
  { value: 'professional_certification', label: 'Professional Certification', icon: Award },
  { value: 'school_credentials', label: 'School Credentials', icon: GraduationCap },
];

export function DocumentUploadModal({ open, onClose, personnelName, onSubmit }: DocumentUploadModalProps) {
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [expiryDate, setExpiryDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentType && expiryDate) {
      onSubmit({
        type: documentType as DocumentType,
        file,
        expiryDate,
      });
      setDocumentType('');
      setExpiryDate('');
      setFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </div>
            Upload Document
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            For: <span className="font-medium text-foreground">{personnelName}</span>
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="documentType" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Document Type
            </Label>
            <Select value={documentType} onValueChange={(value) => setDocumentType(value as DocumentType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium">
              Document File
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                id="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="file" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                {file ? (
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground">Click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG, PNG</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Documents will be tracked for expiry alerts
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
