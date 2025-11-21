import { Metadata } from "next";
import TeacherAddandEditTestForm from "../../_components/TeacherAddandEditTestForm";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Testni tahrirlash",
  description: "Test ma'lumotlarini tahrirlash",
};

export default function EditTestPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testni tahrirlash"
        description="Test ma'lumotlarini yangilang va saqlang"
        className="mb-6"
      />
      <TeacherAddandEditTestForm isEdit={true} />
    </div>
  );
}
