"use client";

import EmptyStateUI from "@/components/shared/EmptyStateUI";

function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Xabarnomalar</h1>

      <EmptyStateUI
        hasSearch={false}
        title="Hozircha xabarnomalar yo'q"
        description="Sizda hozircha yangi xabarnomalar mavjud emas."
      />
    </div>
  );
}

export default Page;
