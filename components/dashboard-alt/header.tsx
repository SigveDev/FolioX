import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";

const DashboardAltHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between w-full px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">FX</span>
            </div>
            <span className="font-bold">FolioX</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </header>
  );
};

export default DashboardAltHeader;
