/**
 * ============================================================
 * STATIONS CONFIG — Emir Petrol Yalova
 * ============================================================
 * Tüm istasyon bilgilerini buradan yönetebilirsiniz.
 * Yeni şube eklemek için aşağıdaki diziye yeni bir nesne ekleyin.
 * Görseller için: public/images/station-1/ ve public/images/station-2/ klasörlerini kullanın.
 * ============================================================
 */

export interface StationImage {
  /** Görselin public/ altındaki yolu, örn: "/images/station-1/hero.jpg" */
  src: string;
  /** Erişilebilirlik için alt metni */
  alt: string;
}

export interface Station {
  /** Benzersiz id (slug olarak da kullanılır) */
  id: string;
  /** Tam istasyon adı */
  name: string;
  /** Kısa ad (navbar, badge gibi kısa alanlarda) */
  shortName: string;
  /** Şehir / ilçe */
  district: string;
  /** Tam adres */
  address: string;
  /** Telefon numarası (görüntülenecek format) */
  phone: string;
  /** Telefon bağlantısı için (tel: formatı) */
  phoneHref: string;
  /** Çalışma saatleri */
  workingHours: string;
  /** 7/24 açık mı? */
  isOpen24h: boolean;
  /** Google Maps yol tarifi URL'si */
  googleMapsUrl: string;
  /** Google Maps embed URL (iFrame için) — opsiyonel */
  googleMapsEmbed?: string;
  /** ========== GÖRSELLER ========== */
  images: {
    /** Hero / ana görsel */
    hero?: StationImage;
    /** Hakkımızda bölümü görseli */
    about?: StationImage;
    /** Galeri görselleri (en fazla 6 önerilir) */
    gallery: StationImage[];
  };
}

// ============================================================
// İSTASYON VERİLERİ
// ============================================================

export const stations: Station[] = [
  // ────────────────────────────────────────────────────────
  // ÇİFTLİKKÖY ŞUBESİ (SOIL)
  // ────────────────────────────────────────────────────────
  {
    id: "sube-1",
    name: "Emir Petrol Yalova — Çiftlikköy",
    shortName: "Çiftlikköy Şubesi",
    district: "Çiftlikköy / Yalova",
    address: "Taşköprü Merkez, Kocaeli Yolu, 77600 Çiftlikköy / Yalova",
    phone: "0535 843 01 96",
    phoneHref: "tel:+905358430196",
    workingHours: "24 Saat Açık",
    isOpen24h: true,
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Taşköprü+Merkez,+Kocaeli+Yolu,+77600+Çiftlikköy+Yalova",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22846.760288017045!2d29.419604221653398!3d40.68140606791723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb1faaaa9818dd%3A0x1f75cf79b27e40cf!2sSo%C4%B1l%20Benzinlik%20Emir%20Petrol!5e0!3m2!1str!2str!4v1782136252393!5m2!1str!2str",
    images: {
      hero: { src: "/images/station-1/hero.jpg", alt: "İstasyon görünümü" },
      about: { src: "/images/station-1/about.jpg", alt: "İstasyon görünümü" },
      gallery: [
        { src: "/images/station-1/gallery-1.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-1/gallery-2.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-1/gallery-3.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-1/gallery-4.jpg", alt: "Akaryakıt görselleri" },
      ],
    },
  },

  // ────────────────────────────────────────────────────────
  // TAVŞANLI ŞUBESİ (FOX)
  // ────────────────────────────────────────────────────────
  {
    id: "tavsanli",
    name: "Fox Emir Petrol",
    shortName: "Altınova Şubesi",
    district: "Altınova / Yalova",
    address: "Fatih, Fatih Cd. 31/B, 77740 Altınova / Yalova",
    phone: "0535 843 01 96",
    phoneHref: "tel:+905358430196",
    workingHours: "24 Saat Açık",
    isOpen24h: true,
    googleMapsUrl:
      "https://www.google.com/maps/search/Fatih,+Fatih+Cd.+31/B,+77740+Tavşanlı+Altınova+Yalova",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.97920281195!2d29.43914764412664!3d40.6855674198371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb1e7028a46de1%3A0xed6e1e5abeec4eb8!2sEmin%20Petrol!5e0!3m2!1str!2str!4v1782136298365!5m2!1str!2str",
    images: {
      hero: { src: "/images/station-2/hero.jpg", alt: "Akaryakıt görselleri" },
      about: { src: "/images/station-2/about.jpg", alt: "Akaryakıt görselleri" },
      gallery: [
        { src: "/images/station-2/gallery-1.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-2/gallery-2.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-2/gallery-3.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-2/gallery-4.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-2/gallery-5.jpg", alt: "Akaryakıt görselleri" },
        { src: "/images/station-2/gallery-6.jpg", alt: "Akaryakıt görselleri" },

      ],
    },
  },
];

/** Aktif istasyonların sayısı */
export const stationCount = stations.length;

/** ID ile istasyon bul */
export function getStationById(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}
