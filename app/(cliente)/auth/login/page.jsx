"use client";
import { FacebookIcon } from "@/components/icons/regular";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/auth/mi-cuenta");
  };

  return (
    <div className="flex items-center justify-center my-8">
      <div className="w-[600px] p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700 uppercase">
          Iniciar sesión
        </h1>
        <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="" className="text-gray-700 font-medium">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-[350px] p-2 rounded-md border-none ring-1 ring-gray-400 bg-gray-50 text-center"
                placeholder="minombre@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="" className="text-gray-700 font-medium">
                Contraseña
              </label>
              <input
                type="password"
                className="w-[350px] p-2 rounded-md border-none ring-1 ring-gray-400 bg-gray-50 text-center"
                placeholder="Tuclavesecreta123"
              />
              <p>¿Olvidaste tu contraseña?</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-[350px] p-2 rounded-md ring-1 ring-gray-400 bg-red-700 text-center text-red-50 font-medium  transition duration-300 ease-in-out"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="w-[200px] h-[2px] bg-red-300 my-6"></div>
        <span className="font-light text-lg">o ingresa con</span>
        <button
          type="button"
          className="flex gap-4 items-center justify-center mt-4 w-[350px] p-2 rounded-md ring-1 ring-gray-400 bg-gray-50 text-center text-gray-700 font-medium transition duration-300 ease-in-out"
          onClick={() => signIn("google-login", { callbackUrl: "/" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
            viewBox="0 0 186.69 190.5"
          >
            <g transform="translate(1184.583 765.171)">
              <path
                clipPath="none"
                mask="none"
                d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                fill="#4285f4"
              />
              <path
                clipPath="none"
                mask="none"
                d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                fill="#34a853"
              />
              <path
                clipPath="none"
                mask="none"
                d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                fill="#fbbc05"
              />
              <path
                d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                fill="#ea4335"
                clipPathh="none"
                mask="none"
              />
            </g>
          </svg>
          <p>Iniciar sesión con Google</p>
        </button>
        <button
          className="mt-4 flex items-center justify-center gap-4 w-[350px] p-2 rounded-md ring-1 ring-blue-400 bg-blue-600 text-center text-gray-50 font-medium transition duration-300 ease-in-out"
          onClick={() => signIn("facebook-login")}
        >
          <FacebookIcon className="w-3 fill-white " />
          <span>Iniciar sesión con Facebook</span>
        </button>
        <p className="mt-4 text-gray-700">
          ¿No tienes cuenta?{" "}
          <Link className="text-blue-500 underline" href="/auth/signup">
            Ingresa aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
