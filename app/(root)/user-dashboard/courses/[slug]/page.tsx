"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetUserCourseBySlug } from "@/hooks/useGetUserCourseBySlug";
import CourseDetailLoading from "./_components/CourseDetailLoading";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import CustomImage from "@/components/shared/CustomImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  User,
  Calendar,
  Loader,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import customAxios from "@/configs/customAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { format } from "date-fns";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const slug = params?.slug as string;

  const { course, lessonsCount, isLoading, error, refetch } =
    useGetUserCourseBySlug(slug);

  const [isJoining, setIsJoining] = useState(false);

  const handleJoinCourse = async () => {
    try {
      setIsJoining(true);
      await customAxios.post(`user/courses/${slug}/join`);
      toast.success("Kursga muvaffaqiyatli qo'shildingiz!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.userCourses] });
      router.push(`/courses/${course?.slug}`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || "Kursga qo'shishda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) return <CourseDetailLoading />;

  if (error) {
    return (
      <div className="space-y-6 px-4 sm:px-6 lg:px-0">
        <AdvancedErrorComponent onRetry={() => refetch()} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="space-y-6 px-4 sm:px-6 lg:px-0">
        <Card className="border-dashed">
          <CardContent className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BookOpen className="size-6 sm:size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                Kurs topilmadi
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
                Kechirasiz, so&apos;ralgan kurs mavjud emas yoki
                o&apos;chirilgan.
              </p>
              <Link href="/user-dashboard/courses">
                <Button variant="outline" className="mt-6 text-sm sm:text-base">
                  <ArrowLeft className="mr-2 size-3 sm:size-4" />
                  <span className="hidden sm:inline">
                    Kurslar ro&apos;yxatiga qaytish
                  </span>
                  <span className="sm:hidden">Orqaga</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 w-full rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-muted border shadow-lg group">
        <CustomImage
          src={course.image}
          alt={course.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3 leading-tight">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <BookOpen className="size-4 sm:size-5 text-primary" />
                </div>
                Kurs haqida
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {course.description || "Kurs haqida ma'lumot mavjud emas."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Kurs ma&apos;lumotlari
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 group">
                <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <User className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                    O&apos;qituvchi
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {course.teacher.first_name} {course.teacher.last_name}
                  </p>
                </div>
              </div>
              <Separator />

              {/* Date */}
              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 group">
                <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Calendar className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                    Yaratilgan sana
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {format(new Date(course.createdAt), "dd.MM.yyyy")}
                  </p>
                </div>
              </div>
              <Separator />

              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 group">
                <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <BookOpen className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                    Darslar soni
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {lessonsCount || 0} ta dars
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6 space-y-2 sm:space-y-3">
              <Button
                onClick={handleJoinCourse}
                disabled={isJoining}
                className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                size="lg"
              >
                {isJoining ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    <span className="hidden sm:inline">
                      Qo&apos;shilmoqda...
                    </span>
                    <span className="sm:hidden">Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Kursga qo&apos;shilish
                  </>
                )}
              </Button>
              <Link href="/user-dashboard/courses" className="block">
                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-11 hover:bg-accent transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">
                    Kurslar ro&apos;yxatiga qaytish
                  </span>
                  <span className="sm:hidden">Orqaga</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
