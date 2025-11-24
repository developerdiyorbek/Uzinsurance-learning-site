import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface TestNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  allAnswered: boolean;
  isLastQuestion: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function TestNavigation({
  currentIndex,
  totalQuestions,
  answeredCount,
  allAnswered,
  isLastQuestion,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}: TestNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-3 border-t">
      <Button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        variant="ghost"
        size="sm"
        className="h-8"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline ml-1">Oldingi</span>
      </Button>

      <div className="text-center text-xs">
        <span className="text-muted-foreground">
          {answeredCount}/{totalQuestions}
        </span>
        {!allAnswered && (
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Barcha savollarga javob bering
          </p>
        )}
      </div>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || answeredCount === 0}
          size="sm"
          className="h-8 px-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-3 animate-spin mr-1.5" />
              <span className="text-xs">Yuborilmoqda...</span>
            </>
          ) : (
            <span className="text-xs">Yakunlash</span>
          )}
        </Button>
      ) : (
        <Button onClick={onNext} variant="ghost" size="sm" className="h-8">
          <span className="hidden sm:inline mr-1">Keyingi</span>
          <ChevronRight className="size-4" />
        </Button>
      )}
    </div>
  );
}
