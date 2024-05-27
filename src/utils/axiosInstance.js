import axios from "axios";
import {
  getToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "../contexts/AuthContext";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5012/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const response = await axiosInstance.post(
          "/auths/refresh-token",
          { refreshToken } // Assuming the endpoint is relative to the base URL
        );
        const { newToken, newRefreshToken, role } = response.data.data;
        setTokens(newToken, newRefreshToken, role);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        message.error("Session expired. Please log in again.");
        removeTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
