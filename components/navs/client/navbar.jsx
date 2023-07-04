import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FacebookSquareIcon,
  InstagramIcon,
  WhatsappIcon,
  HeadsetIcon,
  SearchGlass,
  CarShoppingIcon,
  UserIcon,
  HeartIcon,
  BarsIcon
} from "@/components/icons/regular";
export default function Navbar() {
  return (
    <header className="w-full bg-red-50 flex flex-col items-center shadow-md">
      <section className="w-full bg-red-800 flex p-2 justify-between">
        <article className={"flex gap-2 items-center"}>
          <HeadsetIcon className="w-4 h-4 fill-red-50 text-red-50" />
          <p className="text-red-50">Contáctanos al 2666-0000</p>
        </article>
        <article className="flex gap-2">
          <p className="text-red-50">Siguenos en:</p>
          <div className="flex items-center gap-1">
            <Link href={"/"}>
              <FacebookSquareIcon className="w-4 h-4 fill-red-50" />
            </Link>
            <Link href={"/"}>
              <InstagramIcon className="w-4 h-4 fill-red-50" />
            </Link>
            <Link href={"/"}>
              <WhatsappIcon className="w-4 h-4 fill-red-50" />
            </Link>
          </div>
        </article>
      </section>
      <section className="flex w-[1200px] p-2 items-center justify-between gap-6 py-3">
        <Image
          src="/images/logo.jpg"
          width={100}
          height={50}
          alt="Eben Ezer logo"
          className="rounded-md"
        />
       
        <div className="flex bg-red-6800">
          <input
            type="search"
            name="search"
            placeholder="¿Qué estas buscando?"
            className="w-[500px] rounded-l-md "
          />
          <button className="w-[40px] bg-red-700 rounded-r-md">
            <SearchGlass className=" w-[20px] text-red-50 mx-auto cursor-pointer fill-red-50">
              Buscar
            </SearchGlass>
          </button>
        </div>
        <div className="flex gap-6">
          <Link href={"/"} className="flex gap-2 font-semibold items-center">
            <HeartIcon className="w-6 h-6 fill-red-800 text-red-800" />
            <p className="leading-4 text-gray-700">Favoritos</p>
          </Link>
          <div className="h-[25px] w-[2px] bg-red-700"></div>
          <Link href={"/auth/login"} className="flex gap-2 font-semibold items-center">
            <UserIcon className="w-6 h-6 fill-red-800 text-red-800" />
            <p className="leading-4 text-gray-700">
              Mi Cuenta{" "}
              <span className="block text-xs font-normal">
                Entrar/Registrase
              </span>
            </p>
          </Link>
          <div className="h-[25px] w-[2px] bg-red-700"></div>
          <Link className="relative cursor-pointer flex items-center gap-2" href={"/carrito"}>
            <CarShoppingIcon className="w-[34px] fill-red-800 text-red-800" />
            <p className="font-semibold text-sm text-gray-800 leading-4">
              <span className="block font-normal">Carrito</span>
              $325.89
            </p>
            <span className="absolute -top-[3px] left-[23px] text-xs font-bold text-gray-700 w-[15px] h-[15px] bg-amber-400 shadow-md rounded-full flex items-center justify-center">
              1
            </span>
          </Link>
        </div>
      </section>
      <nav className=" w-full flex items-center justify-center p-2 bg-white"
      >
        <ul className="w-[1200px] flex justify-center gap-4 text-red-700">
          <li className="cursor-pointer hover:underline">Linea Blanca</li>
          <li className="cursor-pointer hover:underline">Dormitorios</li>
          <li className="cursor-pointer hover:underline">Electrodomésticos</li>
          <li className="cursor-pointer hover:underline">Muebles</li>
          <li className="cursor-pointer hover:underline">Audio y video</li>
          <li className="cursor-pointer hover:underline">Agroindustrial</li>
        </ul>
      </nav>
    </header>
  );
}
