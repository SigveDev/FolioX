"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

type Props = {
  iconName: string;
  size?: number;
  color?: string;
};

export default function LucideIconFromString({
  iconName,
  size = 24,
  color = "currentColor",
}: Props) {
  const IconComponent = useMemo(() => {
    try {
      return dynamic(() =>
        import("lucide-react").then((mod) => {
          const Icon = (mod as any)[iconName];
          return Icon || Loader2;
        })
      );
    } catch {
      return Loader2;
    }
  }, [iconName]);

  return <IconComponent size={size} color={color} />;
}
