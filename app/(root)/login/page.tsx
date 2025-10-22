import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ModeToggle from "@/components/shared/ModeToggle";
import { bgGradient } from "@/constants";
import LoginForm from "./_components/LoginForm";

function Login() {
  return (
    <main
      className={`min-h-screen flex items-center justify-center relative ${bgGradient}`}
    >
      <Card className="w-full max-w-md relative">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Tizimga kirish
          </CardTitle>
          <CardDescription className="text-center">
            Davom etish uchun tizimga kiring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
    </main>
  );
}

export default Login;
