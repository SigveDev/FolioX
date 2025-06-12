"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { CreditCard, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useAccount } from "@/hooks/use-account";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();
  const { profile, logout, hardRefresh } = useAccount();

  const handleSignOut = async () => {
    try {
      const response = await logout();
      if (response) {
        hardRefresh();
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
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between w-full px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FX</span>
          </div>
          <span className="font-bold text-xl">FolioX</span>
        </Link>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} alt="User" />
                  <AvatarFallback>
                    {profile?.full_name
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
        </div>
      </div>
    </header>
  );
}
