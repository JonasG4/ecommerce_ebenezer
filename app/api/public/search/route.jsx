import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const products = await prismadb.Productos.findMany({
    where: {
      OR: [
        {
          nombre: {
            contains: request.nextUrl.searchParams.get("keyword"),
            mode: "insensitive",
          },
        },
        {
          subcategoria: {
            nombre: {
              contains: request.nextUrl.searchParams.get("keyword"),
              mode: "insensitive",
            },
          },
        },
        {
          marca: {
            nombre: {
              contains: request.nextUrl.searchParams.get("keyword"),
              mode: "insensitive",
            },
          },
        },
      ],
    },
    take: parseInt(request.nextUrl.searchParams.get("pageSize")) || undefined,
    select: {
      id_producto: true,
      nombre: true,
      codigo: true,
      precio: true,
      stock: true,
      estado: true,
      portada: true,
      marca: {
        select: {
          nombre: true,
          id_marca: true,
        },
      },
      categoria: {
        select: {
          nombre: true,
          id_categoria: true,
        },
      },
      subcategoria: {
        select: {
          nombre: true,
          id_subcategoria: true,
        },
      },
    },
  });

  const total = await prismadb.Productos.count({
    where: {
      OR: [
        {
          nombre: {
            contains: request.nextUrl.searchParams.get("keyword"),
            mode: "insensitive",
          },
        },
        {
          subcategoria: {
            nombre: {
              contains: request.nextUrl.searchParams.get("keyword"),
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });

  return NextResponse.json({
    products,
    _count: total,
  });
}
