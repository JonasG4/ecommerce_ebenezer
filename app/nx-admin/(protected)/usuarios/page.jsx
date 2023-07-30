"use client";
//packages
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import Pagination from "@/components/list/pagination";
import { paginate } from "@/libs/paginate";
import TitleList from "@/components/list/titleList";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { UserGroupIcon } from "@/components/icons/regular";

export default function UsuariosPage() {
  const [users, updateUsers] = useState([]);
  const [usersBU, updateUsersBU] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParms = useSearchParams();

  const notify = (msg) =>
    toast.success(msg, {
      className: "bg-indigo-700 text-gray-50",
    });

  const showNotify = () => {
    if (searchParms.get("showNotifyCreate")) {
      notify("¡Se ha creado exitosamente!");
    } else if (searchParms.get("showNotifyEdit")) {
      notify("¡Se ha editado exitosamente!");
    } else if (searchParms.get("showNotifyDelete")) {
      notify("¡Se ha eliminado exitosamente!");
    }
  };

  const getRoles = async () => {
    await axios.get("/api/roles").then((response) => {
      setRoles(response.data);
    });
  };

  const getUsers = async () => {
    setLoading(true);
    await axios
      .get("/api/users")
      .then((response) => {
        console.log(response.data);
        updateUsers(response.data);
        updateUsersBU(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
    getRoles();
    showNotify();
  }, []);

  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const usersList = paginate(users, currentPage, pageSize);
  return (
    <div className="py-7 px-4 bg-gray-100 w-full flex flex-col h-full overflow-hidden">
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

      <TitleList title={"Lista de usuarios"} Icon={UserGroupIcon} />
      <div className="relative shadow-xl rounded-md bg-white overflow-hidden ring-1 ring-gray-300">
        {/* ----------- HEADER LIST ---------  */}
        <section className="p-5 bg-gray-50 w-full">
          <TableOptions
            table="usuarios"
            dataBU={usersBU}
            setData={updateUsers}
            getData={getUsers}
          />

          {/* =============== TABLA ========= */}
          <article className="w-full overflow-auto ring-1 ring-gray-300 rounded-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md relative">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
                <tr className="">
                  <th scope="col" className="w-[50px] py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"id_usuario"}
                        data={users}
                        setData={updateUsers}
                      />
                      <p>ID</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortBy
                        field={"nombre"}
                        data={users}
                        setData={updateUsers}
                      />
                      <p>Nombre</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortBy
                        field={"apellido"}
                        data={users}
                        setData={updateUsers}
                      />
                      <p>Apellido</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <p>Teléfono</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortBy
                        field={"email"}
                        data={users}
                        setData={updateUsers}
                      />
                      <p>Correo</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <FilterBy
                        data={usersBU}
                        setData={updateUsers}
                        filters={roles}
                        field={"id_role"}
                      />
                      <p>Rol</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <FilterBy
                        data={usersBU}
                        setData={updateUsers}
                        filters={[
                          { is_active: 0, nombre: "Inactivo" },
                          { is_active: 1, nombre: "Activo" },
                        ]}
                        field={"is_active"}
                      />
                      <p>Estado</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {usersList.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b border-gray-300 dark:bg-gray-800 h-4 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-[50px] px-6 py-4 ">
                        <span className="rounded-md px-2 py-1 text-indigo-700 text-[12px] font-semibold bg-indigo-100">
                          {item.id_usuario}
                        </span>
                      </td>
                      <th
                        scope="row"
                        className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.nombre}
                      </th>
                      <td className="w-[350px] py-4 px-6 whitespace-nowrap">
                        {item.apellido}
                      </td>
                      <td className="w-[150px] py-4 px-6 whitespace-nowrap">
                        {item.telefono}
                      </td>
                      <td className="w-[350px] py-4 px-6 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="w-[160px] py-4 px-6 font-bold text-xs whitespace-nowrap">
                        {item.role.nombre}
                      </td>
                      <td className="w-[100px] py-4 px-6">
                        {item.is_active == 1 ? (
                          <p className="text-green-600 text-[12px] py-[1px] w-14 text-center bg-green-100 rounded-md inline-block mx-auto font-semibold">
                            Activo
                          </p>
                        ) : (
                          <p className="text-gray-500 text-[12px] py-[1px] w-14 text-center bg-gray-200 rounded-md inline-block mx-auto font-semibold">
                            Inactivo
                          </p>
                        )}
                      </td>
                      <td className="w-[150px] py-4 px-6">
                        <div className="flex gap-3">
                          <Link
                            href={`/nx-admin/usuarios/${item.codigo}`}
                            className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                          >
                            Revisar
                          </Link>
                          <div className="w-[1px] h-[20px] bg-gray-400"></div>
                          <Link
                            href={`/nx-admin/usuarios/${item.codigo}/edit`}
                            className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                          >
                            Editar
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* ERROR HANDLER */}
            {usersList?.length < 1 && <NoRecordFound isLoading={isLoading} />}
          </article>
          {/* ============== FIN TABLA ================ */}

          <Pagination
            items={users?.length}
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
