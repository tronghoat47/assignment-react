import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isAuthen, setIsAuthen] = useState(!!getToken());

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    const role = getRole();
    if (token && refreshToken && role) {
      setAuth({ token, refreshToken, role });
    }
  }, []);

  const login = (data) => {
    setAuth(data);
    setIsAuthen(true);

    setTokens(data.token, data.refreshToken, data.role);
  };

  const logout = async () => {
    await axiosInstance.get("/auths/logout");
    setAuth(false);
    setIsAuthen(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider value={{ isAuthen, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getToken = () => {
  return Cookies.get(`token`);
};

export const getRefreshToken = () => {
  return Cookies.get(`refreshToken`);
};

export const getRole = () => {
  return Cookies.get(`role`);
};

export const setTokens = (token, refreshToken, role) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);
  Cookies.set("token", token, { expires: date });
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
  Cookies.set("role", role, { expires: 7 });
};

export const removeTokens = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("role");
};
