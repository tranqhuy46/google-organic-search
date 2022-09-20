import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth";
import { LOGIN_ROUTE } from "../../shared/routes";

const ProtectedRoute: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const currentLocation = useLocation();
  const { isAuthenticated } = AuthContext.useAuthContext();

  if (!isAuthenticated) {
    return (
      <Navigate to={LOGIN_ROUTE} state={{ from: currentLocation }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
