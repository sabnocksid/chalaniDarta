// utils/axios.js (example)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://52.66.247.124:2020/api/v1/', 
});

export default axiosInstance;
