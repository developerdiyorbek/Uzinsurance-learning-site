"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { STORAGE_KEYS } from "@/constants";
import { isValidUser } from "@/lib/utils";
import { logInSchema } from "@/lib/validation";
import localStorageService from "@/services/localStorage.service";
import { setUser } from "@/lib/slices/auth.slice";
import { Label } from "@/components/ui/label";
import { Loader, Lock, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { logInAction } from "@/actions/user.action";
import PhoneInput from "@/components/shared/PhoneInput";

type LogInType = z.infer<typeof logInSchema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const form = useForm<LogInType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: LogInType) {
    setLoading(true);

    try {
      const response = await logInAction({
        phone_number: values.phoneNumber.replaceAll(" ", ""),
        password: values.password,
      });

      const data = response?.data;

      if (!data?.success) {
        throw new Error(data?.error || "Invalid credentials!");
      }

      const { user } = data?.data;

      console.log("user", user);

      if (!isValidUser(user)) {
        throw new Error("Invalid credentials!");
      }

      localStorageService.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        user?.access_token
      );

      localStorageService.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        user?.refresh_token
      );

      dispatch(setUser(user));
      router.replace("/");
    } catch (error) {
      const err = error as Error;
      toast.error(
        err.message ||
          "Tizimga kirishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <Phone className="size-4 text-primary" />
                Telefon raqam
              </Label>
              <FormControl>
                <PhoneInput value={field.value} onChange={field.onChange} />
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
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-1.5"
              >
                <Lock className="size-4 text-primary" />
                Parol
              </Label>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    className="pr-10"
                    {...field}
                    id="password"
                    name="password"
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer dark:text-white"
        >
          {loading && <Loader className="animate-spin" size={16} />}
          Kirish
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
