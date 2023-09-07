import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const categoriesList = await prismadb.Categorias.findMany({
    select: {
      id_categoria: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      imagen: true,
      is_active: true,
      Subcategorias: {
        select: {
          id_subcategoria: true,
          nombre: true,
          codigo: true,
        },
      },
    },
  });

  await prismadb.$disconnect();
  return NextResponse.json(categoriesList);
}
