import PageHeader from "@/components/shared/PageHeader";
import AdminStatistics from "../_components/Statistics";

function Page() {
  return (
    <>
      <PageHeader
        title="Statistikalar"
        description="Tizim statistikalari va umumiy ma'lumotlar"
      />
      <AdminStatistics />
    </>
  );
}

export default Page;
