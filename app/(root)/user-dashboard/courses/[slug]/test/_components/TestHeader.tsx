import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestHeaderProps {
  courseTitle?: string;
  totalQuestions: number;
  answeredCount: number;
  score: number | null;
  isSubmitted: boolean;
  courseSlug: string;
}

export default function TestHeader({
  courseTitle,
  totalQuestions,
  answeredCount,
  score,
  isSubmitted,
  courseSlug,
}: TestHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-4 pb-2 md:pb-3 border-b">
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
        <Link href={`/user-dashboard/${courseSlug}`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10 shrink-0"
          >
            <ArrowLeft className="size-4 md:size-5" />
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-semibold truncate">
            {courseTitle ? `${courseTitle} kursiga oid testlar` : "Testlar"}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {totalQuestions} ta savol mavjud
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {!isSubmitted && (
          <Badge
            variant="secondary"
            className="text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 h-6 md:h-8"
          >
            {answeredCount}/{totalQuestions}
          </Badge>
        )}
        {isSubmitted && score !== null && (
          <Badge
            variant="secondary"
            className={cn(
              "text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 h-6 md:h-8 gap-1 md:gap-1.5",
              score >= 70
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : score >= 50
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            )}
          >
            <Trophy className="size-3 md:size-4" />
            {score}%
          </Badge>
        )}
      </div>
    </div>
  );
}
