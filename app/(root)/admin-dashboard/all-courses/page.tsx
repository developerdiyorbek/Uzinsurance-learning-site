import PageHeader from "@/components/shared/PageHeader";
import Courses from "./_components/Courses";

function Page() {
  return (
    <>
      <PageHeader
        title="Kurslar"
        description="Bu bo‘limda mavjud kurslarni boshqarish, yangilarini qo‘shish va tahrirlash mumkin."
        className="mb-4"
      />
      <Courses />
    </>
  );
}

export default Page;
