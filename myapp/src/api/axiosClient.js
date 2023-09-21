import axios from "axios";
import cookie from "js-cookie";
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});
const token = cookie.get("user");
if (token) {
  console.log("user-token:", token);
} else {
  console.log("Token không tồn tại");
}
axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;
