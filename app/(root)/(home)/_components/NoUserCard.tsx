"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/shared/ModeToggle";
import { bgGradient } from "@/constants";
import { GraduationCap } from "lucide-react";
import Image from "next/image";

function NoUserCard() {
  const router = useRouter();

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${bgGradient}`}
    >
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="shadow-lg border bg-white dark:bg-neutral-900">
          <CardHeader className="flex items-center justify-center">
            <Image
              src="/logo.webp"
              alt="O'zagrosug'urta logo"
              className="block dark:hidden"
              priority
              width={220}
              height={220}
            />
            <Image
              src="/logo-white.webp"
              alt="O'zagrosug'urta logo"
              width={220}
              height={220}
              className="hidden dark:block"
              priority
            />
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-center text-primary dark:text-white mb-3">
              O&apos;quv platformasiga xush kelibsiz!
            </h1>

            <p className="text-center text-sm text-muted-foreground mb-8 leading-relaxed">
              Tizimga kirish orqali bilim va o&apos;rganish imkoniyatlari
              dunyosiga yo&apos;l oching.
            </p>

            <Button
              onClick={() => router.push("/login")}
              className="w-full h-11 text-base font-medium"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Tizimga kirish
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ModeToggle />
      </div>
    </section>
  );
}

export default NoUserCard;
