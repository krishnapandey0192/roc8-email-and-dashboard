import { createContext, useContext, useState, useEffect } from "react";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from "../utils/cookieManager";
import { login as loginApi, register as registerApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setUser({ id: "1", email: "user@example.com" });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginApi(email, password);
      setAuthToken(data.token);
      setUser({ id: "1", email });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await registerApi(email, password);
      setAuthToken(data.token);
      setUser({ id: "1", email });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
