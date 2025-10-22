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
import { User } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useLogout } from "@/services/auth.service";
import { bgGradient } from "@/constants";
import Logo from "@/components/shared/Logo";
import ModeToggle from "@/components/shared/ModeToggle";

function CheckUserComponent() {
  const user = useUser();
  const router = useRouter();
  const logout = useLogout();

  if (user && isValidUser(user)) {
    return (
      <section className={bgGradient + " relative p-2"}>
        <Card
          className="w-full max-w-md relative rounded-2xl"
          style={{ overflow: "visible" }}
        >
          <div className="flex flex-col items-center -mt-12">
            <div className="size-24 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-950">
              <User className="size-12" />
            </div>
          </div>
          <CardHeader className="space-y-1 flex flex-col items-center mt-2">
            <Logo />
            <CardTitle className="text-xl font-bold text-center mt-2 dark:text-gray-100">
              Xush kelibsiz, {user.first_name} {user.last_name}!
            </CardTitle>
            <CardDescription className="text-center text-base dark:text-gray-200">
              Siz tizimga muvaffaqiyatli kirgansiz. Dashboardga o&apos;tish
              uchun pastdagi tugmani bosing!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              className="w-full sm:w-1/2 dark:text-white cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              Dashboardga o&apos;tish
            </Button>
            <Button
              className="w-full sm:w-1/2 cursor-pointer"
              variant="destructive"
              onClick={logout}
            >
              Chiqish
            </Button>
          </CardContent>
        </Card>
        <div className="absolute top-6 right-6">
          <ModeToggle />
        </div>
      </section>
    );
  }

  return (
    <section className={bgGradient + " relative p-2"}>
      <Card className="w-full max-w-md relative rounded-2xl ">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Logo />
          <CardTitle className="text-xl font-medium text-center mt-2 dark:text-gray-100 !mb-0 !p-0">
            O&apos;quv platformasiga xush kelibsiz!
          </CardTitle>
          <CardDescription className="text-center text-base text-muted-foreground dark:text-gray-200 !m-0 !p-0">
            Davom etish uchun tizimga kiring
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-4">
          <Button
            className="w-full cursor-pointer dark:text-white"
            onClick={() => router.push("/login")}
          >
            Tizimga kirish
          </Button>
        </CardContent>
      </Card>
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
    </section>
  );
}

export default CheckUserComponent;
