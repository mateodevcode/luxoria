import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";
import BotonWhatsapp from "@/components/botonFlotante/BotonWhatsapp";
import { AuthProvider } from "./Providers";
import ModalMenuHamburguesa from "@/components/modales/ModalMenuHamburguesa";
import ModalCarritoCompras from "@/components/modales/carritoCompras/ModalCarritoCompras";
import Search from "@/components/header/hover-card/Search";
import SearchResult from "@/components/header/hover-card/SearchResult";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPoppins = Geist({
  variable: "--font-geist-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMontserrat = Geist({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luxoria | Joyería",
  description:
    "Descubre Luxoria, joyería exclusiva en Colombia especializada en joyas de oro, esmeraldas y plata. Anillos, collares, pulseras y aretes de alta calidad al mejor precio.",
  keywords:
    "Luxoria, joyería, joyería de lujo, joyas de oro, joyas de plata, joyas con esmeraldas, anillos de oro, collares de oro, pulseras de oro, aretes de oro, anillos de plata, collares de plata, joyería colombiana, joyería en Colombia, joyas finas, joyería online, comprar joyas online, joyería elegante, joyería artesanal, esmeraldas colombianas",
  authors: [
    {
      name: "Luxoria Joyería",
      url: "https://www.luxoriacolombia.com",
    },
  ],
  creator: "Seventwo Technologies",
  publisher: "Seventwo Technologies",
  robots: "index, follow",
  icons: {
    icon: "/logo/favicon.ico",
    shortcut: "/logo/favicon.ico",
  },
  metadataBase: new URL("https://www.luxoriacolombia.com"),
  openGraph: {
    title: "Luxoria | Joyería",
    description:
      "Joyería exclusiva en oro, esmeraldas y plata. Encuentra anillos, collares, pulseras y aretes con diseños elegantes y materiales de alta calidad.",
    url: "https://www.luxoriacolombia.com",
    siteName: "Luxoria",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luxoria Joyería",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxoria | Joyería de Lujo en Colombia",
    description:
      "Joyas exclusivas en oro, plata y esmeraldas colombianas. Anillos, collares, pulseras y aretes de alta calidad.",
    images: ["https://www.luxoriacolombia.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistMontserrat.variable} ${geistPoppins.variable} antialiased`}
      >
        <AuthProvider>
          <AppProvider>
            {children}
            <Search />
            <SearchResult />
            <ModalMenuHamburguesa />
            <ModalCarritoCompras />
            <BotonWhatsapp />
            <Toaster />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
