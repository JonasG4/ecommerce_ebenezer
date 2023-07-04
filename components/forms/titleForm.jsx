import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons/light";

export default function TitleForm({ title, route = "/nx-admin/" }) {
  return (
    <div className="flex flex-col bg-white rounded-t-md px-5 py-3 border-b-[1px] border-gray-300 z-50">
      <Link
        href={route}
        className="flex gap-2 items-center group/regresar rounded-md"
      >
        <ArrowLeftIcon
          className={"w-3 fill-gray-600 group-hover/regresar:fill-gray-800"}
        />
        <p className="text-xs text-slate-600 group-hover/regresar:text-slate-800">Regresar</p>
      </Link>
      <h1 className="font-extrabold  text-slate-800 uppercase">{title}</h1>
    </div>
  );
}
