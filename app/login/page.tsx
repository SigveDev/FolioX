import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite/account";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
