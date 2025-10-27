"use client";

import { useSearchParams } from "next/navigation";
import ErrorComponent from "@/components/shared/ErrorComponent";
import DataTable from "@/components/shared/ReusableDataTable";
import { IUser } from "@/types";
import { DataTableSkeleton } from "@/components/shared/DataTableSkeleton";
import { useGetUsers } from "@/hooks/useGetUsers";
import UsersFilter from "./UsersFilter";
import columns from "./Columns";

const rowColors = (row: IUser) => {
  const colorsObj: Record<string, string> = {
    admin:
      "whitespace-nowrap bg-[#d1e7dd] text-[#0a3622] dark:bg-green-900/30 dark:text-green-300",
    user: "whitespace-nowrap bg-[#fff3cd] text-[#664d03] dark:bg-yellow-900/30 dark:text-yellow-300",
    teacher:
      "whitespace-nowrap bg-[#f8d7da] text-[#58151c] dark:bg-red-900/30 dark:text-red-300",
  };

  return colorsObj[row.role] || "whitespace-nowrap";
};

function UsersTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 10);
  const searchValue = searchParams.get("search") || "";
  const userStatus = searchParams.get("status") || "";
  const role = searchParams.get("role") || "";

  const { users, isLoading, error, totalPages } = useGetUsers(
    page,
    pageLimit,
    searchValue,
    userStatus,
    role
  );

  return (
    <>
      <div className="my-4">
        <UsersFilter />
      </div>
      {!isLoading && error && <ErrorComponent />}
      {isLoading && <DataTableSkeleton rowCount={4} columnCount={4} />}
      {!isLoading && !error && (
        <DataTable
          columns={columns}
          data={users}
          pageCount={totalPages}
          rowColors={rowColors}
        />
      )}
    </>
  );
}

export default UsersTable;
