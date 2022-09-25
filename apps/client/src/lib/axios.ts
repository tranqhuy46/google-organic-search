import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../shared/routes";
import envVars from "../shared/env_vars";
import AuthContext from "../context/auth";
import Toaster from "./toast";

// axios.defaults.withCredentials = envVars.NODE_ENV === "production";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = envVars.API_URL;

function useRegisterAxiosResponseInterceptor() {
  const interceptorId = useRef<number | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenicated } = AuthContext.useAuthContext();

  useEffect(() => {
    const _interceptorId = axios.interceptors.response.use(
      (response) => response,
      (err) => {
        const error = err?.response;
        switch (error?.status) {
          case 401:
            Toaster.error("Unauthorized");
            setIsAuthenicated(false);
            navigate(LOGIN_ROUTE);
            break;
          default:
            break;
        }
        return Promise.reject(err);
      }
    );

    interceptorId.current = _interceptorId;

    return () => {
      if (interceptorId.current) {
        axios.interceptors.response.eject(interceptorId.current);
      }
    };
  }, [navigate, setIsAuthenicated]);

  return null;
}

export default { useRegisterAxiosResponseInterceptor } as const;
