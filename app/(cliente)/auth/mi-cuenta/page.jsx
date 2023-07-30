"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountPage() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full my-6">
      <div className="w-[1400px]">
        <h1 className="text-3xl font-bold text-gray-700">Mi Cuenta</h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
        <section className="flex gap-4 bg-gray-100 rounded-md p-4 ring-1 ring-gray-300 shadow-md">
          <nav className="w-[250px]">
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  className={`text-red-700 border-l-[4px] pl-4 rounded-md py-2 ${
                    !pathname.split("/")[3] &&
                    "font-semibold bg-white border-red-600"
                  }`}
                  href={`/auth/mi-cuenta`}
                >
                  Información personales
                </Link>
              </li>
              <li className="w-full">
                <Link
                  className={`w-full text-red-700 border-l-[4px] pl-4 rounded-md py-2 hover:bg-gray-200 ${
                    !pathname.split("/")[3] === "pedidos" ?
                    "font-semibold bg-white border-red-600" : "bg-transparent border-transparent"
                  }`}
                  href={`/auth/mi-cuenta/pedidos`}
                >
                  Mis pedidos
                </Link>
              </li>
              <li>
                <Link
                  className={`text-red-700 border-l-[4px] pl-4 rounded-md py-2 ${
                    !pathname.split("/")[3] &&
                    "font-semibold bg-white border-red-600"
                  }`}
                  href={`/auth/mi-cuenta/direcciones`}
                >
                  Mis direcciones
                </Link>
              </li>
              <li>
                <Link
                  className={`text-red-700 border-l-[4px] pl-4 rounded-md py-2 ${
                    !pathname.split("/")[3] &&
                    "font-semibold bg-white border-red-600"
                  }`}
                    href={`/auth/mi-cuenta/favoritos`}
                >
                  Favoritos
                </Link>
              </li>
            </ul>
          </nav>
          <section className="bg-white w-full p-2 ring-1 ring-gray-200 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Información de la cuenta
            </h2>
          </section>
        </section>
      </div>
    </div>
  );
}
