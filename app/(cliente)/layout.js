import Navbar from "@/components/navs/client/navbar";
import Footer from "@/components/navs/client/footer";
import ReduxProvider from "@/redux/provider";

export const metadata = {
  title: "Inicio | Comercial Eben ezer",
};

export default function ClienteLayout({ children }) {
  return (
    <main className="flex flex-col min-h-full w-full justify-between bg-white">
      <ReduxProvider>
        <Navbar />
        {children}
        <Footer />
      </ReduxProvider>
    </main>
  );
}
