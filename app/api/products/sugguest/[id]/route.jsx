import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const categoria = await prismadb.productos.findFirst({
    where: {
      codigo: id,
    },
    select: {
      id_categoria: true,
    },
  });

  const id_categoria = categoria?.id_categoria;

  const productos = await prismadb.productos.findMany({
    where: {
      id_categoria: id_categoria,
    },
    take: 5,
    select: {
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
