import { Button } from "@/components/ui/button";
import { Trophy, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestScoreCardProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  onReset: () => void;
  onDownloadCertificate?: () => void;
  isDownloading?: boolean;
}

export default function TestScoreCard({
  score,
  correctCount,
  totalQuestions,
  onReset,
  onDownloadCertificate,
  isDownloading = false,
}: TestScoreCardProps) {
  const getScoreColor = () => {
    if (score >= 80) return "emerald";
    if (score >= 70) return "emerald";
    if (score >= 50) return "amber";
    return "rose";
  };

  const color = getScoreColor();
  const canGetCertificate = score >= 80;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-center space-y-3",
        color === "emerald"
          ? "border-emerald-500/30 bg-emerald-500/5"
          : color === "amber"
          ? "border-amber-500/30 bg-amber-500/5"
          : "border-rose-500/30 bg-rose-500/5"
      )}
    >
      <div
        className={cn(
          "mx-auto w-12 h-12 rounded-full flex items-center justify-center",
          color === "emerald"
            ? "bg-emerald-500/20"
            : color === "amber"
            ? "bg-amber-500/20"
            : "bg-rose-500/20"
        )}
      >
        <Trophy
          className={cn(
            "size-6",
            color === "emerald"
              ? "text-emerald-600 dark:text-emerald-400"
              : color === "amber"
              ? "text-amber-600 dark:text-amber-400"
              : "text-rose-600 dark:text-rose-400"
          )}
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-foreground">{score}%</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {correctCount}/{totalQuestions} to&apos;g&apos;ri
        </p>
        {canGetCertificate && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            ✓ Sertifikat olish mumkin
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        {canGetCertificate && onDownloadCertificate && (
          <Button
            onClick={onDownloadCertificate}
            size="sm"
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
            disabled={isDownloading}
          >
            <Download className="size-3 mr-1.5" />
            {isDownloading ? "Yuklanmoqda..." : "Sertifikat"}
          </Button>
        )}
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="h-8 text-xs"
        >
          <RotateCcw className="size-3 mr-1.5" />
          Qayta urinish
        </Button>
      </div>
    </div>
  );
}
