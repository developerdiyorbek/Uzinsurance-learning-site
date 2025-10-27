"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader, PlusCircle, User, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ReusableModal } from "@/components/shared/ReusableModal";
import { QUERY_KEYS } from "@/constants";
import customAxios from "@/configs/customAxios";
import { IUser } from "@/types";
import { addAndEditUserSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/shared/PhoneInput";
import { HiEye, HiEyeOff } from "react-icons/hi";

type UserSchemaType = z.infer<ReturnType<typeof addAndEditUserSchema>>;

interface Props {
  isEdit?: boolean;
  user?: IUser;
}

function AddandEditUserModal({ isEdit, user }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(addAndEditUserSchema(Boolean(isEdit))),
    defaultValues: {
      p_seria: "",
      p_number: "",
      pinfl: "",
      phone_number: "",
      password: "",
      role: user ? user.role : "user",
      status: user ? user.status : "active",
    },
  });

  useEffect(() => {
    if (isEdit && user) {
      form.setValue("status", user?.status);
      form.setValue("password", "");
      form.setValue("role", user?.role || "user");
      form.setValue("phone_number", user?.phone_number);
      form.setValue("pinfl", user?.pinfl);
      form.setValue("p_seria", user?.passport_seria);
      form.setValue("p_number", String(user?.passport_number));
    }
  }, [user, isEdit, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.users],
    mutationFn: async (values: UserSchemaType) => {
      if (isEdit && user) {
        const { data } = await customAxios.put(`admin/users/${user._id}`, {
          password: values.password || null,
          role: values.role,
          status: values.status,
        });
        return data;
      } else {
        const { data } = await customAxios.post("admin/users", {
          p_seria: values.p_seria.toUpperCase(),
          p_number: values.p_number,
          pinfl: values.pinfl,
          phone_number: values.phone_number.replaceAll(" ", ""),
          password: values.password,
          role: values.role,
          status: values.status,
        });
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] });
      toast.success(
        isEdit
          ? "Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi!"
          : "Foydalanuvchi muvaffaqiyatli qo'shildi!"
      );
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || "Kutilmagan xatolik!";
      toast.error(errorMessage);
    },
  });

  function onSubmit(values: UserSchemaType) {
    mutate(values);
  }

  return (
    <>
      {isEdit ? (
        <Button
          size="icon"
          onClick={() => setOpen(true)}
          className="dark:text-white  cursor-pointer mr-2"
        >
          <Edit className="size-4" />
        </Button>
      ) : (
        <Button className="gap-2 cursor-pointer" onClick={() => setOpen(true)}>
          <PlusCircle className="size-4" />
          Foydalanuvchi qo&apos;shish
        </Button>
      )}

      <ReusableModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={isEdit ? "Ma'lumotlarni tahrirlash" : "Foydalanuvchi qo'shish"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="p_seria"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Passport seria<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="AA"
                        {...field}
                        className={`uppercase ${isEdit && "bg-muted"}`}
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="p_number"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Passport raqami <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="1234567"
                        {...field}
                        className={`${isEdit && "bg-muted"}`}
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="pinfl"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    JSHSHIR <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="JSHSHIR"
                      {...field}
                      className={`${isEdit && "bg-muted"}`}
                      disabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Telefon raqam <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      onChange={field.onChange}
                      className={`${isEdit && "bg-muted"}`}
                      disabled={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Parol {!isEdit && <span className="text-red-500">*</span>}
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={
                          isEdit ? "Yangi parol (ixtiyoriy)" : "Parol"
                        }
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute outline-none cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-primary dark:text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <HiEyeOff size={20} />
                        ) : (
                          <HiEye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label className="mb-1 block">
                    Foydalanuvchi roli <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer focus:border-primary">
                        <User className="size-4 text-muted-foreground" />
                        <SelectValue placeholder="Foydalanuvchi roli" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Oddiy foydalanuvchi</SelectItem>
                      <SelectItem value="teacher">O&apos;qituvchi</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Label className="mb-1 block">
                    Foydalanuvchi holati <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer focus:border-primary">
                        <ShieldCheck className="size-4 text-muted-foreground" />
                        <SelectValue placeholder="Foydalanuvchi holati" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="inactive">No faol</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin size-4 mr-2" />}
              {isEdit ? "Saqlash" : "Qo'shish"}
            </Button>
          </form>
        </Form>
      </ReusableModal>
    </>
  );
}

export default AddandEditUserModal;
