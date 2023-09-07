import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const productos = await prismadb.productos.findMany({
    where: {
      porcentaje_descuento: {
        gt: 0,
      },
    },
    take: 5,
    select: {
      id_producto: true,
      id_categoria: true,
      id_marca: true,
      nombre: true,
      codigo: true,
      portada: true,
      is_active: true,
      precio: true,
      porcentaje_descuento: true,
      stock: true,
      categoria: {
        select: {
          id_categoria: true,
          codigo: true,
          nombre: true,
        },
      },
      marca: {
        select: {
          id_marca: true,
          nombre: true,
        },
      },
    },
  });

  return NextResponse.json(productos, { status: 200 });
}
