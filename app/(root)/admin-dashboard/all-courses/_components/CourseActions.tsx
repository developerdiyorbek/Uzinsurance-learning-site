"use client";

import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import AlertModal from "@/components/shared/AlertModal";
import CustomImage from "@/components/shared/CustomImage";
import PageHeader from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import customAxios from "@/configs/customAxios";
import { getStatusBadgeColor, QUERY_KEYS } from "@/constants";
import { useGetCourseBySlug } from "@/hooks/useGetCourseBySlug";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BookOpen, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import CourseEditForm from "../[slug]/_components/CourseEditForm";
import CourseActionsSkeleton from "./CourseActionsSkeleton";

function CourseActions() {
  const params = useParams();
  const slug = params.slug as string;
  const { course, isLoading, error } = useGetCourseBySlug(slug);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.coursesSlug, slug],
    });
  };

  const handleNavigateToLessons = () => {
    router.push(`/admin-dashboard/all-courses/${slug}/lessons`);
  };

  const handleDelete = async () => {
    if (!course) return;

    try {
      setIsDeleting(true);
      await customAxios.delete(`admin/courses/${course.slug}`);
      toast.success("Kurs muvaffaqiyatli o'chirildi");
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.coursesSlug, slug],
      });
      router.push("/admin-dashboard/all-courses");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || "Kursni o'chirishda xatolik";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <CourseActionsSkeleton />;

  if (error || !course) return <AdvancedErrorComponent />;

  return (
    <>
      <PageHeader
        title={course?.title}
        description="Kurs ma'lumotlarini tahrirlash"
        className="mb-4"
      />

      <Card className="mb-5">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border flex-shrink-0">
              <CustomImage
                src={course.image}
                alt={course.title}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <CardTitle className="text-xl line-clamp-2">
                  {course.title}
                </CardTitle>
                <Badge className={getStatusBadgeColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {course.teacher && (
                  <span>
                    O&apos;qituvchi: {course.teacher.first_name}{" "}
                    {course.teacher.last_name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Kurs ma&apos;lumotlarini tahrirlash</CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={handleNavigateToLessons} variant="outline">
                <BookOpen className="size-4 mr-2" />
                Darslar boshqaruvi
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                variant="destructive"
              >
                <Trash2 className="size-4 mr-2" />
                O&apos;chirish
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CourseEditForm course={course} onSuccess={handleSuccess} />
        </CardContent>
      </Card>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title="Kursni o'chirish"
        description="Ushbu kursni o'chirishga aminmisiz? Bu amalni bajarganingizda, kurs va uning barcha darslari o'chiriladi va qayta tiklanmaydi."
        btnContinue="O'chirish"
      />
    </>
  );
}

export default CourseActions;
