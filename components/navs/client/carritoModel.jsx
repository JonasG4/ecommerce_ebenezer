"use client";
import { useState, useRef, useEffect } from "react";
import { CarShoppingIcon, TrashCanIcon } from "@/components/icons/regular";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/cart";
import Image from "next/image";
import Link from "next/link";

export default function CarritoModal() {
  const [showModal, setShowModal] = useState(false);
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className="relative flex justify-center">
      <button
        className="relative cursor-pointer flex items-center justify-center gap-2 group/car"
        href={"/carrito"}
        onClick={() => setShowModal(!showModal)}
      >
        <div className="relative">
          <CarShoppingIcon className="w-5 fill-red-900 text-red-900" />
          {items.length > 0 && (
            <div className="absolute -top-2 -right-1 text-xs font-light text-white w-[16px] h-[16px] bg-yellow-600 shadow-md rounded-full flex items-center justify-center leading-none">
              {items.length}
            </div>
          )}
        </div>
        <p
          className="font-semibold text-sm text-gray-800 leading-4 transition duration-300 group-hover/car:text-red-900"
        >
          Carrito
        </p>
      </button>
      {showModal && (
        <div
          ref={modalRef}
          className="absolute w-[330px] min-h-[100px] shadow-md rounded-md bg-gray-50 ring-1 ring-red-900 p-4 z-[1000] top-10 after:content-[''] flex flex-col justify-center items-center
        after:absolute after:w-[10px] after:h-[10px] after:bg-red-50 after:rotate-45 after:top-[-5px] after:right-0 after:left-0 after:mx-auto after:ring-1 after:ring-yellow-600 after:shadow-md 
        "
        >
          {items.length > 0 ? (
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center w-full pb-4 border-b border-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                      alt={item.nombre}
                      width={40}
                      height={40}
                      className="rounded-md object-contain"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.nombre}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-800 leading-4 font-semibold">
                          Cantidad:{" "}
                          <span className="font-light">{item.cantidad}</span>
                        </p>
                        <p className="text-sm text-red-800">
                          ${item.precio?.toString().split(".")[0]}.
                          <span className="text-xs">
                            {item.precio?.toString().split(".")[1] || "00"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-xs text-gray-800 leading-4 cursor-pointer transition duration-300 hover:text-red-900 group/carremove"
                        onClick={() => removeItemHandler(item.id_producto)}
                      >
                        <TrashCanIcon className="w-4 fill-red-900 text-red-900 group-hover/carremove:hover:fill-red-700 group-hover/carremove:hover:text-red-700 " />
                      </button>
                    </div>
                  </div>
                  <span>{items.precio}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-gray-500">
                    <span className="font-bold">
                      {items.reduce((acc, item) => acc + item.cantidad, 0)}{" "}
                    </span>
                    articulos totales
                  </h4>
                </div>
                <div>
                  <h4 className="text-sm font-gray-500">Subtotal</h4>
                  <p className="text-gray-800 font-bold text-xl">
                    $
                    {items.reduce(
                      (acc, item) => acc + item.precio * item.cantidad,
                      0
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <Link
                  href="/carrito"
                  className="text-sm uppercase text-white bg-red-900 leading-4 w-full py-2 flex items-center justify-center rounded-md transition duration-300 hover:bg-red-800"
                >
                  Ver carrito
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-800 leading-4">
              El carrito esta vacio
            </p>
          )}
        </div>
      )}
    </div>
  );
}
