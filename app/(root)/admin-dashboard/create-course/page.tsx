import CreateCourseForm from "@/components/forms/CreateCourseForm";
import PageHeader from "@/components/shared/PageHeader";

function Page() {
  return (
    <>
      <PageHeader
        title="Kurs yaratish"
        description="Kurs nomi, mazmuni va boshqa ma’lumotlarni kiriting — yangi o‘quv kursingizni yarating!"
        className="mb-4"
      />
      <CreateCourseForm isAdmin />
    </>
  );
}

export default Page;
