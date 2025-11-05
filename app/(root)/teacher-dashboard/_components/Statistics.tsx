"use client";

import { MonitorPlay, Users } from "lucide-react";
import StatisticsCard from "@/components/shared/StatisticsCard";
import ErrorComponent from "@/components/shared/ErrorComponent";
import { formatAndDivideNumber } from "@/lib/utils";
import { useGetTeacherStatistics } from "@/hooks/useGetTeacherStatistics";

function TeacherStatistics() {
  const { statistics, isLoading, error } = useGetTeacherStatistics();

  if (error) return <ErrorComponent />;

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1 ">
      <StatisticsCard
        title="Kurslarim"
        value={formatAndDivideNumber(statistics?.total_courses || 0)}
        icon={MonitorPlay}
        isLoading={isLoading}
        color="orange"
      />
      <StatisticsCard
        title="O'quvchilar soni"
        value={formatAndDivideNumber(statistics?.total_students || 0)}
        icon={Users}
        isLoading={isLoading}
        color="blue"
      />
    </div>
  );
}

export default TeacherStatistics;
