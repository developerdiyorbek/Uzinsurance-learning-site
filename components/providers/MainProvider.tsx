"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { isAxiosError } from "axios";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";

const handleCatchError = (error: Error) => {
  const message =
    (isAxiosError(error) && error.response?.data?.message) ||
    "Kutilmagan xatolik!";
  toast.error(message);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
      onError: handleCatchError,
    },
  },
});

function MainProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AuthProvider>{children}</AuthProvider>
      </StoreProvider>

      {/* top loader */}
      <NextTopLoader
        color="#22C55E"
        initialPosition={0.5}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px rgba(34, 197, 94, 0.5), 0 0 5px rgba(34, 197, 94, 0.5)"
      />

      {/* toast  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={true}
        draggable
        pauseOnHover={false}
        transition={Zoom}
      />
    </QueryClientProvider>
  );
}

export default MainProvider;
