import LoginModel from "@/models/loginModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serialize } from "cookie";

export default async function LoginHandler(req, res) {
  if (req.method === "POST") {
    const { user, password, isSession } = req.body;
    const model = new LoginModel();
    const isUserValid = await model.validateUser(user, password);

    //Validate is user exists
    if (!isUserValid) {
      return res.status(401).json("El usuario o la contraseña son incorrectos");
    }

    const NODE_ENV = process.env.NODE_ENV | "development";
    dotenv.config({
      path: `.env.${NODE_ENV}`,
    });

    const token = jwt.sign(
      {
        exp: isSession
          ? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
          : Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        user: user,
        password: password,
      },
      process.env.JWT_SECRET
    );

    const serialized = serialize("tokenAuthSesion", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: isSession ? 1000 * 60 * 60 * 24 * 30 : 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("Acceso con éxito");
  } else {
    res.status(403);
  }
}
