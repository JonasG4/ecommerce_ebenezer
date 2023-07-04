"use client";
import { useState, useEffect } from "react";
import { calcularPorcentaje } from "@/libs/transformString";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Pagination from "@/components/list/pagination";
import { paginate } from "@/libs/paginate";

export default function Page({ params: { codigo } }) {
  //   const products = [
  //     {
  //       id: 1,
  //       nombre: "Cama Indufoam Semi Dream Sleeper",
  //       precio: "287.79",
  //       descuento: "252.71",
  //       image: "/images/products/DreamSleeper.jpg",
  //     },
  //     {
  //       id: 1,
  //       nombre: "Cama Indufoam Full Fresco Foam",
  //       precio: "209.99",
  //       descuento: "199.90",
  //       image: "/images/products/FrescoFoam.jpg",
  //     },
  //     {
  //       id: 1,
  //       nombre: "Cama Capri Exclusiva (3 en 1) 2.00mt",
  //       precio: "429.86",
  //       descuento: "415.00",
  //       image: "/images/products/1-36.jpg",
  //     },
  //     {
  //       id: 1,
  //       nombre: "Cama Capri Master Technology 1.00mt",
  //       precio: "316.92",
  //       descuento: "",
  //       image: "/images/products/DreamSleeper.jpg",
  //     },
  //   ];

  const [categoria, setCategoria] = useState({});
  const [products, setProducts] = useState([]);

  const getProductos = async (id_categoria) => {
    const res = await axios.get(`/api/products/categories/${id_categoria}`);
    setProducts(res.data);
  };

  const getData = async () => {
    const res = await axios.get(`/api/categories/${codigo}`);
    setCategoria(res.data);
    getProductos(res.data.id_categoria);
  };

  const [pageSize, setPageSize] = useState(10);
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
    <div className="w-full flex items-center justify-center p-5">
      <section className="w-[1400px]">
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
        <h1 className="text-3xl font-black text-gray-800 uppercase">
          {categoria.nombre}
        </h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>

        <div className="w-full my-2">
          <p className="font-medium">Resultado: {products.length}</p>
        </div>

        <div className="w-full bg-gray-100 rounded-md p-5 flex gap-4 flex-wrap">
          {productsList.map((product, index) => (
            <div
              key={index}
              className="w-[650px] h-[200px] bg-gray-50 rounded-md p-2 ring-1 ring-gray-300 shadow-md flex duration-100 ease-out"
            >
              <Image
                src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
                className="w-[300px] h-full rounded-md object-contain"
                width={300}
                height={200}
                quality={100}
                alt={product.nombre}
              />
              <div className="p-2 w-full flex flex-col gap-2 justify-between">
                <h2 className="text-lg font-black text-gray-800 uppercase">
                  {product.nombre}
                </h2>
                <div className="flex gap-6 items-center justify-between">
                  <h1 className="font-black text-gray-800 flex flex-col">
                    <span className=" font-light">Precio normal</span>
                    <span
                      className={`leading-4 ${
                        product.porcentaje_descuento
                          ? "line-through font-light text-xl "
                          : "font-bold text-2xl"
                      }`}
                    >
                      ${product.precio.toString().split(".")[0]}
                      <span className="text-xs">
                        {"."}
                        {product.precio.toString().split(".")[1]}
                      </span>
                    </span>
                  </h1>
                  {product.porcentaje_descuento > 0 && (
                    <h1 className="font-black text-red-700 flex flex-col">
                      <span className="font-light">Precio especial</span>
                      <span className="text-xl font-light leading-4 p-2 bg-red-700 text-center text-red-50">
                        $
                        {
                          calcularPorcentaje(
                            product.precio,
                            product.porcentaje_descuento
                          ).split(".")[0]
                        }
                        <span className="text-xs">
                          {"."}{" "}
                          {
                            calcularPorcentaje(
                              product.precio,
                              product.porcentaje_descuento
                            ).split(".")[1]
                          }
                        </span>
                      </span>
                    </h1>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="ring-1 ring-red-700 text-white bg-red-700 hover:bg-red-900 rounded-sm w-full py-1 text-sm mt-auto">
                    Agregar al carrito
                  </button>
                  <Link
                    className="ring-1 ring-gray-400 text-gray-500 hover:text-red-700 hover:ring-red-700 rounded-sm w-full p-1 flex items-center justify-center text-sm "
                    href={`/producto/${product.codigo}`}
                  >
                    Ver producto
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="w-full flex items-center justify-center">
              <h1 className="text-2xl font-light text-gray-800 uppercase">
                No hay productos en esta categoria
              </h1>
            </div>
          )}
        </div>

        <Pagination
          itemsCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlerChangePage}
          onChangePageSize={handleChangePageSize}
        />
      </section>
    </div>
  );
}
