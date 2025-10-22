import { Loader } from "lucide-react";

function FullScreenLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="size-8 text-primary animate-spin" />
        <p className="text-primary dark:text-white text-sm">Yuklanmoqda...</p>
      </div>
    </div>
  );
}

export default FullScreenLoading;
