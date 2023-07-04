"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputPasswordWithGenerator,
  InputSwitch,
  InputSelect,
} from "@/components/forms/inputs";
import { formatPhoneNumber } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import FooterForm from "@/components/forms/footerForm";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    await axios
      .get("/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const [user, updateUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    id_rol: "",
    password: "",
    is_active: true,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    await axios
      .post("/api/users/", user)
      .then((response) => {
        if (response.status === 201) {
          router.push("/nx-admin/usuarios?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.messages.nombre,
            apellido: data.messages.apellido,
            telefono: data.messages.telefono,
            email: data.messages.email,
            hasPasswordError: data.messages.password.length > 0 ? true : false,
          });
        }
      })
      .finally(() => setLoadingData(false));
  };

  const handleUser = (e) => {
    const { name, value, type } = e.target;

    if (type == "checkbox") {
      updateUser({ ...user, [name]: e.target.checked });
    } else if (type == "tel") {
      updateUser({ ...user, [name]: formatPhoneNumber(value) });
    } else {
      updateUser({ ...user, [name]: value });
    }
  };

  return (
    <div className="w-full">
      <section className="w-full h-full pb-8 px-4 pt-1 bg-gray-100 justify-center">
        <article className="w-full flex flex-col bg-white rounded-md ring-1 ring-gray-300 shadow-lg">
          <TitleForm title="Crear usuario" route={"/nx-admin/usuarios"} />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="grid lg:grid-cols-2 h-full px-8 py-5 bg-gray-50 gap-x-6">
              <InputText
                label="Nombre"
                name="nombre"
                type="text"
                value={user.nombre}
                onChange={handleUser}
                errMessage={validations.nombre}
              />
              <InputText
                label="Apellido"
                name="apellido"
                type="text"
                value={user.apellido}
                onChange={handleUser}
                errMessage={validations.apellido}
              />
              <InputText
                label="Teléfono"
                name="telefono"
                type="tel"
                value={user.telefono}
                onChange={handleUser}
                errMessage={validations.telefono}
              />
              <InputText
                label="Correo electrónico"
                name="email"
                type="email"
                value={user.email}
                onChange={handleUser}
                errMessage={validations.email}
              />
              <InputPasswordWithGenerator
                label="Contraseña"
                name="password"
                password={user.password}
                setPassword={updateUser}
                hasError={validations.hasPasswordError}
                onChange={handleUser}
              />
              <InputSelect
                label="Rol"
                id="id_rol"
                options={roles}
                onChange={handleUser}
                value={user.id_rol}
              />
              <InputSwitch
                label="Estado"
                name="is_active"
                value={user.is_active}
                onChange={handleUser}
              />
            </div>
            <FooterForm isLoadingData={isLoadingData} title={"Crear usuario"} />
          </form>
        </article>
      </section>
    </div>
  );
}
