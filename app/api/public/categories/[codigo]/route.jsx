import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const categoria = await prismadb.Categorias.findFirst({
    where: {
      codigo: codigo.toLowerCase(),
    },
    select: {
      id_categoria: true,
      nombre: true,
      codigo: true,
      imagen: true,
      is_active: true,
      Subcategorias: {
        select: {
          id_subcategoria: true,
          nombre: true,
          codigo: true,
          _count: {
            select: {
              Productos: true,
            },
          },
        },
      },
      created_at: true,
      updated_at: true,
      Productos: {
        where: {
          NOT: {
            is_active: false,
          },
        },
        select: {
          id_producto: true,
          nombre: true,
          codigo: true,
          descripcion: true,
          precio: true,
          portada: true,
          is_active: true,
          created_at: true,
          updated_at: true,
          marca: {
            select: {
              id_marca: true,
              nombre: true,
              codigo: true,
            },
          },
        },
      },
    },
  });

  if (categoria) {
    return NextResponse.json({
      type: "categoria",
      ...categoria,
    });
  }

  console.log(codigo);

  const subcategoria = await prismadb.Subcategorias.findFirst({
    where: {
      codigo: codigo.toLowerCase(),
    },
    select: {
      id_subcategoria: true,
      nombre: true,
      codigo: true,
      _count: {
        select: {
          Productos: true,
        },
      },
      categoria: {
        select: {
          id_categoria: true,
          nombre: true,
          codigo: true,
          imagen: true,
          is_active: true,
          created_at: true,
          updated_at: true,
        },
      },
      Productos: {
        select: {
          id_producto: true,
          nombre: true,
          codigo: true,
          descripcion: true,
          precio: true,
          portada: true,
          marca: {
            select: {
              id_marca: true,
              nombre: true,
              codigo: true,
            },
          },
          is_active: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  return NextResponse.json({
    type: "subcategoria",
    ...subcategoria,
  });
}
