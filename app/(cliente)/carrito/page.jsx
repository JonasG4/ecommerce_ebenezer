import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="mt-10 flex flex-col w-full items-center justify-center">
      <div className="w-[1400px]">
        <h1 className="text-3xl font-bold text-gray-700">Carrito</h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>

        <section className="flex gap-10 mb-6">
          <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-700">Lista de compra</h1>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3">
                    Producto
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Cantidad
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Precio
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">
                    <Image
                      src={"/images/products/NaturalSleep.jpg"}
                      width={50}
                      height={50}
                      alt="Producto"
                    />
                  </td>
                  <td class="px-6 py-4 text-bold text-gray-700">
                    Cama Indufoam Queen Natural Sleep
                  </td>
                  <td class="px-6 py-4">
                    <div class="custom-number-input h-10 w-32">
                      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          data-action="decrement"
                          class=" bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                        >
                          <span class="m-auto text-2xl font-thin text-gray-900">
                            −
                          </span>
                        </button>
                        <input
                          type="number"
                          class="outline-none text-center w-full border-gray-300 bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                          name="custom-input-number"
                          value="1"
                        ></input>
                        <button
                          data-action="increment"
                          class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                        >
                          <span class="m-auto text-2xl font-thin text-gray-900">
                            +
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">$415.00</td>
                  <td class="px-6 py-4">$415.00</td>
                  <td class="px-6 py-4 text-red-500">Eliminar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
          <div className="flex flex-col gap-4 w-[400px]">
            <h1 className="text-2xl font-bold text-gray-700">Total de compra</h1>
            <div class="relative overflow-x-auto shadow-md">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-400 rounded-md">
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      Subtotal
                    </th>
                    <td class="px-6 py-4">$415.00</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      Costo de envio
                    </th>
                    <td class="px-6 py-4">$15.00</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      Total
                    </th>
                    <td class="px-6 py-4">$430.00</td>
                  </tr>
                </tbody>
              </table>
              <button className="w-full p-2 rounded-sm bg-red-700 text-blue-50 font-medium">
                Realizar pago 
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
