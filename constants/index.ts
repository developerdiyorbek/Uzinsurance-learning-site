import {
  Award,
  Bell,
  BookOpen,
  FileCode,
  GaugeCircle,
  MonitorPlay,
  User,
  Users,
} from "lucide-react";

export const courseStatuses = [
  { value: "created", label: "Yaratilgan" },
  { value: "pending", label: "Kutilmoqda" },
  { value: "published", label: "Nashr qilingan" },
  { value: "rejected", label: "Rad etilgan" },
];

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "AUTH_ACCESS_TOKEN",
  REFRESH_TOKEN: "AUTH_REFRESH_TOKEN",
};

export const QUERY_KEYS = {
  adminCourses: "adminCourses",
  users: "users",
  statistics: "statistics",
  teacherStatistics: "teacherStatistics",
  teacherCourses: "teacherCourses",
  coursesSlug: "coursesSlug",
  lessonsByCourseSlug: "lessonsByCourseSlug",
  lessonBySlug: "lessonBySlug",
  teacherLessonsByCourseSlug: "teacherLessonsByCourseSlug",
  teacherLessonBySlug: "teacherLessonBySlug",
  userCourses: "userCourses",
  userJoinedCourses: "userJoinedCourses",
  userCourseBySlug: "userCourseBySlug",
};

export const bgGradient =
  "bg-gradient-to-tr from-green-100 via-white to-green-200 dark:from-[#232526] dark:via-[#414345] dark:to-[#232526] min-h-[100vh] flex items-center justify-center";

export const instructorNavLinks = [
  { label: "Dashboard", route: "/teacher-dashboard", icon: GaugeCircle },
  {
    label: "Kurslarim",
    route: "/teacher-dashboard/my-courses",
    icon: MonitorPlay,
  },
  {
    label: "Kurs yaratish",
    route: "/teacher-dashboard/create-course",
    icon: FileCode,
  },
];

export const profileNavLinks = [
  {
    label: "Dashboard",
    route: "/user-dashboard",
    icon: GaugeCircle,
  },
  {
    label: "Kurslar",
    route: "/user-dashboard/courses",
    icon: BookOpen,
  },
  {
    label: "Yutuqlarim",
    route: "/user-dashboard/achievements",
    icon: Award,
  },
  {
    label: "Profilim",
    route: "/user-dashboard/my-profile",
    icon: User,
  },
  {
    label: "Xabarnomalar",
    route: "/user-dashboard/notifications",
    icon: Bell,
  },
];

export const adminLinks = [
  { label: "Dashboard", route: "/admin-dashboard", icon: GaugeCircle },
  {
    label: "Kurslar",
    route: "/admin-dashboard/all-courses",
    icon: MonitorPlay,
  },
  {
    label: "Kurs yaratish",
    route: "/admin-dashboard/create-course",
    icon: FileCode,
  },
  {
    label: "Foydalanuvchilar",
    route: "/admin-dashboard/users",
    icon: Users,
  },
  // {
  //   label: "Reviews",
  //   route: "/admin-dashboard/reviews",
  //   icon: MessageSquareMore,
  // },
  // {
  //   label: "Notifications",
  //   route: "/admin-dashboard/notifications",
  //   icon: Bell,
  // },
];

const ADMIN_ROLE = process.env.NEXT_PUBLIC_ADMIN_ROLE_UUID;
const TEACHER_ROLE = process.env.NEXT_PUBLIC_TEACHER_ROLE_UUID;
const USER_ROLE = process.env.NEXT_PUBLIC_USER_ROLE_UUID;

export const IS_ADMIN = [ADMIN_ROLE];
export const IS_TEACHER = [TEACHER_ROLE];
export const IS_USER = [USER_ROLE];
export const HAS_PERM_TO_TEACHER_DASHBOARD = [ADMIN_ROLE, TEACHER_ROLE];

export const roles_name = {
  user: "Oddiy foydalanuvchi",
  admin: "Admin",
  teacher: "O'qituvchi",
};

export const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
];

export const userStatuses = [
  { value: "active", label: "Faol" },
  { value: "inactive", label: "No Faol" },
];

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "created":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
