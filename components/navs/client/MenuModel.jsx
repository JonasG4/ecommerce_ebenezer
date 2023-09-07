"use client";
import { ArrowDownIcon } from "@/components/icons/light";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MenuModel() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    await axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCloseModal = (e) => {
    if (showModal && e.target.id === "outsideModal") {
      setShowModal(false);
    }
  };

  return (
    <>
      <Bars3Icon
        className="w-8 fill-red-950 cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      <div
        id="outsideModal"
        onClick={handleCloseModal}
        className={`fixed inset-0 w-full min-h-screen max-h-screen overflow-hidden bg-black bg-opacity-60 z-[1000] transition-all duration-200 ease-in-out 
      ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`w-[350px] bg-white h-full ${
            showModal ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-red-900">
            <h1 className="font-bold text-xl text-zinc-50">Categorias</h1>
            <XMarkIcon className="w-6 h-6 fill-zinc-50 cursor-pointer" onClick={() => setShowModal(false)} />
          </div>
          <div className="transition-all duration-300 ease-in-out">
            {categories.map((categoria, index) => (
              <ItemMenu
                key={index}
                title={categoria.nombre}
                subitems={categoria.Subcategorias}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemMenu({ title, subitems }) {
  const [showSubitems, setShowSubitems] = useState(false);

  const handleShowSubitems = () => {
    setShowSubitems(!showSubitems);
  };

  return (
    <>
      <button
        type="button"
        role="button"
        className="w-full py-2 bg-gray-50 flex justify-between font-bold text-gray-800 items-center px-4 border-b border-gray-300 z-[50] hover:bg-red-100 hover:text-red-900 transition-all duration-200 ease-in-out group/item"
        onClick={handleShowSubitems}
      >
        {title}
        <ArrowDownIcon
          className={`w-3 fill-slate-900 ${
            showSubitems && "rotate-180"
          } duration-200 ease-in-out group-hover/item:fill-red-900`}
        />
      </button>
      <div className={`relative overflow-hidden bg-gray-200`}>
        <ul
          className={`bg-white transition-[height] duration-300 ease-in-out ml-4 flex flex-col ${
            !showSubitems && "max-h-0"
          }`}
        >
          {subitems.map((subitem, index) => {
            return (
              <Link
                key={index}
                href={`/categorias/${subitem?.codigo}`}
                className="w-full p-2 border-b text-gray-800 border-gray-200 hover:bg-red-100 hover:text-red-900 transition-all duration-200 ease-in-out"
              >
                {subitem?.nombre}
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
