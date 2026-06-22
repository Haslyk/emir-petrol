"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { Droplets, Fuel, ShoppingBag, Gauge, Clock, Truck } from "lucide-react";

const services = [
  { id: "benzin",  icon: Fuel,        title: "Benzin",              description: "Yüksek oktanlı premium benzin seçenekleriyle aracınıza en iyi yakıtı sunuyoruz.", tag: "Premium"    },
  { id: "motorin", icon: Droplets,    title: "Motorin",             description: "Euro Diesel ve Üst Kademe Motorin ile güçlü ve verimli sürüş deneyimi.",           tag: "Euro Diesel" },
  { id: "market",  icon: ShoppingBag, title: "Market",              description: "Yolculuğunuz için ihtiyaç duyabileceğiniz tüm ürünler istasyonumuzda mevcut.",     tag: "24/7"        },
  { id: "lastik",  icon: Gauge,       title: "Lastik Hava Kontrol", description: "Ücretsiz lastik hava basıncı kontrolü ile güvenli yolculuk için yanınızdayız.",     tag: "Ücretsiz"    },
  { id: "hizmet",  icon: Clock,       title: "7/24 Hizmet",         description: "Haftanın her günü, günün her saatinde kesintisiz hizmet garantisiyle açığız.",      tag: "Her Zaman"   },
  { id: "nakliye", icon: Truck,       title: "Akaryakıt Nakliyesi", description: "Güvenli ve hızlı araç filomuzla istediğiniz noktaya toptan akaryakıt nakliyesi sağlıyoruz.", tag: "Kurumsal" },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -7 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full"
      >
        {/* Card — uses inline styles so cascade layers don't interfere */}
        <div
          className="relative h-full rounded-2xl overflow-hidden group cursor-default transition-all duration-450"
          style={{
            background: "#131313",
            border: "1px solid rgba(212,175,55,0.18)",
            padding: "28px 24px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.5)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(212,175,55,0.1), 0 0 0 1px rgba(212,175,55,0.14)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.18)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <motion.div
              className="absolute -inset-x-full top-0 h-full"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.06) 50%, transparent 60%)" }}
              animate={{ x: ["0%", "200%"] }}
              transition={{ duration: 2, delay: index * 0.25, repeat: Infinity, repeatDelay: 4 }}
            />
          </div>

          {/* Tag */}
          <span
            className="inline-block font-cinzel uppercase mb-5"
            style={{
              fontSize: "0.6rem", letterSpacing: "0.18em",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.25)",
              borderRadius: "999px",
              padding: "3px 10px",
            }}
          >
            {service.tag}
          </span>

          {/* Icon box */}
          <div
            className="relative mb-5 flex items-center justify-center"
            style={{
              width: 52, height: 52, borderRadius: 12,
              background: "linear-gradient(135deg, rgba(212,175,55,0.14), rgba(212,175,55,0.04))",
            }}
          >
            <Icon size={22} className="text-[#D4AF37]" />
            <motion.div
              className="absolute -top-1 -right-1 rounded-full bg-[#F5C542]"
              style={{ width: 9, height: 9 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            />
          </div>

          <h3 className="font-cinzel text-[#F8F8F8] font-semibold tracking-wide mb-3" style={{ fontSize: "1rem" }}>
            {service.title}
          </h3>
          <p className="font-montserrat text-[#B5B5B5] leading-relaxed" style={{ fontSize: "0.85rem" }}>
            {service.description}
          </p>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 rounded-b-2xl"
            style={{ background: "linear-gradient(to right, #D4AF37, #F5C542)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="hizmetler" className="section-padding bg-[#151515] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container-width relative z-10">
        <SectionTitle
          label="Ne Sunuyoruz"
          title="Hizmetlerimiz"
          subtitle="Kaliteli yakıt ve kapsamlı istasyon hizmetlerimizle sizi en iyi şekilde karşılıyoruz."
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
