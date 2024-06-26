import React from 'react';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, SignedInContext } from '../../Context'

interface ProtectedRouteProps {
    children: ReactElement;
  }

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const {user} = useContext(UserContext);
    const { signedIn } = useContext(SignedInContext);

    if (!signedIn || !user) {
        // Redirect to the sign-in page if user is not authenticated
        return <Navigate to="/sign-in" replace />;
      }

  return children;
}

export default ProtectedRoute