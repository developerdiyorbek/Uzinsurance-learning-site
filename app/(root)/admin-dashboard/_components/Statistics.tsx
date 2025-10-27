"use client";

import { Users } from "lucide-react";
import StatisticsCard from "@/components/shared/StatisticsCard";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { useGetStatistics } from "@/hooks/useGetStatistics";
import { formatAndDivideNumber } from "@/lib/utils";

function AdminStatistics() {
  const { statistics, isLoading, error } = useGetStatistics();

  if (error) return <ErrorComponent />;

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1 ">
      <StatisticsCard
        title="Foydalanuvchilar"
        value={formatAndDivideNumber(statistics?.total_users || 0)}
        icon={Users}
        isLoading={isLoading}
        color="orange"
      />
      <StatisticsCard
        title="Umumiy kurslar"
        value={formatAndDivideNumber(statistics?.total_courses || 0)}
        icon={Users}
        isLoading={isLoading}
        color="blue"
      />
    </div>
  );
}

export default AdminStatistics;
