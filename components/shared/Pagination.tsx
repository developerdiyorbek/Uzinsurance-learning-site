"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn, formUrlQuery } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  className,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });
    router.push(newUrl);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(renderButton(1));
      if (startPage > 2) pages.push(renderEllipsis("start"));
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderButton(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(renderEllipsis("end"));
      pages.push(renderButton(totalPages));
    }

    return pages;
  };

  const renderButton = (page: number) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={cn(
        "size-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 shadow-sm cursor-pointer",
        currentPage === page
          ? "bg-gradient-to-r from-primary/90 to-primary text-white scale-105 ring-2 ring-main/30 shadow-md"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105 hover:shadow-sm"
      )}
    >
      {page}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <span
      key={`${key}-ellipsis`}
      className="size-9 flex items-center justify-center text-gray-400 select-none"
    >
      •••
    </span>
  );

  const buttonBase =
    "size-9 flex items-center justify-center rounded-xl text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 cursor-pointer";

  return (
    <div
      className={cn("flex items-center justify-center gap-2 mt-8", className)}
    >
      <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-2xl shadow-sm border border-gray-100">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={cn(buttonBase, "text-gray-600 hover:bg-gray-50")}
          aria-label="First page"
        >
          <ChevronsLeft className="size-4" />
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(buttonBase, "text-gray-600 hover:bg-gray-50")}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1.5">{renderPageNumbers()}</div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(buttonBase, "text-gray-600 hover:bg-gray-50")}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(buttonBase, "text-gray-600 hover:bg-gray-50")}
          aria-label="Last page"
        >
          <ChevronsRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
