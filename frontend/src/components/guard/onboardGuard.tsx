import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../app/store';

const OnboardGuard: React.FC = () => {
  const boarding = useSelector((state: RootState) => state.auth.currentUser?.boarding);

  return (!boarding || boarding !== 'APPROVED') ? <Navigate to="/onboarding" /> : <Outlet />;
};

export default OnboardGuard;