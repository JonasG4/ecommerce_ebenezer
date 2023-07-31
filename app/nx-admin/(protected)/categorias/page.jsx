"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import TitleList from "@/components/list/titleList";
import Pagination from "@/components/list/pagination";
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import { paginate } from "@/libs/paginate";
import TableOptions from "@/components/list/tableOptions";
import NoRecordFound from "@/components/list/noRecordFound";
import { ShapesIcon } from "@/components/icons/regular";

export default function ListPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesBU, setCategoriesBU] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const searchParms = useSearchParams();

  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const notify = (msg) => {
    toast.success(msg, {
      // style: {
      //   border: "1px solid #713200",
      //   padding: "16px",
      //   color: "#713200",
      //   backgroundColor: "#0066bf",
      // },
      iconTheme: {
        primary: "#FFFAEE",
        secondary: "#0066bf",
      },
      className: "!bg-indigo-600 !text-white !p-4",
    });
  };

  const showNotify = () => {
    if (searchParms.get("showNotifyCreate")) {
      notify("¡Se ha creado exitosamente!");
    } else if (searchParms.get("showNotifyEdit")) {
      notify("¡Se ha editado exitosamente!");
    } else if (searchParms.get("showNotifyDelete")) {
      notify("¡Se ha eliminado exitosamente!");
    }
  };

  const getCategories = async () => {
    setLoading(true);
    await axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);
        setCategoriesBU(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCategories();
    showNotify();
  }, []);

  const categoriesList = paginate(categories, currentPage, pageSize);
  return (
    <div className="py-7 px-4 bg-gray-100 w-full flex flex-col h-full overflow-hidden">
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />

      <TitleList title={"Lista de Categorias"} Icon={ShapesIcon} />
      <div className="relative shadow-xl rounded-md bg-white overflow-hidden ring-1 ring-gray-300">
        <section className="p-5 bg-gray-50 w-full">
          <TableOptions
            table="categorias"
            dataBU={categoriesBU}
            setData={setCategories}
            getData={getCategories}
          />

          {/* ----------- TABLA CATEGORIAS ---------  */}
          <article className="w-full overflow-auto ring-1 ring-gray-300 rounded-md scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md relative">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
                <tr className="sticky top-0">
                  <th scope="col" className="w-[50px] py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortById
                        field={"id_categoria"}
                        data={categories}
                        setData={setCategories}
                      />
                      <p>ID</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <SortBy
                        field={"nombre"}
                        data={categories}
                        setData={setCategories}
                      />
                      <p>Nombre</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 sticky">
                    <div className="flex items-center gap-3">
                      <p>Descripción</p>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 sticky">
                    <div className="flex items-center gap-3">
                      <p>Estado</p>
                      <FilterBy
                        data={categoriesBU}
                        setData={setCategories}
                        filters={[
                          { is_active: 0, nombre: "Inactivo" },
                          { is_active: 1, nombre: "Activo" },
                        ]}
                        field={"is_active"}
                      />
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6 sticky">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {categoriesList.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-[50px] px-6 py-4 ">
                        <span className="rounded-md px-2 py-1 text-indigo-50 text-[12px] font-semibold bg-indigo-600">
                          {item.id_categoria}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:uppercase"
                      >
                        {item.nombre}
                      </td>
                      <td className="w-[350px] py-4 px-6 first-letter:uppercase">
                        <p className="line-clamp-1 overflow-hidden">
                          {item.descripcion.length > 0 ? (
                            item.descripcion
                          ) : (
                            <span className="text-gray-400">
                              Sin descripción
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        {item.is_active == 1 ? (
                          <p className="text-green-600 text-[12px] py-[1px] w-14 text-center bg-green-100 rounded-md inline-block mx-auto font-medium">
                            Activo
                          </p>
                        ) : (
                          <p className="text-red-500 text-[12px] py-[1px] w-14 text-center bg-red-100 rounded-md inline-block mx-auto font-medium">
                            Inactivo
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <Link
                            href={`/nx-admin/categorias/${item.codigo}`}
                            className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                          >
                            Revisar
                          </Link>
                          <div className="w-[1px] h-[20px] bg-gray-400"></div>
                          <Link
                            href={`/nx-admin/categorias/${item.codigo}/edit`}
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

            {/* Error handler */}
            {categoriesList.length < 1 && (
              <NoRecordFound isLoading={isLoading} />
            )}
          </article>

          <Pagination
            items={categories?.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlerChangePage}
          />
        </section>
      </div>
    </div>
  );
}