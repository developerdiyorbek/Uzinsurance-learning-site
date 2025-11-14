"use client";

import UserCourseCard from "../_components/UserCourseCard";
import UserCourseCardSkeleton from "../_components/UserCourseCardSkeleton";
import EmptyStateUI from "@/components/shared/EmptyStateUI";
import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";
import { useGetUserJoinedCourses } from "@/hooks/useGetUserJoinedCourses";
import { BookOpen } from "lucide-react";
import { ICourse } from "@/types";

function Page() {
  const { courses, isLoading, error } = useGetUserJoinedCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="max-sm:text-xl text-2xl font-bold text-foreground">
              Mening kurslarim
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Qo&apos;shilgan kurslaringiz va ularning progressi
            </p>
          </div>
        </div>

        {!isLoading && courses && courses.length > 0 && (
          <div className="px-4 py-2 rounded-lg bg-muted">
            <span className="text-sm font-medium text-foreground">
              {courses.length} {courses.length === 1 ? "kurs" : "kurs"}
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <UserCourseCardSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && error && <AdvancedErrorComponent />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {!isLoading &&
          courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <UserCourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
      </div>

      {!isLoading && !courses?.length && !error && (
        <EmptyStateUI
          hasSearch={false}
          title="Hozircha kursga qo'shilmagansiz"
          description="Siz hali birorta ham kursga qo'shilmagansiz. Kurslarga qo'shilish uchun 'Kurslar' bo'limiga o'ting va o'zingizga mos kursni tanlang."
        />
      )}
    </div>
  );
}

export default Page;
