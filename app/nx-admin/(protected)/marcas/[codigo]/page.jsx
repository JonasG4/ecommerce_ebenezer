"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/app/nx-admin/(protected)/marcas/[codigo]/loading";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaceFrownIcon } from "@/components/icons/regular";
import moment from "moment";
import "moment/locale/es-mx";
import ZoomImage from "@/components/modals/ZoomImage";

export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [brands, setBrands] = useState({});
  const getBrands = async () => {
    try {
      const { data } = await axios.get(`/api/brands/${codigo}`);
      setBrands(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="w-full h-full p-5 flex flex-col gap-4 items-center">
      <section className="w-full md:w-[650px] shadow-md rounded-md">
        <TitleForm
          title="Información de la marca"
          route="/nx-admin/marcas"
        />
        <article className="bg-gray-50 py-2 px-5">
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {brands ? (
                <div className="flex flex-col gap-2 w-full pb-2">
                  <div className="w-full h-[200px] overflow-hidden rounded-t-md relative ring-1 ring-gray-400">
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${brands.imagen}`}
                      width={650}
                      height={300}
                      alt={brands.nombre}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 right-2 z-50">
                      <ZoomImage
                        src={`${process.env.AWS_BUCKET_URL}${brands.imagen}`}
                      />
                    </div>
                  </div>
                  <h1 className="uppercase text-lg text-gray-700 font-black flex items-center gap-2">
                    {brands.nombre}{" "}
                    <span
                      className={`font-semibold text-xs py-[2px] px-[10px] inline rounded-md text-gray-50 ${
                        brands.is_active
                          ? "bg-green-200 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {brands.is_active ? "Activa" : "Desactivada"}
                    </span>
                  </h1>
                  <div className="w-[100px] h-[1px] bg-indigo-500 my-1"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex-col col-span-2 text-gray-700">
                      <p className="text-sm font-semibold ">Descripción</p>
                      <h4 className="text-sm font-light text-justify first-letter:uppercase">
                        {brands.descripcion?.length > 0 ? (
                          brands.descripcion
                        ) : (
                          <span className="text-gray-500">Sin descripción...</span>
                        )}
                      </h4>
                    </div>
                    <div className="flex-col text-gray-700">
                      <p className="text-sm font-semibold">Fecha de creación</p>
                      <h4 className="font-light text-sm">
                        {formatDate(brands.created_at)}
                      </h4>
                    </div>
                    <div className="flex-col text-gray-700">
                      <p className="text-sm font-semibold">
                        Fecha de modificación
                      </p>
                      <h4 className="font-light text-sm">
                        {formatDate(brands.updated_at)}
                      </h4>
                    </div>
                  </div>
                  <div className="w-[100px] h-[1px] bg-blue-500 my-1"></div>
                
                  <div className="flex gap-4 mt-4">
                    <Link
                      href={`/nx-admin/marcas/${brands.codigo}/edit?redirectFromDetails=true`}
                      className="py-[4px] text-gray-500 w-full rounded-md text-sm bg-white shadow-md
                   flex items-center justify-center gap-2 ring-1 ring-gray-400 hover:ring-indigo-500 hover:text-indigo-500 group/btnedit"
                    >
                      <p>Editar</p>
                    </Link>
                    <Link
                      href={`/nx-admin/marcas/${brands.codigo}/edit`}
                      className="py-[4px] bg-red-600 text-gray-50 w-full rounded-md 
                  flex items-center justify-center shadow-md ring-1 ring-red-400 hover:bg-red-500 text-sm gap-2 font-medium"
                    >
                      <p>Eliminar</p>
                    </Link>
                  </div>
                </div>
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
