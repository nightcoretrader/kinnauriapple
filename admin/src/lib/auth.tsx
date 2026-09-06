import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AdminUser } from "./types";
import { api, clearToken, getToken, setToken } from "./api";

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTok] = useState<string | null>(getToken());
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    api<AdminUser>("/api/auth/me")
      .then(setUser)
      .catch(() => {
        clearToken();
        setTok(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      loading,
      login: async (email, password) => {
        const data = await api<{ token: string; user: AdminUser }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        setTok(data.token);
        setUser(data.user);
      },
      logout: () => {
        clearToken();
        setTok(null);
        setUser(null);
      },
    }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
