import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ReusableModal } from "./ReusableModal";

type TAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
  btnCancel?: string;
  btnContinue?: string;
};

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = "O'chirishga aminmisiz!",
  description = "Ushbu amalni bajarganingizda, ushbu ma'lumotlar o'chiriladi va qayta tiklanmaydi.",
  btnCancel = "Bekor qilish",
  btnContinue = "Davom etish",
}: TAlertModalProps) => {
  return (
    <ReusableModal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          disabled={loading}
          variant="outline"
          className="cursor-pointer"
          onClick={onClose}
        >
          {btnCancel}
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          className="cursor-pointer"
          onClick={onConfirm}
        >
          {loading && <Loader className="animate-spin" />}
          {btnContinue}
        </Button>
      </div>
    </ReusableModal>
  );
};

export default AlertModal;
