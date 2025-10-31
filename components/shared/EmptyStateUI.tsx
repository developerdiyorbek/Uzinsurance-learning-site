import { BookOpen, Search } from "lucide-react";

interface Props {
  title: string;
  description: string;
  searchTitle?: string;
  searchDescription?: string;
  hasSearch: boolean;
}

function EmptyStateUI({
  hasSearch,
  title,
  description,
  searchTitle,
  searchDescription,
}: Props) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        {hasSearch ? (
          <Search className="h-10 w-10 text-primary" />
        ) : (
          <BookOpen className="h-10 w-10 text-primary" />
        )}
      </div>

      <h3 className="mt-6 font-space-grotesk text-2xl font-bold">
        {hasSearch ? searchTitle : title}
      </h3>

      <p className="mt-2 max-w-sm text-muted-foreground">
        {hasSearch ? searchDescription : description}
      </p>
    </div>
  );
}

export default EmptyStateUI;
