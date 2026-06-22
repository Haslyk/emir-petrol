"use client";
import { motion } from "framer-motion";
import { Navigation, Phone } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GoldButton from "@/components/ui/GoldButton";
import { stations } from "@/data/stations";

function MapPlaceholder({ stationName }: { stationName: string }) {
  return (
    <div className="aspect-[16/9] bg-gradient-to-br from-[#111008] via-[#151510] to-[#0d0d0b] relative flex items-center justify-center rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Concentric circles */}
      {[200, 150, 100, 60].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-[#D4AF37]/15"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {/* Pin */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-5 rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </motion.div>
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/40 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/40 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/40 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/40 rounded-br-sm" />
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-cinzel text-[#D4AF37]/50 text-[10px] tracking-widest uppercase">
        {stationName}
      </span>
    </div>
  );
}

export default function LocationSection() {
  return (
    <section id="konum" className="section-padding bg-[#151515] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container-width relative z-10">
        <SectionTitle
          label="Neredeyiz"
          title="Konumlarımız"
          subtitle="Her iki şubemiz de kolayca ulaşabileceğiniz konumlarda."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stations.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Map */}
              {station.googleMapsEmbed ? (
                <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/20">
                  <iframe
                    src={station.googleMapsEmbed}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${station.name} Haritası`}
                  />
                </div>
              ) : (
                <MapPlaceholder stationName={station.shortName} />
              )}

              {/* Info card */}
              <div className="border border-[#D4AF37]/15 bg-white/[0.03] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#D4AF37]/35 transition-all duration-400">
                <div>
                  <p className="font-cinzel text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase mb-1">Şube {i + 1}</p>
                  <h3 className="font-cinzel text-[#F8F8F8] text-lg font-bold">{station.shortName}</h3>
                  <p className="font-montserrat text-[#B5B5B5] text-sm mt-1 leading-relaxed">{station.address}</p>
                </div>

                {station.isOpen24h && (
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span className="font-montserrat text-emerald-400 text-xs">Şu an Açık · 24 Saat</span>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <GoldButton
                    href={station.googleMapsUrl}
                    variant="solid"
                    size="sm"
                    className="flex-1 justify-center"
                    id={`location-${station.id}-directions`}
                  >
                    <Navigation size={13} className="mr-1.5 inline-block" />
                    Yol Tarifi
                  </GoldButton>
                  <GoldButton
                    href={station.phoneHref}
                    variant="outline"
                    size="sm"
                    className="flex-1 justify-center"
                    id={`location-${station.id}-phone`}
                  >
                    <Phone size={13} className="mr-1.5 inline-block" />
                    Ara
                  </GoldButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
