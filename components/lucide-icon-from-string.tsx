"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

type Props = {
  iconName: string;
  size?: number;
  color?: string;
};

// fallback loader
const FallbackIcon = ({ size, color }: { size: number; color: string }) => (
  <Loader2 size={size} color={color} className="animate-spin" />
);

export default function LucideIconFromString({
  iconName,
  size = 24,
  color = "currentColor",
}: Props) {
  const DynamicIcon = dynamic(
    async () => {
      const mod = await import("lucide-react");
      const Icon = (mod as any)[iconName];
      return Icon || Loader2;
    },
    {
      loading: () => <FallbackIcon size={size} color={color} />,
      ssr: false,
    }
  );

  const IconComponent = DynamicIcon as React.ComponentType<{
    size?: number;
    color?: string;
  }>;
  return <IconComponent size={size} color={color} />;
}
