import Link from "next/link";
import { Button } from "../ui/button";

export default function LandingPageHeader({
  activeSection = "home",
}: {
  activeSection?: "home" | "features" | "pricing" | "examples";
}) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex justify-center">
      <div className="flex h-16 items-center justify-between w-full px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FX</span>
          </div>
          <span className="font-bold text-xl">FolioX</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#features"
            className={`${
              activeSection === "features"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } transition-colors`}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`${
              activeSection === "pricing"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } transition-colors`}
          >
            Pricing
          </Link>
          <Link
            href="/examples"
            className={`${
              activeSection === "examples"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } transition-colors`}
          >
            Examples
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
