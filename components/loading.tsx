import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-medium text-foreground">
            Checking authentication
          </h2>
          <p className="text-sm text-muted-foreground">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
