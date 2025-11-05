import PageHeader from "@/components/shared/PageHeader";
import MyCourses from "../_components/MyCourses";

function Page() {
  return (
    <>
      <PageHeader
        title="Mening kurslarim"
        description="Bu bo‘limda mavjud kurslarni boshqarish va tahrirlash mumkin."
        className="mb-4"
      />
      <MyCourses />
    </>
  );
}

export default Page;
