import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoggleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

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
          },
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

        if (user.role.nombre !== "ADMIN") {
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
          },
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
    }),
    GoggleProvider({
      id: "google-login",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: true,
        },
      },
      profile: (profile) => {
        return {
          id: profile.sub,
          nombre: profile.given_name,
          apellido: profile.family_name,
          email: profile.email,
          imagen: profile.picture,
        };
      },
    }),
    FacebookProvider({
      id: "facebook-login",
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: {
        params: {
          auth_type: "reauthenticate",
          prompt: "consent",
        },
      },
      profile: (profile) => {
        return {
          id: profile.id,
          nombre: profile.name,
          apellido: profile.family_name,
          email: profile.email,
          imagen: profile.picture.data.url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.apellido = user.apellido;
        token.role = user.role;
        token.email = user.email;
        token.imagen = user.imagen;
      }
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = {
        id: token.id,
        role: token.role,
        email: token.email,
        imagen: token.imagen,
        nombre: token.nombre,
        apellido: token.apellido,
      };
      return session;
    },

    async signIn({ account, profile }) {
      if (account.provider === "facebook") {
        const userExist = await prisma.Usuarios.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!userExist) {
          await prisma.Usuarios.create({
            data: {
              nombre: user.nombre,
              apellido: user.apellido,
              email: user.email,
              imagen: user.imagen,
              role: {
                connect: {
                  nombre: "CLIENTE",
                },
              },
              account_provider: account.provider,
            },
          });
        }
      } else if (account.provider === "google-login") {
        const userExist = await prisma.Usuarios.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!userExist) {
          await prisma.Usuarios.create({
            data: {
              nombre: profile.given_name,
              apellido: profile.family_name,
              codigo: uuid(),
              email: profile.email,
              imagen: profile.picture,
              role: {
                connect: {
                  nombre: "CLIENTE",
                },
              },
              account_provider: "GOOGLE",
            },
          });
        }
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/nx-admin/auth/login",
  },
};

const handler = NextAuth(authOptions);
export default handler;
