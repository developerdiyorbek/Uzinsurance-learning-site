"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation";
import z from "zod";
import { AxiosError } from "axios";
import customAxios from "@/configs/customAxios";
import { toast } from "react-toastify";
import useUser from "@/hooks/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User, Camera, X, Upload, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type UserSchema = z.infer<typeof userSchema>;

export default function Profile() {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      avatar: null,
      password: "",
      confirmPassword: "",
    },
  });

  const avatarFile = form.watch("avatar");
  const currentAvatar = preview || user?.avatar || null;

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (!file) {
        setPreview(null);
        form.setValue("avatar", null);
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Faqat rasm fayl yuklash mumkin!");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("Rasm hajmi 10MB dan oshmasligi kerak!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue("avatar", file);
    },
    [form]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    form.setValue("avatar", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserSchema) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (data.avatar) formData.append("image", data.avatar);
      if (data.password) formData.append("password", data.password);

      await customAxios.post("/auth/user", formData);

      toast.success("Profil muvaffaqiyatli yangilandi!");
      setPreview(null);
      form.reset({
        avatar: null,
        password: "",
        confirmPassword: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const msg = err.response?.data?.message || "Kutilmagan xatolik yuz berdi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Profilni yangilash
          </h1>
          <p className="text-muted-foreground">
            Profil ma&apos;lumotlaringizni va parolingizni yangilashingiz mumkin
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div
                      className={cn(
                        "relative size-32 rounded-full border-4 border-background shadow-xl overflow-hidden cursor-pointer transition-all duration-300",
                        isDragging
                          ? "ring-4 ring-primary ring-offset-3 scale-110"
                          : "hover:scale-105 hover:shadow-primary/20",
                        currentAvatar
                          ? "border-primary/30 shadow-primary/10"
                          : "bg-gradient-to-br from-primary to-primary/80"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {currentAvatar ? (
                        <Image
                          src={currentAvatar}
                          alt="Avatar"
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <User className="size-16 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
                          <Camera className="size-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {avatarFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove();
                        }}
                        className="absolute -top-1 -right-1 size-8 rounded-full bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:scale-110 transition-all duration-200 flex items-center justify-center z-10 border-2 border-background"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {user?.first_name} {user?.last_name}
                      </p>
                      {user?.middle_name && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {user.middle_name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-2 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                      >
                        <Upload className="size-3.5" />
                        {avatarFile ? "O&apos;zgartirish" : "Rasm yuklash"}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG yoki WEBP (maks. 10MB)
                      </p>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={() => (
                    <div className="mt-4">
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    Shaxsiy ma&apos;lumotlar
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Bu ma&apos;lumotlar o&apos;zgartirib bo&apos;lmaydi
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Ism
                    </FormLabel>
                    <Input
                      value={user?.first_name || ""}
                      readOnly
                      className="bg-muted/50 border-2 cursor-not-allowed h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Familiya
                    </FormLabel>
                    <Input
                      value={user?.last_name || ""}
                      readOnly
                      className="bg-muted/50 border-2 cursor-not-allowed h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Otasining ismi
                    </FormLabel>
                    <Input
                      value={user?.middle_name || ""}
                      readOnly
                      className="bg-muted/50 border-2 cursor-not-allowed h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                      Telefon raqami
                    </FormLabel>
                    <Input
                      value={user?.phone_number || ""}
                      readOnly
                      className="bg-muted/50 border-2 cursor-not-allowed h-10 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    Parolni o&apos;zgartirish
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Parolni o&apos;zgartirish uchun quyidagi maydonlarni
                    to&apos;ldiring
                  </p>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Yangi parol
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Yangi parolni kiriting"
                              className="h-10 text-sm border-2 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Parolni tasdiqlash
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Parolni qayta kiriting"
                              className="h-10 text-sm border-2 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => {
                  form.reset();
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="border-2 hover:bg-muted transition-all duration-200"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={loading}
                size="default"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[120px] cursor-pointer"
              >
                {loading ? "Yangilanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
