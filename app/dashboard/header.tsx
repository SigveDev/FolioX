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
import { getCurrentUserProfile, logout } from "@/lib/appwrite/account";
import { toast } from "sonner";
import DropdownMenuHeader from "./dropdown-menu-header";

export default async function DashboardHeader() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return null;
  }

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
          <DropdownMenuHeader profile={profile} />
        </div>
      </div>
    </header>
  );
}
