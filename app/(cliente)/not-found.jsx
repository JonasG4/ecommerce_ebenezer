import { AngleDown } from "@/components/icons/regular";
import { NotFoundIcon } from "@/components/icons/shapes";
import Link from "next/link";

export async function generateMetadata(props) {
  return {
    title: `Página no encontrada`,
    description: ``,
  };
}

export default function NotFound() {
  return (
    <div className="w-[1000px] h-full flex items-center">
      <div className="w-full flex flex-col">
        <h1 className="text-[100px] text-zinc-800 font-black leading-[80px] flex gap-2">
          404
        </h1>
        <h1 className="text-[50px] text-zinc-800 font-light">
          Página no encontrada
        </h1>
        <p className="text-zinc-500">
          Parece que la página que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          className="mt-10 py-2 px-4 block w-[170px] text-red-800 rounded-md ring-1 ring-red-800 hover:text-red-700 hover:ring-red-700 hover:bg-red-50 transition-colors duration-300 ease-in-out"
          href="/"
        >
          <AngleDown className="w-3 inline-block mr-2 rotate-90 fill-red-800" />
          Regresar a inicio
        </Link>
      </div>

      <NotFoundIcon className="w-[1000px] h-[500px]" />
    </div>
  );
}
