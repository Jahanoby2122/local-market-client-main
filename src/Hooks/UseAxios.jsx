import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://local-market-server.vercel.app',
  withCredentials: true, // optional, যদি credentials লাগে
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
