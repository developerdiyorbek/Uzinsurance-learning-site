"use client";

import Link from "next/link";
import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <TbError404 className="text-[120px] text-primary dark:text-red-500 mb-6" />

      <h1 className="text-5xl max-md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
        404 - Sahifa topilmadi
      </h1>
      <p className="text-lg max-md:text-base text-gray-500 dark:text-gray-400 mb-8">
        Kechirasiz, siz so‘ragan sahifa mavjud emas yoki o‘chirilgan.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl  bg-primary font-semibold hover:bg-opacity-90 transition-all duration-200 text-white"
      >
        Bosh sahifaga qaytish
      </Link>
    </main>
  );
}

export default NotFound;
