import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Download,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TestResult } from "@/types";

interface TestResultsProps {
  results: TestResult[];
  courseTitle?: string;
  score: number;
  onReset: () => void;
  onDownloadCertificate?: () => void;
  isDownloading?: boolean;
}

export default function TestResults({
  results,
  courseTitle,
  score,
  onReset,
  onDownloadCertificate,
  isDownloading = false,
}: TestResultsProps) {
  const isSuccess = score >= 80;
  const correctCount = results.filter((r) => r.is_correct).length;
  const totalQuestions = results.length;
  const neededScore = 80;

  return (
    <div className="space-y-4 md:space-y-6">
      {isSuccess ? (
        <>
          <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-6">
            <div className="relative w-40 h-40 md:w-56 md:h-56 animate-bounce-slow">
              <Image
                src="/success.png"
                alt="Muvaffaqiyat"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute animate-pulse",
                    i % 3 === 0 && "text-emerald-400",
                    i % 3 === 1 && "text-amber-400",
                    i % 3 === 2 && "text-rose-400"
                  )}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                >
                  <Sparkles className="size-3 md:size-4 opacity-60" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 md:p-6">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="size-3.5 md:size-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Tabriklaymiz! Testdan muvaffaqiyatli o&apos;tdingiz!
                </span>
              </div>

              <div className="space-y-2 md:space-y-3">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  Siz{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {courseTitle || "kurs"}
                  </span>{" "}
                  testlarida{" "}
                  <span className="text-primary font-bold">
                    {totalQuestions}
                  </span>{" "}
                  savoldan{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {correctCount}
                  </span>{" "}
                  tasiga to&apos;g&apos;ri javob berdingiz.
                </p>

                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {score}%
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Natija
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      {correctCount}/{totalQuestions} to&apos;g&apos;ri
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs md:text-sm text-foreground">
                    Kursni tugatganligi haqida{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      sertifikat
                    </span>{" "}
                    ni yuklab olishiz mumkin.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 pt-3">
                {onDownloadCertificate && (
                  <Button
                    onClick={onDownloadCertificate}
                    size="default"
                    className="w-full sm:w-auto h-9 md:h-10 px-4 md:px-6 text-sm md:text-base bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={isDownloading}
                  >
                    <Download className="size-4 md:size-5 mr-2" />
                    {isDownloading
                      ? "Yuklanmoqda..."
                      : "Sertifikatni yuklab olish"}
                  </Button>
                )}
                <Button
                  onClick={onReset}
                  variant="outline"
                  size="default"
                  className="w-full sm:w-auto h-9 md:h-10 px-4 md:px-6 text-sm md:text-base"
                >
                  <RotateCcw className="size-4 md:size-5 mr-2" />
                  Qayta urinish
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-full flex flex-col items-center justify-center py-4 md:py-6">
            <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-amber-100/50 dark:bg-amber-900/20 flex items-center justify-center border-2 border-amber-300/50 dark:border-amber-700/30">
                  <Target className="size-16 md:size-24 text-amber-500 dark:text-amber-400 opacity-50" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 md:p-6">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="size-3.5 md:size-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400">
                  Testdan o&apos;ta olmadingiz
                </span>
              </div>

              <div className="space-y-2 md:space-y-3">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  Siz{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    {courseTitle || "kurs"}
                  </span>{" "}
                  testlarida{" "}
                  <span className="text-primary font-bold">
                    {totalQuestions}
                  </span>{" "}
                  savoldan{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    {correctCount}
                  </span>{" "}
                  tasiga to&apos;g&apos;ri javob berdingiz.
                </p>

                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400">
                    {score}%
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Natija
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      {correctCount}/{totalQuestions} to&apos;g&apos;ri
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs md:text-sm text-foreground">
                    Sertifikat olish uchun kamida{" "}
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      {neededScore}%
                    </span>{" "}
                    bo&apos;lishi kerak.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 pt-3">
                <Button
                  onClick={onReset}
                  size="default"
                  className="w-full sm:w-auto h-9 md:h-10 px-4 md:px-6 text-sm md:text-base bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <RotateCcw className="size-4 md:size-5 mr-2" />
                  Qayta urinish
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
