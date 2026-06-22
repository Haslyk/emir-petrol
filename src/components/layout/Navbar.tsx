"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollY";
import GoldButton from "@/components/ui/GoldButton";

const navLinks = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Şubeler", href: "#subeler" },
  { label: "Galeri", href: "#galeri" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 60;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? "rgba(11, 11, 11, 0.88)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(212, 175, 55, 0.14)"
            : "1px solid transparent",
        }}
      >
        <div className="container-width">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="flex flex-col leading-none"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-cinzel text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-normal">
                Akaryakıt · Yalova
              </span>
              <span className="font-cinzel text-[#F8F8F8] text-lg font-bold tracking-widest uppercase">
                Emir Petrol
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative text-[#B5B5B5] hover:text-[#D4AF37] font-montserrat text-sm tracking-wide transition-colors duration-300 py-1 group"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#D4AF37] to-[#F5C542] group-hover:w-full transition-all duration-400 rounded-full" />
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex">
              <GoldButton
                href="#iletisim"
                onClick={() => handleNavClick("#iletisim")}
                variant="outline"
                size="sm"
                id="navbar-cta"
              >
                Bize Ulaşın
              </GoldButton>
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden p-2 text-[#D4AF37] focus:outline-none"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 border-b border-[#D4AF37]/14"
            style={{
              background: "rgba(11, 11, 11, 0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <nav className="container-width py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-cinzel text-[#F8F8F8] hover:text-[#D4AF37] text-lg tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <GoldButton
                  href="#iletisim"
                  onClick={() => handleNavClick("#iletisim")}
                  variant="solid"
                  size="md"
                >
                  Bize Ulaşın
                </GoldButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
