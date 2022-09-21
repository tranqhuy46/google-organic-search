import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AxiosConfig from "./lib/axios";
import HomeLayout from "./layout/home";
import Home from "./routes/Home/Home";
import SignIn from "./routes/SignIn";
import { queryClient } from "./lib/react_query";
import { INDEX_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "./shared/routes";
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
          path={LOGIN_ROUTE}
          element={
            <UnprotectedRoute>
              <SignIn />
            </UnprotectedRoute>
          }
        />
        <Route
          path={SIGNUP_ROUTE}
          element={
            <UnprotectedRoute>
              <SignUp />
            </UnprotectedRoute>
          }
        />
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
