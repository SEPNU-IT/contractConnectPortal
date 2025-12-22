// User role types
export type UserRole = 'admin' | 'contract_owner';

// Page access requirements
export type PageRequirement = 'admin' | 'contract_owner' | 'any_authenticated';

// User interface
export interface User {
  name: string;
  email: string;
  roles: UserRole[]; // Array of roles
  avatar?: string;
}

// Authenticated user state
export interface AuthenticatedUser {
  email: string;
  name: string;
  roles: UserRole[];
  selectedRole?: UserRole;
}

// Mock current user - this would typically come from authentication context
let authenticatedUser: AuthenticatedUser | null = null;
let currentUser: User | null = null;

// Dummy user database for testing
const dummyUsers: Record<string, { name: string; roles: UserRole[] }> = {
  'admin@seplatenergy.com': {
    name: 'System Administrator',
    roles: ['admin']
  },
  'contract.owner@seplatenergy.com': {
    name: 'Contract Owner',
    roles: ['contract_owner']
  },
  'iberedem.inyang@seplatenergy.com': {
    name: 'Iberedem Inyang',
    roles: ['admin', 'contract_owner']
  },
  'john.doe@seplatenergy.com': {
    name: 'John Doe',
    roles: ['admin']
  },
  'jane.smith@seplatenergy.com': {
    name: 'Jane Smith',
    roles: ['contract_owner']
  },
  'super.admin@seplatenergy.com': {
    name: 'Super Administrator',
    roles: ['admin', 'contract_owner']
  }
};

// Authenticate user by email
export const authenticateByEmail = (email: string): AuthenticatedUser | null => {
  const user = dummyUsers[email.toLowerCase()];
  if (user) {
    const authUser: AuthenticatedUser = {
      email,
      name: user.name,
      roles: user.roles
    };
    authenticatedUser = authUser;
    localStorage.setItem('authenticatedUser', JSON.stringify(authUser));
    return authUser;
  }
  return null;
};

// Get authenticated user
export const getAuthenticatedUser = (): AuthenticatedUser | null => {
  if (!authenticatedUser) {
    const stored = localStorage.getItem('authenticatedUser');
    if (stored) {
      authenticatedUser = JSON.parse(stored);
    }
  }
  return authenticatedUser;
};

// Set selected role for authenticated user
export const setSelectedRole = (role: UserRole): boolean => {
  const authUser = getAuthenticatedUser();
  if (authUser && authUser.roles.includes(role)) {
    authUser.selectedRole = role;
    currentUser = {
      name: authUser.name,
      email: authUser.email,
      roles: authUser.roles,
      avatar: undefined
    };
    localStorage.setItem('authenticatedUser', JSON.stringify(authUser));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return true;
  }
  return false;
};

// Check if user can access a specific role
export const canAccessRole = (role: UserRole): boolean => {
  const authUser = getAuthenticatedUser();
  return authUser ? authUser.roles.includes(role) : false;
};

// Initialize user from localStorage
export const initializeUser = () => {
  const storedAuth = localStorage.getItem('authenticatedUser');
  const storedUser = localStorage.getItem('currentUser');
  
  if (storedAuth) {
    authenticatedUser = JSON.parse(storedAuth);
  }
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  
  return currentUser;
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (!currentUser) {
    return initializeUser();
  }
  return currentUser;
};

// Set current user (for testing or manual assignment)
export const setCurrentUser = (user: User) => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Clear current user (logout)
export const clearCurrentUser = () => {
  currentUser = null;
  authenticatedUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authenticatedUser');
};

// Check if user has required role for a page
export const hasAccess = (requiredRole: PageRequirement): boolean => {
  const user = getCurrentUser();
  const authUser = getAuthenticatedUser();
  
  if (!user || !authUser || !authUser.selectedRole) return false;
  
  switch (requiredRole) {
    case 'any_authenticated':
      return true; // Any authenticated user can access
    case 'admin':
      return authUser.selectedRole === 'admin';
    case 'contract_owner':
      return authUser.selectedRole === 'contract_owner';
    default:
      return false;
  }
};

// Get readable role name
export const getRoleName = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'contract_owner':
      return 'Contract Owner';
    default:
      return 'Unknown Role';
  }
};

// Get readable roles array
export const getRoleNames = (roles: UserRole[]): string => {
  if (roles.length === 0) return 'No Roles';
  if (roles.length === 1) return getRoleName(roles[0]);
  return roles.map(getRoleName).join(' & ');
};

// Get readable page requirement
export const getRequirementName = (requirement: PageRequirement): string => {
  switch (requirement) {
    case 'admin':
      return 'Administrator';
    case 'contract_owner':
      return 'Contract Owner';
    case 'any_authenticated':
      return 'Any Authenticated User';
    default:
      return 'Unknown Requirement';
  }
};

// Page access configuration
export const pageAccess: Record<string, { requirement: PageRequirement; name: string }> = {
  '/dashboard': { requirement: 'any_authenticated', name: 'Dashboard' },
  '/vendors': { requirement: 'contract_owner', name: 'Vendor Management' },
  '/personnel': { requirement: 'contract_owner', name: 'Personnel Management' },
  '/admin': { requirement: 'admin', name: 'System Administration' },
  '/admin/users': { requirement: 'admin', name: 'User Management' },
  '/admin/settings': { requirement: 'admin', name: 'System Settings' },
  '/admin/contract-owners': { requirement: 'admin', name: 'Contract Owner Management' },
  '/procurement': { requirement: 'any_authenticated', name: 'Procurement Portal' },
};

// Check page access
export const checkPageAccess = (pathname: string): { hasAccess: boolean; requirement: PageRequirement; pageName: string } => {
  const config = pageAccess[pathname] || { requirement: 'any_authenticated' as PageRequirement, name: pathname };
  
  return {
    hasAccess: hasAccess(config.requirement),
    requirement: config.requirement,
    pageName: config.name,
  };
};