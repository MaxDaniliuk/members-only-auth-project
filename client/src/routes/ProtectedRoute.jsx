import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from '../assets/images/loading.svg?react';

export default function ProtectedRoute({ requireNonMember = false }) {
  const { user, isLoaded } = useAuthContext();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="protected-route-loading">
        <span>
          <Loading className="loading-posts spin" />
        </span>
      </div>
    );
  }

  if (!user) {
    if (location !== '/login') {
      return <Navigate to="/login" replace />;
    }
    return null;
  }

  if (requireNonMember && user?.ismember) {
    if (location !== '/') {
      return <Navigate to="/" replace />;
    }
    return null;
  }

  return <Outlet />;
}
