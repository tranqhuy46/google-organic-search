import React from "react";

interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenicated(authenticated: boolean): void;
}

const DEFAULT_AUTH_CONTEXT_VALUE: AuthContext = {
  isAuthenticated: false,
  setIsAuthenicated(_: boolean) {
    throw Error("NOT_IMPLEMENTED");
  },
};

const AuthContext = React.createContext<AuthContext>(
  DEFAULT_AUTH_CONTEXT_VALUE
);

function useAuthContext() {
  return React.useContext(AuthContext);
}

const GOOGLE_SEARCH_IS_LOGIN = "test.organic-logged-in";

function AuthContextProvider(props: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenicated] = React.useState(
    window.localStorage.getItem(GOOGLE_SEARCH_IS_LOGIN) === "1"
  );

  React.useEffect(() => {
    window.localStorage.setItem(
      GOOGLE_SEARCH_IS_LOGIN,
      isAuthenticated ? "1" : "0"
    );
  }, [isAuthenticated]);

  const value: AuthContext = { isAuthenticated, setIsAuthenicated };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default { AuthContextProvider, useAuthContext } as const;
