"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import GoldButton from "@/components/ui/GoldButton";
import { MapPin, Phone } from "lucide-react";

function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#D4AF37]"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
      transition={{
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  );
}

function LightStreak({ delay, top }: { delay: number; top: string }) {
  return (
    <motion.div
      className="absolute h-px pointer-events-none"
      style={{
        top,
        left: 0,
        right: 0,
        background:
          "linear-gradient(to right, transparent 0%, rgba(212,175,55,0.35) 30%, rgba(245,197,66,0.55) 50%, rgba(212,175,55,0.35) 70%, transparent 100%)",
      }}
      animate={{ x: ["-110%", "110%"] }}
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        repeatDelay: delay + 4,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  style: {
    width:  `${Math.random() * 2.5 + 0.5}px`,
    height: `${Math.random() * 2.5 + 0.5}px`,
    left:   `${Math.random() * 100}%`,
    top:    `${Math.random() * 100}%`,
    opacity: 0,
  } as React.CSSProperties,
}));

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const mouse = useMousePosition();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const glowX = 50 + mouse.normalizedX * 8;
  const glowY = 50 + mouse.normalizedY * 8;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[#0B0B0B]" />

        {/* Mouse-tracked gold glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse 55% 45% at ${glowX}% ${glowY}%, rgba(212,175,55,0.10) 0%, transparent 65%)`,
          }}
          transition={{ type: "tween", duration: 0.15 }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.035,
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0B0B0B_90%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      </motion.div>

      {/* ── Light streaks ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <LightStreak delay={0}   top="22%" />
        <LightStreak delay={2.5} top="58%" />
        <LightStreak delay={5}   top="78%" />
      </div>

      {/* ── Particles ── */}
      {mounted && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {particles.map((p) => <Particle key={p.id} style={p.style} />)}
        </div>
      )}

      {/* ── Central ambient glow ── */}
      <motion.div
        className="absolute z-[1] pointer-events-none rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto flex flex-col items-center justify-center pt-[12vh]"
        style={{ y: textY, opacity }}
      >
        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span
            className="font-cinzel text-[#D4AF37] uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.45em" }}
          >
            Yalova · 2 Şube · 7/24
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-cinzel text-[#D4AF37] font-normal mb-4"
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)", letterSpacing: "0.35em" }}
        >
          EMİR PETROL
        </motion.p>

        {/* ── Main headline — capped at a sensible size ── */}
        <div className="mb-6">
          {[
            { text: "Yalova'da",  gold: false },
            { text: "Güvenilir",  gold: false },
            { text: "Yakıt",      gold: true  },
          ].map(({ text, gold }, i) => (
            <motion.div
              key={text}
              className="block leading-tight"
              initial={{ opacity: 0, y: 40, skewY: 3 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`font-cinzel font-black uppercase ${
                  gold
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#F5C542] to-[#D4AF37] bg-clip-text text-transparent"
                    : "text-[#F8F8F8]"
                }`}
                style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", letterSpacing: "0.04em" }}
              >
                {text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.88 }}
          className="font-montserrat text-[#B5B5B5] leading-relaxed mb-10 mx-auto"
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)", maxWidth: "520px" }}
        >
          Çiftlikköy ve Tavşanlı şubelerimizle Yalova&apos;da 7/24 güvenilir yakıt ve üst düzey hizmet
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton href="#subeler" variant="solid" size="md" id="hero-cta-subeler">
            <MapPin size={15} className="mr-2 inline-block" />
            Şubelerimiz
          </GoldButton>
          <GoldButton href="#iletisim" variant="outline" size="md" id="hero-cta-iletisim">
            <Phone size={15} className="mr-2 inline-block" />
            Bize Ulaşın
          </GoldButton>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="font-montserrat text-[#B5B5B5] uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", opacity: 0.45 }}
          >
            Aşağı Kaydır
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent"
            style={{ transformOrigin: "top" }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
