"use client";
import axios from "axios";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputBox,
  InputFile
} from "@/components/forms/inputs";
import toast, { Toaster } from "react-hot-toast";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/footerForm";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const router = useRouter();

  const [items, updateItems] = useState([]);

  const [category, updateCategory] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
    subcategorias: [],
  });

  const [image, setImage] = useState(null);
  

  const [validations, setValidations] = useState({
    nombre: "",
    portada: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const categoria = new FormData();

    categoria.append("nombre", category.nombre);
    categoria.append("descripcion", category.descripcion);
    categoria.append("is_active", category.is_active);
    categoria.append("portada", image?.file);
    categoria.append("subcategorias", JSON.stringify(items));

    await axios
      .post("/api/categories", categoria, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          router.push("/nx-admin/categorias?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 400) {
          console.log(data);
          setValidations({
            nombre: data.nombre,
            portada: data.imagen,
            descripcion: data.descripcion,
          });
        }
      })
      .finally(() => setLoading(false));
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
    <div className="w-full p-7">
      <Toaster position="bottom-right" />
      <section className="w-full h-full pb-8 px-4 pt-1 bg-gray-100 flex items-center justify-center">
        <article className="w-[700px] flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
          <TitleForm title="Crear Categoria" route="/nx-admin/categorias" />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={`grid h-full px-8 py-5 bg-gray-50 gap-x-6 ${isLoadingData && "pointer-events-none opacity-50 cursor-not-allowed"}`}>
              <InputText
                label="Nombre"
                subtitle="Máximo 50 caracteres"
                name="nombre"
                type="text"
                value={category.nombre}
                onChange={handleCategory}
                errMessage={validations.nombre}
              />
              <InputFile
                label="Portada"
                image={image}
                setImage={setImage}
                errMessage={validations.portada}
              />
              <InputTextArea
                label="Descripcion"
                subtitle="Máximo 500 caracteres"
                placeholder="Escribe una descripcion"
                name="descripcion"
                value={category.descripcion}
                onChange={handleCategory}
                errMessage={validations.descripcion}
              />
              <InputBox updateData={updateItems} />
              <InputSwitch
                label={"Estado"}
                name={"is_active"}
                value={category.is_active}
                onChange={handleCategory}
              />

            </div>
            <FooterForm title="Crear categoria" isLoadingData={isLoadingData} />
          </form>
        </article>
      </section>
    </div>
  );
}
