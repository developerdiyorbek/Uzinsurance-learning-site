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
    <div className="flex items-center justify-between gap-3 pb-2 border-b">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Link href={`/user-dashboard/courses/${courseSlug}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold truncate">
            {courseTitle || "Test"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {totalQuestions} savol
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {!isSubmitted && (
          <Badge variant="secondary" className="text-xs px-2 py-0.5 h-6">
            {answeredCount}/{totalQuestions}
          </Badge>
        )}
        {isSubmitted && score !== null && (
          <Badge
            variant="secondary"
            className={cn(
              "text-xs px-2 py-0.5 h-6 gap-1",
              score >= 70
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : score >= 50
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            )}
          >
            <Trophy className="size-3" />
            {score}%
          </Badge>
        )}
      </div>
    </div>
  );
}
