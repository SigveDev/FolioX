"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/appwrite/account";
import { UserProfile } from "@/types/user-profiles";
import { CreditCard, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DropdownMenuHeader({
  profile,
}: {
  profile: UserProfile;
}) {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const response = await logout();
      if (response) {
        router.push("/");
      } else {
        toast("Error", {
          description:
            "There was an error signing out. Please try again later.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast("Error", {
        description: "There was an error signing out. Please try again later.",
        duration: 3000,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url} alt="User" />
            <AvatarFallback>
              {profile.full_name
                ? (profile.full_name.split(" ")[0]?.[0] || "") +
                  (profile.full_name.split(" ")[1]?.[0] || "")
                : "User"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/billing" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
