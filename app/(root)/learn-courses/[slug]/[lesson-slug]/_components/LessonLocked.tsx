"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LessonLockedProps {
  courseSlug: string;
  previousLessonSlug?: string;
}

export default function LessonLocked({
  courseSlug,
  previousLessonSlug,
}: LessonLockedProps) {
  const router = useRouter();

  return (
    <div className="text-center space-y-4 py-12">
      <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
        <Lock className="size-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-foreground">Dars qulflangan</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Bu darsni ko&apos;rish uchun oldingi darsni tugatishingiz kerak.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        {previousLessonSlug && (
          <Button
            onClick={() =>
              router.push(`/learn-courses/${courseSlug}/${previousLessonSlug}`)
            }
            size="sm"
          >
            Oldingi darsga o&apos;tish
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => router.push(`/learn-courses/${courseSlug}`)}
          size="sm"
        >
          Kursga qaytish
        </Button>
      </div>
    </div>
  );
}
