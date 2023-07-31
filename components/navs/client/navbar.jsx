'use client'
import { useState, useEffect } from "react";
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
  UserIcon,
  HeartIcon,
} from "@/components/icons/regular";
export default function Navbar() {
  return (
    <header className="w-full bg-red-50 flex flex-col items-center shadow-md">
      <section className="w-full bg-red-900 flex p-2 justify-between">
        <article className={"flex gap-2 items-center"}>
          <HeadsetIcon className="w-4 h-4 fill-red-50 text-red-50" />
          <p className="text-red-50 text-sm">Contáctanos al 2666-0000</p>
        </article>
        <article className="flex gap-2">
          <p className="text-red-50 text-sm">Siguenos en:</p>
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
      <section className="flex w-full lg:w-[1400px] p-2 items-center justify-between gap-6 py-3">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="/images/logo_transparent.png"
            width={70}
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
          <Link href={"/"} className="flex gap-2 font-semibold items-center">
            <HeartIcon className="w-4 fill-red-800 text-red-800" />
            <p className="leading-4 text-gray-700 text-sm">Favoritos</p>
          </Link>
          <div className="h-[25px] w-[2px] bg-red-700"></div>
          <Link
            href={"/auth/login"}
            className="flex gap-2 font-semibold items-center"
          >
            <UserIcon className="w-4 fill-red-800 text-red-800" />
            <p className="leading-4 text-gray-700 text-sm">
              Mi Cuenta{" "}
              <span className="block text-xs font-normal">
                Entrar/Registrarse
              </span>
            </p>
          </Link>
          <div className="h-[25px] w-[2px] bg-red-700"></div>
          <Link
            className="relative cursor-pointer flex items-center gap-2"
            href={"/carrito"}
          >
            <div className="relative">
              <CarShoppingIcon className="w-5 fill-red-800 text-red-800" />
              <span className="absolute -top-2 -right-1 text-xs font-light text-white w-[16px] h-[16px] bg-yellow-600 shadow-md rounded-full flex items-center justify-center leading-none">
                1
              </span>
            </div>
            <p className="font-semibold text-sm text-gray-800 leading-4">
              Carrito
            </p>
          </Link>
        </div>
      </section>
      <Navigation />
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
    <nav className="w-full h-[30px] flex items-center justify-center p-2 bg-yellow-700">
      <ul className="w-[1200px] flex justify-center gap-4 text-gray-50">
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
