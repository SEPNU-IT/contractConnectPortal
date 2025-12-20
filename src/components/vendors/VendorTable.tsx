import { Building2, MoreVertical, Users, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Vendor } from '@/types';

interface VendorTableProps {
  vendors: Vendor[];
}

export function VendorTable({ vendors }: VendorTableProps) {
  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Company</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Personnel</TableHead>
            <TableHead className="font-semibold">Invited</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor, index) => (
            <TableRow 
              key={vendor.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{vendor.companyName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {vendor.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{vendor.department}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    vendor.status === 'accepted' ? 'active' : 
                    vendor.status === 'pending' ? 'pending' : 'expired'
                  }
                >
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.personnelCount}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(vendor.invitedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Personnel</DropdownMenuItem>
                    <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Deactivate Vendor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
