import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/navbar/Navbar";
import NavbarMobile from "@/components/header/navbar/NavbarMobile";

export const metadata = {
  title: "Política de Privacidad | Luxoria",
  description: "Política de privacidad de Luxoria",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <NavbarMobile />
      {children}
      <Footer />
    </div>
  );
}
