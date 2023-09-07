"use client";
import { useState } from "react";
import {
  TrashCanIcon,
  CircleXmarkIcon,
  BagShoppingIcon,
} from "@/components/icons/regular";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/cart";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  LockClosedIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartIcon as ShoppingCartIconOutline } from "@heroicons/react/24/outline";

export default function CarritoModal() {
  const [showModal, setShowModal] = useState(false);
  const items = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCloseModal = (e) => {
    if (showModal && e.target.id === "outsideModal") {
      setShowModal(false);
    }
  };

  return (
    <div className="relative flex justify-center">
      <button
        className="cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
        onClick={() => setShowModal(!showModal)}
      >
          {items.length < 1 && (
            <>
            <ShoppingCartIconOutline className="w-6 text-red-900" />
            <h4 className="text-zinc-900 hover:text-red-900 text-sm">Carrito</h4>
            </>
          )}
          {items.length > 0 && (
            <div className="flex gap-2 bg-red-100 py-1 px-3 rounded-md items-center ring-1 ring-red-800 hover:bg-red-200 duration-200 ease-in-out">
              <ShoppingCartIcon className="w-6 fill-red-900" />
              <p className="text-sm font-normal text-white h-[18px] w-[18px] leading-3 bg-yellow-600 shadow-md rounded-full flex items-center justify-center">
                {items.length}
              </p>
            </div>
          )}
      </button>
      <div
        id="outsideModal"
        onClick={handleCloseModal}
        className={`fixed inset-0 w-full min-h-screen max-h-screen overflow-hidden shadow-md rounded-md bg-black bg-opacity-60 z-[1000] flex justify-end transition-all duration-200 ease-in-out ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`
          ${
            showModal ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 ease-in-out w-[400px] h-full
           bg-white border-l border-gray-400 flex flex-col items-center overflow-hidden`}
        >
          <div className="w-full flex justify-between items-center bg-zinc-800">
            <h1 className="font-black text-2xl p-2 text-black bg-yellow-600 w-[180px] flex items-center justify-center">
              Mi Carrito
            </h1>
            <CircleXmarkIcon
              className="w-[40px] fill-transparent text-white cursor-pointer mr-5 hover:fill-zinc-700"
              onClick={() => setShowModal(false)}
            />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mx-4"></div>
          <div className="bg-gray-50 w-full h-full flex flex-col items-center overflow-hidden">
            {items.length > 0 ? (
              <div className="flex flex-col justify-between w-full h-full">
                <div className="flex flex-col gap-4 px-4 mt-4 overflow-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center w-full pb-4 border-b border-gray-300"
                    >
                      <div className="flex items-center gap-2 w-full justify-between">
                        <Image
                          src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                          alt={item.nombre}
                          width={40}
                          height={40}
                          className="rounded-md object-contain"
                        />
                        <div className="flex flex-col flex-1 justify-between">
                          <p className="text-sm font-bold text-gray-800">
                            {item.nombre}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-red-800 font-bold">
                              ${item.precio?.toString().split(".")[0]}.
                              <span className="text-xs">
                                {item.precio?.toString().split(".")[1] || "00"}
                              </span>
                            </p>
                            <p className="text-sm text-gray-800 leading-4 font-semibold">
                              Cantidad:{" "}
                              <span className="font-light">
                                {item.cantidad}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="ml-3">
                          <button
                            type="button"
                            className="text-xs text-gray-800 leading-4 cursor-pointer transition duration-300 hover:text-red-900 group/carremove"
                            onClick={() => removeItemHandler(item.id_producto)}
                          >
                            <XMarkIcon className="w-4 fill-red-900 text-red-900 group-hover/carremove:hover:fill-red-700 group-hover/carremove:hover:text-red-700 " />
                          </button>
                        </div>
                      </div>
                      <span>{items.precio}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border-t border-gray-300 p-4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-gray-500">Subtotal</h4>
                      <p className="text-gray-800 font-black text-2xl">
                        $
                        {items.reduce(
                          (acc, item) => acc + item.precio * item.cantidad,
                          0
                        )}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-gray-500">
                        <span className="font-bold">
                          {items.reduce((acc, item) => acc + item.cantidad, 0)}{" "}
                        </span>
                        articulos totales
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/carrito"
                      className="text-sm uppercase text-white bg-red-900 leading-4 w-full py-2 flex items-center justify-center rounded-md transition duration-300 hover:bg-red-800"
                    >
                      Ver carrito
                    </Link>
                    <Link
                      href="/carrito"
                      className="text-sm uppercase text-white bg-yellow-700 leading-4 w-full py-2 flex items-center justify-center rounded-md transition duration-300 hover:bg-yellow-600"
                    >
                      Pagar
                      <LockClosedIcon className="w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-auto flex flex-col gap-2 items-center justify-center">
                <BagShoppingIcon className="w-20 h-20 fill-gray-300" />
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Tu carrito está vacio
                  </h2>
                  <p className="text-sm text-gray-500">Empieza a llenarlo</p>
                </div>
                <Link
                  href="/categorias"
                  className="text-sm uppercase text-white bg-red-900 leading-4 w-full my-2 py-2 flex items-center justify-center rounded-md transition duration-300 hover:bg-red-800"
                >
                  Ir a comprar
                  <ArrowRightIcon className="w-4 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
