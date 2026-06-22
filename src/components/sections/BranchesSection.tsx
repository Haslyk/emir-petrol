"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GoldButton from "@/components/ui/GoldButton";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { stations, type Station } from "@/data/stations";

const CARD_STYLE: React.CSSProperties = {
  background: "#131313",
  border: "1px solid rgba(212,175,55,0.18)",
  borderRadius: 16,
  overflow: "hidden",
  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
};

const INFO_ROW_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 14,
  padding: "14px 16px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(212,175,55,0.1)",
  borderRadius: 12,
};

const ICON_BOX_STYLE: React.CSSProperties = {
  width: 36,
  height: 36,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(212,175,55,0.1)",
  border: "1px solid rgba(212,175,55,0.2)",
  borderRadius: 10,
};

function StationCard({ station, index }: { station: Station; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={CARD_STYLE}
        className="group"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.42)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(212,175,55,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.18)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div className="relative">
          {station.images.hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={station.images.hero.src} alt={station.images.hero.alt} className="w-full aspect-video object-cover" />
          ) : (
            <ImagePlaceholder
              label={`${station.shortName} — İstasyon Görseli`}
              aspectRatio="landscape"
              className="w-full"
              showIcon={false}
            />
          )}
          {/* Şube badge */}
          <div className="absolute top-4 left-4">
            <span
              className="font-cinzel uppercase font-semibold"
              style={{
                fontSize: "0.65rem", letterSpacing: "0.18em",
                background: "linear-gradient(135deg, #D4AF37, #F5C542)",
                color: "#0B0B0B",
                padding: "5px 12px",
                borderRadius: 999,
              }}
            >
              Şube {index + 1}
            </span>
          </div>
          {/* Open badge */}
          {station.isOpen24h && (
            <div
              className="absolute top-4 right-4 flex items-center gap-1.5"
              style={{
                background: "rgba(11,11,11,0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 999,
                padding: "5px 12px",
              }}
            >
              <motion.div
                className="rounded-full bg-emerald-400"
                style={{ width: 6, height: 6 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-montserrat text-emerald-400" style={{ fontSize: "0.7rem" }}>7/24 Açık</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Title */}
          <div>
            <p className="font-cinzel text-[#D4AF37] uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.4em", marginBottom: 6 }}>
              {station.district}
            </p>
            <h3 className="font-cinzel text-[#F8F8F8] font-bold" style={{ fontSize: "1.2rem", letterSpacing: "0.04em" }}>
              {station.shortName}
            </h3>
          </div>

          {/* Info rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={INFO_ROW_STYLE}>
              <div style={ICON_BOX_STYLE}><MapPin size={14} className="text-[#D4AF37]" /></div>
              <div>
                <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Adres</p>
                <p className="font-montserrat text-[#F8F8F8]" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{station.address}</p>
              </div>
            </div>

            <div style={INFO_ROW_STYLE}>
              <div style={ICON_BOX_STYLE}><Phone size={14} className="text-[#D4AF37]" /></div>
              <div>
                <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Telefon</p>
                <a href={station.phoneHref} className="font-montserrat text-[#F8F8F8] hover:text-[#D4AF37] transition-colors" style={{ fontSize: "0.9rem" }}>
                  {station.phone}
                </a>
              </div>
            </div>

            <div style={INFO_ROW_STYLE}>
              <div style={ICON_BOX_STYLE}><Clock size={14} className="text-[#D4AF37]" /></div>
              <div>
                <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Çalışma Saatleri</p>
                <p className="font-montserrat text-[#F8F8F8]" style={{ fontSize: "0.9rem" }}>{station.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(212,175,55,0.25), transparent)" }} />

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <GoldButton href={station.googleMapsUrl} variant="solid" size="sm" id={`station-${station.id}-directions`} className="w-full justify-center">
                <Navigation size={13} style={{ marginRight: 6, display: "inline-block" }} />
                Yol Tarifi
              </GoldButton>
            </div>
            <div style={{ flex: 1 }}>
              <GoldButton href={station.phoneHref} variant="outline" size="sm" id={`station-${station.id}-phone`} className="w-full justify-center">
                <Phone size={13} style={{ marginRight: 6, display: "inline-block" }} />
                Ara
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BranchesSection() {
  return (
    <section id="subeler" className="section-padding bg-[#0B0B0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      <div className="container-width relative z-10">
        <SectionTitle
          label={`${stations.length} Şubemizle Hizmetinizdeyiz`}
          title="Şubelerimiz"
          subtitle="Yalova'nın farklı noktalarında konumlanan şubelerimizden size en yakın olanı seçin."
          className="mb-14"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {stations.map((station, i) => (
            <StationCard key={station.id} station={station} index={i} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-montserrat text-[#B5B5B5] mt-10"
          style={{ fontSize: "0.8rem", opacity: 0.5 }}
        >
          Tüm şubelerimiz 7/24 hizmetinizdedir.
        </motion.p>
      </div>
    </section>
  );
}
