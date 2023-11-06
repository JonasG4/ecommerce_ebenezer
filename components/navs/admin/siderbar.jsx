"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  UserGroupIcon,
  DashboardIcon,
  BagsShoppingIcon,
  CartShoppingIcon,
  CircleExclamationIcon,
  GearIcon,
  MoneyBillsIcon,
  ShapesIcon,
  TagsIcon,
  LogoutIcon,
} from "@/components/icons/light";
import { RightToLineIcon, EyeIcon, UserIcon } from "@/components/icons/regular";

export default function Siderbar() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();

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

  useEffect(() => {
    const isSidebarOpen = localStorage.getItem("isSidebarOpen");
    if (isSidebarOpen) {
      setIsOpen(JSON.parse(isSidebarOpen));
    }
  }, []);

  const showSideBar = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("isSidebarOpen", JSON.stringify(!isOpen));
  };

  return (
    <div
      className={`min-h-screen bg-white shadow-lg border-r border-slate-700/10 flex flex-col  ${isOpen
          ? "min-w-[200px] max-w-[200px] overflow-hidden"
          : "min-w-[75px] max-w-[75px]"
        } transition-all ease-in-out duration-200`}
    >
      <div
        className={`h-[70px] px-4 w-full flex items-center cursor-pointer  border-b border-gray-300 ${isOpen ? "justify-between" : "justify-center"
          }`}
      >
        <Image
          src="/images/logotipo.png"
          width={120}
          height={40}
          alt="Logo Eben Ezer"
          className={`${isOpen ? "w-[120px] h-[40px]" : "hidden"}`}
          priority
        />
        <span
          className="p-2 hover:bg-gray-200 rounded-sm transition-all ease-in-out duration-150"
          onClick={showSideBar}
        >
          <RightToLineIcon
            className={`w-4 fill-indigo-600 ${!isOpen && "-scale-x-[1]"
              } duration-150 ease-out`}
          />
        </span>
      </div>

      <ul className="flex flex-col mt-4 gap-2 px-4">
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

      <div className="px-4 mt-auto mb-6 flex flex-col gap-4 justify-center">
        <div
          className={`w-full pl-[4px] rounded-sm border-x-[3px] border-r-transparent hover:bg-indigo-100 transition-all ease-in-out duration-150 border-white hover:border-indigo-100`}
        >
          <button
            className={`group relative w-full h-[34px] rounded-sm text-sm 
           text-gray-600 font-regular flex items-center ${isOpen ? "gap-3" : "gap-0"
              } transition-all ease-in-out duration-300`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {session?.user.imagen ? (
              <Image
                alt={"image profile pic"}
                src={session?.user.imagen}
                width={30}
                height={30}
                className="rounded-full object-fill w-[30px] h-[30px]"
              />
            ) : (
              <UserIcon className="w-4 fill-gray-100 text-gray-100 flex-shrink-0" />
            )}
            <p
              className={`flex flex-col ${isOpen
                  ? "w-full font-normal text-start"
                  : "w-0 overflow-hidden hidden"
                }`}
            >
              <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
                {session?.user.nombre.split(" ")[0]}{" "}
                {session?.user.apellido.split(" ")[0]}
              </span>
              <span className="text-sm font-normal text-gray-500 leading-3 capitalize">
                Administrador
              </span>
            </p>
            {!isOpen && (
              <div
                role="tooltip"
                className="inline-block whitespace-nowrap absolute invisible z-40 py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
            after:content-['']
            after:absolute
            after:top-1/2
            after:-translate-y-1/2
            after:left-[-12px]
            after:border-[6px]
            after:border-transparent
            after:border-r-slate-400
            "
              >
                Mi Perfil
              </div>
            )}
          </button>
        </div>

        <div
          className={`w-full pl-[7px] rounded-sm border-x-[3px] border-r-transparent hover:bg-indigo-100 transition-all ease-in-out duration-150 border-gray-50 hover:border-indigo-100`}
        >
          <button
            className={`group relative w-full h-[34px] rounded-sm text-sm 
           text-gray-600 font-regular flex items-center justify-start ${isOpen ? "gap-3" : "gap-0"
              } transition-all ease-in-out duration-300`}
            onClick={() => signOut()}
          >
            <LogoutIcon
              className={`w-5 flex-shrink-0 fill-gray-600 text-gray-600`}
              width={16}
            />
            <p
              className={`whitespace-nowrap ${isOpen
                  ? "w-full font-normal text-start"
                  : "w-0 overflow-hidden hidden"
                }`}
            >
              Cerrar sesión
            </p>
            {!isOpen && (
              <div
                role="tooltip"
                className="inline-block whitespace-nowrap absolute invisible z-40 py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
            after:content-['']
            after:absolute
            after:top-1/2
            after:-translate-y-1/2
            after:left-[-12px]
            after:border-[6px]
            after:border-transparent
            after:border-r-slate-400
            "
              >
                Cerrar Session
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const TitleMenu = ({ title, isOpen }) => {
  return (
    <div className="h-4 mt-2 w-full flex flex-col justify-center">
      {isOpen ? (
        <h4 className="text-xs uppercase text-gray-600 font-[600]">{title}</h4>
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
      className={`w-full pl-[7px] rounded-sm border-x-[3px] border-r-transparent hover:bg-slate-100 transition-all ease-in-out duration-150
          ${isActivePath
          ? "bg-slate-100 border-indigo-600"
          : "border-white hover:border-slate-100"
        }`}
    >
      <Link
        className={`group relative w-full h-[34px] rounded-sm text-sm ${isActivePath
            ? "text-indigo-800 font-semibold"
            : "text-slate-600 font-regular"
          } flex items-center ${isOpen ? "gap-3" : "gap-0"
          } transition-all ease-in-out duration-300`}
        href={cleanPath}
      >
        <item.icon
          className={`w-5 h-5 flex-shrink-0 ${isActivePath
              ? "fill-indigo-600 text-indigo-800 font-medium"
              : "fill-gray-600 text-slate-600 "
            }`}
          width={16}
        />
        <p
          className={`${isOpen ? "w-full font-normal" : "w-0 overflow-hidden hidden"
            }`}
        >
          {item.name}
        </p>
        {!isOpen && (
          <div
            role="tooltip"
            className="inline-block whitespace-nowrap absolute invisible z-40 py-1 px-3 left-[45px] text-sm font-medium text-gray-600 bg-gray-100 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400
            after:content-['']
            after:absolute
            after:top-1/2
            after:-translate-y-1/2
            after:left-[-12px]
            after:border-[6px]
            after:border-transparent
            after:border-r-slate-400
            "
          >
            {item.name}
          </div>
        )}
      </Link>
    </li>
  );
};
