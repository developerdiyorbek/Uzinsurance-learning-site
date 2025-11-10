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
import Image from "next/image";
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
          <button className="relative size-10 rounded-full bg-primary hover:opacity-90 grid place-items-center duration-200 shadow-md hover:shadow-lg cursor-pointer transition-all border-2 border-primary/20 hover:border-primary/40 overflow-hidden">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <User className="size-5 text-white" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-80 rounded-xl shadow-xl border bg-background/95 backdrop-blur-sm p-3"
          align="start"
          alignOffset={11}
        >
          <DropdownMenuGroup>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="relative size-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-2 border-background overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <User className="size-7" />
                )}
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.phone_number}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator className="my-2" />

            {IS_ADMIN.includes(user?.role) && (
              <Link href="/admin-dashboard">
                <DropdownMenuItem className="cursor-pointer gap-3 hover:bg-primary/10 rounded-lg transition-colors py-2.5">
                  <Shield className="size-4 text-primary" />
                  <span>Admin</span>
                </DropdownMenuItem>
              </Link>
            )}

            {HAS_PERM_TO_TEACHER_DASHBOARD.includes(user?.role) && (
              <Link href="/teacher-dashboard">
                <DropdownMenuItem className="cursor-pointer gap-3 hover:bg-primary/10 rounded-lg transition-colors py-2.5">
                  <BookOpen className="size-4 text-primary" />
                  <span>O&apos;qituvchi</span>
                </DropdownMenuItem>
              </Link>
            )}

            <Link href="/user-dashboard">
              <DropdownMenuItem className="cursor-pointer gap-3 hover:bg-primary/10 rounded-lg transition-colors py-2.5">
                <GraduationCap className="size-4 text-primary" />
                <span>O&apos;quvchi</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="my-2" />

            <Link href={`${profile_url}/my-profile`}>
              <DropdownMenuItem className="cursor-pointer gap-3 hover:bg-primary/10 rounded-lg transition-colors py-2.5">
                <CircleUser className="size-4 text-primary" />
                <span>Mening profilim</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="w-full cursor-pointer gap-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors py-2.5 mt-1"
              onClick={() => setIsOpen(true)}
            >
              <LogOut className="size-4" />
              <span>Chiqish</span>
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
