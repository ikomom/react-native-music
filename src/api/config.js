import axios from 'axios';

export const baseUrl = 'http://122.51.15.135:8084'; // #gitignore

// axios.default.withCredentials = true;

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log('网络错误', err);
  },
);

export {axiosInstance};
