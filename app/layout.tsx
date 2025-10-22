import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import MainProvider from "@/components/providers/MainProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Learning Website Agros",
  description: "A learning platform for Agros",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainProvider>{children}</MainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
