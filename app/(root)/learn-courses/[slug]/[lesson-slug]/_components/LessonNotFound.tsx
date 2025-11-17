"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface LessonNotFoundProps {
  courseSlug: string;
}

export default function LessonNotFound({ courseSlug }: LessonNotFoundProps) {
  const router = useRouter();

  return (
    <div className="text-center space-y-4 py-12">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <BookOpen className="size-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-foreground">Dars topilmadi</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Uzr, bu dars mavjud emas yoki o&apos;chirilgan bo&apos;lishi mumkin.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => router.push(`/learn-courses/${courseSlug}`)}
        size="sm"
      >
        Kursga qaytish
      </Button>
    </div>
  );
}
