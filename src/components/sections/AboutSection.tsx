"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "7/24", label: "Kesintisiz Hizmet" },
  { value: "2 Şube", label: "Yalova'da" },
  { value: "Premium", label: "Yakıt Kalitesi" },
];

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="section-padding bg-[#0B0B0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/[0.03] to-transparent" />
      </div>

      <div className="container-width relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard>
              <div className="relative">
                <img
                  src="/images/station-1/hero.jpg"
                  alt="Hakkımızda İstasyon Görseli"
                  className="rounded-2xl w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/18 rounded-2xl -z-10" />

                {/* Floating badge — 7/24 */}
                <motion.div
                  className="absolute -right-5 top-8 rounded-xl px-5 py-3"
                  style={{ background: "#131313", border: "1px solid rgba(212,175,55,0.3)", boxShadow: "0 0 24px rgba(212,175,55,0.08)" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="font-cinzel text-[#D4AF37] text-xl font-bold">7/24</p>
                  <p className="font-montserrat text-[#B5B5B5] text-xs">Açık</p>
                </motion.div>

                {/* Floating badge — 2 Şube */}
                <motion.div
                  className="absolute -left-5 bottom-12 rounded-xl px-5 py-3"
                  style={{ background: "#131313", border: "1px solid rgba(212,175,55,0.3)", boxShadow: "0 0 24px rgba(212,175,55,0.08)" }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <p className="font-cinzel text-[#D4AF37] text-xl font-bold">2</p>
                  <p className="font-montserrat text-[#B5B5B5] text-xs">Şube</p>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <SectionTitle label="Hakkımızda" title="Güvenilir Hizmetin Adresi" align="left" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <p className="font-montserrat text-[#B5B5B5] leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                Emir Petrol olarak, Yalova&apos;da yıllardır güvenilir akaryakıt hizmetinin simgesi
                olarak hizmet vermekteyiz. Çiftlikköy ve Tavşanlı şubelerimizle müşteri memnuniyetini
                her şeyin önünde tutan anlayışımızla hizmetinizdeyiz.
              </p>
              <p className="font-montserrat text-[#B5B5B5] leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                Modern altyapımız, deneyimli ekibimiz ve 7/24 kesintisiz hizmet anlayışımızla
                Yalova&apos;nın en güvenilir akaryakıt istasyonu olmaya devam ediyoruz.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-2"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative text-center rounded-xl group transition-all duration-300"
                  style={{
                    background: "#131313",
                    border: "1px solid rgba(212,175,55,0.18)",
                    padding: "20px 16px",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.45)" }}
                >
                  <p className="font-cinzel text-[#D4AF37] text-xl font-bold mb-1">{stat.value}</p>
                  <p className="font-montserrat text-[#B5B5B5] text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
