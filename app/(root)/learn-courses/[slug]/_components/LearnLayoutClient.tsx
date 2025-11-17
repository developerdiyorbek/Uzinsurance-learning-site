"use client";

import { PropsWithChildren, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LearnHeader from "./LearnHeader";
import LearnSidebarWrapper from "./LearnSidebarWrapper";
import LearnSidebar from "./LearnSidebar";

export default function LearnLayoutClient({ children }: PropsWithChildren) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const params = useParams();
  const courseSlug = params?.slug as string;
  const lessonSlug = params?.["lesson-slug"] as string;

  const handleLessonClick = (slug: string) => {
    router.push(`/learn-courses/${courseSlug}/${slug}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <LearnHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <LearnSidebar
          currentLessonSlug={lessonSlug || null}
          onLessonClick={handleLessonClick}
        />
      </LearnHeader>

      <div className="flex relative">
        <LearnSidebarWrapper
          currentLessonSlug={lessonSlug || null}
          onLessonClick={handleLessonClick}
        />

        <main className="flex-1 lg:ml-80 mt-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-gradient-to-b from-background via-background to-muted/10">
          <div className="mx-auto mb-12 w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 min-w-0 pt-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
