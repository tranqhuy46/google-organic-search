import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import { INDEX_ROUTE } from "../../shared/routes";

const UnprotectedRoute: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { isAuthenticated } = AuthContext.useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={INDEX_ROUTE} replace />;
  }

  return <>{children}</>;
};

export default UnprotectedRoute;
