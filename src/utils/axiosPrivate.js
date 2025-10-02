import axios from "axios";

const axiosPrivate = axios.create({
  // baseURL: "http://localhost:8000/api/auth",
  baseURL: 'https://varshheal-backend.onrender.com/api/auth',
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosPrivate;