import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DepartmentManagement } from '@/components/departments/DepartmentManagement';
import { getCurrentUser, hasAccess } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

export default function Departments() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/internal" replace />;
  }

  if (!hasAccess('admin')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout 
      role={currentUser.roles[0]} 
      userName={currentUser.name}
    >
      <DepartmentManagement />
    </DashboardLayout>
  );
}