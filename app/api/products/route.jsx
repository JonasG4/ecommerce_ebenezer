import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { converToCode } from "@/libs/transformString";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET() {
  const products = await prismadb.Productos.findMany({
    select: {
      id_producto: true,
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
      comentarios: {
        select: {
          calificacion: true,
        },
      },
    },
  });

  const calificacion = await prismadb.comentarios.groupBy({
    by: ["id_producto"],
  });

  return NextResponse.json(products);
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2006-03-01",
});

export async function POST(request) {
  const formData = await request.formData();

  const nombre = formData.get("nombre").trim();
  const descripcion = formData.get("descripcion").trim();
  const precio = formData.get("precio").trim();
  const porcentaje_descuento = formData.get("porcentaje_descuento").trim();
  const id_marca = formData.get("id_marca").trim();
  const id_categoria = formData.get("id_categoria").trim();
  const id_subcategoria = formData.get("id_subcategoria").trim();
  const stock = formData.get("stock").trim();
  const is_active = formData.get("is_active");
  const images = formData.getAll("imagenes");

  console.log(is_active)

  const errors = {
    nombre: "",
    descripcion: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    images: "",
    precio: "",
    stock: "",
    porcentaje_descuento: "",
  };

  if (!nombre) {
    errors.nombre = "El nombre es requerido";
  } else if (nombre.length > 100) {
    errors.nombre = "El nombre no puede tener más de 100 caracteres";
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

  if (isNaN(precio)) {
    errors.precio = "El precio debe ser un número";
  } else if (precio < 0) {
    errors.precio = "El precio no puede ser negativo";
  }

  if (isNaN(porcentaje_descuento)) {
    errors.porcentaje_descuento =
      "El porcentaje de descuento debe ser un número";
  } else if (porcentaje_descuento < 0 || porcentaje_descuento > 100) {
    errors.porcentaje_descuento =
      "El porcentaje de descuento debe estar entre 0 y 100";
  }

  if (isNaN(stock)) {
    errors.stock = "El stock debe ser un número";
  } else if (stock < 0) {
    errors.stock = "El stock no puede ser negativo";
  }

  if (images.length < 1) {
    errors.images = "Debe subir al menos una imagen";
  } else if (images.length > 5) {
    errors.images = "No puede subir más de 5 imágenes";
  }

  images.forEach((image) => {
    if (!image.type.startsWith("image")) {
      errors.images = "Las imágenes deben ser de tipo JPEG, JPG o PNG";
    }
  });

  if (Object.values(errors).some((error) => error !== "")) {
    return NextResponse.json(errors, { status: 400 });
  }

  const codigo = converToCode(nombre);
  const imagesNames = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageName = `productos/${uuid()}-${image.name.split(".").pop()}`;
    imagesNames.push(imageName);
  }

  try {
    await prismadb.Productos.create({
      data: {
        nombre,
        codigo,
        descripcion,
        precio: parseFloat(precio),
        porcentaje_descuento: parseFloat(porcentaje_descuento),
        stock: parseInt(stock),
        is_active: parseInt(is_active) === 1 ? true : false,
        portada: imagesNames[0],
        imagenes: {
          createMany: {
            data: imagesNames.map((imageName) => ({ imagen: imageName })),
          },
        },
        marca: {
          connect: {
            id_marca: parseInt(id_marca),
          },
        },
        categoria: {
          connect: {
            id_categoria: parseInt(id_categoria),
          },
        },
        subcategoria: {
          connect: {
            id_subcategoria: parseInt(id_subcategoria),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al crear el producto" },
      { status: 500 }
    );
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageName = imagesNames[i];

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageName,
          Body: await image.arrayBuffer(),
        })
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Error al subir las imágenes" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Producto creado" }, { status: 201 });
}
