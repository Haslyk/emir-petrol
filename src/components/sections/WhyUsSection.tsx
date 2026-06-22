"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { Shield, Zap, Clock, Star } from "lucide-react";

const features = [
  { id: "guvenilir", icon: Shield, title: "Güvenilir Yakıt",        description: "Sertifikalı ve kalite onaylı yakıtlarımızla aracınızın performansını güvence altına alıyoruz." },
  { id: "hizli",     icon: Zap,    title: "Hızlı Hizmet",           description: "Pompalara bekleme süresi minimum, işlem hızı maksimum. Zamanınıza saygı duyuyoruz."            },
  { id: "saat",      icon: Clock,  title: "24 Saat Açık",           description: "Gece, gündüz, her mevsim açığız. Yolculuğunuzda asla yakıtsız kalmayın."                        },
  { id: "musteri",   icon: Star,   title: "Müşteri Memnuniyeti",    description: "Her müşterimize bireysel ilgi ve premium deneyim sunmak temel önceliğimizdir."                   },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 120, damping: 28 });
  const gy = useSpring(my, { stiffness: 120, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full overflow-hidden group cursor-default rounded-2xl"
        style={{
          background: "#131313",
          border: "1px solid rgba(212,175,55,0.18)",
          padding: "32px",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.42)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(212,175,55,0.08)";
        }}
      >
        {/* Mouse glow */}
        <motion.div
          className="absolute pointer-events-none inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [gx, gy],
              ([x, y]) => `radial-gradient(260px circle at ${x}px ${y}px, rgba(212,175,55,0.07), transparent 60%)`
            ),
          }}
        />

        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(to right, rgba(212,175,55,0.3), transparent)" }}
        />

        {/* Number */}
        <span
          className="absolute top-5 right-6 font-cinzel font-black select-none"
          style={{ fontSize: "3rem", color: "rgba(212,175,55,0.07)", lineHeight: 1 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div
          className="relative mb-6 flex items-center justify-center"
          style={{
            width: 48, height: 48, borderRadius: 12,
            background: "linear-gradient(135deg, rgba(212,175,55,0.16), rgba(212,175,55,0.04))",
          }}
        >
          <Icon size={20} className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
        </div>

        <h3 className="font-cinzel text-[#F8F8F8] font-semibold tracking-wide mb-3" style={{ fontSize: "1rem" }}>
          {feature.title}
        </h3>
        <p className="font-montserrat text-[#B5B5B5] leading-relaxed" style={{ fontSize: "0.875rem" }}>
          {feature.description}
        </p>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{ width: 36, height: 36, borderBottom: "2px solid rgba(212,175,55,0.4)", borderRight: "2px solid rgba(212,175,55,0.4)", borderRadius: "0 0 16px 0" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WhyUsSection() {
  return (
    <section id="neden-biz" className="section-padding bg-[#0B0B0B] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-cinzel font-black select-none whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "rgba(212,175,55,0.025)" }}
        >
          PREMIUM
        </span>
      </div>

      <div className="container-width relative z-10">
        <SectionTitle
          label="Avantajlarımız"
          title="Neden Bizi Tercih Etmelisiniz?"
          subtitle="Rakiplerimizden bizi ayıran değerleri ve müşterilerimize sunduğumuz ayrıcalıkları keşfedin."
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => <FeatureCard key={f.id} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}
