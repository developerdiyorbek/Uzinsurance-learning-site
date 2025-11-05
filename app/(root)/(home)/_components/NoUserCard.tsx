"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import ModeToggle from "@/components/shared/ModeToggle";
import { bgGradient } from "@/constants";

function NoUserCard() {
  const router = useRouter();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${bgGradient}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-green-100/30 to-transparent dark:from-emerald-900/10 dark:via-teal-900/5 backdrop-blur-[2px] pointer-events-none" />

      <Card className="w-full max-w-md relative shadow-xl border-none bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl">
        <CardHeader>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="p-4 rounded-2xl w-full bg-gradient-to-br from-emerald-50 to-green-100 flex justify-center dark:from-emerald-950/60 dark:to-emerald-900/20 shadow-inner">
              <Logo />
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="px-6">
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[20px] sm:text-2xl font-bold text-center text-primary mb-2 dark:text-white"
          >
            O&apos;quv platformasiga xush kelibsiz!
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-sm sm:text-base text-muted-foreground mb-6"
          >
            Tizimga kirish orqali bilim va o‘rganish imkoniyatlari dunyosiga
            yo‘l oching.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileTap={{ scale: 0.96 }}
          >
            <Button onClick={() => router.push("/login")} className="w-full">
              Tizimga kirish
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-6 right-6"
      >
        <ModeToggle />
      </motion.div>
    </section>
  );
}

export default NoUserCard;
