import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request) {

}

export async function POST(request) {
    const body = await request.json();

    try {
        const comentario = await prismadb.Comentarios.create({
            data: {
                id_producto: body.id_producto,
                id_usuario: body.id_usuario,
                comentario: body.comentario,
                calificacion: body.calificacion,
            }
        });
        return NextResponse.json(comentario, {status: 201})
    } catch (error) {
        return NextResponse.json({ msg: "No se pudo crear el comentario" }, { status: 500 })
    }
}