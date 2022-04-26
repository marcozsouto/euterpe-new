import axios from "axios";
import Auth from "./Auth";


const api = axios.create({
     baseURL: process.env.REACT_APP_NODE_URL
});

api.interceptors.request.use(async config => {
  const token = Auth.getToken();
  if (token) {
    config.headers = {'x-access-token': token};
  }
  return config;
});

export default api;