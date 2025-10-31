"use client";

import CourseCard from "@/components/cards/CourseCard";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { useGetCourses } from "@/hooks/useGetCourses";
import { ICourse } from "@/types";
import { useSearchParams } from "next/navigation";
import CoursesFilter from "./CourseFilter";
import CourseCardSkeleton from "@/components/cards/CourseCardSkeleton";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { Button } from "@/components/ui/button";
import { Loader, RotateCw } from "lucide-react";

function Courses() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 6);
  const searchValue = searchParams.get("search") || "";

  const { courses, isLoading, error, refetch } = useGetCourses(
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

      {error && <AdvancedErrorComponent />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <CourseCard
              key={course._id}
              course={course}
              link={`/admin-dashboard/all-courses/${course.slug}`}
            />
          ))}
      </div>

      {!courses?.length && (
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

export default Courses;
