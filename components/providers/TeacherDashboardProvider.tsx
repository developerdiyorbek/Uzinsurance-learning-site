"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isValidUser } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import FullScreenLoading from "@/components/shared/FullScreenLoading";
import { HAS_PERM_TO_TEACHER_DASHBOARD } from "@/constants";

function TeacherDashboardProvider({ children }: PropsWithChildren) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (
      !user ||
      !isValidUser(user) ||
      !HAS_PERM_TO_TEACHER_DASHBOARD.includes(user.role)
    ) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || !isValidUser(user)) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
}

export default TeacherDashboardProvider;
