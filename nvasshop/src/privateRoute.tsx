import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

interface PrivateRouteProps {
  component: React.ElementType;
  requiredRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, requiredRoles }) => {
  const { user } = useContext(AuthContext);

  return user && requiredRoles.includes(user.role) ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoute;