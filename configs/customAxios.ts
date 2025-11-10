import { STORAGE_KEYS } from "@/constants";
import { requestRefreshToken } from "@/services/auth.service";
import localStorageService from "@/services/localStorage.service";
import axios from "axios";

export const BASE_URL = "https://edu.agros.uz/api";
// export const BASE_URL = "http://localhost:6060/api";

const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use((config) => {
  const accessToken = localStorageService.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken && config.url !== "/auth/refresh") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      if (originalRequest.url === "/auth/refresh") {
        throw error;
      }

      try {
        const refreshToken = localStorageService.getItem(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const data = await requestRefreshToken();

        if (!data) {
          throw new Error("Invalid credentials!");
        }

        localStorageService.setItem(
          STORAGE_KEYS.ACCESS_TOKEN,
          data?.user?.access_token
        );

        originalRequest.headers.Authorization = `Bearer ${data?.user?.access_token}`;
        return customAxios.request(originalRequest);
      } catch {
        localStorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    }
    throw error;
  }
);

export default customAxios;
