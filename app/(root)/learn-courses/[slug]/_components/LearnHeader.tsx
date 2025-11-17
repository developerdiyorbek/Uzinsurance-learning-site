"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import { useParams } from "next/navigation";
import { useGetUserLessonsByCourseSlug } from "@/hooks/useGetUserLessonsByCourseSlug";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import UserBox from "@/components/shared/UserBox";
import ModeToggle from "@/components/shared/ModeToggle";
import { ReactNode } from "react";

interface LearnHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  children?: ReactNode;
}

export default function LearnHeader({
  sidebarOpen,
  setSidebarOpen,
  children,
}: LearnHeaderProps) {
  const params = useParams();
  const course_slug = params?.slug as string;
  const { course, isLoading, progressPercentage } =
    useGetUserLessonsByCourseSlug(course_slug);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 justify-between px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/user-dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <Logo url="/user-dashboard" />
        </div>

        <div className="flex items-center gap-2">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
                  {isLoading ? (
                    <Skeleton className="h-5 w-32 mb-2" />
                  ) : (
                    <h1 className="font-bold text-base text-foreground mb-3 line-clamp-2">
                      {course?.title || "Kurs"}
                    </h1>
                  )}
                  {isLoading ? (
                    <Skeleton className="h-2 w-full mb-2" />
                  ) : (
                    <>
                      <Progress
                        value={progressPercentage}
                        className="h-2 mb-2"
                      />
                      <p className="text-xs text-center text-muted-foreground">
                        {progressPercentage}% tugatildi
                      </p>
                    </>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto p-4">{children}</div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserBox profile_url="/user-dashboard" />
          </div>
        </div>
      </div>
    </header>
  );
}
