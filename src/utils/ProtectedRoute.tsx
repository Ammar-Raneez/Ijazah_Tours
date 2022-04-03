import { ElementType } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { User } from './types';

interface ProtectedRouteProps {
  user: User;
  Component: ElementType;
}

function ProtectedRoute({ user, Component, ...rest }: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          user ? (
            <Component {...props} />
          ) : (
            <Redirect to='/login' />
          )
        )
      }
    />
  );
}

export default ProtectedRoute;
