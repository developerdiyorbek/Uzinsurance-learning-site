import { IUser, QueryProps } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function textSlice(text: string, length: number) {
  return text?.length > length ? `${text.slice(0, length)}...` : text;
}

export function formUrlQuery({ key, params, value }: QueryProps) {
  const urlParams = new URLSearchParams(params);
  if (value) {
    urlParams.set(key, value);
  }
  return `${window.location.pathname}?${urlParams.toString()}`;
}

export function removeUrlQuery({ params, key }: QueryProps) {
  const urlParams = new URLSearchParams(params);
  urlParams.delete(key);
  return `${window.location.pathname}?${urlParams.toString()}`;
}

export function isValidUser(user: IUser): boolean {
  if (
    !user ||
    typeof user.first_name !== "string" ||
    user.first_name.trim() === "" ||
    typeof user.last_name !== "string" ||
    user.last_name.trim() === "" ||
    typeof user.middle_name !== "string" ||
    user.middle_name.trim() === "" ||
    typeof user.phone_number !== "string" ||
    user.phone_number.trim() === "" ||
    typeof user.role !== "string" ||
    user.role.trim() === "" ||
    typeof user.status !== "string" ||
    user.status.trim() === "" ||
    typeof user.access_token !== "string" ||
    user.access_token.trim() === "" ||
    typeof user.refresh_token !== "string" ||
    user.refresh_token.trim() === ""
  ) {
    return false;
  }

  return true;
}
