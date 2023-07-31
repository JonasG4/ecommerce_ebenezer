"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
//utils
//components
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import Pagination from "@/components/list/pagination";
import { paginate } from "@/libs/paginate";
import TitleList from "@/components/list/titleList";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { BagsShoppingIcon } from "@/components/icons/regular";
import { calcularPorcentaje } from "@/libs/transformString";

export default function ProductosPage() {
  const [products, updateProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [productosBU, updateProductsBU] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      await axios.get("/api/products").then((res) => {
        updateProducts(res.data);
        updateProductsBU(res.data);
      });
    } catch (error) {
      notify("Error al cargar los productos");
    }
    setLoading(false);
  };

  const notify = (msg) =>
    toast.success(msg, {
      className: "bg-indigo-700 text-gray-50",
    });

  const [pageSize, setPageSize] = useState(10);
  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const productsList = paginate(products, currentPage, pageSize);
  return (
    <div className="py-7 px-4 bg-gray-100 w-full flex flex-col h-full overflow-hidden">
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <TitleList title={"Lista de productos"} Icon={BagsShoppingIcon} />
      <div className="relative shadow-xl rounded-md bg-white overflow-hidden ring-1 ring-gray-300">
        <section className="p-5 bg-gray-50 w-full overflow-hidden flex flex-col h-full">
          <TableOptions
            table="productos"
            dataBU={productosBU}
            setData={updateProducts}
            getData={getProducts}
          />

          <article className="w-full overflow-auto ring-1 ring-gray-300 rounded-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md relative">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
                <tr className="">
                  <th scope="col" className="w-[30px] py-3 px-4">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"id_producto"}
                        data={products}
                        setData={updateProducts}
                      />
                      <p>ID</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <p>Imagen</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortBy
                        field={"nombre"}
                        data={products}
                        setData={updateProducts}
                      />
                      <p>Nombre</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <p>Marca</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <p>Categoria</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <p>Sub-Categoria</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"stock"}
                        data={products}
                        setData={updateProducts}
                      />
                      <p>Cantidad</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"precio"}
                        data={products}
                        setData={updateProducts}
                      />
                      <p>Precio</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"precio"}
                        data={products}
                        setData={updateProducts}
                      />
                      <p>Con Descuento</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <FilterBy
                        data={productosBU}
                        setData={updateProducts}
                        filters={[
                          { is_published: 0, nombre: "No Publicado" },
                          { is_published: 1, nombre: "Publicado" },
                        ]}
                        field={"is_published"}
                      />
                      <p>Estado</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="w-[30px] px-6 py-4 ">
                      <span className="rounded-md px-2 py-1 text-indigo-50 text-[12px] font-semibold bg-indigo-600">
                        {product.id_producto}
                      </span>
                    </td>
                    <th className="w-[150px] py-4 px-6">
                      <Image
                        src={
                          product.portada
                            ? process.env.AWS_BUCKET_URL + product.portada
                            : "/no-image.png"
                        }
                        width={50}
                        height={50}
                        alt={product.nombre}
                        className="rounded-md ring-1 ring-gray-300 w-[50px] h-[50px] object-contain"
                      />
                    </th>
                    <td className="w-[300px] py-4 px-6 whitespace-nowrap">
                      {product.nombre}
                    </td>
                    <td className="w-[160px] py-4 px-6 font-semibold text-sm whitespace-nowrap">
                      {product.marca.nombre}
                    </td>
                    <td className="w-[160px] py-4 px-6 font-semibold text-sm whitespace-nowrap">
                      {product.categoria.nombre}
                    </td>
                    <td className="w-[160px] py-4 px-6 text-sm whitespace-nowrap">
                      {product.subcategoria.nombre}
                    </td>
                    <td className="w-[150px] py-4 px-6 whitespace-nowrap">
                      {product.stock > 0 ? (
                        <p className="text-green-600 text-xs py-1 px-2 text-center bg-green-100 rounded-md inline-block mx-auto font-medium">
                          {product.stock} Unidades
                        </p>
                      ) : (
                        <p className="text-red-600 text-xs py-1 px-2 text-center bg-red-100 rounded-md inline-block mx-auto font-medium">
                          Agotado
                        </p>
                      )}
                    </td>
                    <td className="w-[150px] py-4 px-6 whitespace-nowrap font-bold">
                      ${product.precio}
                    </td>
                    <td className="w-[150px] py-4 px-6 whitespace-nowrap">
                      $
                      {calcularPorcentaje(
                        product.precio,
                        product.porcentaje_descuento
                      )}{" "}
                      ({product.porcentaje_descuento}%)
                    </td>
                    <td className="py-2 px-6 w-[150px]">
                      {product.is_active ? (
                        <p className="text-indigo-600 text-xs py-1 px-2 text-center bg-indigo-100 rounded-md inline-block mx-auto font-medium">
                          Publicado
                        </p>
                      ) : (
                        <p className="text-gray-700 whitespace-nowrap text-xs p-2 text-center bg-gray-200 rounded-md inline-block mx-auto font-medium">
                          No publicado
                        </p>
                      )}
                    </td>
                    <td className="w-[150px] py-4 px-6">
                      <div className="flex gap-3">
                        <Link
                          href={`/nx-admin/productos/${product.codigo}`}
                          className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                        >
                          Revisar
                        </Link>
                        <div className="w-[1px] h-[20px] bg-gray-400"></div>
                        <Link
                          href={`/nx-admin/productos/${product.codigo}/edit`}
                          className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {productsList.length < 1 && <NoRecordFound isLoading={isLoading} />}
          </article>
          <Pagination
            items={products.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
            onChangePageSize={handleChangePageSize}
          />
        </section>
      </div>
    </div>
  );
}
