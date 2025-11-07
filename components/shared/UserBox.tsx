"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  BookOpen,
  CircleUser,
  GraduationCap,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { useLogout } from "@/services/auth.service";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import AlertModal from "./AlertModal";
import Link from "next/link";
import { HAS_PERM_TO_TEACHER_DASHBOARD, IS_ADMIN } from "@/constants";

interface Props {
  profile_url: string;
}

function UserBox({ profile_url }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const logOut = useLogout();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative size-10 rounded-full bg-primary hover:opacity-90 grid place-items-center duration-150 shadow-md cursor-pointer">
            <User className="size-5 text-white" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-80 rounded-xl shadow-lg border p-2"
          align="start"
          alignOffset={11}
        >
          <DropdownMenuGroup>
            <div className="flex items-center gap-3 p-3">
              <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                <User className="size-6" />
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-sm truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.phone_number}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            {IS_ADMIN.includes(user?.role) && (
              <Link href="/admin-dashboard">
                <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-muted/70 rounded-md transition">
                  <Shield className="size-4" />
                  Admin
                </DropdownMenuItem>
              </Link>
            )}

            {HAS_PERM_TO_TEACHER_DASHBOARD.includes(user?.role) && (
              <Link href="/teacher-dashboard">
                <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-muted/70 rounded-md transition">
                  <BookOpen className="size-4" />
                  O‘qituvchi
                </DropdownMenuItem>
              </Link>
            )}

            <Link href="/user-dashboard">
              <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-muted/70 rounded-md transition">
                <GraduationCap className="size-4" />
                O‘quvchi
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />

            <Link href={`${profile_url}/my-profile`}>
              <DropdownMenuItem className="cursor-pointer gap-2 hover:bg-muted/70 rounded-md transition">
                <CircleUser className="size-4" />
                Mening profilim
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="w-full cursor-pointer gap-2 rounded-md"
              onClick={() => setIsOpen(true)}
            >
              <LogOut className="size-4" />
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="🔒 Chiqishdan oldin tasdiqlang"
        description="Dasturdan chiqmoqchimisiz? Hisobingizdan chiqishingiz bilan seans tugatiladi."
        loading={false}
        onConfirm={logOut}
        btnCancel="Bekor qilish"
        btnContinue="Chiqish"
      />
    </>
  );
}

export default UserBox;
