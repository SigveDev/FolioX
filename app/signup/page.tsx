import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite/account";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SignupForm />
    </div>
  );
}
