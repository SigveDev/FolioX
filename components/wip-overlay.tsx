import type React from "react";
import { Construction } from "lucide-react";

interface WorkInProgressOverlayProps {
  children: React.ReactNode;
  message?: string;
  isActive?: boolean;
  className?: string;
}

export default function WorkInProgressOverlay({
  children,
  message = "This feature is Work in progress and not ready for use just yet",
  isActive = true,
  className = "",
}: WorkInProgressOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {isActive && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
          <div className="flex max-w-sm flex-col items-center space-y-3 p-6 text-center">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
              <Construction className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">Work in Progress</h3>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
