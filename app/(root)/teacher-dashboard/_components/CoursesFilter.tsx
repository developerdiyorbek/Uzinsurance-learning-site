"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, X, Filter, Loader, RotateCw } from "lucide-react";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseStatuses } from "@/constants";

interface CoursesFilterProps {
  refetch: () => void;
  isLoading: boolean;
}

export default function CoursesFilter({
  refetch,
  isLoading,
}: CoursesFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchValue = searchParams.get("search") || "";
  const statusValue = searchParams.get("status") || "";

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

  const handleStatusChange = (value: string) => {
    if (value && value !== "all") {
      updateFilter("status", value);
    } else {
      removeFilter("status");
    }
  };

  return (
    <div className="flex items-center mb-4 justify-between">
      <div className="relative flex-1 max-w-lg">
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

      <div className="flex items-center gap-4">
        <Select value={statusValue || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[200px] cursor-pointer focus:border-primary">
            <Filter className="size-4 text-muted-foreground" />
            <SelectValue placeholder="Statusni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha statuslar</SelectItem>
            {courseStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <RotateCw className="size-4" />
          )}
          Yangilash
        </Button>
      </div>
    </div>
  );
}
