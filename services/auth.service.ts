"use client";

import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import customAxios from "@/configs/customAxios";
import { logOut, setUser } from "@/lib/slices/auth.slice";
import localStorageService from "./localStorage.service";
import { STORAGE_KEYS } from "@/constants";
import { LoginRequestBody } from "@/types";
import { isValidUser } from "@/lib/utils";

export async function requestRefreshToken() {
  const { data } = await customAxios.post("/auth/refresh", null, {
    headers: {
      Authorization: `Bearer ${localStorageService.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      )}`,
    },
  });
  return data;
}

async function requestLogin(body: LoginRequestBody) {
  const { data } = await customAxios.post("/auth/login", body);
  return data;
}

export function useAuthRequests() {
  return useMemo(() => ({ requestLogin }), []);
}

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  return async () => {
    router.replace("/");
    localStorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    dispatch(logOut());
  };
}

export function useRefreshToken() {
  const logout = useLogout();
  const dispatch = useDispatch();
  const router = useRouter();

  return async () => {
    const refreshToken = localStorageService.getItem(
      STORAGE_KEYS.REFRESH_TOKEN
    );

    if (!refreshToken) {
      dispatch(logOut());
      router.replace("/");
      localStorageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      return;
    }

    try {
      const { user } = await requestRefreshToken();

      if (!isValidUser(user)) {
        throw new Error("Invalid credentials");
      }

      dispatch(setUser(user));
      localStorageService.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        user?.access_token
      );

      return user.access_token;
    } catch {
      logout();
    }
  };
}
