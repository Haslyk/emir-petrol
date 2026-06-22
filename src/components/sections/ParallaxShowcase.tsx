"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function FloatingOrb({ size, top, left, delay }: { size: number; top: string; left: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function GoldStreak({ delay, top, width }: { delay: number; top: string; width: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left: 0,
        width,
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), rgba(245,197,66,0.8), rgba(212,175,55,0.5), transparent)",
      }}
      animate={{ x: ["-100%", "200vw"] }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        repeatDelay: delay + 3,
        ease: "easeInOut",
      }}
    />
  );
}

const quoteWords = ["Kalite", "Güven", "Hız", "Mükemmellik"];

export default function ParallaxShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Multi-layer parallax backgrounds */}
      {/* Layer 1 — deep background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "perspective(500px) rotateX(20deg) translateY(-30%)",
          }}
        />
      </motion.div>

      {/* Layer 2 — orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2 }}>
        <FloatingOrb size={400} top="10%" left="5%" delay={0} />
        <FloatingOrb size={300} top="50%" left="75%" delay={1.5} />
        <FloatingOrb size={200} top="70%" left="20%" delay={3} />
        <FloatingOrb size={500} top="-5%" left="40%" delay={0.8} />
      </motion.div>

      {/* Layer 3 — streaks */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: y3 }}>
        <GoldStreak delay={0} top="20%" width="60%" />
        <GoldStreak delay={2} top="45%" width="40%" />
        <GoldStreak delay={4} top="70%" width="70%" />
        <GoldStreak delay={1} top="85%" width="30%" />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#080808_100%)] pointer-events-none z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ scale, opacity }}
      >
        {/* Decorative top */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-32 h-px mx-auto mb-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-cinzel text-[#D4AF37]/70 text-xs uppercase mb-8 tracking-[0.5em]"
        >
          Emir Petrol Deneyimi
        </motion.p>

        {/* Large animated words */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {quoteWords.map((word, i) => (
            <motion.span
              key={word}
              className="font-cinzel font-black text-[#F8F8F8] block"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {i % 2 === 1 ? (
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5C542] to-[#D4AF37] bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
              {i < quoteWords.length - 1 && (
                <span className="text-[#D4AF37]/30 mx-2 text-3xl align-middle">·</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Sub quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-montserrat text-[#B5B5B5] text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Her seferinde en iyisini sunmak için buradayız. Yolunuz uzun olsa da, yakıt
          endişeniz olmayacak.
        </motion.p>

        {/* Decorative bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-32 h-px mx-auto mt-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        />

        {/* Floating stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          {[
            { label: "Yıllık Müşteri", value: "50.000+" },
            { label: "Hizmet Yılı", value: "10+" },
            { label: "Memnuniyet", value: "%98" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="px-6 py-3 border border-[#D4AF37]/20 bg-[#D4AF37]/5 backdrop-blur-sm"
            >
              <p className="font-cinzel text-[#D4AF37] text-xl font-bold">{item.value}</p>
              <p className="font-montserrat text-[#B5B5B5] text-xs">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
