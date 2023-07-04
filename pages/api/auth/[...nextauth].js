import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoggleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapters: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "admin-login",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.Usuarios.findUnique({
          where: {
            email,
          },
          select: {
            codigo: true,
            nombre: true,
            apellido: true,
            email: true,
            password: true,
            imagen: true,
            role: {
              select: {
                nombre: true,
              },
            },
            is_active: true,
          }
        });

        if (!user) {
          throw new Error("No existe ningún usuario con ese correo");
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("El usuario o la contraseña son incorrectos");
        }

        if (!user.is_active) {
          throw new Error(
            "Este usuario fue desactivado. Si crees que es un error, contacta con el administrador"
          );
        }

        if(user.role.nombre !== "ADMIN") {
          throw new Error("No tienes permisos para acceder a este sistema");
        }
        
        await prisma.$disconnect();

        return {
          codigo: user.codigo,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          role: user.role.nombre,
          imagen: user.imagen,
        };
      },
    }),
    CredentialsProvider({
      id: "client-login",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.Usuarios.findUnique({
          where: {
            email,
          },
          select: {
            codigo: true,
            nombre: true,
            apellido: true,
            email: true,
            password: true,
            imagen: true,
            role: {
              select: {
                nombre: true,
              },
            },
            is_active: true,
          }
        });

        if (!user) {
          throw new Error("No existe ningún usuario con ese correo");
        }
        const isPasswordMatch = bcrypt.compareSync(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("El usuario o la contraseña son incorrectos");
        }

        if (!user.is_active) {
          throw new Error(
            "Este usuario fue desactivado. Si crees que es un error, contacta con el administrador"
          );
        }

        await prisma.$disconnect();

        return {
          codigo: user.codigo,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          role: user.role.nombre,
          imagen: user.imagen,
        };
      },
    })
  ],
  callbacks: {
    async jwt ({ token, user}) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.apellido = user.apellido;
        token.role = user.role;
        token.email = user.email;
        token.imagen = user.imagen;
      }
      return {...token, ...user};
    },

    async session ({ session, token, user }) {
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email,
        imagen: token.imagen,
        nombre: token.nombre,
        apellido: token.apellido,
      };
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/nx-admin/auth/login",
  },
};

const handler = NextAuth(authOptions);
export default handler;
