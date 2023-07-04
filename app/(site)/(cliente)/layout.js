import Navbar from "@/components/navs/client/navbar";
import Footer from "@/components/navs/client/footer";

export const metadata = {
  title: "Inicio | Comercial Eben ezer",
}

export default function ClienteLayout({ children }) {
  return (
    <main className="flex flex-col min-h-full w-full justify-between bg-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
