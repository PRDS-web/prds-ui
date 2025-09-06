import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector((state) => state.user.role);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole == 'admin' || userRole == 'client') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
