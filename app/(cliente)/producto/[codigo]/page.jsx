"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GlassZoomIcon,
  StarHalfIcon,
  CarShoppingIcon,
  HeartIcon,
  UserIcon,
} from "@/components/icons/regular";
import axios from "axios";
import parse from "html-react-parser";
import ZoomImage from "@/components/modals/ZoomImages";
import { calcularPorcentaje } from "@/libs/transformString";

export default function Page({ params: { codigo } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [sugguest, setSugguest] = useState([]);
  const [portada, setPortada] = useState("");

  const getProducto = async () => {
    const res = await axios.get(`/api/products/${codigo}`);
    if (res.data === null) return window.location.replace("/404");
    setProduct(res.data);
    setPortada({
      src: res.data.portada,
      index: 0,
    });
  };

  const getRecommendations = async () => {
    const res = await axios.get(`/api/products/sugguest/${codigo}}`);
    setSugguest(res.data);
  };

  useEffect(() => {
    getProducto();
    getRecommendations();
  }, []);

  return (
    <div className="mt-5 flex flex-col w-full items-center justify-center bg-white">
      <div className="w-[1400px]">
        <p className="text-gray-500 py-2">
          {" "}
          <span>
            <Link className="" href={`/categoria/${product.categoria?.codigo}`}>
              {product.categoria?.nombre}
            </Link>
          </span>{" "}
          /{" "}
          <span>
            <Link className="" href={`/categoria/${product.categoria?.codigo}`}>
              {product.subcategoria?.nombre}
            </Link>
          </span>{" "}
          / <span className="text-[18px] text-blue-500">{product.nombre}</span>
        </p>
        <div className="flex gap-10 w-full py-2">
          <section className="flex flex-col gap-2">
            <div className="relative flex items-center justify-center w-[600px] h-[400px] bg-gray-50 rounded-md object-fill p-1 ring-1 ring-gray-400 shadow-md">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${portada.src}`}
                alt="Foto de perfil"
                className="w-full h-full object-contain"
                width={400}
                height={400}
              />
              <div className="absolute top-2 right-2 z-50">
                <ZoomImage images={product.imagenes} index={portada.index} />
              </div>
            </div>
            <div className="w-full flex gap-2 mt-2">
              {product.imagenes?.map((img, i) => (
                <Image
                  key={i}
                  src={`${process.env.AWS_BUCKET_URL}${img.imagen}`}
                  alt={`${product.nombre} - ${i}`}
                  loading="lazy"
                  className={`w-[100px] h-[100px] object-cover rounded-md shadow-md ring-1 cursor-pointer ${
                    img.imagen === portada ? "ring-red-800" : "ring-gray-400"
                  } hover:ring-red-800`}
                  width={100}
                  height={100}
                  onClick={() =>
                    setPortada({
                      src: img.imagen,
                      index: i,
                    })
                  }
                />
              ))}
            </div>
          </section>
          <section className="w-full flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold text-gray-800">
              {product.nombre}
            </h1>
            <div className="flex gap-4 items-center">
              <p className="font-semibold">
                {product.marca?.nombre || "Marca"}
              </p>
              <div className="h-full w-[1px] bg-gray-400"></div>
              <div className="flex gap-4 items-center">
                {product.stock > 0 ? (
                  <span className="text-green-700 font-light">Disponible</span>
                ) : (
                  <span className="text-red-700 font-light">Agotado</span>
                )}
              </div>
              <div className="h-full w-[1px] bg-gray-400"></div>
              <span className="font-light text-red-800 flex gap-2 items-center">
                <HeartIcon className="w-4 h-4 text-red-700 fill-red-700" />
                Agregar favoritos
              </span>
            </div>

            {/* PRECIOS */}
            <div className="mt-2 flex flex-col">
              {product.porcentaje_descuento > 0 ? (
                <>
                  <p className="text-2xl font-bold text-gray-600 flex flex-col leading-[24px]">
                    <span className="line-through font-light">
                      ${product.precio?.toString().split(".")[0]}
                      <span className="text-sm line-through">
                        {"."}
                        {product.precio?.toString().split(".")[1] || "00"}
                      </span>
                    </span>
                  </p>
                  <p className="text-3xl font-black text-red-700 flex flex-col leading-[28px]">
                    <span className="text-[16px] font-light">
                      Promo especial
                    </span>
                    <span className="flex gap-2 items-center">
                      $
                      {calcularPorcentaje(
                        product.precio,
                        product.porcentaje_descuento
                      )}{" "}
                      <span className="bg-red-500 text-[16px] py-1 px-3 text-white ">
                        -{product.porcentaje_descuento}%
                      </span>
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-ligth">Normal</h4>
                  <p className="text-2xl font-black text-gray-800 flex flex-col leading-[24px]">
                    <span className="text-3xl font-black">
                      ${product.precio?.toString().split(".")[0]}
                      <span className="text-lg">
                        {"."}
                        {product.precio?.toString().split(".")[1] || "00"}
                      </span>
                    </span>
                  </p>
                </>
              )}
            </div>

            <div className="w-full h-[300px] overflow-auto bg-red-100 rounded-md p-4 mt-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
              <h1 className="font-bold text-lg text-gray-800">Descripción</h1>
              <div>{parse(product?.descripcion || "")}</div>
            </div>

            <div className="mt-10 flex gap-5 items-center justify-end">
              <div className="flex flex-col gap-2 items-center">
                <Link
                  href={"/carrito"}
                  className="w-[250px] py-2 bg-red-700 rounded-md flex gap-3 items-center justify-center hover:bg-red-800"
                >
                  <CarShoppingIcon className="w-5 text-white fill-white" />
                  <span className="text-white">Agregar al carrito</span>
                </Link>
                <Link
                  href={"/"}
                  className="w-[250px] py-2 bg-yellow-600 rounded-md flex gap-2 items-center justify-center"
                >
                  <span className="text-white">Comprar ya</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* RECOMENDADOS ================ */}
        <div className="w-full flex flex-col gap-4 my-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Productos relacionados
          </h1>
          <div className="w-full bg-gray-100 p-4 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-1 gap-2">
            {sugguest.map((recommended, i) => (
              <Link
                key={i}
                href={`/producto/${recommended.codigo}`}
                className="w-[220px] h-[300px] flex flex-col gap-2 items-center bg-white ring-1 ring-gray-300 rounded-md shadow-md p-4 hover:scale-105 hover:ring-red-300 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <Image
                  src={`${process.env.AWS_BUCKET_URL}${recommended.portada}`}
                  alt={`Imagen de ${recommended.nombre}`}
                  loading="lazy"
                  className="w-[150px] h-[100px] object-contain rounded-md shadow-md ring-1 ring-gray-400"
                  width={150}
                  height={100}
                />
                <h1 className="font-medium text-center line-clamp-2">
                  {recommended.nombre}
                </h1>
                {recommended.porcentaje_descuento > 0 ? (
                  <div className="flex gap-2 items-center">
                    <div>
                      <h5 className="text-xs">Normal</h5>
                      <p className="text-gray-600 font-bold line-through text-sm">
                        ${recommended.precio}
                      </p>
                    </div>
                    <div className="h-full w-[1px] bg-gray-400"></div>
                    <div className="text-red-700">
                      <h5 className="text-sm">Especial</h5>
                      <p className="text-red-700 font-bold text-lg">$
                      {calcularPorcentaje(
                        recommended.precio,
                        recommended.porcentaje_descuento
                      )}{" "}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                      <h5 className="text-xs">Precio</h5>
                      <p className="text-gray-700 font-bold text-xl">${recommended.precio}</p>
                  </div>
                )}

                <Link
                  href={"/"}
                  className="w-full p-2 bg-red-700 rounded-md flex gap-2 items-center justify-center mt-auto"
                >
                  <span className="text-white">Agregar al carrito</span>
                </Link>
              </Link>
            ))}
          </div>
        </div>

        <section className="my-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Reseñas <span className="font-light">(0)</span>
          </h1>
          <p className="text-gray-500">
            Dejanos tu opinión acerca de este <producto></producto>
          </p>
          <section className="flex gap-6">
            <article className="flex flex-col gap-3">
              {/* <div className="flex gap-4 items-center mt-4">
                <div className="flex gap-2 items-center">
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                </div>
              </div> */}
              <div className="flex flex-col gap-2">
                <textarea
                  type="text"
                  placeholder="Escribe una opinion..."
                  className="w-[600px] p-2 rounded-md ring-1 ring-gray-400 border-none"
                />
                <button className="py-2 w-[600px] bg-red-700 rounded-md text-white">
                  Comentar
                </button>
              </div>
            </article>
            
            {/* LISTA DE COMENTARIOS */}
            {/* <article className="flex flex-col gap-3">
              <div className="w-full bg-gray-100 shadow-md p-3 ring-1 ring-gray-400 rounded-md flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <UserIcon className="w-4 text-gray-400 fill-gray-400" />
                    <h1 className="font-bold text-gray-700">Juan Perez</h1>
                    <span className="text-gray-400 italic ml-auto">
                      15/05/2023, 08:23 PM
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis officiis voluptas pariatur aliquam neque rem provident
                  quidem maxime accusamus accusantium blanditiis veniam,
                  quisquam voluptates consequatur, in sint ducimus, dolor nisi.
                </p>
              </div>
              <div className="w-full bg-gray-100 shadow-md p-3 ring-1 ring-gray-400 rounded-md flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <UserIcon className="w-4 text-gray-400 fill-gray-400" />
                    <h1 className="font-bold text-gray-700">Kevin Antonio</h1>
                    <span className="text-gray-400 italic ml-auto">
                      15/05/2023, 08:50 PM
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis officiis voluptas pariatur aliquam neque rem provident
                  quidem maxime accusamus accusantium blanditiis veniam,
                  quisquam voluptates consequatur, in sint ducimus, dolor nisi.
                </p>
              </div>
              <div className="w-full bg-gray-100 shadow-md p-3 ring-1 ring-gray-400 rounded-md flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <UserIcon className="w-4 text-gray-400 fill-gray-400" />
                    <h1 className="font-bold text-gray-700">Jefferson Lopez</h1>
                    <span className="text-gray-400 italic ml-auto">
                      15/05/2023, 09:33 PM
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                    <StarHalfIcon className="w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis officiis voluptas pariatur aliquam neque rem provident
                  quidem maxime accusamus accusantium blanditiis veniam,
                  quisquam voluptates consequatur, in sint ducimus, dolor nisi.
                </p>
              </div>
            </article> */}
            <article>
              <div className="flex flex-col gap-3">
                Sin comentarios
              </div>
            </article>
          </section>
        </section>
      </div>
    </div>
  );
}
