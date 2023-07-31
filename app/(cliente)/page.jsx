"use client";
import { useState, useEffect } from "react";
import { AngleDownIcon } from "@/components/icons/light";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full items-center justify-center">
      <Slider />

      <section className="w-full h-[500px] py-10 bg-gray-100 flex justify-center">
        <div className="w-[1200px] h-full flex flex-col items-center">
          <h1 className="text-2xl font-extrabold text-gray-800 uppercase">
            Ofertas especiales
          </h1>
        </div>
      </section>

      <CategoriesList />

      <BrandsList />
    </main>
  );
}

export const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([
    "/images/portada.jpg",
    "/images/portada.jpg",
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
    <section className="py-10 flex gap-5">
      <button
        type="button"
        className="cursor-pointer active:scale-95 group/prev"
        onClick={prev}
      >
        <AngleDownIcon
          className="w-10 fill-gray-300 mx-auto rotate-90 group-hover/prev:fill-gray-500"
          id="prev"
        />
      </button>
      <div className="flex flex-col gap-3 items-center">
        <Image
          src={images[current]}
          width={1000}
          height={200}
          alt="PRODUCTOS EBEN EZER"
          className="rounded-md object-cover ring-1 ring-gray-400"
        />
        <div>
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              className={`w-4 h-4 rounded-full mx-1 focus:outline-none ${
                current === index ? "bg-gray-500" : "bg-gray-300"
              } duration-200 ease-in-out transition-colors`}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="cursor-pointer active:scale-95 group/next"
        onClick={next}
      >
        <AngleDownIcon
          className="w-10 fill-gray-300 mx-auto -rotate-90 group-hover/next:fill-gray-500"
          id="next"
        />
      </button>
    </section>
  );
};

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
    <section className="my-10 flex flex-col items-center justify-center">
      <h1 className="uppercase text-2xl font-bold text-gray-700">
        Explora nuestras categorias
      </h1>
      <p className="text-gray-500">
        Encuentra los mejores productos para tu hogar
      </p>
      <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid p-5">
        <ul className="p-4 grid grid-cols-3 gap-4">
          {loading ? (
            <>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className="relative w-[350px] h-[140px] bg-gray-200 skeleton after:rounded-md"
                  ></li>
                ))}
            </>
          ) : (
            <>
              {categories.map((categoria, index) => (
                <li className="relative" key={index}>
                  <Link
                    href={`/categoria/${categoria.codigo}`}
                    className="relative bg-black bg-opacity-40 hover:scale-105 duration-300 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[140px] rounded-md backdrop-blur-sm"
                  >
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${categoria.imagen}`}
                      className="w-full h-full rounded-md object-cover filter brightness-50"
                      width={350}
                      height={140}
                      quality={100}
                      alt="Categoria Dormitorio"
                    />
                    <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
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
