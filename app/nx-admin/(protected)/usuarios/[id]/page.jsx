"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  EditPenIcon,
  TrashCanIcon,
} from "@/components/icons/regular";
import { ImageSlashIcon } from "@/components/icons/duetone";
import moment from "moment";
import "moment/locale/es-mx";
import Loading from "@/app/nx-admin/(protected)/usuarios/[id]/loading";
import TitleForm from "@/components/forms/titleForm";
import { ArchiveBoxIcon, ChatBubbleLeftRightIcon, UserIcon } from "@heroicons/react/24/solid";
import Zoom from "@/components/modals/Zoom";
import NotFound from "@/app/nx-admin/(protected)/not-found"
import { notification } from "@/components/toast";

export default function CustomerPage({ params }) {
  const id_usuario = params.id;
  const [user, updateUser] = useState({});
  const toast = new notification();
  const [isLoading, setLoading] = useState(true);
  const [isRecordExist, setRecordExist] = useState(false);


  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const { data: user } = await axios.get(`/api/users/${id_usuario}`);

      if (user) setRecordExist(true);

      updateUser(user);
    } catch (err) {
      toast.error("Ocurrio un error al cargar usuario");
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

  const handleDelete = () => { };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      {isLoading && <Loading />}
      {!isLoading && !isRecordExist && <NotFound />}

      {isRecordExist && (
        <div className={`p-6 ${isLoading && "hidden"}`}>
          <div className="w-full flex shadow-md flex-row gap-4 items-center justify-between sticky top-0 z-50 bg-white rounded-md p-4 ring-1 ring-slate-700/10">
            <TitleForm
              title="Información del usuario"
              subtitle={`${user.nombre} ${user.apellido}`}
            />
            <div className="flex gap-2 laptop:gap-3">
              <Link
                href={`/nx-admin/usuarios/${user.codigo}/edit`}
                className={`bg-indigo-50 rounded-sm h-[30px] px-2 laptop:px-3 text-indigo-400 text-sm font-medium flex ring-1 ring-slate-700/10
                  gap-2 items-center justify-center hover:ring-indigo-700/30 ease-in duration-150 
                  }`}
              >
                <EditPenIcon className={`w-4 fill-indigo-500 text-indigo-400`} />
                <p className="hidden laptop:inline">Editar</p>
              </Link>

              <button
                type="button"
                className=" bg-indigo-50 w-full rounded-sm h-[30px] px-2  group/btndelete
                  flex items-center justify-center ring-1 ring-slate-700/10 hover:ring-indigo-700/30"
                onClick={handleDelete}
              >
                <TrashCanIcon className="w-4 fill-indigo-500 text-indigo-400" />
              </button>
            </div>
          </div>
          <section className="w-full grid laptop:grid-cols-2 desktop:grid-cols-[700px_1fr] gap-4 mt-4">
            <article className="grid desktop:grid-cols-[220px_1fr] gap-4 bg-white shadow-md rounded-sm p-4 ring-1 ring-gray-700/10">
              <h4 className="desktop:col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <UserIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Detalles del usuario
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="relative w-[210px] h-[210px] mx-auto bg-white rounded-md p-1 ring-1 ring-gray-300 shadow-md">
                {user.imagen ? (
                  <>
                    <Image
                      src={user.imagen}
                      alt="Foto de perfil"
                      className="w-[200px] h-[200px] object-contain rounded-md"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 cursor-pointer w-[30px] h-[30px] bg-gray-100 rounded-md shadow-md group/zoom flex items-center justify-center"
                    >
                      <Zoom
                        src={`${user.imagen}`}
                        className={"w-4 text-indigo-500"}
                      />
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <ImageSlashIcon className="w-[60px] fill-gray-400 text-gray-400" />
                    <p className="text-gray-500 text-sm">Sin foto</p>
                  </>
                )}
              </div>
              <div className="grid gap-5 grid-cols-2 py-2 w-full text-gray-700">
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Nombre completo</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {user.nombre} {user.apellido}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Número de teléfono</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {user.telefono}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Correo electrónico</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {user.email}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Se registró con</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {typeSignin(user)}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Rol de acceso</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {user?.role?.nombre}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Estado de la cuenta</h5>
                  <p
                    className={`font-semibold text-base lowercase first-letter:uppercase ${user.is_active ? "text-indigo-500" : "text-slate-600"
                      }`}
                  >
                    {user.is_active ? "Activa" : "Desactivada"}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">Fecha de creación</h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {formatDate(user.created_at)}
                  </p>
                </div>
                <div className="flex-col">
                  <h5 className="text-xs text-slate-400">
                    Fecha de modificación
                  </h5>
                  <p className="font-semibold text-base text-slate-600 lowercase first-letter:uppercase">
                    {formatDate(user.updated_at)}
                  </p>
                </div>
              </div>
            </article>


            {/* PEDIDOS DEL CLIENTE */}
            <article className="bg-white shadow-md flex flex-col rounded-sm p-4 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <ArchiveBoxIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Pedidos
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="p-4 my-auto">
                <p className="text-center text-gray-500">
                  No ha realizado ningún pedidos
                </p>
              </div>
            </article>

            {/* COMENTARIOS DEL CLIENTE */}
            <article className="bg-white shadow-md flex flex-col rounded-sm p-4 ring-1 ring-gray-700/10">
              <h4 className="col-span-2">
                <span className="text-slate-600 font-bold uppercase flex items-center">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2 text-indigo-400" />
                  Comentarios
                </span>
                <div className="w-full h-[1px] bg-slate-100 rounded-sm mt-2"></div>
              </h4>
              <div className="p-4 my-auto">
                <p className="text-center text-gray-500">
                  No ha realizado ningún comentarios
                </p>
              </div>
            </article>

          </section>
        </div>
      )}
    </div>
  );
}
