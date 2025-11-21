import { Metadata } from "next";
import TeacherAddandEditTestForm from "../_components/TeacherAddandEditTestForm";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Yangi test qo'shish",
  description: "Kursga yangi test qo'shish",
};

export default function AddTestPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Yangi test qo'shish"
        description="Kursingizga yangi test qo'shing va o'quvchilaringizni sinab ko'ring"
        className="mb-6"
      />
      <TeacherAddandEditTestForm />
    </div>
  );
}
