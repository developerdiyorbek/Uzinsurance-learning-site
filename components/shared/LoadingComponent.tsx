import { Loader } from "lucide-react";

function LoadingComponent() {
  return (
    <div className="flex items-center flex-col gap-5 justify-center mt-5">
      <Loader className="animate-spin max-md:size-[24px] size-[30px] text-primary" />
      <p className="text-lg max-md:text-sm text-primary">Yuklanmoqda...</p>
    </div>
  );
}

export default LoadingComponent;
