"use client";

import { useEffectOnce } from "@/hooks/useEffectOnce";
import useUser from "@/hooks/useUser";
import { useRefreshToken } from "@/services/auth.service";
import { PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";
import FullScreenLoading from "../shared/FullScreenLoading";

function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const refreshToken = useRefreshToken();

  useEffectOnce(() => {
    const initialize = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      try {
        await refreshToken();
      } catch {
        toast.error("Sessiya tugadi. Qaytadan dasturga kiring!");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  });

  if (loading) return <FullScreenLoading />;

  return <>{children}</>;
}

export default AuthProvider;
