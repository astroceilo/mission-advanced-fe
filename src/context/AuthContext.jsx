import { createContext, useContext, useState } from "react";

import { normalizeUser } from "../utils/normalizeUser/normalizeUser";
import { dummyApi } from "../services/api";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isLoggedIn = Boolean(token);

  const login = async ({ email, password }) => {
    // Cek user by email from DummyJSON
    const usersRes = await dummyApi.get("/users");
    const foundUser = usersRes.data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!foundUser) {
      throw new Error("EMAIL_NOT_FOUND");
    }

    // Login with username and password to get token
    try {
      const res = await dummyApi.post("/auth/login", {
        username: foundUser.username,
        password,
      });

      const { accessToken } = res.data;
      if (!accessToken) throw new Error("TOKEN_MISSING");

      const normalizedUser = normalizeUser({
        ...res.data,
        ...foundUser,
      });

      setUser(normalizedUser);
      setToken(accessToken);

      localStorage.setItem("user", JSON.stringify(normalizedUser));
      localStorage.setItem("token", accessToken);
    } catch (err) {
      if (err.response?.status === 400) {
        throw new Error("INVALID_PASSWORD");
      }

      console.error("Login failed:", err);
      throw new Error("LOGIN_FAILED");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
