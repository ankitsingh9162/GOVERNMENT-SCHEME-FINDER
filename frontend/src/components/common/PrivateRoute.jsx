import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  const token = localStorage.getItem('token');
  
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;