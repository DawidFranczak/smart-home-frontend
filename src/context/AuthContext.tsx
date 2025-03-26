import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../const/api";
interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  invalidToken: boolean;
  access: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw Error("Auth context is undefined");
  return context;
};

import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [access, setAccess] = useState<string | null>(null);
  const [invalidToken, setInvalidToken] = useState(false);
  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ["token"],
    queryFn: fetchToken,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
    enabled: !invalidToken,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isPending) return;
    if (isSuccess) {
      login(data.token);
    } else {
      logout();
    }
  }, [data, isPending, isSuccess, isError]);

  const login = (token: string) => {
    setAccess(token);
    setInvalidToken(false);
  };

  const logout = () => {
    setAccess(null);
    setInvalidToken(true);
  };

  if (isPending) return null;

  return (
    <AuthContext.Provider value={{ login, logout, invalidToken, access }}>
      {children}
    </AuthContext.Provider>
  );
};

async function fetchToken() {
  const response = await fetch(api.refreshToken, {
    credentials: "include",
  });

  const data = await response.json();
  return { token: data.access, status: response.status };
}
