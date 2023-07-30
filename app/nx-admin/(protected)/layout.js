import Siderbar from "@/components/navs/admin/siderbar";
import Navbar from "@/components/navs/admin/navbar";

export const metadata = {
  title: "Dashboard"
}

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex w-full max-h-screen bg-gray-100">
        <Siderbar />
        <section className="w-full flex flex-col overflow-hidden">
          <Navbar />
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>
        </section>
      </div>
    </>
  );
}
