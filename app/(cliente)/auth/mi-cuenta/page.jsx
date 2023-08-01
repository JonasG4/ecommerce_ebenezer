"use client";
import { LogoutIcon } from "@/components/icons/regular";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
export default function AccountPage() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full my-6">
      <div className="w-[1400px]">
        <h1 className="text-3xl font-bold text-gray-700">Mi Cuenta</h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
        <section className="flex gap-4 bg-gray-100 rounded-md p-4 ring-1 ring-gray-300 shadow-md">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-[200px] p-2 rounded-md bg-indigo-600 cursor-pointer hover:opacity-80 active:scale-95"
            onClick={() => signOut({
              callbackUrl: "/",
            })}
          >
            <LogoutIcon className={`w-3 fill-gray-50 text-gray-50`} />
            <span className="text-sm font-medium text-gray-50">
              Cerrar sesión
            </span>
          </button>
        </section>
      </div>
    </div>
  );
}
