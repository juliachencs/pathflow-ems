import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../app/store';
import type { UserRole } from '../../app/types';

const AdminGuard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const role: UserRole = currentUser? currentUser.role :'USER';

  return role === 'ADMIN' ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminGuard;