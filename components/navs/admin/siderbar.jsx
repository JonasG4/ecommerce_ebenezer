"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  UserGroupIcon,
  DashboardIcon,
  BagsShoppingIcon,
  CartShoppingIcon,
  CircleExclamationIcon,
  GearIcon,
  MoneyBillsIcon,
  ShapesIcon,
  TagsIcon
} from "@/components/icons/light";
import { RightToLineIcon, EyeIcon } from "@/components/icons/regular";

export default function Siderbar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = {
    Dashboard: {
      name: "Dashboard",
      path: "/nx-admin",
      icon: DashboardIcon,
    },
    Usuarios: {
      name: "Usuarios",
      path: "/nx-admin/usuarios/*",
      icon: UserGroupIcon,
    },
    Productos: {
      name: "Productos",
      path: "/nx-admin/productos/*",
      icon: BagsShoppingIcon,
    },
    Categorias: {
      name: "Categorias",
      path: "/nx-admin/categorias/*",
      icon: ShapesIcon,
    },
    Marcas: {
      name: "Marcas",
      path: "/nx-admin/marcas/*",
      icon: TagsIcon,
    },
    Pedidos: {
      name: "Pedidos",
      path: "/nx-admin/pedidos/*",
      icon: CartShoppingIcon,
    },
    Transacciones: {
      name: "Transacciones",
      path: "/nx-admin/transacciones/*",
      icon: MoneyBillsIcon,
    },
    Configuraciones: {
      name: "Configuraciones",
      path: "/nx-admin/configuraciones/*",
      icon: GearIcon,
    },
    Ayuda: {
      name: "Ayuda",
      path: "/nx-admin/ayuda/*",
      icon: CircleExclamationIcon,
    },
    Sitio: {
      name: "Ver sitio",
      path: "/",
      icon: EyeIcon,
    },
  };

  const showSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 shadow-lg border-r border-gray-300  ${
        isOpen ? "min-w-[200px] max-w-[200px]" : "min-w-[75px] max-w-[75px]"
      } transition-all ease-in-out duration-200`}
    >
      <div
        className={`mb-3 h-[70px] px-4 w-full flex items-center cursor-pointer bg-white border-b border-gray-300 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        <Image
          src="/images/logotipo.png"
          width={120}
          height={120}
          alt="Logo Diseños MT"
          className={`${isOpen ? "" : "hidden"}`}
          priority
        />
        <span
          className="p-2 hover:bg-gray-200 rounded-md transition-all ease-in-out duration-150"
          onClick={showSideBar}
        >
          <RightToLineIcon
            className={`w-4 fill-gray-700 ${
              !isOpen && "-scale-x-[1]"
            } duration-150 ease-out`}
          />
        </span>
      </div>

      <ul className="flex flex-col mt-4 gap-2 px-4 bg-gray-50">
        {/* ======================= ANALITICA ================== */}
        <TitleMenu title="Analitica" isOpen={isOpen} />
        <MenuLink item={menuItems.Dashboard} isOpen={isOpen} />

        {/* ======================= ADMINISTRACION ================== */}
        <TitleMenu title="Administración" isOpen={isOpen} />
        <MenuLink item={menuItems.Usuarios} isOpen={isOpen} />

        {/* ======================= INVENTARIO ================== */}
        <TitleMenu title="Inventario" isOpen={isOpen} />
        <MenuLink item={menuItems.Productos} isOpen={isOpen} />
        <MenuLink item={menuItems.Categorias} isOpen={isOpen} />
        <MenuLink item={menuItems.Marcas} isOpen={isOpen} />

        {/* ======================= VENTA ================== */}
        <TitleMenu title="Venta" isOpen={isOpen} />
        <MenuLink item={menuItems.Pedidos} isOpen={isOpen} />
        <MenuLink item={menuItems.Transacciones} isOpen={isOpen} />

        {/* ======================= SOPORTE ================== */}
        <TitleMenu title="Soporte" isOpen={isOpen} />
        <MenuLink item={menuItems.Configuraciones} isOpen={isOpen} />
        <MenuLink item={menuItems.Ayuda} isOpen={isOpen} />
        
        {/* ====================== SITIO ===================== */}
        <TitleMenu title="Sitio" isOpen={isOpen} />
        <MenuLink item={menuItems.Sitio} isOpen={isOpen} />
      </ul>
    </div>
  );
}

export const TitleMenu = ({ title, isOpen }) => {
  return (
    <div className="h-4 mt-2 w-full flex flex-col justify-center">
      {isOpen ? (
        <p className="text-xs uppercase text-gray-600 font-[600]">{title}</p>
      ) : (
        <div className="h-[1px] w-full bg-gray-300"></div>
      )}
    </div>
  );
};

export const MenuLink = ({ item, isOpen }) => {
  const pathname = usePathname();

  const hasChildren = item.path.includes("*");
  const cleanPath = hasChildren ? item.path.replace("/*", "") : item.path;

  let isActivePath;

  if (hasChildren) {
    isActivePath = pathname.includes(cleanPath);
  } else {
    isActivePath = pathname === cleanPath;
  }

  return (
    <li
      className={`w-full pl-[7px] rounded-md border-x-[3px] border-r-transparent hover:bg-gray-100
          ${
            isActivePath
              ? "bg-gray-100 border-indigo-600"
              : "border-gray-50 hover:border-gray-100"
          }`}
    >
      <Link
        className={`group relative w-full h-[34px] rounded-md text-sm ${
          isActivePath
            ? "text-indigo-600 font-medium"
            : "text-gray-600 font-regular"
        } flex items-center ${
          isOpen ? "gap-3" : "gap-0"
        } transition-all ease-in-out duration-300`}
        href={cleanPath}
      >
        <item.icon
          className={`w-5 flex-shrink-0 ${
            isActivePath
              ? "fill-indigo-600 text-indigo-600"
              : "fill-gray-600 text-gray-600 "
          }`}
          width={16}
        />
        <p
          className={`${
            isOpen ? "w-full font-normal" : "w-0 overflow-hidden hidden"
          }`}
        >
          {item.name}
        </p>
        {!isOpen && (
          <div
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 left-[55px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
          >
            {item.name}
          </div>
        )}
      </Link>
    </li>
  );
};
