import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { user, isLoading } = useAuth();
  
  // If authentication is still loading, show a loading indicator or spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no user is authenticated, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user does not have the required role, redirect to the "not authorized" page
  if (!requiredRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // If everything is okay, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
