import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        O‘quv platformaga xush kelibsiz!
      </h1>
      <p className="text-gray-700 mb-8 text-center max-w-md">
        Bu tizim faqat ruxsat berilgan foydalanuvchilar uchun mo‘ljallangan.
        Iltimos, tizimga kirish uchun login qiling.
      </p>
      <Link
        href="/login"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-all duration-300"
      >
        Login
      </Link>
    </div>
  );
}
