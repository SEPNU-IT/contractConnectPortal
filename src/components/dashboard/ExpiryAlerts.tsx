import { AlertTriangle, Clock, FileWarning } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExpiryAlert {
  id: string;
  documentType: string;
  personnelName: string;
  vendorName: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'expired' | 'expiring';
}

const mockAlerts: ExpiryAlert[] = [
  {
    id: '1',
    documentType: 'Security Background Check',
    personnelName: 'Michael Brown',
    vendorName: 'TechCorp Solutions',
    expiryDate: '2024-01-15',
    daysUntilExpiry: -5,
    status: 'expired',
  },
  {
    id: '2',
    documentType: 'Medical Fitness',
    personnelName: 'Sarah Johnson',
    vendorName: 'Global Services Ltd',
    expiryDate: '2024-02-01',
    daysUntilExpiry: 12,
    status: 'expiring',
  },
  {
    id: '3',
    documentType: 'Professional Certification',
    personnelName: 'David Lee',
    vendorName: 'Prime Contractors',
    expiryDate: '2024-02-15',
    daysUntilExpiry: 26,
    status: 'expiring',
  },
];

export function ExpiryAlerts() {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Document Expiry Alerts
        </h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="space-y-3">
        {mockAlerts.map((alert, index) => (
          <div 
            key={alert.id}
            className={cn(
              "rounded-lg border p-4 transition-all duration-200 hover:shadow-md animate-fade-in",
              alert.status === 'expired' 
                ? "border-destructive/30 bg-destructive/5" 
                : "border-warning/30 bg-warning/5"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "rounded-lg p-2",
                  alert.status === 'expired' ? "bg-destructive/15" : "bg-warning/15"
                )}>
                  <FileWarning className={cn(
                    "h-4 w-4",
                    alert.status === 'expired' ? "text-destructive" : "text-warning"
                  )} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.documentType}</p>
                  <p className="text-sm text-muted-foreground">{alert.personnelName}</p>
                  <p className="text-xs text-muted-foreground">{alert.vendorName}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <Badge variant={alert.status === 'expired' ? 'expired' : 'expiring'}>
                  {alert.status === 'expired' ? 'Expired' : 'Expiring Soon'}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.status === 'expired' 
                    ? `${Math.abs(alert.daysUntilExpiry)} days ago`
                    : `${alert.daysUntilExpiry} days left`
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
