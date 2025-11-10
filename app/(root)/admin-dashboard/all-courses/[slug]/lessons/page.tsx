"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetCourseBySlug } from "@/hooks/useGetCourseBySlug";
import LessonsManagement from "../_components/LessonsManagement";
import { Loader, ArrowLeft } from "lucide-react";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import PageHeader from "@/components/shared/PageHeader";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { Button } from "@/components/ui/button";

export default function LessonsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { course, isLoading, error, refetch } = useGetCourseBySlug(slug);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.adminCourses] });
  };

  const handleBack = () => {
    router.push(`/admin-dashboard/all-courses/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !course) {
    return <AdvancedErrorComponent />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <PageHeader
          title="Darslar boshqaruvi"
          description={`"${course.title}" kursi uchun darslar qo'shish va tahrirlash`}
          className="mb-0"
        />
      </div>

      <LessonsManagement course={course} onSuccess={handleSuccess} />
    </div>
  );
}
