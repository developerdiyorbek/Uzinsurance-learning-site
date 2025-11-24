import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TestResult, IUserTest } from "@/types";

interface TestResultsProps {
  results: TestResult[];
  tests: IUserTest[];
}

export default function TestResults({ results, tests }: TestResultsProps) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-sm font-semibold text-foreground pb-2 border-b">
        Batafsil natijalar
      </h3>
      <div className="space-y-2">
        {results.map((result, index) => {
          const test = tests.find((t) => t._id === result.test_id);
          const isCorrect = result.is_correct;

          return (
            <div
              key={result.test_id}
              className={cn(
                "rounded-lg border-2 p-3 space-y-2.5 transition-all duration-200 hover:shadow-sm",
                isCorrect
                  ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5"
                  : "border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-rose-500/5"
              )}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold",
                    isCorrect
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                      : "bg-rose-500/20 text-rose-700 dark:text-rose-400"
                  )}
                >
                  {index + 1}
                </div>
                <p className="flex-1 text-xs font-medium text-foreground leading-snug">
                  {result.question}
                </p>
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        To&apos;g&apos;ri
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                      <XCircle className="size-3.5 text-rose-600 dark:text-rose-400" />
                      <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                        Noto&apos;g&apos;ri
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2 pl-9">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    Sizning javobingiz:
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-2 py-0.5 h-5 font-medium",
                      result.user_answer === result.correct_answer
                        ? "border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 shadow-sm"
                        : "border-rose-500 text-rose-700 dark:text-rose-400 bg-rose-500/10 shadow-sm"
                    )}
                  >
                    {result.user_answer
                      ? `${result.user_answer.toUpperCase()}. ${
                          test?.options[result.user_answer]
                        }`
                      : "Javob berilmagan"}
                  </Badge>
                </div>
                {!isCorrect && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      To&apos;g&lsquo;ri javob:
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 h-5 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 font-medium shadow-sm"
                    >
                      {result.correct_answer.toUpperCase()}.{" "}
                      {test?.options[result.correct_answer]}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
