"use client";
import axios from "axios";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputFile,
} from "@/components/forms/inputs";
import toast, { Toaster } from "react-hot-toast";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/buttonsForm";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const router = useRouter();

  const [marca, updateMarca] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", marca.nombre);
    formData.append("descripcion", marca.descripcion);
    formData.append("is_active", marca.is_active);
    formData.append("logo", image?.file);

    await axios
      .post("/api/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          router.push("/nx-admin/marcas?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.nombre,
            imagen: data.imagen,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const handleCategory = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateMarca({ ...marca, [name]: e.target.checked });
    } else {
      updateMarca({ ...marca, [name]: value });
    }
  };

  return (
    <div className="w-full py-7">
      <Toaster position="bottom-right" />
      <section className="w-full h-full pb-8 px-4 pt-1 bg-gray-100 flex items-center justify-center">
        <article className="w-[700px] flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
          <TitleForm title="Agregar Marca" route="/nx-admin/marcas" />
          <form onSubmit={handleSubmit} autoComplete="off">
          <div className={`grid h-full px-8 py-5 bg-gray-50 gap-x-6 ${isLoadingData && "pointer-events-none opacity-50 cursor-not-allowed"}`}>
              <InputText
                label="Nombre"
                subtitle="Máximo 50 caracteres"
                name="nombre"
                type="text"
                value={marca.nombre}
                onChange={handleCategory}
                errMessage={validations.nombre}
              />
              <InputFile
                label="Logo"
                image={image}
                setImage={setImage}
                errMessage={validations.imagen}
              />
              <InputTextArea
                label="Descripcion"
                subtitle="Máximo 200 caracteres"
                name="descripcion"
                value={marca.descripcion}
                onChange={handleCategory}
                errMessage={validations.descripcion}
              />
              <InputSwitch
                label={"Estado"}
                name={"is_active"}
                value={marca.is_active}
                onChange={handleCategory}
              />
            </div>
            <FooterForm title="Agregar marca" isLoadingData={isLoadingData} />
          </form>
        </article>
      </section>
    </div>
  );
}
