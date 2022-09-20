import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../shared/routes";
import envVars from "../shared/env_vars";
import AuthContext from "../context/auth";

const instance = axios.create({
  baseURL: envVars.API_URL,
  withCredentials: true,
  // withCredentials: envVars.NODE_ENV === "production",
});

function useRegisterAxiosResponseInterceptor() {
  const interceptorId = useRef<number | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenicated } = AuthContext.useAuthContext();

  useEffect(() => {
    const _interceptorId = axios.interceptors.response.use(undefined, (err) => {
      const error = err.response;
      if (!error) return null;
      const isRetry = error.config && error.config.__isRetryRequest; // NOTE: may use __isRetryRequest in case of refreshing token
      if (isRetry) return null;
      switch (error.status) {
        case 401:
          setIsAuthenicated(false);
          navigate(LOGIN_ROUTE);
          break;
      }
    });

    interceptorId.current = _interceptorId;

    return () => {
      if (interceptorId.current) {
        axios.interceptors.response.eject(interceptorId.current);
      }
    };
  }, [navigate, setIsAuthenicated]);

  return null;
}

export default { instance, useRegisterAxiosResponseInterceptor } as const;
