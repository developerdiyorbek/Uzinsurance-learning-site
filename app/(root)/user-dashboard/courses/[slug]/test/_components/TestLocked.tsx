import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, BookOpen, ArrowLeft } from "lucide-react";

interface TestLockedProps {
  progressPercentage: number;
  courseSlug: string;
}

export default function TestLocked({
  progressPercentage,
  courseSlug,
}: TestLockedProps) {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6 text-center space-y-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
        <Lock className="size-6 text-amber-600 dark:text-amber-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Kursni tugatishingiz kerak
        </h3>
        <p className="text-xs text-muted-foreground">
          Barcha darslarni tugatib, keyin test yeching
        </p>
      </div>
      <div className="space-y-2 max-w-xs mx-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold text-foreground">
            {progressPercentage}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-1.5" />
      </div>
      <div className="flex items-center justify-center gap-2 pt-2">
        <Link href={`/learn-courses/${courseSlug}`}>
          <Button size="sm" className="h-8 text-xs">
            <BookOpen className="size-3 mr-1.5" />
            Darslarni davom ettirish
          </Button>
        </Link>
        <Link href={`/user-dashboard/courses/${courseSlug}`}>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <ArrowLeft className="size-3 mr-1.5" />
            Orqaga
          </Button>
        </Link>
      </div>
    </div>
  );
}

