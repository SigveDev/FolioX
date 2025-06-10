"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function ErrorPage({
  title = "Authentication Error",
  message = "We couldn't verify your login status. Please try again.",
  actionText = "Try Again",
  onAction = () => window.location.reload(),
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4 px-4 text-center">
        <div className="relative">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Button onClick={onAction} variant="default" className="mt-2">
          {actionText}
        </Button>
      </div>
    </div>
  );
}
