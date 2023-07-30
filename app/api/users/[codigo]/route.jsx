import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params: { codigo } }) {
  const user = await prismadb.Usuarios.findUnique({
    where: {
      codigo,
    },
    select: {
      role: {
        select: {
          nombre: true,
          id_rol: true,
        },
      },
      id_usuario: true,
      nombre: true,
      apellido: true,
      telefono: true,
      email: true,
      imagen: true,
      is_active: true,
      codigo: true,
    },
  });

  if (!user) {
    return NextResponse.json("Usuario no encontrado", {status: 404});
  }

  return NextResponse.json(user);
}

export async function PUT(request, { params: { codigo } }) {
  const user = await prismadb.Usuarios.findUnique({
    where: {
      codigo,
    },
  });

  if (!user) {
    return NextResponse.error(404, "Usuario no encontrado");
  }

  const { nombre, apellido, telefono, email, oldEmail, is_active, id_rol } =
    await request.json();

  const error = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  };

  //Validar que el correo no esté repetido
  if (oldEmail !== email) {
    if (await model.isEmailExist(email)) {
      error.email = "Este correo ya esta registrado";
    }
  }

  if (!nombre || nombre.trim().length < 2) {
    error.nombre = "El nombre es requerido";
  }

  if (!apellido || apellido.trim().length < 2) {
    error.apellido = "El apellido es requerido";
  }

  if (!telefono || telefono.trim().length < 8) {
    error.telefono = "El telefono es requerido";
  }

  if (
    error.nombre !== "" ||
    error.apellido !== "" ||
    error.telefono !== "" ||
    error.email !== ""
  ) {
    return NextResponse.json(
      {
        typeError: "validation",
        messages: error,
      },
      { status: 422 }
    );
  }

  try {
    await prismadb.Usuarios.update({
      where: {
        codigo,
      },
      data: {
        nombre,
        apellido,
        telefono,
        email,
        is_active,
        role: {
          connect: {
            id_rol: parseInt(id_rol),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(500, "Error al actualizar el usuario");
  }

  return NextResponse.json("ok", { status: 200 });
}
