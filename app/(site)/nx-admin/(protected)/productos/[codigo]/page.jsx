"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/components/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaceFrownIcon } from "@/components/icons/regular";
import moment from "moment";
import "moment/locale/es-mx";
import ZoomImage from "@/components/modals/ZoomImages";
import parse from "html-react-parser";
import { calcularPorcentaje } from "@/libs/transformString";

export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [producto, updateProducto] = useState({});
  const [imageSelected, updateImageSelected] = useState({
    src: "",
    index: 0,
  });

  const getProducto = async () => {
    try {
      const { data } = await axios.get(`/api/products/${codigo}`);
      updateProducto(data);
      
      updateImageSelected({
        src: data.portada,
        index: 0,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <div className="w-full h-full p-5 flex flex-col gap-4 items-center">
      <section className="w-full md:w-[1000px] shadow-md rounded-md">
        <TitleForm
          title="Información del producto"
          route="/nx-admin/productos"
        />
        <article className="bg-gray-50 py-2 px-5">
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {producto ? (
                <>
                  <h1 className="uppercase text-lg text-gray-700 font-black flex items-center gap-2">
                    {producto.nombre}{" "}
                    <span
                      className={`font-semibold text-xs py-[2px] px-[10px] inline rounded-md text-gray-50 ${
                        producto.is_active
                          ? "bg-green-200 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {producto.is_active ? "Activa" : "Desactivada"}
                    </span>
                  </h1>
                  <div className="w-[100px] h-[1px] bg-indigo-500 my-1"></div>
                  <section className="flex gap-4 w-full mt-4 pb-2">
                    <article className="w-full flex flex-col gap-2">
                      <p className="text-sm font-semibold">Galeria</p>
                      <div className="w-full h-[200px] overflow-hidden rounded-t-md relative ring-1 ring-gray-300">
                        <Image
                          src={`${process.env.AWS_BUCKET_URL}${imageSelected.src}`}
                          width={650}
                          height={300}
                          alt={producto.nombre}
                          className="w-full h-full object-contain object-center"
                        />
                        <div className="absolute top-2 right-2 z-50">
                          <ZoomImage
                            images={producto.imagenes}
                            index={imageSelected.index}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        {producto.imagenes.map((imagen, index) => (
                          <div
                            key={index}
                            className={`w-[70px] rounded-md ring-1 ${
                              index === imageSelected.index
                                ? "ring-indigo-500"
                                : "ring-gray-300"
                            }  cursor-pointer`}
                            onClick={() =>
                              updateImageSelected({
                                src: imagen.imagen,
                                index,
                              })
                            }
                          >
                            <Image
                              src={`${process.env.AWS_BUCKET_URL}${imagen.imagen}`}
                              width={70}
                              height={200}
                              alt={producto.nombre}
                              className="object-cover object-center rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </article>
                    <article className="w-full">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col col-span-2 text-gray-700 gap-2">
                          <p className="text-sm font-semibold">Descripción</p>
                          <div className="p-2 rounded-md shadow-md ring-1 ring-gray-100 bg-white">
                            {parse(producto.descripcion)}
                          </div>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">Marca</p>
                          <h4 className="font-light text-sm">
                            {producto.marca.nombre}
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">Categoria</p>
                          <h4 className="font-light text-sm">
                            {producto.categoria.nombre}
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">Sub-categoria</p>
                          <h4 className="font-light text-sm">
                            {producto.subcategoria.nombre}
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">
                            Cantidad disponible
                          </p>
                          <h4 className="font-light text-sm">
                            {producto.stock} unidades
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">Precio normal</p>
                          <h4 className="font-light text-sm">
                            ${producto.precio}
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">
                            Precio con descuento
                          </p>
                          <h4 className="font-light text-sm">
                            <span className="font-medium">
                              $
                              {calcularPorcentaje(
                                producto.precio,
                                producto.porcentaje_descuento
                              )}
                            </span>
                            <span className="ml-1 p-1 rounded-md text-white bg-indigo-500 text-xs">
                              -{producto.porcentaje_descuento}%
                            </span>
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">
                            Fecha de creación
                          </p>
                          <h4 className="font-light text-sm">
                            {formatDate(producto.created_at)}
                          </h4>
                        </div>
                        <div className="flex-col text-gray-700">
                          <p className="text-sm font-semibold">
                            Fecha de modificación
                          </p>
                          <h4 className="font-light text-sm">
                            {formatDate(producto.updated_at)}
                          </h4>
                        </div>
                      </div>
                      <div className="w-[100px] h-[1px] bg-blue-500 my-1"></div>
                      <div className="flex gap-4 mt-4">
                        <Link
                          href={`/nx-admin/productos/${producto.codigo}/edit?redirectFromDetails=true`}
                          className="py-[4px] text-gray-500 w-full rounded-md text-sm bg-white shadow-md
                   flex items-center justify-center gap-2 ring-1 ring-gray-400 hover:ring-indigo-500 hover:text-indigo-500 group/btnedit"
                        >
                          <p>Editar</p>
                        </Link>
                        <Link
                          href={`/nx-admin/categorias/${producto.codigo}/edit`}
                          className="py-[4px] bg-red-600 text-gray-50 w-full rounded-md 
                  flex items-center justify-center shadow-md ring-1 ring-red-400 hover:bg-red-500 text-sm gap-2 font-medium"
                        >
                          <p>Eliminar</p>
                        </Link>
                      </div>
                    </article>
                  </section>
                </>
              ) : (
                <div className="flex flex-col items-center py-5 gap-4">
                  <FaceFrownIcon
                    className={"w-12 fill-indigo-500 text-blue-50"}
                  />
                  <p className="text-center text-gray-600 font-medium">
                    Este registro no existe o fue eliminado
                  </p>
                </div>
              )}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
