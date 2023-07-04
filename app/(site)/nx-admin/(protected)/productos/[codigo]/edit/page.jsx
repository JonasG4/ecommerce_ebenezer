"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputSwitch,
  InputSelect,
  InputNumber,
  RichTextEditor,
} from "@/components/forms/inputs";
import { formatPrice } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/footerForm";

export default function EditPage({ params: { codigo } }) {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);
  const [isLoadingSubCat, setLoadingSubCat] = useState(false);

  const [product, updateProduct] = useState({
    nombre: "",
    precio: 0.99,
    porcentaje_descuento: 0.0,
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    stock: 0,
    is_active: 1,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    porcentaje_descuento: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    images: "",
    stock: "",
  });

  const [descripcion, setDescripcion] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const getCategories = async () => {
    const { data: categoriesData } = await axios.get("/api/categories");
    setCategories(categoriesData);
  };

  const getProduct = async () => {
    const { data: productData } = await axios.get(`/api/products/${codigo}`);
    updateProduct(productData);
    setDescripcion(productData.descripcion);
    getSubcategories(productData.id_categoria);
  };

  const getSubcategories = async (id_categoria) => {
    setLoadingSubCat(true);
    const { data: subcategoriesData } = await axios
      .get(`/api/categories/${id_categoria}/subcategories`)
      .finally(() => setLoadingSubCat(false));
    setSubcategories(subcategoriesData);
  };

  const getBrands = async () => {
    const { data: brandsData } = await axios.get("/api/brands");
    setBrands(brandsData);
  };

  const getTags = () => {
    setLoadingTags(true);
    getCategories();
    getBrands();
    setLoadingTags(false);
  };

  useEffect(() => {
    getProduct();
    getTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    try {
      const { data: productData } = await axios.put(
        `/api/products/${codigo}`,
        {
            nombre: product.nombre,
            descripcion: descripcion,
            precio: product.precio,
            porcentaje_descuento: product.porcentaje_descuento,
            id_categoria: product.id_categoria,
            id_subcategoria: product.id_subcategoria,
            id_marca: product.id_marca,
            stock: product.stock,
            is_active: product.is_active,
        }
      );
      setLoadingData(false);
      if (productData) {
        router.push("/nx-admin/productos?showCreate=true");
      }
    } catch (error) {
      setLoadingData(false);
      if (error.response.status === 400) {
        console.log(error.response.data);
        setValidations(error.response.data);
      }
    }
  };

  const handleProduct = (e) => {
    const { value, type, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));

    setValidations((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSelect = (e) => {
    const { value, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setValidations((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    getSubcategories(value);
  };

  const handleInputnumber = (e) => {
    const { value, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: formatPrice(value),
    }));
  };

  const calcularPorcentaje = (precio, descuento) => {
    const price = parseFloat(precio);
    const discount = parseFloat(descuento);
    let porcentaje = price - (discount / 100) * price;
    return porcentaje.toFixed(2);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <section className="w-full pb-4 px-4 pt-1 bg-gray-100 flex overflow-hidden">
        <article className="w-full flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg overflow-hidden">
          <TitleForm
            title={"Actualizar producto"}
            route="/nx-admin/productos"
          />
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col overflow-hidden"
          >
            <div
              className={`grid lg:grid-cols-2 h-full px-8 py-5 bg-gray-50 gap-x-6 gap-y-1 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200  ${
                isLoadingData &&
                "pointer-events-none opacity-50 cursor-not-allowed"
              }`}
            >
              <InputText
                label="Nombre"
                subtitle="Maximo 100 caracteres"
                name="nombre"
                type="text"
                value={product.nombre}
                onChange={handleProduct}
                errMessage={validations.nombre}
              />
              <InputSelect
                label="Marca"
                id="id_marca"
                subtitle="Selecciona una marca para tu producto"
                placeholder="Selecciona una marca"
                isLoading={isLoadingTags}
                value={product.id_marca}
                options={brands}
                onChange={handleProduct}
                errMessage={validations.id_marca}
              />
              <InputSelect
                label="Categoría"
                subtitle="Divide tus productos en categorías"
                placeholder="Selecciona una categoría"
                id="id_categoria"
                value={product.id_categoria}
                isLoading={isLoadingTags}
                options={categories}
                onChange={handleSelect}
                errMessage={validations.id_categoria}
              />
              <InputSelect
                label="Subcategoría"
                subtitle="Selecciona una categoria para habilitar las subcategorías"
                id="id_subcategoria"
                placeholder="Selecciona una subcategoría"
                isLoading={isLoadingSubCat}
                value={product.id_subcategoria}
                options={subcategories}
                onChange={handleProduct}
                errMessage={validations.id_subcategoria}
              />
              <div className="col-span-2">
                <RichTextEditor
                  label="Descripción"
                  subtitle="Agrega las especificaciones del producto"
                  value={descripcion}
                  onChange={setDescripcion}
                  errMessage={validations.descripcion}
                />
              </div>
              <div className="flex gap-4 relative">
                <InputNumber
                  label="Precio Normal"
                  name="precio"
                  subtitle="Precio de tu producto"
                  leftSymbol="$"
                  step={1}
                  onChange={handleInputnumber}
                  value={product.precio}
                  errMessage={validations.precio}
                />
                <InputNumber
                  label="Aplicar descuento"
                  name="porcentaje_descuento"
                  subtitle="Maximo 100%"
                  leftSymbol="%"
                  limit={100}
                  onChange={handleInputnumber}
                  value={product.porcentaje_descuento}
                  errMessage={validations.porcentaje_descuento}
                />
                <div className="flex flex-col justify-center flex-1 items-center p-2 bg-white rounded-md ring-1 ring-gray-300 shadow-md">
                  <span className="text-xs text-gray-700 whitespace-nowrap">
                    Precio final
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    $
                    {calcularPorcentaje(
                      product.precio,
                      product.porcentaje_descuento
                    )}
                  </span>
                </div>
              </div>
              <InputNumber
                label="Stock"
                subtitle="Cantidad de productos disponibles"
                name="stock"
                value={product.stock}
                onChange={handleProduct}
                errMessage={validations.stock}
              />
              <InputSwitch
                label="Publicar"
                subtitle="Publica tu producto para que los clientes puedan verlo"
                name="is_active"
                value={product.is_active}
                onChange={handleProduct}
              />
            </div>
            <FooterForm
              title="Actualizar producto"
              isLoadingData={isLoadingData}
              typeForm="edit"
            />
          </form>
        </article>
      </section>
    </div>
  );
}
