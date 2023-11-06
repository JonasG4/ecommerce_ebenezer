"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CarShoppingIcon,
  HeartIcon,
  TrunkFastIcon,
  MoneyBillIcon,
  BankIcon,
  StarHalfIcon,
} from "@/components/icons/regular";
import { AngleDownIcon, ClockIcon, ShareIcon } from "@/components/icons/light";
import axios from "axios";
import parse from "html-react-parser";
import ZoomImage from "@/components/modals/ZoomGalery";
import { calcularPorcentaje } from "@/libs/transformString";
import LoadingProduct from "@/app/(cliente)/producto/loading";
import { addToCart } from "@/redux/cart";
import { useDispatch } from "react-redux";
import CardProductV2 from "@/components/cards/CardProductV2";
import { ChevronDownIcon, ChevronRightIcon, EllipsisHorizontalIcon, StarIcon } from "@heroicons/react/24/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { CreditCardIcon } from "@/components/icons/solid";
import { useSession } from "next-auth/react";
import moment from "moment";
import "moment/locale/es-mx";
import { CheckCircleIcon } from "@heroicons/react/24/outline";


export default function Page({ params: { codigo } }) {
  const [product, setProduct] = useState({
    imagenes: [{}],
    comentarios: [{}],
  });
  const [sugguest, setSugguest] = useState([]);
  const [comments, setComment] = useState([{}])
  const [portada, setPortada] = useState("");
  const { data: session } = useSession();
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCollapse, setCollapse] = useState(false);

  const carrussel = useRef(null);

  const [review, setReview] = useState({
    comment: "",
    rating: 0,
  })
  const dispatch = useDispatch();

  const getProducto = async () => {
    setIsLoadingProduct(true);
    const res = await axios
      .get(`/api/products/${codigo}`)
      .finally(() => setIsLoadingProduct(false));
    if (res.data === null) return window.location.replace("/404");
    setProduct(res.data);
    setComment(res.data.comentarios);
    setPortada({
      src: res.data.portada,
      index: 0,
    });
  };

  const getRecommendations = async () => {
    const res = await axios
      .get(`/api/products/sugguest/${codigo}`)
    setSugguest(res.data);
  };

  const getComments = async () => {
    const { data } = await axios.get(`/api/reviews/${product.id_producto}`);

    setComment(data);
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      cantidad: quantity
    }));
  };

  const restar = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
    return;
  }

  const sum = (limit = 10) => {
    if (quantity > limit) return;

    setQuantity(quantity + 1);
  }

  const submitCommet = async () => {
    try {
      const { status } = await axios.post('/api/reviews', {
        id_usuario: session.user.id_usuario,
        id_producto: product.id_producto,
        comentario: review.comment,
        calificacion: review.rating,
      });

      if (status === 201) getComments();

      setReview({
        comment: "",
        rating: 0,
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id_comentario) => {
    try {
      const { status } = await axios.delete(`/api/reviews/${id_comentario}`);

      if (status === 200) getComments();

    } catch (error) {

    }
  }

  const nextCard = (e) => {
    const cardWidth = carrussel.current.children[0].offsetWidth;
    carrussel.current.scrollLeft += cardWidth + 8;
  }

  const backCard = (e) => {
    const cardWidth = carrussel.current.children[0].offsetWidth;
    carrussel.current.scrollLeft -= cardWidth + 8;
  }

  useEffect(() => {
    getProducto();
    getRecommendations();
  }, []);

  return (
    <main className="flex flex-col w-full items-center justify-center bg-white">
      {isLoadingProduct && (<LoadingProduct />)}
      <div className={`w-full mt-4 flex flex-col items-center ${isLoadingProduct ? "hidden" : ""}`}>
        <section className="w-[88%] grid grid-flow-row grid-cols-1 tablet:grid-cols-2 gap-x-4 laptop:gap-x-8 gap-y-4 mx-auto">
          {/* RUTA */}
          <div className="flex gap-2 py-2 tablet:col-span-2">
            <Link
              href={"/"}
              className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
            >
              Inicio
            </Link>
            <ChevronRightIcon className="fill-gray-700 w-4" />
            <Link
              href={`/categorias/${product?.categoria?.nombre}`}
              className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
            >
              {product?.categoria?.nombre}
            </Link>
            <ChevronRightIcon className="fill-gray-700 w-4" />
            <Link
              href={`/categorias/${product?.subcategoria?.nombre}`}
              className="text-sm text-gray-700 hover:text-red-800 hover:underline underline-offset-3"
            >
              {product?.subcategoria?.nombre}
            </Link>
            <ChevronRightIcon className="fill-gray-700 w-4" />
            <span className="text-sm text-red-800">
              {product?.nombre}
            </span>
          </div>

          {/* IMAGEN PRODUCTO */}
          <article className="tablet:flex hidden flex-col items-center gap-2">
            <div className="w-full tablet:h-[300px] laptop:h-[300px] desktop:h-[450px] relative flex items-center justify-center bg-gray-50 rounded-sm p-1 ring-1 ring-gray-700/10">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${portada.src}`}
                alt="Foto de perfil"
                className="w-[350px] h-[350px] tablet:w-[250px] tablet:h-[250px] laptop:w-[300px] laptop:h-[300px] desktop:w-[350px] desktop:h-[350px] object-contain mix-blend-multiply"
                width={400}
                height={400}
              />
              <ZoomImage
                images={product.imagenes}
                index={portada.index}
                className="absolute top-5 right-2 z-10"
              />
            </div>

            <div className="w-full flex justify-center gap-2 mt-2">
              {Array(5).fill().map((_, index) => (
                <div key={index}
                  className={`flex items-center justify-center tablet:w-[60px] tablet:h-[60px] laptop:w-[80px] laptop:h-[80px] desktop:w-[120px] desktop:h-[120px] ring-1 rounded-md cursor-pointer ${product.imagenes[index]?.source === portada
                    ? "ring-red-800"
                    : "ring-gray-700/10 opacity-80"
                    } ${product.imagenes[index]?.source ? "hover:ring-red-700/40 bg-gray-50 shadow-md " : "bg-white"}`}
                >
                  {product?.imagenes[index]?.source && (
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${product?.imagenes[index]?.source}`}
                      alt={`${product.nombre} - ${index}`}
                      className={`tablet:w-[50px] tablet:h-[50px] laptop:w-[70px] laptop:h-[70px] desktop:w-[100px] desktop:h-[100px] object-contain`}
                      width={100}
                      height={100}
                      onClick={() =>
                        setPortada({
                          src: product?.imagenes[index]?.source,
                          index: index,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col justify-center mt-4 gap-4">
              <h4 className="font-bold text-gray-950 text-center">
                Nuestras formas de pago
              </h4>
              <div className="flex items-center justify-center gap-2">
                <div className="tablet:w-[100px] tablet:h-[100px] laptop:w-[140px] laptop:h-[120px] desktop:w-[180px] desktop:h-[120px] flex flex-col justify-center items-center rounded-sm p-2 bg-gray-50 ring-1 ring-gray-700/10">
                  <CreditCardIcon className={'w-4 h-4 laptop:w-5 laptop:h-5 desktop:w-6 desktop:h-6 fill-red-800'} />
                  <h4 className="movile:font-bold laptop:font-extrabold text-red-800 tablet:text-xs laptop:text-sm leading-4 text-center mt-3">Tarjetas de
                    <span className="block">
                      débito y crédito
                    </span>
                  </h4>
                  <p className="text-[10px] text-gray-900 text-center mt-1 hidden desktop:block">Aceptamos tus tarjeta bancarias Visa o Mastercard</p>
                </div>
                <div className="tablet:w-[100px] tablet:h-[100px] laptop:w-[140px] laptop:h-[120px] desktop:w-[180px] desktop:h-[120px] flex flex-col justify-center items-center rounded-sm p-2 bg-gray-50 ring-1 ring-gray-700/10">
                  <MoneyBillIcon className={'w-4 h-4 laptop:w-5 laptop:h-5 desktop:w-6 desktop:h-6 fill-red-800 text-red-800'} />
                  <h4 className="movile:font-bold laptop:font-extrabold text-red-800 text-sm leading-4 text-center mt-3">Pago en efectivo</h4>
                  <p className="text-[10px] text-gray-900 text-center mt-1 hidden desktop:block">Puedes pagar en efectivo al momento de la entraga del producto</p>
                </div>
                <div className="tablet:w-[100px] tablet:h-[100px] laptop:w-[140px] laptop:h-[120px] desktop:w-[180px] desktop:h-[120px] flex flex-col justify-center items-center rounded-sm p-2 bg-gray-50 ring-1 ring-gray-700/10">
                  <BankIcon className={'w-4 h-4 laptop:w-5 laptop:h-5 desktop:w-6 desktop:h-6 fill-red-800'} />
                  <h4 className="movile:font-bold laptop:font-extrabold text-red-800 text-sm leading-4 text-center mt-3">
                    Transferencias
                    <span className="block">
                      bancarias
                    </span>
                  </h4>
                  <p className="text-[10px] text-gray-900 text-center mt-1 hidden desktop:block">Te brindamos nuestros datos para depositos bancarios</p>
                </div>
              </div>
            </div>
          </article>

          {/* DETALLES PRODUCTO */}
          <article className="w-full flex flex-col gap-1 row-start-2 tablet:row-start-auto px-2">
            <h1 className="text-xl tablet:text-2xl font-extrabold text-gray-800">
              {product.nombre}
            </h1>

            {/* Puntajes */}
            <div className="flex justify-between tablet:justify-start gap-2 laptop:gap-4 items-center">
              {product.stock > 0 ? (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-light text-sm">En Stock</span>
                </div>
              ) : (
                <span className="text-red-700 font-light">Agotado</span>
              )}

              <div className="h-full w-[1px] bg-gray-700/20"></div>

              <p className="font-semibold text-gray-800">
                {product.marca?.nombre || "Marca"}
              </p>

              <div className="h-full w-[1px] bg-gray-700/20"></div>

              <div className="w-full flex tablet:flex-row gap-1">
                <div className="flex gap-1 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map(star => (
                    <StarHalfIcon
                      key={star}
                      className={`w-4
                  ${product?._avg?.calificacion >= star ? 'text-yellow-500' : 'text-gray-300'}
                  ${product?._avg?.calificacion >= (star + 0.5) ? " fill-yellow-500 text-yellow-500" : "fill-gray-300 "}
                  `} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm flex-shrink-0 whitespace-nowrap">
                  ({product?._count?.comentarios} reseñas)
                </span>
              </div>

            </div>

            <div className="tablet:hidden mt-4 mb-2 w-[350px] h-[350px] mx-auto relative flex items-center justify-center bg-gray-50 rounded-md object-fill p-1 ring-1 ring-gray-700/10 shadow-md">
              <Image
                src={`${process.env.AWS_BUCKET_URL}${portada.src}`}
                alt="Foto de perfil"
                className="w-[320px] h-[320px] object-contain mix-blend-multiply"
                width={180}
                height={180}
              />
              <ZoomImage
                images={product.imagenes}
                index={portada.index}
                className="absolute top-5 right-2 z-10"
              />
            </div>

            <div className="w-full flex justify-center gap-2 my-2 tablet:hidden">
              {Array(5).fill().map((_, index) => (
                <div key={index}
                  className={`w-[50px] h-[50px] flex items-center justify-center ring-1 rounded-md cursor-pointer ${product.imagenes[index]?.source === portada
                    ? "ring-red-800"
                    : "ring-gray-700/10 opacity-80"
                    } ${product.imagenes[index]?.source ? "hover:ring-red-700/40 bg-gray-50 shadow-md " : "bg-white"}`}
                >
                  {product?.imagenes[index]?.source && (
                    <Image
                      src={`${process.env.AWS_BUCKET_URL}${product?.imagenes[index]?.source}`}
                      alt={`${product.nombre} - ${index}`}
                      className={`w-[40px] h-[40px] object-contain`}
                      width={40}
                      height={40}
                      onClick={() =>
                        setPortada({
                          src: product?.imagenes[index]?.source,
                          index: index,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* PRECIOS */}
            <div className="flex gap-4 items-end tablet:mt-4">
              {product.porcentaje_descuento > 0 ? (
                <>
                  <p className="text-4xl font-black text-yellow-700 flex flex-col leading-[28px]">
                    <span className="text-[16px] font-light">
                      Promo especial
                    </span>
                    <span className="flex gap-2 items-center">
                      $
                      {calcularPorcentaje(
                        product.precio,
                        product.porcentaje_descuento
                      )}{" "}
                      <span className="bg-black text-[16px] py-1 px-3 text-white ">
                        -{product.porcentaje_descuento}%
                      </span>
                    </span>
                  </p>
                  <p className="text-2xl font-bold text-gray-600 flex flex-col leading-[24px]">
                    <span span className="text-[16px] font-light">
                      Precio regular
                    </span>
                    <span className="line-through font-light">
                      ${product.precio?.toString().split(".")[0]}
                      <span className="text-sm line-through">
                        {"."}
                        {product.precio?.toString().split(".")[1] || "00"}
                      </span>
                    </span>
                  </p>
                </>
              ) : (
                <div className="p-2 flex flex-col leading-[18px]">
                  <h4 className="text-gray-800 text-sm">Precio regular</h4>
                  <span className="text-4xl text-gray-800 font-semibold">
                    ${product.precio?.toString().split(".")[0]}
                    <span className="text-xl">
                      {"."}
                      {product.precio?.toString().split(".")[1] || "00"}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {product.comentarios.length < 1 && <Link href="#caja-comentarios" className="text-sm text-gray-700">Sé el primero en dejar un reseña a este producto</Link>}

            {/* Indicaciones */}
            <div className="mt-4 w-full p-4 bg-gray-50 rounded-md flex flex-col gap-1 ring-1 ring-red-700/10 shadow-md">
              <span className="flex gap-3">
                <ClockIcon className="w-5 h-5 laptop:w-6 laptop:h-5 fill-red-800" />
                <span className="text-gray-800 text-sm laptop:text-base">
                  Tiempo de entrega:{" "}
                  <span className="font-semibold">2 a 7 días hábiles</span>
                </span>
              </span>

              <span className="flex gap-3 mt-2">
                <TrunkFastIcon className="w-5 h-5 laptop:w-6 laptop:h-5 fill-red-800" />
                <span className="text-gray-800 text-sm laptop:text-base">
                  Envíos a{" "}
                  <span className="font-semibold">todos el pais</span>
                </span>
              </span>

              <span className="flex gap-3 mt-2">
                <ShieldCheckIcon className="w-5 h-5 flex-shrink-0 laptop:w-6 laptop:h-6 text-red-800" />
                <span className="text-gray-800 text-sm laptop:text-base">
                  Compra protegida, recibe el producto que esperabas o te
                  devolvemos tu dinero.
                </span>
              </span>
            </div>

            {/* BOTONES */}
            {product.stock > 1 ? (
              <div className="grid grid-cols-[140px_1fr] laptop:flex gap-2 mt-4">

                {/* INPUT NUMBER */}
                <div className="flex flex-row w-[120px] h-[35px] rounded-lg relative bg-transparent">
                  <button
                    type="button"
                    data-action="decrement"
                    className=" bg-gray-300 text-gray-700  hover:bg-gray-300/80h-full w-20 rounded-l cursor-pointer outline-none"
                    onClick={restar}
                  >
                    <span className="m-auto text-sm  font-thin text-gray-900">
                      −
                    </span>
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="outline-none input-arrow-none text-center text-sm w-full border-gray-300 bg-gray-100 font-semibold hover:text-black focus:text-black  flex items-center text-gray-700"
                    name="input-number"
                    value={quantity}
                    onChange={e => { if (typeof e.target.value === "number") setQuantity(e.target.value) }}
                  />
                  <button
                    type="button"
                    data-action="increment"
                    className="bg-gray-300 text-gray-600  hover:bg-gray-300/80 h-full w-20 rounded-r cursor-pointer"
                    onClick={() => sum(product.stock)}
                  >
                    <span className="m-auto text-sm font-thin text-gray-900">
                      +
                    </span>
                  </button>
                </div>

                {/* AGREGAR AL CARRITO */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className={`w-full laptop:w-[250px] laptop:h-[35px] bg-red-800/90 rounded-sm flex gap-3 items-center justify-center hover:bg-red-800`}
                >
                  <CarShoppingIcon className="w-5 text-white fill-white" />
                  <p className="text-white text-sm">Agregar al carrito</p>
                </button>

                {/* COMPRAR YA */}
                <Link
                  href={"/carrito"}
                  className="w-full laptop:w-[250px] py-2 h-[35px] text-white text-sm bg-yellow-800/90 hover:bg-yellow-800 rounded-sm flex gap-2 items-center justify-center col-start-2 laptop:col-start-auto"
                >
                  Comprar ya
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <p className="text-white text-sm py-2 px-4 bg-gray-400 select-none w-[120px] rounded-md relative botom-tooltip before:content-['Producto_sin_existencias'] before:top-10">No disponible</p>
              </div>
            )};

            <div className="mt-8 flex justify-evenly tablet:justify-start gap-4">
              <button className="font-light text-sm uppercase text-gray-500 flex gap-2 items-center group hover:text-red-800">
                <HeartIcon className="w-4 h-4 text-gray-400 fill-gray-400 group-hover:text-red-800 group-hover:fill-red-800" />
                Agregar favoritos
              </button>
              <button className="font-light text-sm uppercase text-gray-500 flex gap-2 items-center group hover:text-red-800">
                <ShareIcon className="w-4 h-4 text-gray-500 fill-gray-500 group-hover:text-red-800 group-hover:fill-red-800" />
                Compartir
              </button>
            </div>

            {/* DESCRIPCION */}
            <div className={`w-full ${isCollapse ? "h-[450px]" : "h-[50px]"}  overflow-hidden rounded-sm mt-2 duration-150 ease-in-out`}>
              <div className="w-full h-[50px] px-4 bg-gray-200 flex items-center justify-between cursor-pointer select-none" onClick={() => setCollapse(!isCollapse)}>
                <h4 className="font-bold text-gray-700">
                  Detalles del producto
                </h4>
                <ChevronDownIcon className="w-5 h-5 text-gray-800" />
              </div>
              <div className="w-full h-full overflow-auto px-4 py-2 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
                <blockquote className="prose">
                  {parse(product?.descripcion || "")}
                </blockquote>
              </div>
            </div>

          </article>
        </section>

        {/* RECOMENDACION PRODUCTOS */}
        <section className="w-full flex flex-col gap-2 bg-yellow-100 my-10 py-4 items-center">
          <h1 className="text-2xl font-extrabold text-yellow-800 uppercase">
            Productos relacionados
          </h1>
          <div className="w-[50px] h-[1px] bg-yellow-800/20"></div>
          <article className="flex items-center gap-4 relative">
            <button type="button" className="cursor-pointer group/left absolute -left-8"
              onClick={backCard} >
              <AngleDownIcon className="w-8 fill-gray-800/30 rotate-90 group-hover/left:fill-gray-800" />
            </button>
            <div
              ref={carrussel}
              className="w-[300px] movile:auto-cols-[calc(100%/1)] tablet:w-[690px] tablet:auto-cols-[calc(100%/3)] laptop:w-[950px] laptop:auto-cols-[calc(100%/4)] desktop:w-[1200px] rounded-md grid grid-flow-col desktop:auto-cols-[calc(100%/5)] place-items-center overflow-x-auto scrollbar-none py-4 scroll-smooth snap-start"
              style={{
                scrollSnapType: 'x mandatory'
              }}
            >
              {sugguest.map((recommended, i) => (
                <CardProductV2 key={i} product={recommended} />
              ))}
            </div>
            <button type="button" className="cursor-pointer group/right absolute -right-8" onClick={nextCard}>
              <AngleDownIcon className="w-8 fill-gray-800/30 -rotate-90 group-hover/right:fill-gray-800" />
            </button>
          </article>
        </section>

        {/* COMENTARIOS PRODUCTO */}
        <section className="mb-6 grid grid-cols-1 laptop:grid-cols-2 gap-4 w-[90%] min-h-[200px]">
          {/* LISTA DE COMENTARIOS */}
          <div className="flex flex-col gap-2" >
            <h1 className="text-xl laptop:text-2xl font-bold text-gray-800 leading-4">
              Reseñas{" "}
              <span className="font-light text-lg">
                ({comments.length})
              </span>
            </h1>
            {comments.map((comentario, index) => (
              <div
                key={index}
                className="flex gap-2 mt-4 w-full border-b border-gray-700/10">
                <Image
                  src={comentario?.usuario?.imagen}
                  width={30}
                  height={30}
                  alt="avatar"
                  className="rounded-full w-[30px] h-[30px] mt-1"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h5 className="text-sm text-slate-600 font-semibold">
                      {comentario.usuario?.nombre} {comentario.usuario?.apellido}
                      <span className="text-xs text-slate-400 ml-2">
                        {moment(comentario.created_at).fromNow()}
                      </span>
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex gap-1 items-center`}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon
                          key={star}
                          onClick={() => setReview({ ...review, rating: star })}
                          className={`w-4 cursor-pointer
                      ${star <= comentario.calificacion ? 'fill-yellow-500' : 'fill-gray-300 hover:scale-110'}
                    `} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{comentario.calificacion}/5</span>
                  </div>

                  <p className="text-sm text-slate-600 mt-2">
                    {comentario.comentario}
                  </p>

                  <div className="flex items-center gap-2 mt-2"></div>
                </div>
                <div className="flex flex-col items-start">
                  {(session?.user?.id_usuario === comentario?.id_usuario || session?.user?.role === 'ADMIN') && (
                    <MoreOptions id_comentario={comentario?.id_comentario} onClick={handleDelete} />
                  )}
                </div>
              </div>
            ))}
            {comments.length < 1 && (
              <div>
                <p className="text-gray-600">No hay comentarios...</p>
              </div>
            )}
          </div>

          {/* CAJA DE COMENTARIOS */}
          <div className="flex flex-col gap-2 row-start-1 laptop:row-start-auto">
            <h1 className="text-xl laptop:text-2xl font-bold text-gray-800 leading-4" id="caja-comentarios">
              Déjanos tu opinión
            </h1>
            <p className="text-gray-600">
              ¿Qué te pareció este producto?
            </p>
            <div className={`flex flex-col gap-4 ${review.rating < 1 ? "h-[40px]" : "h-[200px]"} duration-150 ease-in-out overflow-hidden`}>
              <div className={`flex space-x-2 items-center p-2 `}>
                {[1, 2, 3, 4, 5].map(star => (
                  <StarIcon
                    key={star}
                    onClick={() => setReview({ ...review, rating: star })}
                    className={`w-6 cursor-pointer
                      ${star <= review.rating ? 'fill-yellow-500' : 'fill-gray-300 hover:scale-110'}
                    `} />
                ))}
              </div>
              <div className="flex flex-col gap-2 px-1">
                <textarea
                  type="text"
                  placeholder="Cuéntanos tus experiencia..."
                  className="w-full p-2 rounded-sm ring-1 ring-gray-700/10 bg-gray-50 border-none focus:ring-red-700"
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                />
                <button
                  type="button"
                  onClick={submitCommet}
                  className="py-2 w-full bg-red-700 hover:bg-red-800 rounded-md text-white text-sm flex items-center justify-center">
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
}


export const MoreOptions = ({ id_comentario, onClick }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [isOpen]);

  const handleDelete = () => {
    onClick(id_comentario);
  }

  return (
    <div
      className="relative flex items-center justify-center"
      onClick={() => setOpen(!isOpen)}
      ref={ref}
    >
      <div
        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center group/option cursor-pointer select-none
          ${isOpen ? "bg-gray-200" : "hover:bg-gray-100"}  
        `}
      >
        <EllipsisHorizontalIcon
          className={`w-5 h-5
          ${isOpen
              ? "fill-gray-600"
              : "fill-gray-400 group-hover/option:fill-gray-600"
            }
          `}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[45px] right-6 ring-1 ring-gray-300 bg-white rounded-sm shadow-md group-hover:block z-50">
          <button
            type="button"
            className="w-full h-full flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50"
            onClick={handleDelete}
          >
            {/* <EditFastIcon className="w-4 fill-gray-700 text-gray-700" /> */}
            <p className="text-red-600 whitespace-nowrap text-sm">
              Eliminar comentario
            </p>
          </button>
        </div>
      )}
    </div>
  );
};
