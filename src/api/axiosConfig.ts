import axiosInstance from "./axiosInstance";

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Or your auth store
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle common errors
      if (error.response.status === 401) {
        // Token expired or unauthorized
        console.log("Unauthorized! Redirect to login or refresh token.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
