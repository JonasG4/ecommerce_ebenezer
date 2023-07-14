import Siderbar from "@/components/navs/admin/siderbar";
import Navbar from "@/components/navs/admin/navbar";

export const metadata = {
  title: {
    template: "%s | Admin Panel",
    default: "Admin Panel",
  },
};

export default function AdminLayout({ children }) {
  return (
    <>
     <div className="flex w-full max-h-screen bg-gray-100">
        <Siderbar />
        <section className="w-full flex flex-col overflow-hidden">
          <Navbar />
          <div className="mt-4 ml-2 pr-4 w-full h-full overflow-hidden">{children}</div>
        </section>
      </div>
    </>
  );
}
