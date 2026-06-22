"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { stations } from "@/data/stations";

// Tüm şubelerin galeri görsellerini birleştir
// Gerçek görseller stations.ts'e eklenince otomatik görünür
const buildGalleryItems = () => {
  const items: Array<{ label: string; src?: string; alt?: string; span: string; stationName: string }> = [];
  
  // Her şube için 4 görsel alacağız ve bu layout pattern'ini kullanacağız
  const spans = [
    "md:col-span-2 md:row-span-2", // 1. Büyük
    "", // 2. Küçük
    "", // 3. Küçük
    "md:col-span-2", // 4. Geniş
  ];

  stations.forEach((station) => {
    const stationItems: Array<{ label: string; src?: string; alt?: string; span: string; stationName: string }> = [];
    
    if (station.images.gallery.length > 0) {
      // Sadece ilk 4 görseli al
      station.images.gallery.slice(0, 4).forEach((img, i) => {
        stationItems.push({
          label: img.alt,
          src: img.src,
          alt: img.alt,
          span: spans[i],
          stationName: station.shortName,
        });
      });
    } else {
      // Placeholder olarak 4 yer tutucu oluştur
      ["İstasyon Görseli 1", "İstasyon Görseli 2", "İstasyon Görseli 3", "İstasyon Görseli 4"]
        .forEach((label, i) => {
          stationItems.push({
            label: `${station.shortName} — ${label}`,
            span: spans[i],
            stationName: station.shortName,
          });
        });
    }
    items.push(...stationItems);
  });

  // En fazla 8 öğe
  return items.slice(0, 8);
};

export default function GallerySection() {
  const galleryItems = buildGalleryItems();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));

  return (
    <section id="galeri" className="section-padding bg-[#151515] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container-width relative z-10">
        <SectionTitle
          label="Görsel Tur"
          title="İstasyonlarımız"
          subtitle="Her iki şubemizdeki modern altyapı ve hizmet noktalarını keşfedin."
          className="mb-16"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className={`relative cursor-pointer overflow-hidden group rounded-2xl ${item.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => openLightbox(i)}
            >
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt || item.label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePlaceholder
                  label={item.label}
                  aspectRatio={item.span.includes("row-span-2") ? "portrait" : "landscape"}
                  className="w-full h-full absolute inset-0"
                  showIcon={false}
                />
              )}

              {/* Label */}
              <div className="absolute inset-0 flex items-end justify-start z-10 pointer-events-none p-3">
                <span className="font-cinzel text-[#D4AF37]/80 text-[10px] tracking-widest uppercase bg-[#0B0B0B]/60 backdrop-blur-sm px-2.5 py-1 border border-[#D4AF37]/20 rounded-lg">
                  {item.stationName}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/12 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 z-20 rounded-2xl" />
              <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 transition-all duration-400 z-30 rounded-2xl" />

              {/* Zoom icon */}
              <motion.div
                className="absolute top-3 right-3 w-8 h-8 bg-[#0B0B0B]/70 border border-[#D4AF37]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 rounded-lg"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="lightbox-close"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-xl"
              >
                <X size={18} />
              </button>

              {galleryItems[lightboxIndex].src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].alt || galleryItems[lightboxIndex].label}
                  className="w-full rounded-2xl max-h-[70vh] object-contain"
                />
              ) : (
                <ImagePlaceholder
                  label={galleryItems[lightboxIndex].label}
                  aspectRatio="landscape"
                  className="w-full rounded-2xl"
                />
              )}

              <div className="flex items-center gap-6 mt-6">
                <button
                  id="lightbox-prev"
                  onClick={prevImage}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-xl"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-cinzel text-[#B5B5B5] text-sm">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
                <button
                  id="lightbox-next"
                  onClick={nextImage}
                  className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-xl"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
