"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formUrlQuery, removeUrlQuery, textSlice } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { roles, userStatuses } from "@/constants";
import AddandEditUserModal from "./AddandEditUserModal";

export default function UsersFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchValue = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const role = searchParams.get("role") || "";

  const [search, setSearch] = useState(searchValue);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const clearFilters = () => {
    router.push("/admin-dashboard/users", { scroll: false });
    setSearch("");
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
    if (status) filters.push("status");
    if (role) filters.push("role");

    setActiveFilters(filters);
  }, [searchValue, status, role]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Qidirish..."
            className="pl-9 dark:text-white"
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
      </div>

      <div className="flex justify-between max-md:flex-col max-md:gap-5">
        <div className="flex gap-3 w-full flex-wrap">
          <Select
            value={status}
            onValueChange={(value) => updateFilter("status", value)}
          >
            <SelectTrigger className="w-full sm:w-[180px] focus:border-primary cursor-pointer dark:text-white">
              <SelectValue placeholder="Foydalanuvchi holati" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active" className="cursor-pointer">
                Faol
              </SelectItem>
              <SelectItem value="inactive" className="cursor-pointer">
                Faol emas
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={role}
            onValueChange={(value) => updateFilter("role", value)}
          >
            <SelectTrigger className="w-full sm:w-[180px] focus:border-primary cursor-pointer dark:text-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="cursor-pointer"
                >
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AddandEditUserModal />
      </div>

      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 items-center"
          >
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>

            {searchValue && (
              <Badge variant="outline" className="animate-fadeIn group">
                Search: {textSlice(searchValue, 15)}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-4 ml-1 opacity-60 group-hover:opacity-100 cursor-pointer"
                  onClick={() => {
                    removeFilter("search");
                    setSearch("");
                  }}
                >
                  <X className="size-4" />
                </Button>
              </Badge>
            )}

            {status && (
              <Badge variant="outline" className={cn("animate-fadeIn group")}>
                Status:{" "}
                {userStatuses.find((item) => item.value === status)?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-4 ml-1 cursor-pointer opacity-60 group-hover:opacity-100"
                  onClick={() => removeFilter("status")}
                >
                  <X className="size-3" />
                </Button>
              </Badge>
            )}

            {role && (
              <Badge variant="outline" className={cn("animate-fadeIn group")}>
                Role: {role}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-4 ml-1 cursor-pointer opacity-60 group-hover:opacity-100"
                  onClick={() => removeFilter("role")}
                >
                  <X className="size-3" />
                </Button>
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              className="text-sm hover:bg-muted ml-auto hidden hover:text-red-500 text-red-400 sm:flex cursor-pointer"
              onClick={clearFilters}
            >
              <Trash2 className="size-4" />
              Tozalash
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
