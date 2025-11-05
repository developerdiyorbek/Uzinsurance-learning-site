import PageHeader from "@/components/shared/PageHeader";
import TeacherStatistics from "../_components/Statistics";

function Page() {
  return (
    <>
      <PageHeader
        title="Statistikalar"
        description="Tizim statistikalari va umumiy ma'lumotlar"
      />
      <TeacherStatistics />
    </>
  );
}

export default Page;
