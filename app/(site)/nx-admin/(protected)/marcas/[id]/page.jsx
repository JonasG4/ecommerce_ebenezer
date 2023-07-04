"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { AngleDown } from "@/components/icons/regular";
import { usePathname, useRouter } from "next/navigation";
import { InputText, InputSwitch } from "@/components/forms/inputs";
import toast, { Toaster } from "react-hot-toast";
import TitleForm from "@/components/forms/titleForm";
import ButtonSubmit from "@/components/forms/buttonSubmit";

export default function CreatePage() {
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  //Data
  const [brand, updateBrand] = useState({
    nombre: "",
    is_active: true,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/api/brands", brand)
      .then((response) => {
        if (response.status === 201) {
          router.push("/marcas?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.messages.nombre,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const handleBrand = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateBrand({ ...brand, [name]: e.target.checked });
    } else {
      updateBrand({ ...brand, [name]: value });
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <Toaster />
      <section className="w-[600px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <TitleForm title="Agregar Marca" />
        <div className="h-[1px] w-full bg-gray-300 my-2"></div>
        <article className="mt-4">
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <InputText
              label="Nombre"
              name="nombre"
              type="text"
              value={brand.nombre}
              onChange={handleBrand}
              errMessage={validations.nombre}
            />
            <InputSwitch
              label={"Estado"}
              name={"is_active"}
              value={brand.is_active}
              onChange={handleBrand}
            />
            <div className="h-[1px] w-full bg-gray-300 my-2"></div>
            <div className="w-full flex">
              <ButtonSubmit title={"Agregar marca"} isLoading={isLoading} />
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}
