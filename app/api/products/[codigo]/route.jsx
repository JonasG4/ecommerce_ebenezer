import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const categoria = await prismadb.productos.findFirst({
    where: {
      codigo,
    },
    select: {
      id_categoria: true,
      id_subcategoria: true,
      id_marca: true,
      nombre: true,
      codigo: true,
      descripcion: true,
      portada: true,
      is_active: true,
      precio: true,
      porcentaje_descuento: true,
      stock: true,
      created_at: true,
      updated_at: true,
      subcategoria: {
        select: {
          id_subcategoria: true,
          nombre: true,
        },
      },
      categoria: {
        select: {
          id_categoria: true,
          nombre: true,
        },
      },
      marca: {
        select: {
          id_marca: true,
          nombre: true,
        },
      },
      imagenes: {
        select: {
          id_producto_imagen: true,
          imagen: true,
        },
      },
    },
  });

  return NextResponse.json(categoria, { status: 200 });
}

export async function PUT(request, { params: { codigo } }) {
  const {
    nombre,
    descripcion,
    precio,
    porcentaje_descuento,
    id_categoria,
    id_subcategoria,
    id_marca,
    stock,
    is_active,
  } = await request.json();

  const errors = {
    nombre: "",
    descripcion: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
  };

  if (!nombre) {
    errors.nombre = "El nombre es requerido";
  }

  if (!descripcion) {
    errors.descripcion = "La descripción es requerida";
  }

  if (!id_categoria) {
    errors.id_categoria = "La categoría es requerida";
  }

  if (!id_subcategoria) {
    errors.id_subcategoria = "La subcategoría es requerida";
  }

  if (!id_marca) {
    errors.id_marca = "La marca es requerida";
  }


  if (Object.values(errors).some((error) => error !== "")) {
    return NextResponse.json(errors, { status: 400 });
  }

  try {
    const producto = await prismadb.productos.update({
      where: {
        codigo,
      },
      data: {
        nombre,
        descripcion,
        precio,
        porcentaje_descuento,
        categoria: {
            connect: {
                id_categoria: parseInt(id_categoria)
                },
            },
        subcategoria: {
            connect: {
                id_subcategoria: parseInt(id_subcategoria)
                },
            },
        marca: {
            connect: {
                id_marca: parseInt(id_marca)
                },
            },
        stock,
        is_active: parseInt(is_active) === 1 ? true : false,
      },
    });

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
