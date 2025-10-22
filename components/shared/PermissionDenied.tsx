import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

function PermissionDenied() {
  return (
    <Card className="bg-white shadow-md mt-5">
      <CardContent className="flex flex-col items-center text-center p-8">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Ruxsat berilmagan</h1>
        <p className="mt-2 text-gray-600">
          Kechirasiz, sizda ushbu sahifani ko&apos;rish uchun ruxsat yo&apos;q.
          Agar bu xato deb o&apos;ylasangiz, administrator bilan
          bog&apos;laning.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/admin-dashboard">
            <Button variant="default">Bosh sahifaga qaytish</Button>
          </Link>
          <Button variant="outline">Yordam so&apos;rash</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PermissionDenied;
