import axios from "axios";


export const mockApi = axios.create({
  baseURL: "https://694d2e2ead0f8c8e6e1ff30c.mockapi.io",
});

export const dummyApi = axios.create({
  baseURL: "https://dummyjson.com",
});

// JWT interceptor (DummyJSON only)
dummyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});