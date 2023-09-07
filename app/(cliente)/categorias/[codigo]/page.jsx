"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Pagination from "@/components/list/paginationClient";
import { paginate } from "@/libs/paginate";
import Loading from "@/app/(cliente)/categorias/[codigo]/loading";
import CardProduct from "@/components/cards/CardProduct";
import Link from "next/link";
import NotFound from "@/app/(cliente)/not-found";

export default function Page({ params: { codigo } }) {
  const [categoria, setCategoria] = useState({});
  const [isCategoriaExist, setIsCategoriaExist] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`/api/public/categories/${codigo}`)
      .then((res) => {
        const { data } = res;

        setCategoria({
          type: data.type,
          nombre: data.nombre,
          categoria: data?.categoria,
          subcategorias: data?.Subcategorias,
          codigo: data.codigo,
          imagen:
            data.type === "categoria" ? data.imagen : data.categoria.imagen,
        });
        setProducts(data.Productos);
        setIsCategoriaExist(true);
      })
      .catch((err) => {
        setIsCategoriaExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [pageSize, setPageSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  useEffect(() => {
    getData();
  }, []);

  const productsList = paginate(products, currentPage, pageSize);
  return (
    <div className="w-full flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          {isCategoriaExist && (
            <section className="w-[1400px] flex flex-col gap-3">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${categoria.imagen}`}
                width={1400}
                height={400}
                quality={100}
                placeholder="blur"
                blurDataURL="image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMqvh/DQAF7gK5UK3yKwAAAABJRU5ErkJggg=="
                alt={`imagen de la categoria ${categoria.nombre}`}
                className="w-full h-[180px] object-cover rounded-tl-md rounded-tr-md"
              />

              <div className="flex flex-col gap-2">
                <p className="text-sm font-light text-zinc-800 flex gap-1">
                  <Link href="/" className="hover:underline hover:text-red-800">
                    Inicio
                  </Link>
                  <span>/</span>
                  <Link
                    href="/categorias"
                    className="hover:underline hover:text-red-800"
                  >
                    Categorias
                  </Link>
                  <span>/</span>
                  {categoria.type === "subcategoria" && (
                    <>
                      <Link
                        href={`/categorias/${categoria.categoria.codigo}`}
                        className="hover:underline hover:text-red-800"
                      >
                        {categoria.categoria.nombre}
                      </Link>
                      <span>/</span>
                    </>
                  )}
                </p>
                <h1 className="text-3xl font-black text-zinc-900 uppercase">
                  {categoria.nombre}
                </h1>
              </div>

              {categoria.subcategorias && (
                <>
                  <div className="w-[200px] h-[2px] bg-red-300"></div>

                  <div className="w-full flex gap-2 my-2">
                    {categoria.subcategorias
                      .filter((sub) => sub._count.Productos > 0)
                      .map((subcategoria, index) => (
                        <Link
                          key={index}
                          href={`/categorias/${subcategoria.codigo}`}
                          className={`rounded-md py-1 px-2 ring-1 shadow-md flex duration-100 ease-out hover:ring-red-900 hover:text-red-900 hover:bg-red-50 cursor-pointer select-none ring-gray-300 bg-gray-50 text-gray-500`}
                        >
                          {subcategoria.nombre}
                        </Link>
                      ))}
                  </div>
                </>
              )}

              <Pagination
                items={products.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={handlerChangePage}
                onChangePageSize={handleChangePageSize}
              />

              <div className="w-full py-5 grid grid-cols-2 place-items-center laptop:grid-cols-4 gap-4">
                {productsList.map((product, index) => (
                  <CardProduct key={index} product={product} />
                ))}

                {products.length === 0 && (
                  <div className="w-full flex items-center justify-center">
                    <h1 className="text-lg font-light text-gray-800 uppercase">
                      No hay productos en esta categoria
                    </h1>
                  </div>
                )}
              </div>

              <Pagination
                items={products.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onChangePage={handlerChangePage}
                onChangePageSize={handleChangePageSize}
              />
            </section>
          )}
        </>
      )}
      {!isCategoriaExist && <NotFound />}
    </div>
  );
}
