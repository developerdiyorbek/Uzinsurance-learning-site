"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isValidUser } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import FullScreenLoading from "@/components/shared/FullScreenLoading";
import { IS_ADMIN } from "@/constants";

function AdminDashboardProvider({ children }: PropsWithChildren) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !isValidUser(user) || !IS_ADMIN.includes(user?.role)) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || !isValidUser(user)) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
}

export default AdminDashboardProvider;
