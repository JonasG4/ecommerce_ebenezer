import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const categoria = await prismadb.productos.findFirst({
    where: {
      codigo: id,
    },
    select: {
      id_subcategoria: true,
    },
  });

  const id_subcategoria = categoria?.id_subcategoria;

  const productos = await prismadb.productos.findMany({
    where: {
      id_subcategoria: id_subcategoria,
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
