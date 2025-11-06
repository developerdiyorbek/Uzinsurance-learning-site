"use client";

import CourseCard from "@/components/cards/CourseCard";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { ICourse } from "@/types";
import { useSearchParams } from "next/navigation";
import CourseCardSkeleton from "@/components/cards/CourseCardSkeleton";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { Button } from "@/components/ui/button";
import { Loader, RotateCw } from "lucide-react";
import { useGetTeacherCourses } from "@/hooks/useGetTeacherCourses";
import CoursesFilter from "./CoursesFilter";

function MyCourses() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 6);
  const searchValue = searchParams.get("search") || "";

  const { courses, isLoading, error, refetch } = useGetTeacherCourses(
    page,
    pageLimit,
    searchValue
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <CoursesFilter />

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <RotateCw className="size-4" />
          )}
          Yangilash
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <CourseCardSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && error && <AdvancedErrorComponent />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <CourseCard
              key={course._id}
              course={course}
              link={`/teacher-dashboard/my-courses/${course.slug}`}
            />
          ))}
      </div>

      {!isLoading && !courses?.length && !error && (
        <EmptyStateUI
          hasSearch={!!searchValue}
          title="Hozircha kurslar yo'q"
          description="Platformangizda hali birorta ham kurs mavjud emas. Birinchi kursni yaratishni boshlang."
          searchTitle="Kurs topilmadi"
          searchDescription="Qidiruv bo'yicha hech qanday kurs topilmadi. Boshqa kalit so'z bilan qidiring."
        />
      )}
    </>
  );
}

export default MyCourses;
