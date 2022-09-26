import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AxiosConfig from "./lib/axios";
import HomeLayout from "./layout/application";
import AuthLayout from "./layout/auth";
import Home from "./routes/Home/Home";
import SignIn from "./routes/SignIn";
import { queryClient } from "./lib/react_query";
import {
  INDEX_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from "./shared/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from "./components/UnprotectedRoute";
import SignUp from "./routes/SignUp";

function App() {
  // NOTE: Axios interceptor as a hook
  AxiosConfig.useRegisterAxiosResponseInterceptor();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path={AUTH_ROUTE}
          element={
            <UnprotectedRoute>
              <AuthLayout />
            </UnprotectedRoute>
          }
        >
          <Route path={LOGIN_ROUTE} element={<SignIn />} />
          <Route path={SIGNUP_ROUTE} element={<SignUp />} />
        </Route>
        <Route
          path={INDEX_ROUTE}
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route path={INDEX_ROUTE} element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
