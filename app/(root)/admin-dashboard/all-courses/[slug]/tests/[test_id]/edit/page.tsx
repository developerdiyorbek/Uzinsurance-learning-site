import AddandEditTestForm from "../../_components/AddandEditTestForm";
import PageHeader from "@/components/shared/PageHeader";

export default function EditTestPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Testni tahrirlash"
        description="Test ma'lumotlarini yangilang"
        className="mb-4"
      />
      <AddandEditTestForm isEdit={true} />
    </div>
  );
}
