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
import ZoomIn from "@/components/modals/zoomModal";
import ZoomImages from "@/components/modals/ZoomImages";
import { calcularPorcentaje } from "@/libs/transformString";

export default function Page({ params: { codigo }}) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const getProducto = async () => {
    const res = await axios.get(`/api/products/${codigo}`);
    console.log(res.data)
    setProduct(res.data);
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <div className="mt-10 flex flex-col w-full items-center justify-center bg-white">
      <div className="w-[1400px]">
        <p className="text-gray-500 py-2"> Dormitorio / Camas / <span className="text-[18px] text-blue-500">Cama Indufoam Queen Natural Sleep</span></p>
        <div className="flex gap-10 w-full py-2">
          <section className="flex flex-col gap-2">
            <div className="relative flex items-center justify-center w-[600px] h-[400px] bg-blue-50 rounded-md object-cover p-1 ring-1 ring-gray-400 shadow-md">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
                alt="Foto de perfil"
                loading="lazy"
                className="w-[400px] h-full"
                width={400}
                height={400}
              />
              <button
                type="button"
                className="absolute top-2 right-2 cursor-pointer w-[30px] h-[30px] bg-gray-100 rounded-md shadow-md group/zoom flex items-center justify-center"
                onClick={() => setIsOpen(true)}
              >
                <GlassZoomIcon className="w-[14px] fill-gray-700 group-hover/zoom:fill-blue-500" />
              </button>{" "}
            </div>
            <div className="w-full flex gap-2 mt-2">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
                alt="Foto de perfil"
                loading="lazy"
                className="w-[100px] h-[100px] object-cover rounded-md shadow-md ring-1 ring-red-700"
                width={100}
                height={100}
              />
              <Image
                src={"/images/products/NaturalSleep.jpg"}
                alt="Foto de perfil"
                loading="lazy"
                className="w-[100px] h-[100px] object-cover rounded-md shadow-md ring-1 ring-gray-400"
                width={100}
                height={100}
              />
            </div>
          </section>
          <section className="w-full flex flex-col gap-1">
            <h1 className="text-3xl font-black text-gray-800">
              {product.nombre}
            </h1>
            <div className="flex gap-4 items-center">
              <p className="font-semibold">
                {product.marca?.nombre || "Marca"}
              </p>
              <div className="h-full w-[1px] bg-gray-400"></div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-1">
                  <StarHalfIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <StarHalfIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <StarHalfIcon className="w-4 h-4 text-yellow-500 fill-gray-300" />
                  <StarHalfIcon className="w-4 h-4 text-gray-300 fill-gray-300" />
                </div>
                <span className="font-light text-blue-800">
                  Sin Reseñas
                </span>
              </div>
              <div className="h-full w-[1px] bg-gray-400"></div>
              <span className="font-light text-blue-800 flex gap-2 items-center">
                <HeartIcon className="w-4 h-4 text-red-700 fill-red-700" />
                Agregar favoritos
              </span>
            </div>

            {/* PRECIOS */}
            <div className="mt-2 flex flex-col">
              <p className="text-2xl font-black text-gray-600 flex flex-col leading-[24px]">
                <span className="text-xl line-through font-light">${product.precio}</span>
              </p>
              <p className="text-3xl font-black text-red-700 flex flex-col leading-[28px]">
                <span className="text-[16px] font-light">Promo espcial</span>
                <span>${calcularPorcentaje(product.precio, product.porcentaje_descuento)} <span className="text-sm bg-red-500 ">-{product.porcentaje_descuento}%</span></span>
              </p>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg">
                Marca: <span className="font-normal">Indufoam</span>
              </h1>
            </div>
            <div>
                {/* {parse(product.descripcion)} */}
            </div>

            <div className="mt-10 flex gap-5 items-center justify-end">
              <div className="custom-number-input w-32">
                <label htmlFor="">Cantidad</label>
                <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button className=" bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin text-gray-900">
                      −
                    </span>
                  </button>
                  <input
                    type="number"
                    className="outline-none text-center w-full border-gray-300 bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                    name="custom-input-number"
                    value="1"
                  ></input>
                  <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin text-gray-900">
                      +
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Link
                  href={"/carrito"}
                  className="w-[250px] py-2 bg-red-700 rounded-md flex gap-3 items-center justify-center"
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
          <div className="w-full bg-gray-100 p-4 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <article className="w-[220px] h-[300px] flex flex-col gap-2 items-center bg-white rounded-md shadow-md p-4">
              <Image
                src={"/images/products/frescoFoam.png"}
                alt="Foto de perfil"
                loading="lazy"
                className="w-[150px] h-[120px] object-cover rounded-md shadow-md ring-1 ring-gray-400"
                width={150}
                height={120}
              />
              <h1 className="font-medium text-center">
                Cama Fresco Foam King Size
              </h1>
              <div className="flex gap-2 items-center">
                <div>
                  <h5 className="text-xs">Normal</h5>
                  <p className="text-gray-600 font-bold line-through text-sm">
                    $500.00
                  </p>
                </div>
                <div className="h-full w-[1px] bg-gray-400"></div>
                <div className="text-red-700">
                  <h5 className="text-sm">Especial</h5>
                  <p className="text-red-700 font-bold text-lg">$540.00</p>
                </div>
              </div>
              <Link
                href={"/"}
                className="w-full p-2 bg-red-700 rounded-md flex gap-2 items-center justify-center mt-auto"
              >
                <span className="text-white">Agregar al carrito</span>
              </Link>
            </article>
          </div>
        </div>
        <section className="my-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Reseñas <span className="font-light">(2)</span>
          </h1>
          <p className="text-gray-500">
            Dejanos tu opinión acerca de este producto
          </p>
          <section className="flex gap-6">
            <article className="flex flex-col gap-3">
              <div className="flex gap-4 items-center mt-4">
                <div className="flex gap-2 items-center">
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                  <StarHalfIcon className="w-6 text-gray-300 fill-gray-300" />
                </div>
              </div>
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
            <article className="flex flex-col gap-3">
              <div className="w-full bg-gray-100 shadow-md p-3 ring-1 ring-gray-400 rounded-md flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <UserIcon className="w-4 text-gray-400 fill-gray-400" />
                    <h1 className="font-bold text-gray-700">Juan Perez</h1>
                    <span className="text-gray-400 italic ml-auto">15/05/2023, 08:23 PM</span>
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
                    <span className="text-gray-400 italic ml-auto">15/05/2023, 08:50 PM</span>
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
                    <span className="text-gray-400 italic ml-auto">15/05/2023, 09:33 PM</span>
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
            </article>
          </section>
        </section>
      </div>
    </div>
  );
}
