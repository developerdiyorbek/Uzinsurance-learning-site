"use client";

import { isValidUser } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Shield,
  GraduationCap,
  Sparkles,
  ShieldUser,
} from "lucide-react";
import useUser from "@/hooks/useUser";
import { useLogout } from "@/services/auth.service";
import { bgGradient } from "@/constants";
import Logo from "@/components/shared/Logo";
import ModeToggle from "@/components/shared/ModeToggle";
import { useState } from "react";
import AlertModal from "@/components/shared/AlertModal";

function CheckUserComponent() {
  const user = useUser();
  const router = useRouter();
  const logout = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  if (user && isValidUser(user)) {
    return (
      <section
        className={
          bgGradient +
          " relative p-2 sm:p-4 min-h-screen flex items-center justify-center"
        }
      >
        <div className="w-full max-w-md px-2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <Card className="w-full backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 border-2 shadow-2xl relative overflow-visible">
            <div className="flex flex-col items-center -mt-10 sm:-mt-12 mb-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative size-20 sm:size-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-2xl border-3 border-white dark:border-slate-900 transition-transform hover:scale-105 duration-300">
                  <User className="size-10 sm:size-12" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <CardHeader className="space-y-2 flex flex-col items-center pb-3 px-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-yellow-500 animate-pulse" />
                <CardTitle className="text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Xush kelibsiz!
                </CardTitle>
                <Sparkles className="size-4 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                {user.first_name} {user.last_name}
              </p>
              <CardDescription className="text-center text-sm dark:text-gray-300">
                Siz tizimga muvaffaqiyatli kirgansiz.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 px-4 pb-4">
              <Button
                className="w-full h-11 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 dark:text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                onClick={() => router.push("/admin-dashboard")}
              >
                <Shield className="size-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                Admin profiliga o&apos;tish
              </Button>

              <Button
                className="w-full h-11 text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 dark:text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                onClick={() => router.push("/teacher-dashboard")}
              >
                <ShieldUser className="size-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                O&apos;qituvchi profiliga o&apos;tish
              </Button>

              <Button
                className="w-full h-11 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 dark:text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                onClick={() => router.push("/user-dashboard")}
              >
                <GraduationCap className="size-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" />
                O&apos;quvchi profiliga o&apos;tish
              </Button>

              <div className="relative my-1.5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">
                    yoki
                  </span>
                </div>
              </div>

              <Button
                className="w-full h-10 text-sm font-medium cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 group"
                variant="destructive"
                onClick={() => setIsOpen(true)}
              >
                <LogOut className="size-4 mr-1.5 group-hover:-translate-x-1 transition-transform duration-300" />
                Chiqish
              </Button>

              <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Tizimdan chiqishni xoxlaysizmi?"
                description="Agar tizimdan chiqib ketsangiz, qayta kirishingiz kerak bo'ladi."
                onConfirm={logout}
              />
            </CardContent>
          </Card>
        </div>

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <ModeToggle />
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        bgGradient +
        " relative p-2 sm:p-4 min-h-screen flex items-center justify-center"
      }
    >
      <div className="w-full max-w-md px-2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 border-2 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

          <CardHeader className="space-y-3 flex flex-col items-center pt-6 px-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl font-bold text-center dark:text-gray-100 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                O&apos;quv platformasiga xush kelibsiz!
              </CardTitle>
              <CardDescription className="text-center text-sm text-muted-foreground dark:text-gray-300">
                Davom etish uchun tizimga kiring
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-4 pb-6">
            <Button
              className="w-full h-11 text-sm font-medium cursor-pointer text-white bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={() => router.push("/login")}
            >
              Tizimga kirish
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <ModeToggle />
      </div>
    </section>
  );
}

export default CheckUserComponent;
