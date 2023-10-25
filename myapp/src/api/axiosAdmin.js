import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

function setupAxiosAdminInterceptors() {
  const token = Cookies.get("admin");
  if (token) {
    axiosClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
setupAxiosAdminInterceptors();
export default axiosClient;
