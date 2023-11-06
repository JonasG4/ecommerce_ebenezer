"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart, increment, decrement } from "@/redux/cart";
import Link from "next/link";
import { CarShoppingIcon } from "@/components/icons/regular";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function CartPage() {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    await axios.post("https://id.wompi.sv/connect/token", {
      grant_type: "client_credentials",
      client_id: "accb292f-3bb1-4fc1-887a-8cfa96902cc6",
      client_secret: "dc05375d-b0c8-4775-9282-f3ae520d620",
      audience: "accb292f-3bb1-4fc1-887a-8cfa96902cc6",
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };
  return (
    <div className="mt-10 flex flex-col w-full items-center justify-center">
      <div className="w-[1400px]">
        <h1 className="text-3xl font-black text-gray-700">Carrito</h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>

        {
          // Si no hay items en el carrito
          items.length > 0 ? (
            <section className="flex gap-10 mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-700">
                    Tu lista de compras
                  </h1>
                  <p className="text-sm">
                    Total de articulos:{" "}
                    <span className="font-bold">
                      {items.reduce((acc, item) => acc + item.cantidad, 0)}{" "}
                    </span>{" "}
                  </p>
                </div>
                <div className="relative overflow-x-auto ring-1 ring-gray-300 rounded-md">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">
                          Producto
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Subtotal
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4">
                            <Image
                              src={`${process.env.AWS_BUCKET_URL}${item.portada}`}
                              width={50}
                              height={50}
                              alt="Producto"
                            />
                          </td>
                          <td className="px-6 py-4 text-bold text-gray-700">
                            {item.nombre}
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-28 h-10">
                              <div className="flex flex-row h-5 rounded-lg relative bg-transparent mt-1">
                                <button
                                  type="button"
                                  dataAction="decrement"
                                  className=" bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                  onClick={() =>
                                    dispatch(decrement(item.id_producto))
                                  }
                                >
                                  <span className="m-auto text-sm  font-thin text-gray-900">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  className="outline-none text-center text-sm w-full border-gray-300 bg-gray-100 font-semibold hover:text-black focus:text-black  flex items-center text-gray-700"
                                  name="custom-input-number"
                                  value={item.cantidad}
                                />
                                <button
                                  type="button"
                                  dataAction="increment"
                                  className="bg-gray-300 text-gray-600  hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                  onClick={() =>
                                    dispatch(increment(item.id_producto))
                                  }
                                >
                                  <span className="m-auto text-sm font-thin text-gray-900">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            ${item.precio}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            ${item.precio * item.cantidad}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                dispatch(removeFromCart(item.id_producto))
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TOTAL DE COMPRAS */}
              <div className="flex flex-col gap-4 w-[400px] ">
                <h1 className="text-2xl font-bold text-gray-700">Resumen</h1>
                <div className="relative overflow-x-auto shadow-md ring-1 ring-gray-300 rounded-md">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-400 rounded-md">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Subtotal
                        </th>
                        <td className="px-6 py-4">
                          $
                          {items.reduce(
                            (acc, item) => acc + item.precio * item.cantidad,
                            0
                          ) || 0}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Costo de envio
                        </th>
                        <td className="px-6 py-4">GRATIS</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 text-lg font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                        >
                          Total del pedido
                        </th>
                        <td className="px-6 py-4 text-lg font-normal text-gray-800">
                          $
                          {items.reduce(
                            (acc, item) => acc + item.precio * item.cantidad,
                            0
                          ) || 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full p-2 rounded-b-md bg-red-900 hover:bg-red-700 text-blue-50 font-medium flex items-center justify-center gap-4"
                  >
                    Realizar pago
                    <LockClosedIcon className="w-5 fill-white" />
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center justify-center text-2xl my-2">
                No hay items en el carrito
              </div>
              <Link
                href={"/"}
                className="flex items-center justify-center gap-2 bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                <p className="text-sm font-semibold">Ir a comprar</p>
                <CarShoppingIcon className="w-5 fill-white" />
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
}
