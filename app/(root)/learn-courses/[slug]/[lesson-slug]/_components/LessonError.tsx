"use client";

import AdvancedErrorComponent from "@/components/shared/AdvancedErrorComponent";

interface LessonErrorProps {
  onRetry: () => void;
}

export default function LessonError({ onRetry }: LessonErrorProps) {
  return (
    <div className="space-y-4">
      <AdvancedErrorComponent onRetry={onRetry} />
    </div>
  );
}
