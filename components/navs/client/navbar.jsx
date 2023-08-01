"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  FacebookSquareIcon,
  InstagramIcon,
  WhatsappIcon,
  HeadsetIcon,
  SearchGlass,
  CarShoppingIcon,
  HeartIcon,
  UserIcon,
} from "@/components/icons/regular";
import CarritoModal from "./carritoModel";
export default function Navbar() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <header className="w-full bg-red-50 flex flex-col items-center shadow-md border-b border-yellow-600">
      <section className="w-full bg-black  flex p-1 justify-between">
        <article className={"flex gap-2 items-center"}>
          <HeadsetIcon className="w-4 h-4 fill-red-50 text-red-50" />
          <p className="text-red-50 text-xs">Contáctanos al 2666-0000</p>
        </article>
        <article className="flex gap-2">
          <p className="text-red-50 text-xs">Siguenos en:</p>
          <div className="flex items-center gap-1">
            <Link
              href={"https://www.facebook.com/ComercialEbenEzerCM"}
              className="cursor-pointer hover:scale-105"
            >
              <FacebookSquareIcon className="w-4 h-4 fill-red-50" />
            </Link>
            <Link href={"/"} className="cursor-pointer hover:scale-105">
              <InstagramIcon className="w-4 h-4 fill-red-50" />
            </Link>
            <Link href={"/"} className="cursor-pointer hover:scale-105">
              <WhatsappIcon className="w-4 h-4 fill-red-50" />
            </Link>
          </div>
        </article>
      </section>
      <Navigation />
      <section className="flex w-full lg:w-[1400px] p-2 items-center justify-between gap-6 py-3">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="/images/logotipo.png"
            width={160}
            height={50}
            alt="Eben Ezer logo"
          />
        </Link>
        <div className="flex bg-red-6800">
          <input
            type="search"
            name="search"
            placeholder="¿Qué estas buscando?"
            className="w-[500px] rounded-l-md "
          />
          <button className="w-[40px] bg-red-900 rounded-r-md">
            <SearchGlass className=" w-[20px] text-red-50 mx-auto cursor-pointer fill-red-50">
              Buscar
            </SearchGlass>
          </button>
        </div>

        <div className="flex gap-6">
          <Link href={"/"} className="flex gap-2 font-medium items-center">
            <HeartIcon className="w-4 fill-red-900 text-red-900" />
            <p className="leading-4 text-gray-800 text-sm">Favoritos</p>
          </Link>
          <div className="h-[25px] w-[2px] bg-yellow-600"></div>

          {session?.user ? (
            <Link
              href={"/auth/mi-cuenta"}
              className="flex gap-2 font-semibold items-center"
            >
              <Image
                src={session.user?.imagen}
                width={30}
                height={30}
                alt="user image"
                className="rounded-full"
              />
              <p className="leading-[14px] text-gray-800 text-sm text-start">
                Mi Cuenta{" "}
                <span className="block text-xs font-normal">
                  {session.user?.nombre} {session.user?.apellido}
                </span>
              </p>
            </Link>
          ) : (
            <Link
              href={"/auth/login"}
              className="flex gap-2 font-semibold items-center"
            >
              <UserIcon className="w-4 fill-red-900 text-red-900" />
              <p className="leading-4 text-gray-800 text-sm text-start">
                Mi Cuenta{" "}
                <span className="block text-xs font-normal">
                  Entrar/Registrarse
                </span>
              </p>
            </Link>
          )}

          <div className="h-[25px] w-[2px] bg-yellow-600"></div>
          <CarritoModal />
        </div>
      </section>
    </header>
  );
}

export const Navigation = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <nav className="w-full h-[30px] flex items-center justify-center py-6 bg-red-900">
      <ul className="w-[1200px] flex justify-center gap-4 text-white">
        <li className="cursor-pointer text-sm hover:underline">Linea Blanca</li>
        <li className="cursor-pointer text-sm hover:underline">Dormitorios</li>
        <li className="cursor-pointer text-sm hover:underline">
          Electrodomésticos
        </li>
        <li className="cursor-pointer text-sm hover:underline">Muebles</li>
        <li className="cursor-pointer text-sm hover:underline">
          Audio y video
        </li>
        <li className="cursor-pointer text-sm hover:underline">
          Agroindustrial
        </li>
      </ul>
    </nav>
  );
};
