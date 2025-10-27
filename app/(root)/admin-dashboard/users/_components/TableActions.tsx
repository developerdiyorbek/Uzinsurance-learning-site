"use client";

import { IUser } from "@/types";
import AddandEditUserModal from "./AddandEditUserModal";
import { QUERY_KEYS } from "@/constants";
import customAxios from "@/configs/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import AlertModal from "@/components/shared/AlertModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Props {
  userInfo: IUser;
}

function TableActions({ userInfo }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.users],
    mutationFn: async (id: string) => {
      const { data } = await customAxios.delete(`admin/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      });
      toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi!");
      setOpen(false);
    },
  });

  return (
    <>
      <AddandEditUserModal isEdit user={userInfo} />
      <Button
        variant="destructive"
        size={"icon"}
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Trash className="size-4" />
      </Button>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => mutate(userInfo._id)}
        loading={isPending}
        title="Foydalanuvchini o'chirish!"
        description="Ushbu harakat foydalanuvchini o'chiradi va bekor qilib bo'lmaydi!"
      />
    </>
  );
}

export default TableActions;
