"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  FaceFrownIcon,
  UserIcon,
  GlassZoomIcon,
} from "@/components/icons/regular";
import { CommentsIcon, ReceiptIcon } from "@/components/icons/light";
import moment from "moment";
import "moment/locale/es-mx";
import Loading from "@/components/loading";
import TitleForm from "@/components/forms/titleForm";
import ZoomIn from "@/components/modals/zoomModal";

export default function CustomerPage({ params }) {
  const id_usuario = params.id;
  const [user, updateUser] = useState({});
  const [isUserExist, setUserExist] = useState({ state: true, msg: "" });
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`/api/users/${id_usuario}`)
      .then((response) => {
        updateUser(response.data);
      })
      .catch((err) => {
        setUserExist({
          state: false,
          msg: err.response.data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
    <div className="w-full px-5 flex flex-col gap-4 items-center">
      <ZoomIn isOpen={isOpen} setIsOpen={setIsOpen} src={user?.imagen} />
      <div className="bg-gray-50 w-[650px] shadow-md rounded-md">
        <TitleForm title="Información del Usuario" route="/nx-admin/usuarios" />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isUserExist.state ? (
              <div className="flex gap-8 w-full items-center py-4 px-5">
                <section className="flex flex-col gap-2">
                  <div className="relative flex items-center justify-center w-[200px] h-[200px] bg-white rounded-md object-cover p-1 ring-1 ring-gray-300 shadow-md">
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
                        <UserIcon className="w-[80px] fill-indigo-400 text-indigo-600" />
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
                </section>
                <section className="grid gap-5 grid-cols-2 py-2 w-3/4 text-gray-700">
                  <div className="flex-col">
                    <p className="text-sm font-light">Nombre completo</p>
                    <h4 className="font-medium text-sm">
                      {user.nombre} {user.apellido}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Número de teléfono</p>
                    <h4 className="font-medium text-sm">{user.telefono}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Correo electrónico</p>
                    <h4 className="font-medium text-sm">{user.email}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Se registró con</p>
                    <h4 className="font-medium text-sm">{typeSignin(user)}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Rol de acceso</p>
                    <h4
                      className={`font-medium text-sm lowercase first-letter:uppercase text-gray-700`}
                    >
                      {user.role.nombre}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Estado de la cuenta</p>
                    <h4
                      className={`font-medium text-sm py-[2px] px-[10px]  inline rounded-md text-gray-50 ${
                        user.is_active ? "bg-green-500" : " bg-red-600"
                      }`}
                    >
                      {user.is_active ? "Activa" : "Desactivada"}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Fecha de creación</p>
                    <h4 className="font-medium text-sm">
                      {formatDate(user.created_at)}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Fecha de modificación</p>
                    <h4 className="font-medium text-sm">
                      {formatDate(user.updated_at)}
                    </h4>
                  </div>
                </section>
              </div>
            ) : (
              <div className="flex flex-col items-center py-5 gap-4">
                <FaceFrownIcon
                  className={"w-12 fill-indigo-500 text-indigo-50"}
                />
                <p className="text-center text-gray-600 font-medium">
                  Este registro no existe o fue eliminado
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* PEDIDOS DEL CLIENTE */}
      <section className="bg-gray-50 w-[650px] shadow-md rounded-md">
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
      </section>
     
      {/* COMENTARIOS DEL CLIENTE */}
      <section className="bg-gray-50 w-[650px] shadow-md rounded-md">
        <div className="flex items-center bg-white gap-3 px-5 py-2 border-b-[1px] border-gray-300">
          <CommentsIcon className="w-6 fill-gray-600" />
          <h1 className="font-bold text-gray-600 text-md my-2 uppercase">
            Comentarios
          </h1>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="py-4 px-5">
            <p className="text-center text-gray-500">
              No ha realizado ningún comentarios
            </p>
          </div>
        )}
      </section>


    </div>
  );
}
