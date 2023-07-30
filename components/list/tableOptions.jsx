import {
  CiruclePlusIcon,
  ArrowsRotateIcon,
  CloudArrowDownIcon,
} from "@/components/icons/regular";
import SearchInput from "@/components/list/searchInput";
import Link from "next/link";

export default function TableOptions({ table, dataBU, setData, getData }) {
  return (
    <div className="flex items-center justify-between mb-4 gap-4">
      <SearchInput
        data={dataBU}
        setData={setData}
        placeholder={`Buscar ${table}...`}
      />
      <div className="flex items-center gap-2">
        <Link
          className="py-2 px-3 ring-1 shadow-md ring-indigo-600 rounded-md flex bg-indigo-600 text-gray-50 text-xs hover:bg-indigo-700 hover:text-gray-50 duration-200"
          href={`/nx-admin/${table}/create`}
        >
          <CiruclePlusIcon
            className={"w-3 md:mr-2 fill-gray-50 text-indigo-600"}
          />
          <p className="hidden md:inline-block whitespace-nowrap">
            {`Agregar ${table.slice(0, -1)}`}
          </p>
        </Link>
        <button
          type="button"
          className="bg-white shadow-md py-[8px] w-12 rounded-md ring-1 ring-gray-400 flex items-center justify-center hover:ring-indigo-400 group/peer"
          onClick={getData}
        >
          <ArrowsRotateIcon className="w-4 fill-gray-600 text-gray-600 group-hover/peer:fill-indigo-600 group-hover/peer:text-indigo-600 group-active/peer:rotate-[360deg] duration-300 ease-in-out" />
        </button>
        <button
          className="py-2 px-3 ring-1 shadow-md ring-gray-400 rounded-md hover:ring-indigo-500 bg-white text-xs duration-200 flex items-center gap-2 group/exportar"
          href={"/clientes/create"}
        >
          <CloudArrowDownIcon
            className={
              "w-4 fill-gray-500 text-gray-50 group-hover/exportar:fill-indigo-500"
            }
          />
          <p className="text-gray-600 group-hover/exportar:text-indigo-500">
            Expotar
          </p>
        </button>
      </div>
    </div>
  );
}
