import prismadb from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { converToCode } from "@/libs/transformString";

export async function GET(request, { params: { codigo } }) {
  const categoria = await prismadb.Categorias.findFirst({
    where: {
      codigo: codigo,
    },
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
      created_at: true,
      updated_at: true,
    },
  });

  await prismadb.$disconnect();

  return NextResponse.json(categoria);
}

export async function PUT(request, { params: { codigo } }) {
  const { nombre, oldNombre, descripcion, is_active, newSubcategorias } =
    await request.json();

  const error = {
    nombre: "",
    descripcion: "",
  };

  if (nombre.trim().toLowerCase() !== oldNombre.trim().toLowerCase()) {
    const isCategoryExist = await prismadb.Categorias.findFirst({
      where: {
        nombre: nombre.trim().toLowerCase(),
      },
    });

    if (isCategoryExist) {
      error.nombre = "La categoria ya existe";
    }
  }

  //Validacion
  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

  if (!descripcion || descripcion.trim().length < 2) {
    error.descripcion = "La descripcion es requerida";
  }

  if (error.nombre !== "" || error.descripcion !== "") {
    return NextResponse.json(error, {
      status: 422,
    });
  }

  await prismadb.Categorias.update({
    where: {
      codigo,
    },
    data: {
      nombre,
      codigo: converToCode(nombre),
      descripcion,
      is_active,
      Subcategorias: {
        deleteMany: {},
        createMany: {
          data: newSubcategorias.map((subcategoria) => ({
            nombre: subcategoria,
            codigo: converToCode(subcategoria),
            imagen: "",
            descripcion: "",
          })),
        },
      },
    },
  });

  await prismadb.$disconnect();

  return NextResponse.json(
    { message: "Categoria actualizada" },
    { status: 200 }
  );
}
