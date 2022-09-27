import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AxiosConfig from "./lib/axios";
import ApplicationLayout from "./layout/application";
import AuthLayout from "./layout/auth";
import Home from "./routes/Home/Home";
import SignIn from "./routes/SignIn";
import { queryClient } from "./lib/react_query";
import {
  INDEX_ROUTE,
  AUTH_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  REPORT_DETAIL_ROUTE,
} from "./shared/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from "./components/UnprotectedRoute";
import SignUp from "./routes/SignUp";
import ReportDetail from "./routes/ReportDetail";

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
              <ApplicationLayout />
            </ProtectedRoute>
          }
        >
          <Route path={INDEX_ROUTE} element={<Home />} />
          <Route path={REPORT_DETAIL_ROUTE} element={<ReportDetail />} />
        </Route>
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
