"use client";
import { motion } from "framer-motion";
import { Phone, Clock, MapPin } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { stations } from "@/data/stations";

const OUTER_CARD: React.CSSProperties = {
  background: "#131313",
  border: "1px solid rgba(212,175,55,0.18)",
  borderRadius: 16,
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  height: "100%",
  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
};

const INFO_CARD: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "14px 16px",
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(212,175,55,0.1)",
  borderRadius: 12,
  textDecoration: "none",
};

const ICON_BOX: React.CSSProperties = {
  width: 40, height: 40,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(212,175,55,0.1)",
  border: "1px solid rgba(212,175,55,0.2)",
  borderRadius: 10,
};

export default function ContactSection() {
  return (
    <section id="iletisim" className="section-padding bg-[#151515] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute right-0 bottom-0 pointer-events-none" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(212,175,55,0.04), transparent 70%)", borderRadius: "50%" }} />

      <div className="container-width relative z-10">
        <SectionTitle
          label="İletişim"
          title="Bize Ulaşın"
          subtitle="Her iki şubemizde de 7/24 yanınızdayız. Size en yakın şubemizi arayın."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {stations.map((station, stIdx) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: stIdx * 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%" }}
            >
              <div
                style={OUTER_CARD}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(212,175,55,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.18)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <p className="font-cinzel text-[#D4AF37] uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.4em", marginBottom: 5 }}>
                      {station.district}
                    </p>
                    <h3 className="font-cinzel text-[#F8F8F8] font-bold" style={{ fontSize: "1.2rem" }}>
                      {station.shortName}
                    </h3>
                  </div>
                  <span className="font-cinzel font-black select-none" style={{ fontSize: "2.8rem", lineHeight: 1, color: "rgba(212,175,55,0.08)" }}>
                    {String(stIdx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(to right, rgba(212,175,55,0.25), transparent)" }} />

                {/* Info cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {/* Phone */}
                  <motion.a
                    href={station.phoneHref}
                    id={`contact-phone-${station.id}`}
                    style={{ ...INFO_CARD, transition: "all 0.3s ease" } as React.CSSProperties}
                    whileHover={{ x: 4 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.35)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.1)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                    }}
                  >
                    <div style={ICON_BOX}>
                      <Phone size={16} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Telefon</p>
                      <p className="font-cinzel text-[#F8F8F8] font-semibold" style={{ fontSize: "1.05rem" }}>{station.phone}</p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <motion.div
                        className="rounded-full border border-[#D4AF37]/40"
                        style={{ width: 32, height: 32 }}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: stIdx * 0.5 }}
                      />
                    </div>
                  </motion.a>

                  {/* Hours */}
                  <div style={INFO_CARD}>
                    <div style={ICON_BOX}><Clock size={16} className="text-[#D4AF37]" /></div>
                    <div style={{ flex: 1 }}>
                      <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Çalışma Saatleri</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p className="font-cinzel text-[#F8F8F8] font-semibold" style={{ fontSize: "0.95rem" }}>{station.workingHours}</p>
                        {station.isOpen24h && (
                          <motion.div style={{ display: "flex", alignItems: "center", gap: 6 }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
                            <span className="font-montserrat text-emerald-400" style={{ fontSize: "0.7rem" }}>Şu an Açık</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{ ...INFO_CARD, alignItems: "flex-start" }}>
                    <div style={ICON_BOX}><MapPin size={16} className="text-[#D4AF37]" /></div>
                    <div>
                      <p className="font-montserrat text-[#B5B5B5] uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", marginBottom: 3 }}>Adres</p>
                      <p className="font-montserrat text-[#F8F8F8]" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{station.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-12 text-center"
        >
          <p className="font-montserrat text-[#B5B5B5]" style={{ fontSize: "0.875rem", opacity: 0.7 }}>
            Sizi görmekten her zaman mutluluk duyarız.{" "}
            <a href={stations[0]?.phoneHref} className="text-[#D4AF37] hover:text-[#F5C542] transition-colors font-medium">
              Hemen arayın
            </a>{" "}
            ya da size en yakın şubeye uğrayın.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
