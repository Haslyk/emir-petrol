"use client";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  goldGlow?: boolean;
  id?: string;
}

export default function GlassCard({
  children,
  className,
  goldGlow = false,
  id,
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative rounded-sm overflow-hidden",
        "bg-white/[0.04] backdrop-blur-xl",
        "border border-[#D4AF37]/15",
        goldGlow && "shadow-[0_0_30px_rgba(212,175,55,0.08)] hover:shadow-[0_0_60px_rgba(212,175,55,0.18)]",
        "transition-all duration-500",
        className
      )}
    >
      {children}
    </div>
  );
}
