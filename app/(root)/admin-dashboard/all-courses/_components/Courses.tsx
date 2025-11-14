"use client";

import CourseCard from "@/components/cards/CourseCard";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import { ICourse } from "@/types";
import { useSearchParams } from "next/navigation";
import CoursesFilter from "./CourseFilter";
import CourseCardSkeleton from "@/components/cards/CourseCardSkeleton";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { useGetAdminCourses } from "@/hooks/useGetAdminCourses";
import Pagination from "@/components/shared/Pagination";

function Courses() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 6);
  const searchValue = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const { courses, isLoading, error, refetch, totalPages, currentPage } =
    useGetAdminCourses(page, pageLimit, searchValue, status);

  return (
    <>
      <CoursesFilter refetch={refetch} isLoading={isLoading} />

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <CourseCardSkeleton key={item} show_creator />
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
              link={`/admin-dashboard/all-courses/${course.slug}`}
              show_creator
            />
          ))}
      </div>

      {!isLoading && !courses?.length && !error && (
        <EmptyStateUI
          hasSearch={!!searchValue || !!status}
          title="Hozircha kurslar yo'q"
          description="Platformangizda hali birorta ham kurs mavjud emas. Birinchi kursni yaratishni boshlang."
          searchTitle="Kurs topilmadi"
          searchDescription="Qidiruv bo'yicha hech qanday kurs topilmadi. Boshqa kalit so'z bilan qidiring."
        />
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
}

export default Courses;
