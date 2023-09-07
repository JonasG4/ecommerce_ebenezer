"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/loading";
import Link from "next/link";
import Pagination from "@/components/list/paginationClient";
import CardProduct from "@/components/cards/CardProduct";
import Image from "next/image";
import { paginate } from "@/libs/paginate";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const { data } = await axios
      .get("/api/public/search", {
        params: {
          keyword,
        },
      })
      .finally(() => {
        setLoading(false);
      });
    setProducts(data.products);
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
    if (keyword) {
      getProducts();
    }
  }, [keyword]);

  const productosList = paginate(products, currentPage, pageSize);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[1400px] py-10">
        <p className="text-sm font-light text-zinc-800 flex items-center gap-1">
          <Link href="/" className="hover:underline hover:text-red-800">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-base">
            Resultados para{" "}
            <span className="font-semibold text-zinc-900">{keyword}</span>
          </span>
        </p>
        {loading ? (
          <loading />
        ) : (
          <>
            {products.length > 0 && (
              <div className="w-full flex flex-col">
                <h1 className="py-4">
                  Resultados encontrados para{" "}
                  <span className="text-2xl font-bold text-gray-800">
                    &quot; {keyword} &quot;
                  </span>
                </h1>
                <Pagination
                  items={products.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={handlerChangePage}
                  onChangePageSize={handleChangePageSize}
                />

                <div className="w-full py-5 grid grid-cols-2 place-items-center laptop:grid-cols-4 gap-4">
                  {productosList.map((product, index) => (
                    <CardProduct key={index} product={product} />
                  ))}
                </div>
                <Pagination
                  items={products.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={handlerChangePage}
                  onChangePageSize={handleChangePageSize}
                />
              </div>
            )}
          </>
        )}

        {products.length === 0 && (
          <div className="flex flex-col items-center gap-4 justify-center py-10">
            <Image
              src="/images/not-found-2.jpg"
              width={300}
              height={300}
              alt="not found"
            />
            <div className="text-center">
              <h1 className="text-2xl font-light text-red-800">
                &quot; {keyword} &quot;
              </h1>
              <h1 className="text-xl uppercase font-bold text-gray-800 mt-4">
                No encontramos resultados
              </h1>
              <p className="text-lg text-gray-600 col-span-2 laptop:col-span-4">
                Intenta buscar con otra <strong className="text-red-800">palabra clave</strong> o un
                término más general.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
