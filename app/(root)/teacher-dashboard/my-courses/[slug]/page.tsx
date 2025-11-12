import { Metadata } from "next";
import TeacherCourseActions from "./_components/TeacherCourseActions";

export const metadata: Metadata = {
  title: "Kurs ma'lumotlarini tahrirlash",
  description: "Kurs ma'lumotlarini tahrirlash",
};

export default function Page() {
  return (
    <>
      <TeacherCourseActions />
    </>
  );
}
