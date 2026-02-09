"use client";

import { createContext, useContext, useState } from "react";
import { mockUsers } from "./mockUsers";

type User = {
  id: string;
  email: string;
  role: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    setUser(foundUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
