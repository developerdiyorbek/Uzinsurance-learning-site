import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AnswerOption, IUserTest } from "@/types";
import { CheckCircle2 } from "lucide-react";

interface TestProgressProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  tests: IUserTest[];
  answers: Record<string, AnswerOption>;
  onGoToQuestion: (index: number) => void;
}

export default function TestProgress({
  currentIndex,
  totalQuestions,
  answeredCount,
  tests,
  answers,
  onGoToQuestion,
}: TestProgressProps) {
  return (
    <div className="space-y-3 p-3 rounded-lg bg-muted/30 border">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">
          {currentIndex + 1}/{totalQuestions}
        </span>
        <span className="text-muted-foreground">
          {answeredCount}/{totalQuestions} javob
        </span>
      </div>
      <Progress
        value={((currentIndex + 1) / totalQuestions) * 100}
        className="h-1.5"
      />
      <div className="flex items-center gap-1.5 flex-wrap justify-center pt-1">
        {tests.map((test, index) => {
          const isAnswered = !!answers[test._id];
          const isCurrent = index === currentIndex;

          return (
            <button
              key={test._id}
              onClick={() => onGoToQuestion(index)}
              className={cn(
                "relative w-8 h-8 rounded-lg text-[10px] font-semibold transition-all duration-200 flex items-center justify-center group cursor-pointer",
                isCurrent
                  ? "bg-primary text-primary-foreground shadow-md scale-110 ring-2 ring-primary/20"
                  : isAnswered
                  ? "bg-primary/15 text-primary border-2 border-primary/40 hover:bg-primary/25 hover:scale-105 hover:shadow-sm"
                  : "bg-background text-muted-foreground border-2 border-border hover:bg-muted hover:border-primary/30 hover:scale-105"
              )}
              title={`Savol ${index + 1}${
                isAnswered ? " - Javob berilgan" : " - Javob berilmagan"
              }`}
            >
              {isAnswered && !isCurrent && (
                <CheckCircle2 className="absolute -top-1 -right-1 size-3 text-primary bg-background rounded-full" />
              )}
              {index + 1}
              {isCurrent && (
                <span className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
