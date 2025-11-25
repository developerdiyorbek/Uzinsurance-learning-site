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
    <div className="flex items-center justify-between gap-2 md:gap-4 pt-3 md:pt-4 border-t">
      <Button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        variant="ghost"
        size="sm"
        className="h-9 md:h-11"
      >
        <ChevronLeft className="size-4 md:size-5" />
        <span className="hidden sm:inline ml-1 md:ml-2">Oldingi</span>
      </Button>

      <div className="text-center text-xs md:text-sm">
        <span className="text-muted-foreground">
          {answeredCount}/{totalQuestions}
        </span>
        {!allAnswered && (
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">
            Barcha savollarga javob bering
          </p>
        )}
      </div>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || answeredCount === 0}
          size="sm"
          className="h-9 md:h-11 px-4 md:px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-3 md:size-4 animate-spin mr-1.5 md:mr-2" />
              <span className="text-xs md:text-sm">Yuborilmoqda...</span>
            </>
          ) : (
            <span className="text-xs md:text-sm">Yakunlash</span>
          )}
        </Button>
      ) : (
        <Button onClick={onNext} variant="ghost" size="sm" className="h-9 md:h-11">
          <span className="hidden sm:inline mr-1 md:mr-2">Keyingi</span>
          <ChevronRight className="size-4 md:size-5" />
        </Button>
      )}
    </div>
  );
}
