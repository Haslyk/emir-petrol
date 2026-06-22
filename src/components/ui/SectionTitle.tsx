"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-4", alignClass, className)}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[#D4AF37] text-xs font-cinzel uppercase tracking-[0.4em] block"
        >
          {label}
        </motion.span>
      )}

      <h2 className="font-cinzel font-bold text-[#F8F8F8] leading-tight flex flex-wrap gap-x-[0.3em] gap-y-1">
        {title.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>


      {/* Gold line divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
        className={cn(
          "h-px w-24",
          "bg-gradient-to-r from-[#D4AF37] via-[#F5C542] to-transparent",
          align === "center" && "mx-auto"
        )}
      />


      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#B5B5B5] text-base leading-relaxed max-w-2xl font-montserrat"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
