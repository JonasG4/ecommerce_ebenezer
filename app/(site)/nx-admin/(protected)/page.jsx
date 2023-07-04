import React from "react";
import {
  DollarSign,
  BagShoppingIcon,
  CarShoppingIcon,
  ElipsisIcon,
} from "@/components/icons/regular";
import BarCharData from "@/components/charts/BarChart";
import PieChartData from "@/components/charts/PieChart";

export default function HomePage() {
  return (
    <div className="p-7 w-full h-full ring-1 ring-gray-300 shadow-md bg-opacity-50 rounded-md flex flex-col gap-4 overflow-auto scroll scrollbar-thumb-indigo-400 scrollbar-track-slate-200 scrollbar-thin scrollbar-corner-current">
      <div>
        <h1 className="text-2xl font-black text-gray-700 uppercase">Dashboard</h1>
      </div>
      <section className="w-full flex md:gap-4 movile:flex-wrap sm:gap-5 lg:flex-nowrap lg:gap-10">
        {/* TOTAL DE VENTAS */}
        <div className="h-[110px] w-full bg-gray-50 rounded-md shadow-md p-4 flex items-center gap-4 flex-wrap ring-1 ring-gray-300">
          <div className="w-16 h-16 rounded-full bg-orange-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 fill-gray-50 text-gray-50" />
            </div>
          </div>
          <div className="">
            <h4 className="text-sm text-gray-500 ">Total de Ventas</h4>
            <p className="md:text-2xl movile:text-xl font-bold text-gray-700">$200,000.00</p>
          </div>
        </div>
        {/* TOTAL DE PEDIDOS */}
        <div className="h-[110px] w-full bg-gray-50 rounded-md shadow-md p-4 flex items-center gap-4 flex-wrap ring-1 ring-gray-300">
          <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CarShoppingIcon className="w-5 h-5 fill-gray-50 text-gray-50" />
            </div>
          </div>
          <div className="">
            <h4 className="text-sm text-gray-500">Total de Pedidos</h4>
            <p className="md:text-2xl movile:text-xl font-bold text-gray-700">180</p>
          </div>
        </div>
        {/* TOTAL DE PRODUCTOS */}
        <div className="h-[110px] w-full bg-gray-50 rounded-md shadow-md p-4 flex items-center gap-4 flex-wrap ring-1 ring-gray-300">
          <div className="w-16 h-16 rounded-full bg-sky-300 flex items-center justify-center">
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
              <BagShoppingIcon className="w-5 h-5 fill-gray-50 text-gray-50" />
            </div>
          </div>
          <div className="">
            <h4 className="text-sm text-gray-500 ">Total de productos</h4>
            <p className="md:text-2xl movile:text-xl font-bold text-gray-700">320</p>
          </div>
        </div>
      </section>

      {/* GRAFICA DE PEDIDOS */}
      <section className="flex gap-5 w-full movile:flex-wrap lg:flex-nowrap">
        <div className="overflow-x-auto w-full h-[330px] rounded-md p-5 shadow-lg bg-gray-50 flex flex-col justify-center ring-1 ring-gray-300">
          <h4 className="text-xl font-medium text-gray-700 mb-auto">
            Estadistica de venta
          </h4>
          <BarCharData />
        </div>
        <PieChartData />
      </section>
      {/* TABLA DE ULTIMOS PEDIDOS */}
      <section className="w-full bg-gray-50 rounded-md shadow-lg p-5 flex flex-col gap-4 ring-1 ring-gray-300">
        <h4 className="text-xl font-medium text-gray-700">
          Últimos pedidos
        </h4>
        <section className="overflow-auto relative scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full">
          <table className="w-full text-sm text-gray-500 text-left">
            <tbody className="">
              <tr className="hover:bg-gray-100 border-b border-gray-200 whitespace-nowrap">
                <td className="text-gray-500 py-4 px-6">120</td>
                <td className="py-4 px-6 font-medium text-gray-800">
                  Jonas Garcia
                </td>
                <td className="text-gray-500 py-4 px-6">
                  garciajonas99@gmail.com
                </td>
                <td className="text-gray-500 py-4 px-6">$500.00</td>
                <td className="text-gray-500 py-4 px-6">Enviada</td>
                <td className="text-gray-500 py-4 px-6">09-11-2022</td>
                <td className=" py-4 px-6">
                  <ElipsisIcon className="w-5 fill-gray-500 cursor-pointer" />
                </td>
              </tr>
              <tr className="hover:bg-gray-100 border-b border-gray-200">
                <td className="text-gray-500 py-4 px-6">120</td>
                <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap">
                  Jonas Garcia
                </td>
                <td className="text-gray-500 py-4 px-6">
                  garciajonas99@gmail.com
                </td>
                <td className="text-gray-500 py-4 px-6">$500.00</td>
                <td className="text-gray-500 py-4 px-6">Enviada</td>
                <td className="text-gray-500 py-4 px-6">09-11-2022</td>
                <td className="py-4 px-6">
                  <ElipsisIcon className="w-5 fill-gray-500 cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      
    </div>
  );
}
