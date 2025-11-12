"use client";

import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import CustomImage from "@/components/shared/CustomImage";
import PageHeader from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusBadgeColor, QUERY_KEYS } from "@/constants";
import { useGetTeacherCourseBySlug } from "@/hooks/useGetTeacherCourseBySlug";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import TeacherCourseEditForm from "./TeacherCourseEditForm";
import TeacherCourseActionSkeleton from "./TeacherCourseActionSkeleton";

function TeacherCourseActions() {
  const params = useParams();
  const slug = params.slug as string;
  const { course, isLoading, error } = useGetTeacherCourseBySlug(slug);

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.teacherCourses, "slug", slug],
    });
  };

  const handleNavigateToLessons = () => {
    router.push(`/teacher-dashboard/my-courses/${slug}/lessons`);
  };

  if (isLoading) return <TeacherCourseActionSkeleton />;

  if (error || !course) return <AdvancedErrorComponent />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kurs ma'lumotlarini tahrirlash"
        description="Kursingizning barcha ma'lumotlarini yangilang va tasdiqlashga yuboring"
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                  <CustomImage
                    src={course.image}
                    alt={course.title}
                    className="object-cover"
                  />
                </div>
                <div className="w-full text-center">
                  <CardTitle className="text-lg mb-3 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <Badge className={getStatusBadgeColor(course.status)}>
                    {course.status === "pending"
                      ? "Tasdiqlanish jarayonida"
                      : course.status === "created"
                      ? "Yaratilgan"
                      : course.status === "published"
                      ? "Nashr qilingan"
                      : "Rad etilgan"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <Button
                onClick={handleNavigateToLessons}
                variant="outline"
                className="w-full"
              >
                <BookOpen className="size-4 mr-2" />
                Darslar boshqaruvi
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Edit className="size-5 text-muted-foreground" />
                <CardTitle>Kurs ma&apos;lumotlarini tahrirlash</CardTitle>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <TeacherCourseEditForm
                course={course}
                onSuccess={handleSuccess}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseActions;
