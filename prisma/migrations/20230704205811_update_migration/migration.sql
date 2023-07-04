-- CreateTable
CREATE TABLE "Roles" (
    "id_rol" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imagen" TEXT NOT NULL DEFAULT '',
    "is_google" BOOLEAN NOT NULL DEFAULT false,
    "is_facebook" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Subcategorias" (
    "id_subcategoria" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcategorias_pkey" PRIMARY KEY ("id_subcategoria")
);

-- CreateTable
CREATE TABLE "Marcas" (
    "id_marca" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marcas_pkey" PRIMARY KEY ("id_marca")
);

-- CreateTable
CREATE TABLE "Productos" (
    "id_producto" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_subcategoria" INTEGER NOT NULL,
    "id_marca" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "portada" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "porcentaje_descuento" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "id_comentario" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "comentario" TEXT,
    "calificacion" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateTable
CREATE TABLE "Comentarios_Likes" (
    "id_comentario_like" SERIAL NOT NULL,
    "id_comentario" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentarios_Likes_pkey" PRIMARY KEY ("id_comentario_like")
);

-- CreateTable
CREATE TABLE "Producto_imagenes" (
    "id_producto_imagen" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producto_imagenes_pkey" PRIMARY KEY ("id_producto_imagen")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_codigo_key" ON "Usuarios"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categorias_codigo_key" ON "Categorias"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Marcas_codigo_key" ON "Marcas"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Productos_codigo_key" ON "Productos"("codigo");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Roles"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategorias" ADD CONSTRAINT "Subcategorias_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "Marcas"("id_marca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_id_subcategoria_fkey" FOREIGN KEY ("id_subcategoria") REFERENCES "Subcategorias"("id_subcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_Likes" ADD CONSTRAINT "Comentarios_Likes_id_comentario_fkey" FOREIGN KEY ("id_comentario") REFERENCES "Comentarios"("id_comentario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_Likes" ADD CONSTRAINT "Comentarios_Likes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto_imagenes" ADD CONSTRAINT "Producto_imagenes_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
