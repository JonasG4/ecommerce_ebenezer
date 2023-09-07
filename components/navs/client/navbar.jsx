"use client";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  SearchGlass,
  AngleDown,
  FacebookIcon,
  GoogleIcon,
} from "@/components/icons/regular";
import CarritoModal from "./carritoModel";
import MenuModel from "./MenuModel";
import Loading from "@/components/loading";
import { ClockRotate, SparkleIcon } from "@/components/icons/solid";
import {
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { addSearch, removeSearch, removeAllSearch } from "@/redux/search";
import { useRouter } from "next/navigation";
import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white flex flex-col items-center border-b border-gray-300 fixed z-[100]">
      {/* SECOND LEVEL */}
      <Navigation />

      {/* THIRD LEVEL */}
      <section className="grid grid-cols-[250px_1fr_350px] h-[75px] place-content-center laptop:w-[1400px] movile:px-10 tablet:px-0 movile:w-full gap-8">
        <div className="flex items-center justify-between gap-5 w-full">
          <MenuModel />
          <Link href={"/"} className="cursor-pointer flex gap-2 items-center">
            <Image
              src="/images/logotipo.png"
              width={160}
              height={50}
              alt="Eben Ezer logo"
              className="laptop:w-[160px] sm:w-[120px] sm:h-[40px] "
            />
          </Link>
        </div>
        {/* Buscador */}
        <SearchInput />
        <section className="flex gap-4 items-center justify-end">
          <div className="h-[25px] w-[1px] bg-yellow-600"></div>
          <CarritoModal />
          <div className="h-[25px] w-[1px] bg-yellow-600"></div>
          {session?.user ? <UserButton /> : <LoginButton />}
        </section>
      </section>
    </header>
  );
}

export const Navigation = () => {
  return (
    <nav className="w-full h-[35px] flex items-center justify-center bg-red-900">
      <ul className="w-[1200px] flex justify-center gap-4 text-white">
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Inicio</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Nosotros</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Sucursales</p>
        </Link>
        <Link href={"/"} className="cursor-pointer hover:underline">
          <p className="text-xs font-semibold">Términos y condiciones</p>
        </Link>
      </ul>
    </nav>
  );
};

export const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const { data: session } = useSession();

  useEffect(() => {
    const isClickOutside2 = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside2);
    return () => {
      document.removeEventListener("click", isClickOutside2);
    };
  }, [isOpen]);

  return (
    <div
      className="relative flex items-center gap-2 cursor-pointer "
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`group w-10 h-10 ring-1 
        ${isOpen ? "ring-red-800" : " ring-gray-400"}
        active:scale-95 ring-gray-400 rounded-full flex relative items-center justify-center cursor-pointer bg-gradient-to-tr from-red-800 to-red-500 hover:opacity-80`}
      >
        {session?.user.imagen ? (
          <Image
            alt={"image profile pic"}
            src={session?.user.imagen}
            placeholder="blur"
            blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
            width={40}
            height={40}
            className="rounded-full object-fill"
          />
        ) : (
          <UserIcon className="w-4 fill-gray-100 text-gray-100" />
        )}
        <div
          className={`absolute w-4 h-4 bottom-0 -right-1 ring-1 ${
            isOpen ? "ring-red-800" : "ring-slate-400 "
          } bg-white rounded-full flex items-center justify-center`}
        >
          <AngleDown
            className={`w-2 fill-slate-700 ${
              isOpen && "rotate-180"
            } duration-150 ease-in-out`}
          />
        </div>
      </div>

      {isOpen && session?.user && (
        <section className="flex flex-col gap-2 p-3 rounded-sm w-[250px] bg-gray-50 shadow-lg transition-shadow ring-1 ring-gray-300 right-0 absolute top-[3.1rem] z-[100]">
          {/* PROFILE */}
          <article className="flex items-center gap-4 h-[75px] rounded-sm bg-gray-100 py-2 px-3 ring-1 ring-gray-300 shadow-md">
            {session?.user.imagen ? (
              <Image
                alt={"image profile pic"}
                src={session?.user.imagen}
                placeholder="blur"
                blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
                width={50}
                height={50}
                className="rounded-full object-fill"
              />
            ) : (
              <UserIcon className="w-4 fill-gray-100 text-gray-100" />
            )}
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-gray-700">
                {session?.user.nombre}
              </h1>
              <h4 className="text-sm font-normal text-gray-700 leading-3">
                {session?.user.apellido}
              </h4>
            </div>
          </article>
          {/* ORDERS */}
          <Link
            href={"/user/orders"}
            className="flex items-center gap-4 w-full rounded-sm  cursor-pointer hover:opacity-80 active:scale-95"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4 stroke-gray-500" />
            <span className="text-xs font-normal text-gray-600">
              Mis pedidos
            </span>
          </Link>
          {/* PROFILE */}
          <Link
            href={"/user/profile"}
            className="flex items-center gap-4 w-full rounded-sm  cursor-pointer hover:opacity-80 active:scale-95"
          >
            <UserIcon className="w-4 h-4 fill-gray-500" />
            <span className="text-xs font-normal text-gray-600">Mi perfil</span>
          </Link>

          <div className="w-full h-[1px] bg-gray-300"></div>
          {/* LOGOUT */}
          <button
            type="button"
            className="flex items-center gap-4 w-full rounded-sm  cursor-pointer hover:opacity-80 active:scale-95"
            onClick={() => signOut()}
          >
            {/* <LogoutIcon className={`w-[10px] fill-red-800 text-red-800`} /> */}
            <ArrowRightOnRectangleIcon className="w-4 h-4 stroke-gray-500" />
            <span className="text-xs font-normal text-gray-600">
              Cerrar sesión
            </span>
          </button>
        </section>
      )}
    </div>
  );
};

export const LoginButton = () => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [validations, setValidations] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await signIn("client-login", {
      redirect: false,
      email: user.email,
      password: user.password,
    }).finally(() => {
      setLoading(false);
    });

    if (data.error) {
      setValidations(data.error);
      setUser({ ...user, password: "" });
    }

    if (data.ok) {
      setIsOpen(false);
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: [value] });
    setValidations("");
  };

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className={`flex gap-2 items-center hover:bg-red-50 p-2 rounded-sm ${
          isOpen && "bg-red-50 ring-1 ring-red-800/10"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserIcon className={`w-5 text-red-800 ${isOpen && "fill-red-800"}`} />
        <p
          className={`text-gray-800 text-sm movile:hidden laptop:block ${
            isOpen && "text-red-800"
          }`}
        >
          Ingresar
        </p>
      </button>

      {isOpen && (
        <section
          className="flex flex-col items-center gap-2 px-4 py-3 rounded-sm w-[250px] bg-white shadow-lg transition-shadow ring-1 ring-red-700/20 -right-[80px] absolute top-[3.2rem] z-[100]
          after:content-['▲']
          after:absolute after:-top-[18px]
          after:text-red-700/20
        "
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xs font-light text-gray-700 text-center">
              <span className="font-semibold block text-sm">
                ¿Ya tienes una cuenta?
              </span>{" "}
              Ingresa ya para ver tus pedidos y más.
            </h1>
            <div className="w-full flex items-center justify-evenly py-2">
              <div
                className="flex text-xs py-1 px-4 rounded-sm ring-1 ring-slate-700/10 hover:ring-slate-700/30 bg-slate-100 cursor-pointer group/facebook"
                onClick={() => signIn("facebook-login", { callbackUrl: "/" })}
              >
                <FacebookIcon className="h-4 w-4 fill-blue-600" />
              </div>
              <div
                className="flex text-xs py-1 px-4 rounded-sm ring-1 ring-slate-700/10 hover:ring-slate-700/30 bg-slate-100 cursor-pointer group/google"
                onClick={() => signIn("google-login", { callbackUrl: "/" })}
              >
                <GoogleIcon
                  className="h-4 w-4 
                [&>*:nth-child(1)]:fill-sky-500 
                [&>*:nth-child(2)]:fill-green-500 
                [&>*:nth-child(3)]:fill-yellow-500 
                [&>*:nth-child(4)]:fill-red-500 
                "
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="text-xs font-light text-gray-500 mx-2 whitespace-nowrap">
              O ingresa con
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>
          </div>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            <div className="w-full rounded-sm flex flex-col gap-2 items-center">
              <label
                htmlFor="email"
                className="text-slate-600 text-xs font-semibold"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                required
                onChange={handleUser}
                placeholder="Escriba su correo electrónico"
                className={`w-full text-xs bg-slate-50 placeholder:text-center text-center p-2 rounded-sm border-none ring-1 ring-slate-700/10 
                ${
                  validations &&
                  "ring-red-800/50 text-red-800/80 placeholder-red-800/80"
                }
                text-slate-600 
                 focus:ring-red-800/50`}
              />
              <span className="text-xs text-red-800 text-center">
                {validations}
              </span>
            </div>
            <div className="w-full rounded-sm flex flex-col gap-2 items-center">
              <label
                htmlFor="password"
                className="text-slate-600 text-xs font-semibold"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                value={user.password}
                onChange={handleUser}
                placeholder="Escriba su contraseña"
                className="w-full text-xs bg-slate-50 p-2 placeholder:text-center text-center rounded-sm border-none ring-1 ring-slate-700/10 text-slate-600 focus:ring-red-800/50"
              />
            </div>
            <div className="w-full text-end">
              <Link
                href={"/"}
                className="cursor-pointer hover:underline text-red-800/80 text-xs"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full relative py-2 rounded-sm bg-red-800 text-white text-xs hover:bg-red-700 transition duration-300 ease-in-out"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-200 animate-spin fill-white"
                  >
                    <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                  </svg>
                )}
              </span>
              {isLoading ? <p>Entrando...</p> : "Entrar"}
            </button>
          </form>

          <div className="w-full flex items-center justify-center gap-1 py-1">
            <p className="text-xs font-light text-gray-500 whitespace-nowrap">
              ¿No tienes una cuenta?
            </p>
            <Link
              href={"/"}
              className="bg-gray-50 text-red-800 text-xs hover:underline cursor-pointer"
            >
              Crear una aqui
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const recenlySearch = useSelector((state) => state.searchState);

  const searchAdd = (item) => {
    dispatch(addSearch(item));
  };

  const handleChangeSearch = async (event) => {
    setLoading(true);
    const { value } = event.target;
    setSearch(value);

    if (value.trim().length > 0) {
      await axios
        .get("/api/public/search", {
          params: {
            keyword: value,
            pageSize: 6,
          },
        })
        .then((res) => {
          setProducts(res.data.products);
          setCount(res.data._count);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts([]);
      setCount(0);
      setLoading(false);
    }
  };

  const enterSearch = (e) => {
    if (e.key === "Enter") {
      searchAdd(search);
      router.push(`/search?keyword=${search}`, undefined, { shallow: true });
    }
  };

  const popularSearch = [
    "Sofas",
    "Camas",
    "Refrigeradoras",
    "Televisores 4K",
    "Sillones",
    "Cocinas a gas",
    "Microondas",
    "Sillones",
    "Licuadora",
    "Lavadoras",
  ];

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && !e.target.closest("#search")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" id="search">
      <input
        type="search"
        className="w-full md:w-[350px] text-xs peer text-gray-800 placeholder:text-gray-600 pl-12 py-3 rounded-sm ring-1 bg-white focus:bg-gray-50 ring-gray-400 border-none placeholder:text-sm peer focus:ring-red-800 duration-100 ease-in-out"
        placeholder={"¿Qué estás buscando?"}
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={handleChangeSearch}
        onKeyUp={enterSearch}
      />
      <div className="absolute top-[13px] left-3 flex pr-2 border-r border-gray-500 peer-focus:border-red-800">
        <SearchGlass
          className={`w-4 fill-gray-500 peer-focus:fill-red-800`}
          width={16}
        />
      </div>

      {isOpen && (
        <div className="absolute top-[45px] left-0 z-[1000] w-full bg-gray-50 shadow-md rounded-sm ring-1 ring-gray-300 p-5 duration-150 ease-in-out">
          {loading && <Loading />}
          <ul className="w-full grid grid-cols-2">
            {!loading &&
              search.length > 0 &&
              products.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/producto/${item.codigo}`}
                    className="flex items-center gap-4 p-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                      width={80}
                      height={80}
                      alt={item.nombre}
                      className="rounded-md w-[80px] h-[80px] object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xs font-light text-gray-700 leading-3">
                        {item.marca.nombre}
                      </h3>
                      <h1 className="text-sm font-semibold text-gray-700">
                        {item.nombre}
                      </h1>
                      <h4 className="text-sm font-bold text-red-800 leading-3">
                        ${item.precio}
                      </h4>
                    </div>
                  </Link>
                </li>
              ))}

            {count > 4 && !loading && search.length > 0 && (
              <Link
                href={`/search?keyword=${search}`}
                className="flex items-center justify-center gap-2 p-2 hover:underline col-span-2 mt-2"
              >
                <p className="text-xs font-semibold text-gray-700">
                  Ver todos los resultados ({count})
                </p>
              </Link>
            )}
            {count === 0 && search.length > 1 && !loading && (
              <p className="text-xs text-center col-span-2">
                No se encontraron resultados
              </p>
            )}

            {search.length === 0 && (
              <>
                <div className="col-span-1">
                  <div className="flex gap-2 items-center">
                    <SparkleIcon className="w-4 h-4 fill-red-800 " />
                    <h1 className="font-bold text-gray-800">
                      Búsquedas populares
                    </h1>
                  </div>
                  <div className="grid grid-cols-1  mt-2 ml-2 mr-3 list-decimal text-xs text-gray-700">
                    {popularSearch.map((item, index) => (
                      <Link
                        key={index}
                        className="text-xs font-semibold text-gray-700 flex gap-2 rounded-sm hover:bg-gray-200 py-3 pl-2 border-b border-gray-200"
                        href={`/search?keyword=${item}`}
                        onClick={() => {
                          searchAdd(item);
                          setIsOpen(false);
                        }}
                      >
                        <span className="font-semibold text-red-800">
                          {index + 1}.
                        </span>{" "}
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
                {recenlySearch.length > 0 && (
                  <div className="col-span-1">
                    <h1 className="font-bold text-gray-800 w-full flex justify-between items-center">
                      Busquedas recientes
                      <button
                        type="button"
                        className="text-gray-400 text-xs font-light cursor-pointer hover:underline"
                        onClick={() => dispatch(removeAllSearch())}
                      >
                        Limpiar historial{" "}
                      </button>
                    </h1>
                    <ul className="grid grid-cols-1 mt-2 text-xs text-gray-700">
                      {recenlySearch.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-2 rounded-sm hover:bg-gray-200 items-center px-2 border-b border-gray-200"
                        >
                          <Link
                            href={`/search?keyword=${item}`}
                            className="text-xs font-semibold py-3 text-gray-700 flex gap-2 items-center w-full"
                            onClick={() => setIsOpen(false)}
                          >
                            <ClockRotate className="w-4 h-4 fill-gray-400 " />
                            {item}
                          </Link>
                          <XMarkIcon
                            className="w-3 h-3 fill-gray-400 hover:fill-gray-700 ml-auto cursor-pointer"
                            onClick={() => dispatch(removeSearch(item))}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
