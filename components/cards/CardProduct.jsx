import Image from "next/image";
import Link from "next/link";
import ButtonAddCar from "@/components/buttons/ButtonAddCar";
import { calcularPorcentaje } from "@/libs/transformString";


export default function CardProduct({product}) {
  return (
    <Link
      href={`/producto/${product.codigo}`}
      className="relative w-[320px] h-[180px] bg-gray-50 rounded-sm p-2 ring-1 ring-gray-300 shadow-md flex gap-2 duration-100 ease-out hover:ring-red-300"
    >
      <Image
        src={`${process.env.AWS_BUCKET_URL}${product.portada}`}
        className="max-w-[125px] h-full rounded-md object-contain"
        width={125}
        height={180}
        quality={100}
        alt={product.nombre}
      />
      {product.porcentaje_descuento > 0 && (
        <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-sm rounded-tl-sm">
          {product.porcentaje_descuento}%
        </span>
      )}
      <div className="p-2 w-full flex flex-col  justify-between">
        <div>
          <h2 className="text-sm font-black text-gray-800 uppercase">
            {product.marca.nombre}
          </h2>
          <h3 className="text-sm font-bold text-gray-500 line-clamp-2">
            {product.nombre}
          </h3>
        </div>
        <div
          className={`flex gap-4 items-center justify-start ${
            product.porcentaje_descuento > 0 && "flex-row-reverse justify-end"
          }`}
        >
          <h1 className="font-black text-gray-800 flex flex-col">
            <span className="text-xs font-normal">Precio normal</span>
            <span
              className={`leading-5 ${
                product.porcentaje_descuento
                  ? "font-normal text-gray-500 line-through text-sm "
                  : "font-bold text-2xl"
              }`}
            >
              ${product.precio.toString().split(".")[0]}
              <span className="text-xs">
                {"."}
                {product.precio.toString().split(".")[1] || "00"}
              </span>
            </span>
          </h1>
          {product.porcentaje_descuento > 0 && (
            <h1 className="font-black text-red-700 flex flex-col">
              <span className="font-normal text-xs">Precio especial</span>
              <span className="text-2xl font-bold leading-5 text-red-800">
                $
                {
                  calcularPorcentaje(
                    product.precio,
                    product.porcentaje_descuento
                  ).split(".")[0]
                }
                <span className="text-xs">
                  {"."}{" "}
                  {
                    calcularPorcentaje(
                      product.precio,
                      product.porcentaje_descuento
                    ).split(".")[1]
                  }
                </span>
              </span>
            </h1>
          )}
        </div>
        <div className="flex gap-2">
          <ButtonAddCar product={product} />          
        </div>
      </div>
    </Link>
  );
}
