import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AccessDenied from '@/components/AccessDenied';
import { checkPageAccess, getCurrentUser, getRoleNames, getRequirementName } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [accessCheck, setAccessCheck] = useState<{
    hasAccess: boolean;
    requirement: any;
    pageName: string;
  } | null>(null);

  useEffect(() => {
    // Check access when location changes
    const result = checkPageAccess(location.pathname);
    setAccessCheck(result);
    
    if (!result.hasAccess) {
      setShowAccessDenied(true);
    } else {
      setShowAccessDenied(false);
    }
  }, [location.pathname]);

  const handleCloseAccessDenied = () => {
    setShowAccessDenied(false);
  };

  const currentUser = getCurrentUser();

  // If access is denied, show the access denied modal over the content
  return (
    <>
      {children}
      
      {accessCheck && (
        <AccessDenied
          isOpen={showAccessDenied}
          onClose={handleCloseAccessDenied}
          userRole={currentUser?.roles ? getRoleNames(currentUser.roles) : 'unknown'}
          requiredRole={getRequirementName(accessCheck.requirement)}
          attemptedPage={accessCheck.pageName}
        />
      )}
    </>
  );
}