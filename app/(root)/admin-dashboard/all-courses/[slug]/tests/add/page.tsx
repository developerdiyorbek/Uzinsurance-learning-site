import AddandEditTestForm from "../_components/AddandEditTestForm";
import PageHeader from "@/components/shared/PageHeader";

export default function AddTestPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Yangi test qo'shish"
        description="Kursga yangi test qo'shing"
        className="mb-4"
      />
      <AddandEditTestForm />
    </div>
  );
}
