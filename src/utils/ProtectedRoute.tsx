import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { selectUser } from '../redux/userSlice';

interface ProtectedRouteProps {
  path: string;
  children: ReactNode;
  exact?: boolean;
}

function ProtectedRoute({ path, exact, children }: ProtectedRouteProps) {
  const user = useSelector(selectUser);

  return (
    <Route exact={exact} path={path}>
      { user.email !== '' ? children : <Redirect to="/login" />}
    </Route>
  );
}

export default ProtectedRoute;
