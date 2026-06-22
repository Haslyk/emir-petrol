"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
}

const sizeStyle = {
  sm:  { padding: "10px 20px", fontSize: "0.7rem",    letterSpacing: "0.18em" },
  md:  { padding: "13px 32px", fontSize: "0.75rem",   letterSpacing: "0.18em" },
  lg:  { padding: "16px 40px", fontSize: "0.8125rem", letterSpacing: "0.18em" },
};

const variantStyle = {
  solid: {
    base:
      "background: linear-gradient(135deg, #D4AF37 0%, #F5C542 50%, #D4AF37 100%); color: #0B0B0B; font-weight: 600;",
    hover:
      "filter: brightness(1.1); box-shadow: 0 0 30px rgba(212,175,55,0.5);",
  },
  outline: {
    base:
      "background: transparent; color: #D4AF37; border: 1px solid #D4AF37;",
    hover:
      "background: rgba(212,175,55,0.1); box-shadow: 0 0 20px rgba(212,175,55,0.3);",
  },
  ghost: {
    base:  "background: transparent; color: #D4AF37;",
    hover: "color: #F5C542;",
  },
};

export default function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className,
  id,
}: GoldButtonProps) {
  const sharedStyle: React.CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    fontFamily:     "'Cinzel', serif",
    textTransform:  "uppercase",
    borderRadius:   "12px",
    position:       "relative",
    overflow:       "hidden",
    transition:     "all 0.3s ease",
    cursor:         "pointer",
    textDecoration: "none",
    ...sizeStyle[size],
    ...(variant === "solid"
      ? {
          background: "linear-gradient(135deg, #D4AF37 0%, #F5C542 50%, #D4AF37 100%)",
          color: "#0B0B0B",
          fontWeight: 600,
          border: "none",
        }
      : variant === "outline"
      ? {
          background: "transparent",
          color: "#D4AF37",
          border: "1px solid #D4AF37",
          fontWeight: 500,
        }
      : {
          background: "transparent",
          color: "#D4AF37",
          border: "none",
          fontWeight: 500,
        }),
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (enter) {
      if (variant === "solid") {
        el.style.filter = "brightness(1.1)";
        el.style.boxShadow = "0 0 30px rgba(212,175,55,0.5)";
      } else if (variant === "outline") {
        el.style.background = "rgba(212,175,55,0.1)";
        el.style.boxShadow = "0 0 20px rgba(212,175,55,0.3)";
      } else {
        el.style.color = "#F5C542";
      }
    } else {
      el.style.filter = "";
      el.style.boxShadow = "";
      if (variant === "outline") el.style.background = "transparent";
      if (variant === "ghost")   el.style.color = "#D4AF37";
    }
  };

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        style={sharedStyle}
        className={cn(className)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      type="button"
      onClick={onClick}
      style={sharedStyle}
      className={cn(className)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </motion.button>
  );
}
