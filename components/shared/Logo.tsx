import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  url?: string;
  size?: "sm" | "md" | "lg";
}

function Logo({ url, size = "md" }: Props) {
  const sizeClasses = {
    sm: "size-24 sm:size-32",
    md: "size-32 sm:size-40 md:size-44",
    lg: "size-40 sm:size-48 md:size-56",
  };

  return (
    <Link href={url || "/"} className="flex items-center justify-center">
      <motion.div
        className={`relative ${sizeClasses[size]} transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/logo.webp"
          alt="O'zagrosug'urta logo"
          fill
          className="block dark:hidden object-contain drop-shadow-lg"
          priority
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
        />

        <Image
          src="/logo-white.webp"
          alt="O'zagrosug'urta logo"
          fill
          className="hidden dark:block object-contain drop-shadow-lg"
          priority
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
        />
      </motion.div>
    </Link>
  );
}

export default Logo;
