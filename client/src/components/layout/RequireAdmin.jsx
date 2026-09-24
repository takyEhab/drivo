import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center">Loading…</div>;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/admin/login" replace />;
  return children;
}