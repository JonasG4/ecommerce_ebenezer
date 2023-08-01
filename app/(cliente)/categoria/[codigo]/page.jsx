"use client";
import { useState, useEffect } from "react";
import { calcularPorcentaje } from "@/libs/transformString";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Pagination from "@/components/list/paginationClient";
import { paginate } from "@/libs/paginate";
import Loading from "@/app/(cliente)/categoria/[codigo]/loading";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart";

export default function Page({ params: { codigo } }) {
  const [categoria, setCategoria] = useState({});
  const [products, setProducts] = useState([]);
  const [productsBU, setProductsBU] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const getProductos = async (id_categoria) => {
    const res = await axios.get(`/api/products/categories/${id_categoria}`);
    setProducts(res.data);
    setProductsBU(res.data);
  };

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(`/api/categories/${codigo}`);
    if(res.data === null) return window.location.replace("/404");
    setCategoria(res.data);
    getProductos(res.data.id_categoria);
    setLoading(false);
  };

  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const handleFilter = (filtro) => {
    if (filtro === "") {
      setProducts(productsBU);
      setFilter("");
    } else {
      const filtered = productsBU.filter((product) => {
        return product.subcategoria?.nombre === filtro;
      });

      setProducts(filtered);
      setFilter(filtro);
    }
  };

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    getData();
  }, []);

  const productsList = paginate(products, currentPage, pageSize);
  return (
    <div className="w-full flex items-center justify-center px-5 pb-5">
      <section className="w-[1400px] flex flex-col gap-3">
        {loading ? (
          <Loading />
        ) : (
          <>
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
            <h1 className="text-2xl font-black text-gray-800 uppercase">
              {categoria.nombre}
            </h1>
            <div className="w-[200px] h-[2px] bg-red-300"></div>

            <div className="w-full flex gap-2 my-2">
              {categoria.Subcategorias && (
                <>
                  <div
                    className={`rounded-md py-1 px-2 ring-1 shadow-md flex duration-100 ease-out hover:ring-red-900 hover:text-red-900 hover:bg-red-50 cursor-pointer select-none
                ${
                  filter === ""
                    ? "ring-red-900 text-red-900 bg-red-50"
                    : "ring-gray-300 bg-gray-50 text-gray-500"
                }
                `}
                    onClick={() => handleFilter("")}
                  >
                    Todos
                  </div>
                  {categoria.Subcategorias.filter(
                    (sub) => sub._count.Productos > 0
                  ).map((subcategoria, index) => (
                    <div
                      key={index}
                      className={`rounded-md py-1 px-2 ring-1 shadow-md flex duration-100 ease-out hover:ring-red-900 hover:text-red-900 hover:bg-red-50 cursor-pointer select-none
                  ${
                    filter === subcategoria.nombre
                      ? "ring-red-900 text-red-900 bg-red-50"
                      : "ring-gray-300 bg-gray-50 text-gray-500"
                  }
                  `}
                      onClick={() => handleFilter(subcategoria.nombre)}
                    >
                      {subcategoria.nombre}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="w-full bg-gray-100 rounded-md p-5 grid grid-cols-3 gap-4">
              {productsList.map((product, index) => (
                <div
                  key={index}
                  className="relative w-[420px] h-[180px] bg-gray-50 rounded-md p-2 ring-1 ring-gray-300 shadow-md flex gap-2 duration-100 ease-out hover:ring-red-300"
                >
                  <Image
                    src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
                    className="max-w-[125px] h-full rounded-md object-contain"
                    width={125}
                    height={180}
                    quality={100}
                    alt={product.nombre}
                  />
                  {product.porcentaje_descuento > 0 && (
                    <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-md">
                      {product.porcentaje_descuento}%
                    </span>
                  )}
                  <div className="p-2 w-full flex flex-col  justify-between">
                    <div>
                      <h2 className="text-sm font-black text-gray-800 uppercase">
                        {product.marca.nombre}
                      </h2>
                      <h3 className="text-sm font-bold text-gray-500 line-clamp-2">
                        {product.nombre}
                      </h3>
                    </div>
                    <div
                      className={`flex gap-4 items-center justify-start ${
                        product.porcentaje_descuento > 0 &&
                        "flex-row-reverse justify-end"
                      }`}
                    >
                      <h1 className="font-black text-gray-800 flex flex-col">
                        <span className="text-xs font-normal">
                          Precio normal
                        </span>
                        <span
                          className={`leading-5 ${
                            product.porcentaje_descuento
                              ? "font-normal text-gray-500 line-through text-sm "
                              : "font-bold text-2xl"
                          }`}
                        >
                          ${product.precio.toString().split(".")[0]}
                          <span className="text-xs">
                            {"."}
                            {product.precio.toString().split(".")[1] || "00"}
                          </span>
                        </span>
                      </h1>
                      {product.porcentaje_descuento > 0 && (
                        <h1 className="font-black text-red-700 flex flex-col">
                          <span className="font-normal text-xs">
                            Precio especial
                          </span>
                          <span className="text-2xl font-bold leading-5 text-red-800">
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
                      <button
                      type="button"
                      onClick={() => handleAddProduct(product)}
                      className="ring-1 ring-red-700 text-white bg-red-700 hover:bg-red-900 rounded-sm w-full py-1 text-sm mt-auto">
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

              {loading ? (
                <div>
                  <Loading />
                </div>
              ) : (
                <>
                  {products.length === 0 && (
                    <div className="w-full flex items-center justify-center">
                      <h1 className="text-lg font-light text-gray-800 uppercase">
                        No hay productos en esta categoria
                      </h1>
                    </div>
                  )}
                </>
              )}
            </div>

            <Pagination
              items={products.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onChangePage={handlerChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </>
        )}
      </section>
    </div>
  );
}
