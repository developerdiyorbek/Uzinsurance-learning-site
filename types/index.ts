export interface IUser {
  _id: string;
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
  access_token: string;
  refresh_token: string;
  avatar: string;
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

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  image: string;
  teacher: IUser;
  slug: string;
  createdAt: string;
  updatedAt: string;
  status: "created" | "pending" | "published" | "rejected";
  lessons?: ILesson[];
  completed_lessons: number;
  total_lessons: number;
  progress_percentage: number;
}

export interface ILesson {
  title: string;
  content: string;
  order: number;
  course: ICourse;
  createdAt: string;
  updatedAt: string;
  slug: string;
  _id: string;
  is_completed: boolean;
  video_url?: string | null;
}
