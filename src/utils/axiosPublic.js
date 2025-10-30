import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:8000/api', 
  // baseURL: 'https://varshheal-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPublic;