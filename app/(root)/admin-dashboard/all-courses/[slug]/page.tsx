import { Metadata } from "next";
import CourseActions from "../_components/CourseActions";

export const metadata: Metadata = {
  title: "Kurs ma'lumotlarini tahrirlash",
  description: "Kurs ma'lumotlarini tahrirlash",
};

export default function Page() {
  return (
    <>
      <CourseActions />
    </>
  );
}
