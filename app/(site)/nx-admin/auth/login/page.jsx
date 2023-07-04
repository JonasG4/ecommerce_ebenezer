"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import logo from "@/public/images/logo.jpg";

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isSession: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBtnLoading, setBtnLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const data = await signIn("admin-login", {
        redirect: false,
        email: credentials.email,
        password: credentials.password
      });

      if (data.error) {
        setErrorCredentials(true);
        setErrorMessage(data.error);
      }

      if (data.ok) {
        setErrorCredentials(false);
        router.push("/nx-admin/");
      }

      setBtnLoading(false);
    } catch (error) {
      setErrorCredentials(true);
      setErrorMessage(error.response.data);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="w-full bg-slate-100 p-5 min-h-[100vh] font-sans flex flex-col gap-6 items-center justify-center">
      <div className="w-[400px] mx-auto bg-slate-50 ring-1 ring-slate-300 rounded-md p-6 shadow-lg">
        <div>
          <Image
            alt="Logo de comercial Eben Ezer"
            src={"/images/logo.jpg"}
            placeholder="blur"
            width={200}
            height={200}
            priority
            className="mx-auto"
          />
          <h1 className="mt-6 text-center text-2xl font-black tracking-tight text-slate-800">
            Iniciar sesión
          </h1>
          <div className="w-[100px] h-[1px] bg-gray-300 mx-auto my-4"></div>
          <p className="text-center text-sm text-gray-500">
            Debes autenticarte con correo y contraseña para tener acceso a la
            sistema de administración
          </p>
        </div>
        <div
          className={`p-2 ring-1 ring-red-500 text-sm rounded-md mt-6 flex gap-2 items-center bg-red-50 transition duration-150 ease-in-out ${
            errorCredentials ? "" : "hidden"
          }`}
        >
          <XCircleIcon className="w-6 mx-2 text-red-600" />
          <p className="text-red-600">{errorMessage}</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="relative block w-full appearance-none rounded-none rounded-t-md ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-700 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="relative block w-full appearance-none rounded-none rounded-b-md ring-1 ring-slate-300 border-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-slate-500 sm:text-sm"
                placeholder="Contraseña"
              />
              {passwordShown ? (
                <EyeIcon
                  className="w-5 h-5 text-slate-800 absolute top-[10px] right-5 cursor-pointer z-50"
                  onClick={togglePassword}
                />
              ) : (
                <EyeSlashIcon
                  className="w-5 h-5 text-slate-800 absolute top-[10px] right-5 cursor-pointer z-50"
                  onClick={togglePassword}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-150 ease-in-out"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {isBtnLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-gray-200 animate-spin fill-white"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
              ) : (
                <LockClosedIcon
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              )}
            </span>
            {isBtnLoading ? <p>Autenticando...</p> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
