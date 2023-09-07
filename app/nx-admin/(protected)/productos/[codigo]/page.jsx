"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/components/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  CopyIcon,
  EditPenIcon,
  TrashCanIcon,
} from "@/components/icons/regular";
import "moment/locale/es-mx";
import parse from "html-react-parser";
import { CircleExclamationIcon } from "@/components/icons/light";
import {
  ClipboardIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  PhotoIcon,
  ShareIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";

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
    const data = new Date(date);

    return {
      dia: data.toLocaleDateString("es-SV", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      hora: data.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const handDelete = async () => {
    try {
      await axios.delete(`/api/products/${codigo}`);

      router.push("/nx-admin/productos");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      <div className="p-7">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-full flex items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10">
              <TitleForm
                title="Información del producto"
                subtitle={producto.nombre}
              />
              <div className="flex gap-4">
                <Link
                  href={`/nx-admin/productos/${producto.codigo}/edit`}
                  className={`bg-indigo-50 rounded-sm h-[40px] px-5 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
                >
                  <EditPenIcon
                    className={`w-4 fill-indigo-500 text-indigo-400`}
                  />
                  <p>Editar</p>
                </Link>
                <Link
                  href={`${process.env.URL_HOST}/productos/${producto.codigo}`}
                  className={`bg-indigo-50 rounded-sm h-[40px] px-3 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
                >
                  <EyeIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
                </Link>
                <Link
                  href={`/nx-admin/productos/${producto.codigo}/edit`}
                  className={`bg-indigo-50 rounded-sm h-[40px] px-3 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
                >
                  <ShareIcon
                    className={`w-4 fill-indigo-500 text-indigo-400`}
                  />
                </Link>
                <button
                  type="button"
                  className=" bg-indigo-50 w-full rounded-sm px-3 group/btndelete
                  flex items-center justify-center ring-1 ring-slate-700/10 hover:ring-indigo-700/30"
                  onClick={handDelete}
                >
                  <TrashCanIcon className="w-4 fill-indigo-500 text-indigo-400" />
                </button>
              </div>
            </div>
            <section className="w-full grid grid-cols-2 gap-4 mt-4">
              <article className="w-full flex flex-col gap-4">
                {/* ESPECIFICACIONES */}
                <div className="w-full grid grid-cols-2 gap-x-8 gap-y-4 bg-white shadow-md rounded-sm p-4 ring-1 ring-gray-700/10">
                  <h4 className="col-span-2">
                    <span className="text-slate-600 font-bold uppercase flex items-center">
                      <TicketIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                      Detalles del producto
                    </span>
                    <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-1"></div>
                  </h4>
                  <div className="flex flex-col col-span-2">
                    <h5 className="text-xs text-slate-400">
                      Recurso del producto
                    </h5>
                    <span>
                      <Link
                        href={`/nx-admin/productos/${producto.codigo}`}
                        className="font-normal text-sm underline text-slate-700 lowercase"
                      >
                        {`https://comercial-ebenezer/productos/${producto.codigo}`}
                      </Link>
                      <button
                        type="button"
                        className="w-[20px] h-[20px] bg-indigo-100 rounded-sm ring-1 ring-slate-700/10 flex items-center justify-center"
                      >
                        <ClipboardIcon className="w-4 h-4 stroke-indigo-500" />
                      </button>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-xs text-slate-400">
                      Estado del producto
                    </h5>
                    <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                      {producto.estado}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-xs text-slate-400">
                      Marca del producto
                    </h5>
                    <Link
                      href={`/nx-admin/marcas/${producto.marca.codigo}`}
                      className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                    >
                      {producto.marca.nombre}
                    </Link>
                  </div>
                  <div className="flex-col">
                    <h5 className="text-xs text-slate-400">
                      Linea del producto
                    </h5>
                    <Link
                      href={`/nx-admin/categorias/${producto.categoria.codigo}`}
                      className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                    >
                      {producto.categoria.nombre}
                    </Link>
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-400">Categoria</h5>
                    <Link
                      href={`/nx-admin/categorias/${producto.categoria.codigo}`}
                      className="font-semibold text-base text-slate-600 hover:underline hover:text-blue-500"
                    >
                      {producto.subcategoria.nombre}
                    </Link>
                  </div>
                  <div className="flex-col">
                    <h5 className="text-xs text-slate-400">
                      Cantidad disponible
                    </h5>
                    {producto.stock > 0 ? (
                      <p className="font-semibold text-base text-slate-600">
                        {producto.stock} unidades
                      </p>
                    ) : (
                      <p className="font-semibold text-base text-red-700">
                        <CircleExclamationIcon className="w-4 h-4 fill-red-700 inline mr-1" />{" "}
                        Agotado
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-xs text-slate-400">Precio regular</h5>
                    <p className="font-semibold text-base text-slate-600">
                      ${producto.precio}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <h5 className="text-xs text-slate-400">Creado en</h5>
                    <p className="font-semibold text-base text-slate-600">
                      {formatDate(producto.created_at).dia}
                      <span className="block font-normal text-sm text-slate-500 leading-4">
                        {formatDate(producto.created_at).hora}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-xs text-slate-400">Editado en</h5>
                    <p className="font-semibold text-base text-slate-600">
                      {formatDate(producto.updated_at).dia}
                      <span className="block font-normal text-sm text-slate-500 leading-4">
                        {formatDate(producto.updated_at).hora}
                      </span>
                    </p>
                  </div>
                </div>

                {/* IMAGENES */}
                <div className="flex flex-col gap-4 bg-white p-4 shadow-md rounded-sm ring-1 ring-gray-700/10">
                  <h4 className="col-span-2">
                    <span className="text-slate-600 font-bold uppercase flex items-center">
                      <PhotoIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                      Galeria
                      <span className="ml-auto font-light text-slate-500">
                        {producto?.imagenes?.length > 0 &&
                          `${producto.imagenes.length}/5`}
                      </span>
                    </span>
                    <div className="w-full h-[1px] bg-indigo-100 rounded-sm mt-1"></div>
                  </h4>
                  <div className="w-full flex gap-4 relative">
                    {producto?.imagenes?.length > 0 &&
                      producto.imagenes.map((imagen, index) => {
                        return (
                          <Image
                            key={index}
                            src={`${process.env.AWS_BUCKET_URL}${imagen.source}`}
                            width={150}
                            height={100}
                            alt={producto.nombre}
                            className="rounded-md object-contain aspect-square"
                          />
                        );
                      })}
                  </div>
                </div>
              </article>

              {/* DESCRIPCION */}
              <article className="w-full flex flex-col gap-2 row-span-2 overflow-auto p-4 rounded-sm ring-1 ring-gray-700/10 shadow-md bg-white">
                <h4 className="col-span-2">
                  <span className="text-slate-600 font-bold uppercase flex items-center">
                    <DocumentTextIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                    Descripción
                  </span>
                  <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-1"></div>
                </h4>
                <p className="text-gray-700 prose">
                  {parse(producto?.descripcion || "")}
                </p>
              </article>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
