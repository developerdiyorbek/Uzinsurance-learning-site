"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, X } from "lucide-react";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CoursesFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchValue = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const [search, setSearch] = useState(searchValue);

  const updateFilter = (key: string, value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key,
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  const removeFilter = (key: string) => {
    const newUrl = removeUrlQuery({
      params: searchParams.toString(),
      key,
    });
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchValue) {
        if (search) {
          updateFilter("search", search);
        } else {
          removeFilter("search");
        }
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const filters: string[] = [];
    if (searchValue) filters.push("search");
  }, [searchValue, status]);

  return (
    <div className="relative flex-1 max-w-lg mb-4">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Qidirish...."
        className="pl-9 border-input focus:border-primary focus:border"
      />
      {search && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 size-7 cursor-pointer"
          onClick={() => setSearch("")}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
