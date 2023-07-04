import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  MapIcon,
  MessageIcon,
  PhoneIcon,
  WhatsappIcon,
} from "@/components/icons/regular";
export default function Footer() {
  return (
    <footer className="mt-auto w-full flex justify-center flex-col z-10">
      <div className="w-full bg-red-800 flex flex-col py-5 gap-10 justify-between px-[50px] lg:px-[90px] xl:px-[100px] 2xl:px-[200px] ">
        <section className="w-full grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 lg:grid-cols-[150px_1fr_1fr] xl:grid-cols-[150px_1fr_250px_300px] xl:gap-8 ">
          <div className="flex flex-col">
            <h1 className="uppercase text-red-200 font-bold text-lg w-[50px] mb-6">
              Navegar
            </h1>
            <div className="flex flex-col gap-3 text-red-200">
              <Link href="#inicio" className="hover:underline">
                Inicio
              </Link>
              <Link href="/productos" className="hover:underline">
                Productos
              </Link>
              <Link href="#nosotros" className="hover:underline">
                Nosotros
              </Link>
              <Link href="#contacto" className="hover:underline">
                Contacto
              </Link>
            </div>
          </div>

          <div className="flex flex-col mx-auto md:mx-0">
            <h1 className="uppercase text-red-200 font-bold text-lg mb-5">
              Historia
            </h1>
            <div className="text-red-200 text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              quaerat hic harum quae iusto? Eligendi, minima. Vero laboriosam
              error rem quam, commodi, temporibus officia dicta saepe cupiditate
              nesciunt architecto repellat!
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="uppercase text-red-200 font-bold text-lg mb-5">
              Contacto
            </h1>
            <div className="flex flex-col gap-3 text-red-200">
              <div className="flex gap-4">
                <MessageIcon width={20} className="fill-red-200 text-red-400" />
                <p className="text-red-200">comercialeben-ezer@gmail.com</p>
              </div>
              <div className="flex gap-4">
                <MapIcon width={20} className="fill-red-200 text-red-400" />
                <p className="text-red-200">
                  4ta calle oriente y 7ave norte, Casa 402
                </p>
              </div>
              <div className="flex gap-4">
                <PhoneIcon width={20} className="fill-red-200 text-red-400" />
                <p className="text-red-200">(+503) 7730-4543 </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-3 xl:col-span-1">
            <h1 className="uppercase text-red-200 font-bold text-lg mb-5">
              Redes sociales
            </h1>
            <p className="text-red-200">
              Siguenos en nuestras redes sociales para ver las ultimas
              actualizaciones
            </p>
            <div className="flex items-center gap-8 mt-5 text-red-200">
              <Link href="https://www.facebook.com/ComercialEbenEzerCM">
                <FacebookIcon width={15} className="fill-red-200" />
              </Link>
              <Link href="/">
                <InstagramIcon width={25} className="fill-red-200" />
              </Link>
              <Link href="https://wa.me/77304543">
                <WhatsappIcon width={25} className="fill-red-200" />
              </Link>
            </div>
          </div>
        </section>
        <div className="w-full h-[2px] bg-red-300"></div>
        <p className="text-red-200 text-center text-sm">
          Copyright © 2023 Comercial Eben-Ezer - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
