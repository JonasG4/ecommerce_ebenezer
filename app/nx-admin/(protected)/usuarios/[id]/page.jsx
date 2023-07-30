"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { UserIcon, GlassZoomIcon } from "@/components/icons/regular";
import { CommentsIcon, ReceiptIcon } from "@/components/icons/light";
import { ImageSlashIcon } from "@/components/icons/duetone";

import moment from "moment";
import "moment/locale/es-mx";
import Loading from "@/components/loading";
import TitleForm from "@/components/forms/titleForm";
import ZoomIn from "@/components/modals/zoomModal";
import { notFound } from "next/navigation";

export default function CustomerPage({ params }) {
  const id_usuario = params.id;
  const [user, updateUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const { data: user } = await axios.get(`/api/users/${id_usuario}`);
      if (!user) {
        notFound();
      }
      updateUser(user);
    } catch (err) {
      if (err.response.status === 404) {
        notFound();
      }
    }

    setLoading(false);
  };

  const typeSignin = (user) => {
    if (user.is_google === 1) {
      return "Google";
    } else if (user.is_facebook === 1) {
      return "Facebook";
    } else {
      return "Correo y contraseña";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full p-7">
      {isLoading ? (
        <Loading />
      ) : (
        <section className="grid lg:grid-cols-2 gap-2 place-items-center">
          <ZoomIn isOpen={isOpen} setIsOpen={setIsOpen} src={user?.imagen} />
          <article className="bg-gray-50 w-full md:w-[700px] lg:w-full shadow-md rounded-md">
            <TitleForm
              title="Información del Usuario"
              route="/nx-admin/usuarios"
            />
            <section className="flex flex-wrap [@media(min-width:730px)]:flex-nowrap gap-8 w-full items-center justify-center py-4 px-5">
              <article className="flex flex-col gap-2">
                <div className="relative flex flex-col gap-2 items-center justify-center w-[200px] h-[200px] bg-white rounded-md object-cover p-1 ring-1 ring-gray-300 shadow-md">
                  {user.imagen ? (
                    <>
                      <Image
                        src={user.imagen}
                        alt="Foto de perfil"
                        loading="lazy"
                        className="w-full h-full"
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 cursor-pointer w-[30px] h-[30px] bg-gray-100 rounded-md shadow-md group/zoom flex items-center justify-center"
                        onClick={() => setIsOpen(true)}
                      >
                        <GlassZoomIcon className="w-[14px] fill-gray-700 group-hover/zoom:fill-indigo-500" />
                      </button>{" "}
                    </>
                  ) : (
                    <>
                      <ImageSlashIcon className="w-[60px] fill-gray-400 text-gray-400" />
                      <p className="text-gray-500 text-sm">Sin foto</p>
                    </>
                  )}
                </div>
                <div className="w-full flex gap-2 mt-2">
                  <Link
                    href={`/nx-admin/usuarios/${user.codigo}/edit?redirectFromDetails=true`}
                    className="py-[4px] text-gray-600 w-full rounded-md text-sm bg-white
                   flex items-center justify-center gap-2 shadow-md ring-1 ring-gray-400 hover:ring-indigo-500 hover:text-indigo-500 group/btnedit"
                  >
                    <p>Editar</p>
                  </Link>
                  <Link
                    href={`/nx-admin/usuarios/${user.codigo}/edit`}
                    className="py-[4px] bg-red-600 text-gray-50 w-full rounded-md 
                  flex items-center justify-center shadow-md ring-1 ring-red-400 hover:bg-red-500 text-sm gap-2 font-medium"
                  >
                    <p>Eliminar</p>
                  </Link>
                </div>
              </article>
              <article className="grid gap-5 grid-cols-2 py-2 w-full md:w-3/4  text-gray-700">
                <div className="flex-col">
                  <p className="text-sm font-semibold">Nombre completo</p>
                  <h4 className="font-light text-sm">
                    {user.nombre} {user.apellido}
                  </h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Número de teléfono</p>
                  <h4 className="font-light text-sm">{user.telefono}</h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Correo electrónico</p>
                  <h4 className="font-light text-sm">{user.email}</h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Se registró con</p>
                  <h4 className="font-light text-sm">{typeSignin(user)}</h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Rol de acceso</p>
                  <h4
                    className={`font-light text-sm lowercase first-letter:uppercase text-gray-700`}
                  >
                    {user?.role?.nombre}
                  </h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Estado de la cuenta</p>
                  <h4
                    className={`font-medium text-sm py-[2px] px-[10px] inline rounded-md ${
                      user.is_active
                        ? "bg-green-200 text-green-600"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {user.is_active ? "Activa" : "Desactivada"}
                  </h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Fecha de creación</p>
                  <h4 className="font-light text-sm">
                    {formatDate(user.created_at)}
                  </h4>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold">Fecha de modificación</p>
                  <h4 className="font-light text-sm">
                    {formatDate(user.updated_at)}
                  </h4>
                </div>
              </article>
            </section>
          </article>

          {/* COMENTARIOS DEL CLIENTE */}
          <article className="bg-gray-50 w-full md:w-[700px] lg:w-full flex flex-col md:h-full shadow-md rounded-md">
            <div className="flex items-center bg-white gap-3 px-5 py-[22px] border-b-[1px] border-gray-300">
              <CommentsIcon className="w-5 fill-gray-700" />
              <h1 className="font-bold text-gray-700 text-sm uppercase">
                Comentarios
              </h1>
            </div>
            <div className="py-4 px-5 h-full flex flex-col justify-center">
              <p className="text-center text-gray-500">
                No ha realizado ningún comentarios
              </p>
            </div>
          </article>

          {/* PEDIDOS DEL CLIENTE */}
          <article className="bg-gray-50 w-full md:w-[700px] lg:w-full lg:col-span-2 shadow-md rounded-md">
            <div className="flex items-center bg-white gap-3 px-5 py-2 border-b-[1px] border-gray-300">
              <ReceiptIcon className="w-4 fill-gray-600" />
              <h1 className="font-bold text-gray-600 text-md my-2 uppercase">
                Pedidos
              </h1>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="py-4 px-5">
                <p className="text-center text-gray-500">
                  No ha realizado ningún pedidos
                </p>
              </div>
            )}
          </article>
        </section>
      )}
    </div>
  );
}
