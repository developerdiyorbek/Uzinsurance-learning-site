"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  isScrollable?: boolean;
}

export const ReusableModal: FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  isScrollable,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {isScrollable ? (
          <ScrollArea className="max-h-[80vh]">{children}</ScrollArea>
        ) : (
          <div>{children}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
