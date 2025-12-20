import { Building2, UserPlus, FileCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'vendor_registered' | 'personnel_added' | 'document_uploaded' | 'document_expiring';
  title: string;
  description: string;
  time: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'vendor_registered',
    title: 'New Vendor Registered',
    description: 'TechCorp Solutions completed registration',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'personnel_added',
    title: 'Personnel Added',
    description: 'John Smith added to Global Services Ltd',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'document_uploaded',
    title: 'Document Uploaded',
    description: 'Security clearance for Sarah Johnson',
    time: '6 hours ago',
  },
  {
    id: '4',
    type: 'document_expiring',
    title: 'Document Expiring Soon',
    description: 'Medical fitness certificate expires in 30 days',
    time: '1 day ago',
  },
];

const activityIcons = {
  vendor_registered: Building2,
  personnel_added: UserPlus,
  document_uploaded: FileCheck,
  document_expiring: AlertCircle,
};

const activityColors = {
  vendor_registered: 'bg-primary/15 text-primary',
  personnel_added: 'bg-accent/15 text-accent',
  document_uploaded: 'bg-success/15 text-success',
  document_expiring: 'bg-warning/15 text-warning',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border-2 border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-4 animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "rounded-lg p-2 flex-shrink-0",
                activityColors[activity.type]
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
