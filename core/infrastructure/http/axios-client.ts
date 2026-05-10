import axios from "axios";

const DUMMYJSON_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dummyjson.com";

export const axiosClient = axios.create({
  baseURL: DUMMYJSON_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ?? "Unexpected API error from DummyJSON";
    return Promise.reject(new Error(message));
  },
);
