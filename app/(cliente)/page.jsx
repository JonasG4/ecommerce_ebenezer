"use client";
import { useState, useEffect } from "react";
import { AngleDownIcon } from "@/components/icons/light";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CardProductV2 from "@/components/cards/CardProductV2";
import {
  CreditCardIcon,
  ShopIcon,
  TrunkFastIcon,
} from "@/components/icons/solid";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ShieldCheckIcon } from "@/components/icons/regular";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <Slider />
      <section className="w-full flex items-center justify-center">
        <div className="w-[1400px] flex items-center justify-between">
          <Image
            src="/images/banners/rebajas.jpg"
            width={400}
            height={150}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-[450px] h-[220px] rounded-sm shadow-md ring-1 ring-gray-300"
            priority
          />
          <Image
            src="/images/banners/rebaja2.png"
            width={400}
            height={150}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-[450px] h-[220px] rounded-sm ring-1 ring-gray-300 shadow-md"
            priority
          />
          <Image
            src="/images/banners/envios.jpg"
            width={400}
            height={150}
            alt="Envios a todo el pais Eben Ezer"
            className="object-cover w-[450px] h-[220px] rounded-sm shadow-md ring-1 ring-gray-300"
            priority
          />
        </div>
      </section>

      <SomeProducts title="El mejor confort en camas y colchones" />

      <section className="w-full py-5 flex justify-center">
        <div className="w-[1400px] flex justify-evenly">
          <article className="flex flex-col items-center gap-2 justify-center">
            <TrunkFastIcon className="w-[60px] fill-red-800" />
            <h2 className="text-center">
              <span className="text-xl font-bold text-zinc-700">
                Envíos hasta tu hogar
              </span>
              <span className="text-zinc-500 block leading-4">
                {" "}
                disponibles en todo el país
              </span>
            </h2>
          </article>
          <article className="flex flex-col items-center gap-2  justify-center">
            <ShieldCheckIcon className="w-[50px] fill-red-800" />
            <h2 className="text-center">
              <span className="text-xl font-bold text-zinc-700">
                Pago rápido y seguro
              </span>
              <span className="text-zinc-500 block leading-4">
                {" "}
                con un solo click
              </span>
            </h2>
          </article>
          <article className="flex flex-col items-center gap-2 justify-center">
            <CreditCardIcon className="w-[60px] fill-red-800" />
            <h2 className="text-center">
              <span className="text-xl font-bold text-zinc-700">
                Paga con tarjeta
              </span>
              <span className="text-zinc-500 block leading-4">
                {" "}
                de crédito o débito
              </span>
            </h2>
          </article>
          <article className="flex flex-col items-center gap-2 justify-center">
            <ShopIcon className="w-[65px] fill-red-800" />
            <h2 className="text-center">
              <span className="text-xl font-bold text-zinc-700">
                Recoge en sucursal
              </span>
              <span className="text-zinc-500 block leading-4">
                {" "}
                sin costo adicional (pickup)
              </span>
            </h2>
          </article>
        </div>
      </section>

      <CategoriesList />

      <SpecialOffers />

      <BrandsList />
    </main>
  );
}

export const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([
    "/images/banners/banner1.png",
    "/images/banners/banner2.jpg",
  ]);

  const prev = () => {
    if (current === 0) {
      setCurrent(images.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const next = () => {
    if (current === images.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === images.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="py-5 flex gap-5 relative group/slider">
      <button
        type="button"
        className="cursor-pointer flex items-center justify-center group/prev absolute top-1/2 -left-3 h-6 w-6 bg-white ring-1 ring-gray-400 hover:ring-gray-500 rounded-full transform -translate-y-1/2"
        onClick={prev}
      >
        <AngleDownIcon
          className="w-2 fill-gray-400 rotate-90 group-hover/prev:fill-gray-500 group-active/prev:scale-90"
          id="prev"
        />
      </button>
      <div className="flex flex-col items-center gap-2">
        <Image
          src={images[current]}
          width={1400}
          height={300}
          alt="PRODUCTOS EBEN EZER"
          className="rounded-sm object-cover ring-1 ring-gray-400 h-[300px] w-[1400px]"
        />
        <div className="absolute flex gap-1 items-center justify-center bottom-6 bg-black bg-opacity-30 p-2 rounded-md shadow-md">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full focus:outline-none ${
                current === index ? "bg-gray-400" : "bg-gray-300"
              } duration-200 ease-in-out transition-colors`}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="cursor-pointer flex items-center justify-center group/prev absolute top-1/2 -right-3 h-6 w-6 bg-white ring-1 ring-gray-400 hover:ring-gray-500 rounded-full transform -translate-y-1/2"
        onClick={next}
      >
        <AngleDownIcon
          className="w-2 fill-gray-400 -rotate-90 group-hover/prev:fill-gray-500 group-active/next:scale-90"
          id="next"
        />
      </button>
    </section>
  );
};

export const SomeProducts = ({title, endpoint}) => {
  const [products, setProducts] = useState([]);

  return (
    <section className="w-full flex items-center justify-center py-10">
      <div className="w-[1400px] flex flex-col items-center justify-between gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="uppercase text-2xl font-bold text-gray-700">
            {title}
          </h1>
          <div className="flex gap-1">
            <ChevronLeftIcon className="w-6 h-6 fill-gray-400 cursor-pointer" />
            <ChevronRightIcon className="w-6 h-6 fill-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {Array(6)
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className="relative w-[220px] h-[340px] bg-transparent skeleton"
              ></li>
            ))}
        </div>
      </div>
    </section>
  );
};

export function SpecialOffers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/products/disccount");
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="w-full py-10 bg-zinc-900 flex justify-center">
      <div className="w-[80%] flex items-center justify-evenly">
        <div>
          <h1 className="text-4xl font-black text-yellow-500">
            ¡ESTÁS DE SUERTE!
          </h1>
          <h1 className="text-2xl font-extrabold text-zinc-50 uppercase text-center">
            Aprovecha las ofertas
            <span className="block text-5xl">limitadas</span>
          </h1>
        </div>
        {loading ? (
          <div className="mt-4 grid movile:grid-cols-1 tablet:grid-cols-4 place-items-center gap-4">
            {Array(4)
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className="relative w-[220px] h-[340px] bg-transparent skeleton-dark"
                ></li>
              ))}
          </div>
        ) : (
          <>
            <ChevronLeftIcon className="w-10 h-10 fill-gray-300 cursor-pointer" />
            <div className="mt-4 grid movile:grid-cols-1 tablet:grid-cols-4 place-items-center gap-4">
              {products.map((product, index) => (
                <CardProductV2 key={index} product={product} />
              ))}
            </div>
            <ChevronRightIcon className="w-10 h-10 fill-gray-300 cursor-pointer" />
          </>
        )}
      </div>
    </section>
  );
}

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="my-10 flex flex-col items-center justify-center w-[1400px]">
      <h1 className="uppercase text-2xl font-bold text-gray-700">
        Explora nuestras categorias
      </h1>
      <p className="text-gray-500">
        Encuentra los mejores productos para tu hogar
      </p>
      <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid p-5">
        <ul className="p-4 grid grid-cols-3 gap-3 [&>*:nth-child(4)]:col-span-2 w-full">
          {loading ? (
            <>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className="relative min-w-[400px] h-[200px] bg-gray-200 skeleton"
                  ></li>
                ))}
            </>
          ) : (
            <>
              {categories.map((categoria, index) => (
                <li className="relative" key={index}>
                  <Link
                    href={`/categorias/${categoria.codigo}`}
                    className="relative ring-1 ring-gray-300 flex items-center justify-center w-full h-[200px] hover:shadow-md transition-all duration-200 ease-in-out"
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${categoria.imagen}`}
                      className="w-full h-full object-cover brightness-75 transition-all duration-200 ease-in-out filter"
                      width={1200}
                      height={200}
                      quality={100}
                      alt="Categoria Dormitorio"
                    />
                    <span className="absolute text-2xl top-0 w-full p-2 text-zinc-50 uppercase font-black bg-gradient-to-b bg-opacity-10 to-black/[0.35]">
                      {categoria.nombre}
                    </span>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

export const BrandsList = () => {
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    const { data } = await axios.get("/api/brands");
    setBrands(data);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="my-10 flex flex-col items-center justify-center">
      <h1 className="mt-10 uppercase text-2xl font-bold text-gray-700">
        CONOCE NUESTRAS MARCAS
      </h1>
      <p className="text-gray-500">
        Sellos de calidad que nos respaldan, conoce las marcas que tenemos para
        ti
      </p>
      <div className="w-[120px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid grid-rows-2 grid-flow-col gap-8 my-4">
        {brands.map((brand, index) => (
          <div
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <Image
              src={`${process.env.AWS_BUCKET_URL}${brand.imagen}`}
              width={120}
              height={100}
              placeholder="blur"
              blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
              alt="Marca SAMSUNG"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
