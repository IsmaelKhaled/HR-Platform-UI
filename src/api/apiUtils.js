import axios from "axios";

axios.interceptors.request.use(async (config) => {
  const token = 123;
  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});
