import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border-border',
  success: 'bg-success/5 border-success/20',
  warning: 'bg-warning/5 border-warning/20',
  danger: 'bg-destructive/5 border-destructive/20',
};

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-destructive/15 text-destructive',
};

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = 'default',
  className 
}: StatsCardProps) {
  return (
    <div 
      className={cn(
        "rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg animate-fade-in",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "rounded-xl p-3",
          iconStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
