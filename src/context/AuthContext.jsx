<<<<<<< HEAD
=======
<<<<<<< HEAD
import { createContext, useContext, useState } from "react";
import { USERS } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
=======
>>>>>>> 9604213 (sync)
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const token = localStorage.getItem("supportdesk_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Request failed. Please try again.");
  return result.data;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("supportdesk_token");
    if (!token) {
      setAuthLoading(false);
      return;
    }
    request("/auth/me")
      .then(({ user }) => setCurrentUser(user))
      .catch(() => {
        localStorage.removeItem("supportdesk_token");
        setCurrentUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("supportdesk_token", token);
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { user, token } = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem("supportdesk_token", token);
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("supportdesk_token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, authLoading, login, register, logout }}>
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
