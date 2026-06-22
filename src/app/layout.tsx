import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Emir Petrol Yalova | Çiftlikköy & Altınova Şubeleri",
  description:
    "Yalova'da 7/24 güvenilir yakıt ve üst düzey hizmet. Çiftlikköy ve Altınova şubelerimizle her an yanınızdayız. Benzin, motorin, market ve daha fazlası.",
  keywords: [
    "Emir Petrol",
    "Yalova",
    "Çiftlikköy",
    "benzin",
    "motorin",
    "yakıt istasyonu",
    "akaryakıt",
  ],
  openGraph: {
    title: "Emir Petrol Yalova",
    description:
      "Yalova'da 7/24 güvenilir yakıt ve üst düzey hizmet. 2 şubemizle hizmetinizdeyiz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-[#0B0B0B] text-[#F8F8F8] antialiased">
        {children}
      </body>
    </html>
  );
}
