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

export function formatAndDivideNumber(num: number) {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum} M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum} K`;
  } else {
    return num.toString();
  }
}

export function formatIntegerNumber(value: number) {
  if (!Number.isInteger(value)) return value;

  return value.toLocaleString().replace(/,/g, " ");
}

export function formatMoney(money: number): string {
  if (money >= 1_000_000_000) {
    return (money / 1_000_000_000).toFixed(1) + " milliard";
  } else if (money >= 1_000_000) {
    const millions = Math.floor(money / 1_000_000);
    const remainder = money % 1_000_000;
    const thousands = Math.floor(remainder / 1_000);
    const last = remainder % 1_000;

    let result = `${millions} mln`;
    if (thousands > 0) result += ` ${thousands} ming`;
    if (last > 0) result += ` ${last} so'm`;
    return result;
  } else if (money >= 1_000) {
    const thousands = Math.floor(money / 1_000);
    const last = money % 1_000;

    let result = `${thousands} ming`;
    if (last > 0) result += ` ${last} so'm`;
    return result;
  } else {
    return `${money} so'm`;
  }
}
