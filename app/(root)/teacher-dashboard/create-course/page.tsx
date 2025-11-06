import PageHeader from "@/components/shared/PageHeader";
import CreateCourseForm from "../_components/CreateCourseForm";

function Page() {
  return (
    <>
      <PageHeader
        title="Kurs yaratish"
        description="Kurs nomi, mazmuni va boshqa ma’lumotlarni kiriting — yangi o‘quv kursingizni yarating!"
        className="mb-4"
      />
      <CreateCourseForm />
    </>
  );
}

export default Page;
