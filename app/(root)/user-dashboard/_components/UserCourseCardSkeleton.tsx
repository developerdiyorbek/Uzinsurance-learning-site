"use client";

interface Props {
  show_creator?: boolean;
}

function UserCourseCardSkeleton({ show_creator }: Props) {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border bg-card">
      <div className="relative h-52 w-full bg-muted" />

      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

        {show_creator && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseCardSkeleton;
