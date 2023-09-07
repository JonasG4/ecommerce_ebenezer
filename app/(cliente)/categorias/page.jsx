"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Loading from "@/app/(cliente)/categorias/loading";

export default function CategoriasPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/api/public/categories");
    setCategories(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[1400px] mt-6">
          <div
            className="flex gap-2 group/back cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="w-4 cursor-pointer fill-gray-500 group-hover/back:fill-red-800" />
            <p className="text-sm text-gray-500 group-hover/back:text-red-800">
              Regresar
            </p>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 uppercase">
            Categorias
          </h1>
          <div className="w-[200px] h-[2px] bg-red-300 my-2"></div>

          <section className="grid grid-cols-2 mt-6 gap-4">
            {categories.map((category, index) => (
              <article
                key={index}
                className="flex h-[300px] overflow-hidden shadow-md ring-1 ring-gray-300 rounded-md"
              >
                <Image
                  src={`${process.env.AWS_BUCKET_URL}${category.imagen}`}
                  width={300}
                  height={300}
                  alt={`${category.nombre}`}
                  className="rounded-l-md cursor-pointer"
                />
                <div className="flex flex-col gap-1 w-full overflow-hidden">
                  <Link
                    href={`/categorias/${category.codigo}`}
                    className="text-lg font-ligth text-white uppercase  w-full py-1 px-2 bg-red-900 rounded-sm hover:underline"
                  >
                    {category.nombre}
                  </Link>
                  <div className="flex flex-col px-4 pb-4 gap-1 overflow-auto">
                    {category.Subcategorias.map((subcategoria, index) => (
                      <Link
                        key={index}
                        href={`/categorias/${subcategoria.codigo}`}
                        className="hover:underline hover:text-red-900 cursor-pointer"
                      >
                        {subcategoria.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
