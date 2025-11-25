import { cn } from "@/lib/utils";
import { AnswerOption, IUserTest } from "@/types";
import { Check } from "lucide-react";

interface TestQuestionProps {
  test: IUserTest;
  questionNumber: number;
  selectedAnswer: AnswerOption | undefined;
  onAnswerChange: (testId: string, answer: AnswerOption) => void;
  isSubmitted: boolean;
}

export default function TestQuestion({
  test,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
  isSubmitted,
}: TestQuestionProps) {
  const options: AnswerOption[] = ["a", "b", "c", "d"];

  return (
    <div className="space-y-3 md:space-y-5">
      {/* Question Header */}
      <div className="flex items-start gap-2.5 md:gap-4 pb-3 md:pb-4 border-b">
        <div className="flex-shrink-0 w-7 h-7 md:w-10 md:h-10 rounded-md md:rounded-lg bg-primary/10 flex items-center justify-center text-xs md:text-base font-bold text-primary">
          {questionNumber}
        </div>
        <p className="flex-1 text-sm md:text-base font-medium text-foreground leading-snug md:leading-relaxed">
          {test.question}
        </p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;

          return (
            <label
              key={option}
              className={cn(
                "relative flex items-center gap-2.5 md:gap-4 p-2.5 md:p-4 rounded-lg border cursor-pointer transition-all duration-150 group",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/50 hover:border-primary/40 hover:bg-muted/40"
              )}
            >
              {/* Custom Radio Button */}
              <div className="relative flex-shrink-0">
                <input
                  type="radio"
                  name={`test-${test._id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => onAnswerChange(test._id, option)}
                  disabled={isSubmitted}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30 group-hover:border-primary/50"
                  )}
                >
                  {isSelected && (
                    <Check className="size-2.5 md:size-3 text-primary-foreground" />
                  )}
                </div>
              </div>

              {/* Option Label */}
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center text-[10px] md:text-xs font-bold transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                {option.toUpperCase()}
              </div>

              {/* Option Text */}
              <span
                className={cn(
                  "flex-1 text-xs md:text-sm font-medium transition-colors",
                  isSelected
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {test.options[option]}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
