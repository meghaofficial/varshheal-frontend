import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // sends cookies
});

export default axiosPrivate;