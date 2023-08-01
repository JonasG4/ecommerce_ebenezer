"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CarShoppingIcon,
  HeartIcon,
  TrunkFastIcon,
  ShieldCheckIcon,
  SendIcon,
} from "@/components/icons/regular";
import { AngleDownIcon, ClockIcon, ShareIcon } from "@/components/icons/light";
import axios from "axios";
import parse from "html-react-parser";
import ZoomImage from "@/components/modals/ZoomImages";
import { calcularPorcentaje } from "@/libs/transformString";
import LoadingProduct from "@/app/(cliente)/producto/loadingProduct";
import LoadingSuggest from "@/app/(cliente)/producto/loadingSuggest";
import { addToCart } from "@/redux/cart";
import { useDispatch } from "react-redux";

export async function generateMetadata() {
  return {
    title: `Página no encontrada`,
    description: ``,
  };
}
export default function Page({ params: { codigo } }) {
  const [product, setProduct] = useState({});
  const [sugguest, setSugguest] = useState([]);
  const [portada, setPortada] = useState("");
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingSugguest, setIsLoadingSugguest] = useState(false);
  const dispatch = useDispatch();

  const getProducto = async () => {
    setIsLoadingProduct(true);
    const res = await axios
      .get(`/api/products/${codigo}`)
      .finally(() => setIsLoadingProduct(false));
    if (res.data === null) return window.location.replace("/404");
    setProduct(res.data);
    setPortada({
      src: res.data.portada,
      index: 0,
    });
  };

  const getRecommendations = async () => {
    setIsLoadingSugguest(true);
    const res = await axios
      .get(`/api/products/sugguest/${codigo}}`)
      .finally(() => setIsLoadingSugguest(false));
    setSugguest(res.data);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    getProducto();
    getRecommendations();
  }, []);

  return (
    <main className="mt-5 flex flex-col w-full items-center justify-center bg-white">
      <section className="w-[1400px]">
        {isLoadingProduct ? (
          <LoadingProduct />
        ) : (
          <>
            <div className="flex gap-10 w-full py-2 ">
              <section className="flex flex-col gap-2">
                <p className="text-gray-500 pb-2">
                  <Link
                    className="hover:underline-offset-1 hover:underline text-sm"
                    href={`/categoria/${product.categoria?.codigo}`}
                  >
                    {product.categoria?.nombre}
                  </Link>
                  {" / "}
                  <Link
                    className="hover:underline-offset-1 hover:underline text-sm"
                    href={`/categoria/${product.categoria?.codigo}`}
                  >
                    {product.subcategoria?.nombre}
                  </Link>
                  {" / "}
                  <span className="text-[18px] text-blue-500 text-base">
                    {product.nombre}
                  </span>
                </p>
                <div className="relative flex items-center justify-center w-[600px] h-[400px] bg-gray-50 rounded-md object-fill p-1 ring-1 ring-gray-400 shadow-md">
                  <Image
                    src={`${process.env.AWS_BUCKET_URL}${portada.src}`}
                    alt="Foto de perfil"
                    className="w-full h-full object-contain"
                    width={400}
                    height={400}
                  />
                  <div className="absolute top-2 right-2 z-50">
                    <ZoomImage
                      images={product.imagenes}
                      index={portada.index}
                    />
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
                        img.imagen === portada
                          ? "ring-red-800"
                          : "ring-gray-400"
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
                <div className="mt-5 w-full p-4 bg-red-50 rounded-md flex flex-col gap-1 ring-1 ring-red-400">
                  <span className="flex gap-3">
                    <ClockIcon className="w-6 fill-red-800" />
                    <span className="text-gray-800 ">
                      Tiempo de entrega:{" "}
                      <span className="font-semibold">2 a 7 días hábiles</span>
                    </span>
                  </span>

                  <span className="flex gap-3 mt-2">
                    <TrunkFastIcon className="w-6 fill-red-800" />
                    <span className="text-gray-800 font-bold">
                      Envío gratis{" "}
                      <span className="font-normal">a todo oriente</span>
                    </span>
                  </span>

                  <span className="flex gap-3 mt-2">
                    <ShieldCheckIcon className="w-5 fill-green-600" />
                    <span className="text-gray-800 ">
                      Compra protegida, recibe el producto que esperabas o te
                      devolvemos tu dinero.
                    </span>
                  </span>
                </div>
              </section>
              <section className="w-full flex flex-col gap-1">
                <h1 className="text-2xl font-extrabold text-gray-800">
                  {product.nombre}
                </h1>
                <div className="flex gap-4 items-center">
                  <p className="font-semibold text-yellow-800">
                    {product.marca?.nombre || "Marca"}
                  </p>
                  <div className="h-full w-[1px] bg-gray-400"></div>
                  <div className="flex gap-4 items-center">
                    {product.stock > 0 ? (
                      <span className="text-gray-600 font-light">
                        Disponible
                      </span>
                    ) : (
                      <span className="text-red-700 font-light">Agotado</span>
                    )}
                  </div>
                  <div className="h-full w-[1px] bg-gray-400"></div>
                  <button className="font-light text-sm uppercase text-gray-500 flex gap-2 items-center group hover:text-red-800">
                    <HeartIcon className="w-4 h-4 text-gray-500 fill-gray-500 group-hover:text-red-800 group-hover:fill-red-800" />
                    Agregar favoritos
                  </button>
                  <div className="h-full w-[1px] bg-gray-400"></div>
                  <button className="font-light text-sm uppercase text-gray-500 flex gap-2 items-center group hover:text-red-800">
                    <ShareIcon className="w-4 h-4 text-gray-500 fill-gray-500 group-hover:text-red-800 group-hover:fill-red-800" />
                    Compartir
                  </button>
                </div>

                {/* PRECIOS */}
                <div className="mt-4 flex gap-4 items-end">
                  {product.porcentaje_descuento > 0 ? (
                    <>
                      <p className="text-4xl font-black text-red-800 flex flex-col leading-[28px]">
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
                      <p className="text-2xl font-bold text-gray-600 flex flex-col leading-[24px]">
                        <span span className="text-[16px] font-light">
                          Precio regular
                        </span>
                        <span className="line-through font-light">
                          ${product.precio?.toString().split(".")[0]}
                          <span className="text-sm line-through">
                            {"."}
                            {product.precio?.toString().split(".")[1] || "00"}
                          </span>
                        </span>
                      </p>
                    </>
                  ) : (
                    <div>
                      <h4 className="font-light"> Precio regular</h4>
                      <p className="text-yellow-800 flex flex-col leading-[20px]">
                        <span className="text-4xl font-black">
                          ${product.precio?.toString().split(".")[0]}
                          <span className="text-xl">
                            {"."}
                            {product.precio?.toString().split(".")[1] || "00"}
                          </span>
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* DESSCRIPCION */}
                <div className="w-full h-[350px] overflow-auto bg-gray-100 rounded-md p-4 mt-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
                  <div className="list-disc">
                    {parse(product?.descripcion || "")}
                  </div>
                </div>

                {/* BOTONES */}
                <div className="mt-10 flex gap-5 items-center justify-end">
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="w-[250px] py-2 bg-red-800 rounded-md flex gap-3 items-center justify-center hover:bg-red-800"
                    >
                      <CarShoppingIcon className="w-5 text-white fill-white" />
                      <p className="text-white text-sm">Agregar al carrito</p>
                    </button>
                    <Link
                      href={"/carrito"}
                      className="w-[250px] py-2 bg-yellow-800 rounded-md flex gap-2 items-center justify-center"
                    >
                      <p className="text-white text-sm">Comprar ya</p>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        <div className="w-full flex flex-col gap-4 my-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Productos relacionados
          </h1>
          <div className="flex gap-4 items-center w-full overflow-hidden">
            <div className="cursor-pointer group/left">
              <AngleDownIcon className="w-8 fill-gray-400 rotate-90 group-hover/left:fill-gray-600" />
            </div>
            <div className="w-full bg-gray-50 p-4 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-1 gap-2">
              {isLoadingSugguest ? (
                <LoadingSuggest />
              ) : (
                <>
                  {/* RECOMENDADOS ================ */}
                  {sugguest.map((recommended, i) => (
                    <Link
                      key={i}
                      href={`/producto/${recommended.codigo}`}
                      className="w-[220px] h-[300px] flex flex-col gap-2 items-center bg-white ring-1 ring-gray-300 rounded-md p-4 hover:shadow-md hover:ring-red-300 transition-all duration-200 ease-in-out cursor-pointer"
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
                            <p className="text-red-700 font-bold text-lg">
                              $
                              {calcularPorcentaje(
                                recommended.precio,
                                recommended.porcentaje_descuento
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <h5 className="text-xs">Precio</h5>
                          <p className="text-gray-700 font-bold text-xl">
                            ${recommended.precio}
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleAddToCart(recommended)}
                        className="w-full p-2 bg-red-700 rounded-md flex gap-2 items-center justify-center mt-auto"
                      >
                        <span className="text-white">Agregar al carrito</span>
                      </button>
                    </Link>
                  ))}
                </>
              )}
            </div>
            <div className="cursor-pointer group/right">
              <AngleDownIcon className="w-8 fill-gray-400 -rotate-90 group-hover/right:fill-gray-600" />
            </div>
          </div>
        </div>

        <section className="my-10 flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Opiniones<as></as>
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
                <button className="py-2 w-[600px] bg-red-700 hover:bg-red-800 rounded-md text-white text-sm flex items-center justify-center">
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
              <div className="flex flex-col gap-3">Sin comentarios</div>
            </article>
          </section>
        </section>
      </section>
    </main>
  );
}
