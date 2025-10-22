export interface IUser {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  passport_seria: string;
  role: "admin" | "teacher" | "user";
  passport_number: number;
  pinfl: string;
  status: "active" | "inactive";
  password: string;
}

export interface LoginRequestBody {
  phone_number: string;
  password: string;
}

export interface QueryProps {
  params: string;
  key: string;
  value?: string | null;
}
