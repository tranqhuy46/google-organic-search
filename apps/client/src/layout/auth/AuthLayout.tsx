import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
