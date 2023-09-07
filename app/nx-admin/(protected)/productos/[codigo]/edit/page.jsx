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
  InputSelect2,
} from "@/components/forms/inputs";
import { formatPrice } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/buttonsForm";
import ButtonsForm from "@/components/forms/buttonsForm";

export default function EditPage({ params: { codigo } }) {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [isLoadingTags, setLoadingTags] = useState(false);

  const [product, updateProduct] = useState({
    nombre: "",
    precio: 19.99,
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    stock: 0,
    estado: "",
  });

  const [validations, setValidations] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    id_categoria: "",
    id_subcategoria: "",
    id_marca: "",
    stock: "",
    estado: "",
  });

  const [descripcion, setDescripcion] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState({
    nombre: "",
    categoria: "",
  });

  const getCategories = async () => {
    const { data: categoriesData } = await axios.get("/api/categories");
    setCategories(categoriesData);
  };

  const getProduct = async () => {
    const { data: productData } = await axios.get(`/api/products/${codigo}`);
    updateProduct(productData);
    setDescripcion(productData.descripcion);
    setSubcategories({
      nombre: productData.subcategoria.nombre,
      categoria: productData.categoria.nombre,
    });
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
      const { data: productData } = await axios
        .put(`/api/products/${codigo}`, {
          nombre: product.nombre,
          descripcion: descripcion,
          precio: product.precio,
          porcentaje_descuento: product.porcentaje_descuento,
          id_categoria: product.id_categoria,
          id_subcategoria: product.id_subcategoria,
          id_marca: product.id_marca,
          stock: product.stock,
          estado: product.estado,
        })
        .finally(() => setLoadingData(false));
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

  const handleSelect = (option) => {
    updateProduct((prevState) => ({
      ...prevState,
      id_subcategoria: option.subcategoria.id_subcategoria,
      id_categoria: option.categoria.id_categoria,
    }));

    setSubcategories({
      nombre: option.subcategoria.nombre,
      categoria: option.categoria.nombre,
    });
  };

  const handleInputnumber = (e) => {
    const { value, name } = e.target;
    updateProduct((prevState) => ({
      ...prevState,
      [name]: formatPrice(value),
    }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col"
      >
        <div className="w-full flex justify-between sticky top-0 z-50 bg-white px-7 pt-3 pb-3 border-b border-slate-700/10">
          <TitleForm title={"Editar Producto"} table="Productos" />
          <ButtonsForm
            title="Actualizar"
            isLoadingData={isLoadingData}
            typeForm="edit"
          />
        </div>
        <div
          className={`grid grid-cols-1 laptop:grid-cols-2 h-full py-5 bg-gray-50 gap-x-6 gap-y-1 px-7 ${
            isLoadingData && "pointer-events-none opacity-50 cursor-not-allowed"
          }`}
        >
          <InputText
            label="Nombre"
            subtitle="Maximo 100 caracteres"
            placeholder="Ej: Lavadora LG 10kg"
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
          <InputSelect2
            label="Categoría"
            subtitle="Divide tus productos en categorías"
            value={subcategories}
            isLoading={isLoadingTags}
            options={categories}
            onChange={handleSelect}
            errMessage={validations.id_categoria}
          />
          <div className="row-span-3">
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
              label="Precio Regular"
              name="precio"
              subtitle="Precio de tu producto"
              leftSymbol="$"
              step={1}
              onChange={handleInputnumber}
              value={product.precio}
              errMessage={validations.precio}
            />
            <InputNumber
              label="Stock"
              subtitle="Cantidad de productos disponibles"
              name="stock"
              value={product.stock}
              onChange={handleProduct}
              errMessage={validations.stock}
            />
          </div>
          <InputSelect
            label="Estado"
            id="estado"
            subtitle="Selecciona el estado de tu producto"
            placeholder="Selecciona un estado"
            isLoading={isLoadingTags}
            value={product.estado}
            options={[
              { id: 0, nombre: "Archivado" },
              { id: 1, nombre: "Publicado" },
            ]}
            onChange={handleProduct}
            errMessage={validations.estado}
          />
        </div>
      </form>
    </div>
  );
}
