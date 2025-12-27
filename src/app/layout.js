import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";
import BotonWhatsapp from "@/components/botonFlotante/BotonWhatsapp";
import { AuthProvider } from "./Providers";
import ModalMenuHamburguesa from "@/components/modales/ModalMenuHamburguesa";
import ModalCarritoCompras from "@/components/modales/ModalCarritoCompras";
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
  description: "Compra tus joyas al mejor precio.",
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
