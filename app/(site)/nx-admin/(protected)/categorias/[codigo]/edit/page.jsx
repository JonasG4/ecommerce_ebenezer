"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaceFrownIcon,
  EditPenIcon,
  CheckIcon,
} from "@/components/icons/regular";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
} from "@/components/forms/inputs";
import toast, { Toaster } from "react-hot-toast";
import { CiruclePlusIcon } from "@/components/icons/regular";
import Loading from "@/components/loading";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/footerForm";
import Image from "next/image";
import { set } from "lodash";

export default function EditPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isCategoryExist, setCategoryExist] = useState(true);
  const router = useRouter();

  const [category, updateCategory] = useState({
    id_categoria: "",
    nombre: "",
    descripcion: "",
    is_active: true,
    subcategorias: [],
  });
  const [subcategorias, updateSubcategorias] = useState([]);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const getCategory = async () => {
    setLoading(true);
    await axios
      .get(`/api/categories/${codigo}`)
      .then((response) => {
        const subcategoriasList = response.data.Subcategorias.map(
          (sub) => sub.nombre
        );

        updateSubcategorias(subcategoriasList);
        updateCategory({
          id_categoria: response.data.id_categoria,
          nombre: response.data.nombre,
          oldNombre: response.data.nombre,
          descripcion: response.data.descripcion,
          is_active: response.data.is_active,
          subcategorias: response.data.Subcategorias,
        });
      })
      .catch((err) => {
        setCategoryExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/categories/${codigo}`, {
        ...category,
        newSubcategorias: subcategorias,
      })
      .then((response) => {
        if (response.status === 200) {
          router.push("/nx-admin/categorias?showNotifyEdit=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
        }
      })
      .finally(() => setLoadingSubmit(false));
  };

  const handleCategory = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateCategory({ ...category, [name]: e.target.checked });
    } else {
      updateCategory({ ...category, [name]: value });
    }
  };

  return (
    <div className="w-full">
      <Toaster position="bottom-right" />
      <section className="w-full h-full pb-8 px-4 pt-1 bg-gray-100 flex flex-col md:flex-row gap-4 items-center md:items-start justify-center">
        <article className="w-[700px] h-[500px] flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
          <TitleForm title={"Editar categoria"} route="/nx-admin/categorias" />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {isCategoryExist ? (
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="grid px-8 py-2 bg-gray-50 gap-x-6">
                    <InputText
                      label="Nombre"
                      name="nombre"
                      subtitle="Maximo 50 caracteres"
                      type="text"
                      value={category.nombre}
                      onChange={handleCategory}
                      errMessage={validations.nombre}
                    />
                    <InputTextArea
                      label="Descripcion"
                      subtitle="Maximo 200 caracteres"
                      name="descripcion"
                      value={category.descripcion}
                      onChange={handleCategory}
                      errMessage={validations.descripcion}
                    />
                    <InputSwitch
                      label={"Estado"}
                      name={"is_active"}
                      value={category.is_active}
                      onChange={handleCategory}
                    />
                  </div>
                  <FooterForm
                    title="Actualizar categoria"
                    isLoadingData={isLoadingSubmit}
                    typeForm={"edit"}
                  />
                </form>
              ) : (
                <div className="flex flex-col items-center py-5 gap-4">
                  <FaceFrownIcon
                    className={"w-12 fill-blue-500 text-blue-50"}
                  />
                  <p className="text-center text-gray-600 font-medium">
                    Este registro no existe o fue eliminado
                  </p>
                </div>
              )}
            </>
          )}
          {/* ---------------- FORM----------- */}
        </article>
        {!isLoading && isCategoryExist && (
          <Subcategorias codigo={category.id_categoria} />
        )}
      </section>
    </div>
  );
}

export const Subcategorias = ({ codigo }) => {
  const [subcategoria, updateSubCategoria] = useState({
    nombre: "",
    id_categoria: codigo,
  });
  const [subcategorias, updateSubcategorias] = useState([]);
  const [validations, setValidations] = useState({ nombre: "" });
  const [inputActive, setInputActive] = useState({ name: "" });

  const getSubcategorias = async () => {
    console.log("codigo: ", codigo);
    await axios
      .get(`/api/categories/${codigo}/subcategories`)
      .then((response) => {
        updateSubcategorias(
          response.data.map((sub) => {
            return {
              id_subcategoria: sub.id_subcategoria,
              nombre: sub.nombre,
              NuevoNombre: sub.nombre,
            };
          })
        );
      });
  };

  const toastEdit = (msg) =>
    toast.success(msg, {
      duration: 4000,
      style: {
        border: "1px solid #4f46e5",
        padding: "16px",
        color: "#4f46e5",
        padding: "16px",
        backgroundColor: "#eef2ff",
        fontWeight: "semibold",
      },
      iconTheme: {
        primary: "#4f46e5",
        secondary: "#eef2ff",
      },
    });

  const toastError = (msg) =>
    toast.success(msg, {
      duration: 4000,
      style: {
        border: "1px solid #ef4444",
        padding: "16px",
        color: "#ef4444",
        padding: "16px",
        backgroundColor: "#eef2ff",
        fontWeight: "semibold",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#eef2ff",
      },
    });
  const submitUpdateSub = async (id_categoria, nombre, oldNombre) => {
    await axios
      .put(`/api/subcategories/${id_categoria}`, {
        nombre: nombre,
        oldNombre: oldNombre,
      })
      .then((response) => {
        if (response.status === 200) {
          toastEdit("Subcategoria actualizada");
          getSubcategorias();
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toastError("Esta subcategoria ya existe");
        }
      })
      .finally(() => {
        setInputActive({ name: "" });
      });
  };

  const handleCategory = (e) => {
    const { value } = e.target;
    updateSubCategoria({ ...subcategoria, nombre: value });
  };

  const handleUpdateSub = (e, index) => {
    const { value } = e.target;
    const newSubcategorias = [...subcategorias];
    newSubcategorias[index].NuevoNombre = value;
    updateSubcategorias(newSubcategorias);
  };

  const handleCancel = (index) => {
    const newSubcategorias = [...subcategorias];
    newSubcategorias[index].NuevoNombre = subcategorias[index].nombre;
    updateSubcategorias(newSubcategorias);
    setInputActive({ name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/subcategories`, {...subcategoria, id_categoria: codigo})
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toastEdit("Categoria creada con exito");
          getSubcategorias();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toastError(err.response.data.nombre);
        }
      })
      .finally(() => {
        updateSubCategoria({ ...subcategoria, nombre: "" });
      });
  };

  const handleDelete = async (id_subcategoria) => {
    await axios
      .delete(`/api/subcategories/${id_subcategoria}`)
      .then((response) => {
        if (response.status === 200) {
          toastEdit("Sub-categoria eliminada");
          getSubcategorias();
        }
      });
  };
  
  useEffect(() => {
    getSubcategorias();
  }, []);

  return (
    <article className="w-[700px] h-[500px] flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
      <div className="p-5 border-b border-gray-300">
        <h1 className="font-bold text-gray-800 uppercase">
          Editar Sub-categorias
        </h1>
        <p className="text-sm text-gray-500">
          Estas subcategorias están asociadas a la categoria{" "}
          <span className="text-gray-700 font-semibold">Electrodomesticos</span>
        </p>
      </div>
      <div className="bg-gray-50 h-full flex flex-col rounded-b-md">
        <ul>
          {subcategorias?.map((item, index) => (
            <li
              key={index}
              className={`flex items-center justify-between px-5 py-2 border-b border-gray-300 transition-all duration-200 ease-in-out ${
                inputActive.name === `nombre-${index}` && "bg-indigo-50"
              }`}
            >
              <div className="flex gap-2 items-center">
                <p className="px-2 bg-indigo-500 rounded-sm text-white text-sm">
                  {index + 1}
                </p>
                <div>
                  <input
                    name={`nombre-${index}`}
                    type="text"
                    className={`text-gray-700  py-1 px-2 rounded-md text-sm border-none focus:outline-offset-2 focus:outline-indigo-200 ${
                      inputActive.name === `nombre-${index}`
                        ? "ring-1 ring-indigo-500 focus:ring-indigo-500 bg-white"
                        : "bg-transparent font-semibold"
                    }`}
                    disabled={inputActive.name !== `nombre-${index}`}
                    placeholder={item.nombre}
                    value={item.NuevoNombre}
                    onChange={(e) => {
                      handleUpdateSub(e, index);
                    }}
                  />
                </div>
                {item.nombre !== item.NuevoNombre &&
                  inputActive.name !== `nombre-${index}` && (
                    <span className="text-xs py-1 px-2 bg-gray-200 text-gray-700 rounded-md">
                      No guardado
                    </span>
                  )}
              </div>
              <div className="flex gap-2 items-center">
                {inputActive.name === `nombre-${index}` ? (
                  <>
                    <button
                      type="button"
                      className={`flex gap-1 items-center bg-green-100 ring-1 ring-green-300 hover:bg-green-200 px-2 py-1 rounded-md text-green-600 hover:text-green-700 text-sm transition-all duration-200 ease-in-out ${
                        item.nombre === item.NuevoNombre &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() =>
                        submitUpdateSub(
                          item.id_subcategoria,
                          item.NuevoNombre,
                          item.nombre
                        )
                      }
                    >
                      <CheckIcon className="w-3 fill-green-700" />
                      <p>Guardar</p>
                    </button>
                    <div className="h-[20px] w-[1px] bg-gray-300"></div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => handleCancel(index)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                      onClick={() =>
                        setInputActive({ name: `nombre-${index}` })
                      }
                    >
                      Editar
                    </button>
                    <div className="h-[20px] w-[1px] bg-gray-300"></div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => handleDelete(item.id_subcategoria)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          className="w-full px-5 flex gap-2 items-end mt-auto border-t border-gray-300 pt-2 bg-white rounded-b-md"
        >
          <InputText
            name="nombre"
            label="Nueva categoria"
            placeholder="Ej: Lavadoras"
            type="text"
            value={subcategoria.nombre}
            onChange={handleCategory}
            errMessage={validations.nombre}
            allowNull={true}
          />
          <button className="h-[37px] px-4 bg-indigo-500 rounded-md mb-6 text-white text-sm flex gap-2 items-center hover:bg-indigo-700 active:scale-95">
            <CiruclePlusIcon className="w-4 fill-white text-transparent " />
            <p>Añadir</p>
          </button>
        </form>
      </div>
    </article>
  );
};
