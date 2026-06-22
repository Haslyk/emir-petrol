"use client";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  className?: string;
  showIcon?: boolean;
}

export default function ImagePlaceholder({
  label,
  aspectRatio = "landscape",
  className,
  showIcon = true,
}: ImagePlaceholderProps) {
  const aspectClass = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectClass,
        "bg-gradient-to-br from-[#151515] via-[#1a1a1a] to-[#0B0B0B]",
        "border border-[#D4AF37]/20",
        "flex flex-col items-center justify-center gap-3",
        "group",
        className
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/60" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#D4AF37]/5" />

      {/* Center content */}
      {showIcon && (
        <div className="relative z-10 w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#D4AF37]/5">
          <svg
            className="w-6 h-6 text-[#D4AF37]/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
            <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      <span className="relative z-10 text-[#D4AF37]/70 text-xs font-cinzel tracking-widest uppercase px-4 text-center">
        {label}
      </span>
    </div>
  );
}
