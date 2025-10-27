"use client";

import { Button } from "@/components/ui/button";
import {
  adminNavLinks,
  instructorNavLinks,
  profileNavLinks,
} from "@/constants";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  page: "admin" | "instructor" | "user";
}

function Sidebar({ page }: Props) {
  const pathname = usePathname();

  const getNavLinks = () => {
    if (page === "admin") {
      return adminNavLinks;
    } else if (page === "instructor") {
      return instructorNavLinks;
    } else {
      return profileNavLinks;
    }
  };

  return (
    <div className="fixed inset-0 mt-[10vh] h-[90vh] w-[300px] max-md:w-24">
      <div className="mt-6 px-4 max-md:px-2">
        <div className="flex flex-col space-y-3">
          {getNavLinks().map((link) => (
            <Link href={link.route} key={link.route}>
              <Button
                className="flex w-full justify-start gap-2 max-md:w-fit max-md:justify-center"
                variant={pathname === link.route ? "secondary" : "ghost"}
              >
                <link.icon className="size-5 text-muted-foreground" />
                <span className="max-md:hidden">{link.label}</span>
              </Button>
            </Link>
          ))}
          <Button
            className="flex w-full justify-start gap-2 max-md:w-fit md:hidden"
            variant={"destructive"}
          >
            <Link href={"/"}>
              <LogOut className="size-5 dark:text-muted-foreground" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
