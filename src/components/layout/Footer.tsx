"use client";
import { motion } from "framer-motion";
import { stations } from "@/data/stations";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B0B0B] border-t border-[#D4AF37]/10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <span className="font-cinzel text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase">
              Akaryakıt · Yalova
            </span>
            <span className="font-cinzel text-[#F8F8F8] text-2xl font-bold tracking-widest uppercase">
              Emir Petrol
            </span>
            <p className="text-[#B5B5B5] text-sm font-montserrat leading-relaxed">
              Yalova&apos;da {stations.length} şubemizle güvenilir<br />
              yakıt ve üst düzey hizmet.
            </p>

            {/* Social icons */}
            {/* <div className="flex gap-3 mt-2">
              <motion.a href="#" id="footer-instagram" aria-label="Instagram"
                className="w-9 h-9 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#B5B5B5] hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                whileHover={{ y: -2, scale: 1.05 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </motion.a>
              <motion.a href="#" id="footer-facebook" aria-label="Facebook"
                className="w-9 h-9 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#B5B5B5] hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                whileHover={{ y: -2, scale: 1.05 }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </motion.a>
              <motion.a href="#" id="footer-twitter" aria-label="X / Twitter"
                className="w-9 h-9 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#B5B5B5] hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300"
                whileHover={{ y: -2, scale: 1.05 }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div> */}
          </motion.div>

          {/* Branches links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <p className="font-cinzel text-[#D4AF37] text-xs tracking-widest uppercase">Şubelerimiz</p>
            {stations.map((station) => (
              <div key={station.id} className="flex flex-col gap-0.5">
                <p className="font-montserrat text-[#F8F8F8] text-sm font-medium">{station.shortName}</p>
                <p className="font-montserrat text-[#B5B5B5] text-xs leading-relaxed">{station.address}</p>
                <a href={station.phoneHref} className="font-montserrat text-[#D4AF37]/70 text-xs hover:text-[#D4AF37] transition-colors">
                  {station.phone}
                </a>
              </div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            <span className="text-[#B5B5B5] text-xs font-montserrat tracking-wide">
              © {currentYear} Emir Petrol Yalova
            </span>
            <span className="text-[#D4AF37]/50 text-xs font-montserrat">
              Tüm Hakları Saklıdır
            </span>
            <p className="font-montserrat text-[#B5B5B5]/40 text-[11px] leading-relaxed text-right mt-2">
              Tüm şubelerimiz<br />7/24 açıktır.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-6 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[#B5B5B5]/50 text-xs font-montserrat tracking-wide">
            Yalova • Çiftlikköy & Tavşanlı • Türkiye
          </p>
          <p className="text-[#D4AF37]/40 text-xs font-montserrat">
            yalovaemirpetrol.com
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
