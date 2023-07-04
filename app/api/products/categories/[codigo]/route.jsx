import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const products = await prismadb.Productos.findMany({
    where: {
      id_categoria: parseInt(codigo),
    },
    select: {
      id_producto: true,
      descripcion: true,
      nombre: true,
      codigo: true,
      precio: true,
      porcentaje_descuento: true,
      stock: true,
      is_active: true,
      portada: true,
      marca: {
        select: {
          nombre: true,
          id_marca: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
