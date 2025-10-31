"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

function AdvancedErrorComponent({
  message = "Kutilmagan xatolik yuz berdi",
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/25 bg-destructive/5 p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 animate-pulse">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      <h3 className="mt-6 font-space-grotesk text-2xl font-bold text-foreground">
        Xatolik yuz berdi
      </h3>

      <p className="mt-2 max-w-md text-muted-foreground">
        {message}. Iltimos, qaytadan urinib ko&apos;ring yoki sahifani
        yangilang.
      </p>

      <div className="mt-6 flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Qayta urinish
          </Button>
        )}

        <Button onClick={() => window.location.reload()} variant="outline">
          Sahifani yangilash
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Agar muammo davom etsa, texnik yordam bilan bog&apos;laning
      </p>
    </div>
  );
}

export default AdvancedErrorComponent;
