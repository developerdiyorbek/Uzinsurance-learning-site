import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

interface TestEmptyProps {
  courseSlug: string;
}

export default function TestEmpty({ courseSlug }: TestEmptyProps) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center space-y-4">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
        <FileQuestion className="size-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Testlar mavjud emas
        </h3>
        <p className="text-xs text-muted-foreground">
          Bu kursda hozircha testlar mavjud emas.
        </p>
      </div>
      <Link href={`/user-dashboard/courses/${courseSlug}`}>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <ArrowLeft className="size-3 mr-1.5" />
          Orqaga
        </Button>
      </Link>
    </div>
  );
}

