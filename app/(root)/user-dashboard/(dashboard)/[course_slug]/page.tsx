"use client";

import { useParams } from "next/navigation";
import { useGetUserJoinedCourse } from "@/hooks/useGetUserJoinedCourses";
import { useGetCertificate } from "@/hooks/useGetCertificate";
import CourseDetailLoading from "../../courses/[slug]/_components/CourseDetailLoading";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import CustomImage from "@/components/shared/CustomImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Trophy,
  FileText,
  Award,
  Clock,
  Download,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const course_slug = params?.course_slug as string;

  const { course, isLoading, error, refetch } =
    useGetUserJoinedCourse(course_slug);
  const certificateMutation = useGetCertificate();

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
              <Link href="/user-dashboard">
                <Button variant="outline" className="mt-6 text-sm sm:text-base">
                  <ArrowLeft className="mr-2 size-3 sm:size-4" />
                  <span className="hidden sm:inline">Dashboardga qaytish</span>
                  <span className="sm:hidden">Orqaga</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCompleted = course.progress_percentage === 100;
  const courseData = course as typeof course & {
    test_completed?: boolean;
    test_score?: number;
    course_completed?: boolean;
    enrolled_at?: string;
    course_completed_at?: string;
    certificate_link?: string | null;
  };

  const canGetCertificate =
    courseData.course_completed &&
    courseData.test_completed &&
    (courseData.test_score ?? 0) >= 80;

  const handleDownloadCertificate = () => {
    if (courseData.certificate_link) {
      window.open(courseData.certificate_link, "_blank");
    } else {
      certificateMutation.mutate(course_slug);
    }
  };

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
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {isCompleted && (
                <Badge
                  variant="secondary"
                  className="bg-green-600 dark:bg-green-500 text-white border-0"
                >
                  <Trophy className="size-3 mr-1" />
                  Tugatilgan
                </Badge>
              )}
              {courseData.test_completed && (
                <Badge
                  variant="secondary"
                  className="bg-blue-600 dark:bg-blue-500 text-white border-0"
                >
                  <FileText className="size-3 mr-1" />
                  Test topshirildi
                </Badge>
              )}
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3 leading-tight">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Progress Card */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <CheckCircle2 className="size-4 sm:size-5 text-primary" />
                </div>
                Kurs progressi
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={cn(
                      "font-medium",
                      isCompleted
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {isCompleted
                      ? "Kurs tugatildi!"
                      : `${course.progress_percentage}% tugatildi`}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {course.completed_lessons} / {course.total_lessons} dars
                  </span>
                </div>
                <Progress
                  value={course.progress_percentage}
                  className={cn(
                    "h-2.5",
                    isCompleted && "bg-green-600 dark:bg-green-500"
                  )}
                />
              </div>
              {isCompleted && (
                <div className="pt-2 border-t">
                  <Link href={`/user-dashboard/courses/${course.slug}/test`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      <ClipboardList className="mr-2 size-4" />
                      {courseData.test_completed
                        ? "Testni qayta ko'rish"
                        : "Testni yechish"}
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Results Card */}
          {courseData.test_completed && (
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
                    <FileText className="size-4 sm:size-5 text-blue-500" />
                  </div>
                  Test natijalari
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Test balli
                    </p>
                    <p
                      className={cn(
                        "text-2xl font-bold",
                        (courseData.test_score ?? 0) >= 80
                          ? "text-green-600 dark:text-green-400"
                          : (courseData.test_score ?? 0) >= 60
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {courseData.test_score ?? 0}%
                    </p>
                  </div>
                  {(courseData.test_score ?? 0) >= 80 && (
                    <div className="text-right">
                      <Badge className="bg-green-600 dark:bg-green-500 text-white">
                        <Award className="size-3 mr-1" />
                        Muvaffaqiyatli
                      </Badge>
                    </div>
                  )}
                </div>
                {canGetCertificate && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Siz sertifikat olish huquqiga egasiz!
                    </p>
                    <Button
                      onClick={handleDownloadCertificate}
                      disabled={certificateMutation.isPending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      <Download className="mr-2 size-4" />
                      {certificateMutation.isPending
                        ? "Yuklanmoqda..."
                        : "Sertifikatni yuklab olish"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
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
              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 group">
                <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Clock className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                    Qo&apos;shilgan sana
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {courseData.enrolled_at
                      ? format(new Date(courseData.enrolled_at), "dd.MM.yyyy")
                      : "Noma'lum"}
                  </p>
                </div>
              </div>
              <Separator />

              {courseData.course_completed_at && (
                <>
                  <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 group">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors flex-shrink-0">
                      <CheckCircle2 className="size-4 sm:size-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                        Tugallangan sana
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {format(
                          new Date(courseData.course_completed_at),
                          "dd.MM.yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              <div className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 group">
                <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <BookOpen className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 sm:mb-1.5">
                    Darslar soni
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {course.total_lessons || 0} ta dars
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6 space-y-2 sm:space-y-3">
              <Link href={`/learn-courses/${course.slug}`} className="block">
                <Button
                  className={cn(
                    "w-full h-10 sm:h-11 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200",
                    isCompleted &&
                      "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  )}
                  size="lg"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Qayta ko&apos;rish
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Davom etish
                    </>
                  )}
                </Button>
              </Link>
              <Link href="/user-dashboard" className="block">
                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-11 hover:bg-accent transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Dashboardga qaytish</span>
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
