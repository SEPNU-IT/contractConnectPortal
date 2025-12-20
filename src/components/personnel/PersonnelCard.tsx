import { User, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Personnel, Document } from '@/types';

interface PersonnelCardProps {
  personnel: Personnel;
  onViewDocuments: (personnelId: string) => void;
}

const getDocumentStatusCounts = (documents: Document[]) => {
  return {
    valid: documents.filter(d => d.status === 'valid').length,
    expiring: documents.filter(d => d.status === 'expiring').length,
    expired: documents.filter(d => d.status === 'expired').length,
  };
};

export function PersonnelCard({ personnel, onViewDocuments }: PersonnelCardProps) {
  const statusCounts = getDocumentStatusCounts(personnel.documents);
  const hasIssues = statusCounts.expired > 0 || statusCounts.expiring > 0;

  return (
    <div 
      className={cn(
        "rounded-xl border-2 bg-card p-5 transition-all duration-200 hover:shadow-lg animate-scale-in",
        hasIssues ? "border-warning/30" : "border-border"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {personnel.firstName} {personnel.lastName}
            </h4>
            <p className="text-sm text-muted-foreground">{personnel.position}</p>
          </div>
        </div>
        {hasIssues && (
          <AlertCircle className="h-5 w-5 text-warning" />
        )}
      </div>

      <div className="space-y-3 mb-4">
        <p className="text-sm text-muted-foreground">{personnel.email}</p>
        <p className="text-sm text-muted-foreground">{personnel.phone}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Documents:</span>
        <div className="flex gap-1">
          {statusCounts.valid > 0 && (
            <Badge variant="active" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              {statusCounts.valid} Valid
            </Badge>
          )}
          {statusCounts.expiring > 0 && (
            <Badge variant="expiring" className="text-xs">
              {statusCounts.expiring} Expiring
            </Badge>
          )}
          {statusCounts.expired > 0 && (
            <Badge variant="expired" className="text-xs">
              {statusCounts.expired} Expired
            </Badge>
          )}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onViewDocuments(personnel.id)}
      >
        <FileText className="h-4 w-4 mr-2" />
        Manage Documents
      </Button>
    </div>
  );
}
