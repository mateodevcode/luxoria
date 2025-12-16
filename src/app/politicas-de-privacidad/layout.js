import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/navbar/Navbar";

export const metadata = {
  title: "Política de Privacidad | Luxoria",
  description: "Política de privacidad de Luxoria",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
