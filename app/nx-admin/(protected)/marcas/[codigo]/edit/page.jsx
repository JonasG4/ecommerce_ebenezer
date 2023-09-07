"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
} from "@/components/forms/inputs";
import {
  FaceFrownIcon,
  CameraIcon,
  CheckIcon,
  CircleXmarkIcon,
} from "@/components/icons/regular";
import toast, { Toaster } from "react-hot-toast";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/buttonsForm";
import Loading from "@/app/nx-admin/(protected)/marcas/[codigo]/edit/loading.jsx";
import Image from "next/image";

export default function EditPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const router = useRouter();

  const [marca, updateMarca] = useState({
		id_marca: 0,
    nombre: "",
		codigo: "",
    descripcion: "",
    imagen: "",
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
      .post(`/api/brands/${codigo}`, marca)
      .then((response) => {
        if (response.status === 200) {
          router.push("/nx-admin/marcas?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 400) {
          setValidations({
            nombre: data.nombre,
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

  const getBrand = async () => {
    setLoading(true);
    await axios
      .get(`/api/brands/${codigo}`)
      .then((response) => {
        const { data } = response;
        updateMarca({
					id_marca: data.id_marca,
          nombre: data.nombre,
					codigo: data.codigo,
					imagen: data.imagen,
          descripcion: data.descripcion,
          is_active: data.is_active,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="w-full py-7">
      <Toaster position="bottom-right" />
      <section className="w-full h-full pb-8 px-4 pt-1 bg-gray-100 flex items-center justify-center">
        <article className="w-[700px] flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
          <TitleForm title="Editar Marca" route="/nx-admin/marcas" />
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">
              <div
                className={`grid h-full px-8 py-2 bg-gray-50 gap-x-6 ${
                  isLoadingSubmit &&
                  "pointer-events-none opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="grid py-2 bg-gray-50 gap-x-6">
                  <h5 className="text-sm font-bold text-gray-700">Portada</h5>
                  <p className="text-xs text-gray-400">
                    Cambia la portada de la marca
                  </p>
                  <div className=" my-2 h-[80px] relative w-full overflow-hidden ring-1 ring-gray-400 rounded-md shadow-md cursor-pointer">
                    <Image
                      className="w-full h-full object-cover object-center"
                      src={`${process.env.AWS_BUCKET_URL}${marca.imagen}`}
                      width={500}
                      height={80}
                      alt={`Imagen categoria ${marca.nombre}`}
                    />
                    <ModalImage
                      src={`${process.env.AWS_BUCKET_URL}${marca.imagen}`}
                      name={marca.codigo}
                      filename={marca.imagen}
                      marca_id={marca.id_marca}
                    />
                  </div>
                </div>
                <InputText
                  label="Nombre"
                  subtitle="Máximo 50 caracteres"
                  name="nombre"
                  type="text"
                  value={marca.nombre}
                  onChange={handleCategory}
                  errMessage={validations.nombre}
                />
                <InputTextArea
                  label="Descripcion"
                  subtitle="Máximo 200 caracteres"
                  placeholder="Escribe una descripción"
                  name="descripcion"
                  value={marca.descripcion}
                  onChange={handleCategory}
                  errMessage={validations.descripcion}
                />
                <InputSwitch
                  label={"Estado"}
                  name={"is_active"}
                  subtitle={"Activo/Inactivo"}
                  value={marca.is_active}
                  onChange={handleCategory}
                />
              </div>
              <FooterForm
                title="Agregar marca"
                isLoadingData={isLoadingSubmit}
              />
            </form>
          )}
        </article>
      </section>
    </div>
  );
}

export function ModalImage({ src, marca_id, name, filename }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalOuterRef = useRef(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState({
    src: src,
    name: name,
    filename: filename,
    file: null,
  });

  const handleClose = (event) => {
    if (isOpen && modalOuterRef.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  const handleImage = (e) => {
    const { files } = e.target;
    if (files[0]) {
      setImage({
        src: URL.createObjectURL(files[0]),
        file: files[0],
        name: name,
        filename: filename,
      });
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("portada", image.file);
    formData.append("codigo", image.name);
    formData.append("key", image.filename);

    await axios
      .patch(`/api/brands/${marca_id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Imagen actualizada");
          getCategory();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setIsOpen(false);
        setImage({
          ...image,
          src: src,
          file: null,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center w-[45px] h-[45px] rounded-full shadow-md bg-black bg-opacity-70 hover:bg-opacity-50 opacity-100 duration-200 ease-in-out transition-all z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <CameraIcon className="w-6 fill-gray-50" />
      </div>
      {isOpen && (
        <div
          id="modalOutside"
          ref={modalOuterRef}
          className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[5000] flex items-center justify-center"
          onClick={handleClose}
        >
          <section className="md:w-[700px] bg-white flex flex-col gap-2 p-5 rounded-md ring-1 ring-gray-300">
            <article className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-black text-gray-800 text-lg">
                  Actualizar portada
                </h2>
                <p className="text-sm text-gray-500">Tamaño máximo: 3 MB</p>
              </div>
              <button
                type="button"
                className=""
                onClick={() => setIsOpen(false)}
              >
                <CircleXmarkIcon className="w-6 fill-gray-400 text-gray-50 hover:fill-red-500 active:scale-95 duration-150 ease-in-out transition-all" />
              </button>
            </article>
            <Image
              src={image.src}
              width={500}
              height={80}
              alt="Imagen marca"
              className="w-full rounded-md shadow-md ring-1 ring-gray-400"
            />
            {inputRef.current ? (
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 py-1 px-4 rounded-md 
                  ${
                    loading &&
                    "hover:cursor-not-allowed pointer-events-none opacity-90"
                  }
                  bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all`}
                  onClick={handleUpload}
                >
                  {loading ? (
                    <>Guardando foto...</>
                  ) : (
                    <>
                      <CheckIcon className="w-3 fill-white" />
                      Guardar foto
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-1 px-4 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all"
                  onClick={() => inputRef.current.click()}
                >
                  <CameraIcon className="w-4 fill-white" />
                  Cambiar foto
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-1 px-4 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600 active:scale-95 duration-150 ease-in-out transition-all"
                onClick={() => inputRef.current.click()}
              >
                <CameraIcon className="w-4 fill-white" />
                Subir foto
              </button>
            )}

            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleImage}
            />
          </section>
        </div>
      )}
    </>
  );
}
