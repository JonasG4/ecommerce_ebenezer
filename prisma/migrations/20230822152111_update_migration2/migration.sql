-- DropForeignKey
ALTER TABLE "Producto_imagenes" DROP CONSTRAINT "Producto_imagenes_id_producto_fkey";

-- AddForeignKey
ALTER TABLE "Producto_imagenes" ADD CONSTRAINT "Producto_imagenes_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Productos"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;
