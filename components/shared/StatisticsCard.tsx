import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons/lib";
import { Loader } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon | IconType;
  value: number | string;
  title: string;
  color:
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "red"
    | "orange"
    | "teal"
    | "pink";
  isLoading?: boolean;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-300",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-300",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-700/20 dark:text-purple-300",
  red: "bg-red-100 text-red-800 dark:bg-red-700/20 dark:text-red-300",
  orange:
    "bg-orange-100 text-orange-800 dark:bg-orange-700/20 dark:text-orange-300",
  teal: "bg-teal-100 text-teal-800 dark:bg-teal-700/20 dark:text-teal-300",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-700/20 dark:text-pink-300",
};

function StatisticsCard({
  icon: Icon,
  value,
  title,
  color,
  isLoading = false,
}: StatCardProps) {
  const colorClass =
    colorMap[color] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300";

  return (
    <Card className="shadow-sm overflow-hidden !p-0 border border-border">
      <div className="flex">
        <div
          className={`p-6 flex items-center justify-center ${colorClass} rounded-l-md`}
        >
          <Icon className="size-8" />
        </div>
        <CardContent className="p-6 flex flex-col justify-center">
          <h2 className="text-lg md:text-xl lg:text-2xl font-mdium text-foreground">
            {isLoading ? (
              <Loader className="animate-spin size-6 text-primary" />
            ) : (
              value
            )}
          </h2>
          <p className="mt-1 text-muted-foreground">{title}</p>
        </CardContent>
      </div>
    </Card>
  );
}

export default StatisticsCard;
