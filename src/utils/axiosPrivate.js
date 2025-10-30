import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  // baseURL: 'https://varshheal-backend.onrender.com/api/auth',
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Attach Authorization header dynamically
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;