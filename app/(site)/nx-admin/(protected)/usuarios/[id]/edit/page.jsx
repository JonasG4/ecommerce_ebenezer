"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputSwitch,
  InputSelect,
} from "@/components/forms/inputs";
import { FaceFrownIcon } from "@/components/icons/regular";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/loading";
import { formatPhoneNumber } from "@/libs/formatingText";
import TitleForm from "@/components/forms/titleForm";
import ChangePassword from "@/components/modals/changePassword";
import FooterForm from "@/components/forms/footerForm";

export default function EditPage({ params }) {
  const id_usuario = params.id;
  const router = useRouter();

  //Validations
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isUserExist, setUserExist] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  //Data
  const [user, updateUser] = useState({
    nombre: "",
    id_rol: "",
    apellido: "",
    telefono: "",
    email: "",
    oldEmail: "",
    is_active: true,
  });
  const [roles, setRoles] = useState([]);

  const notify = (msg) =>
    toast.success(msg, {
      className: "bg-indigo-700 text-gray-50",
    });

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`/api/users/${id_usuario}`)
      .then((response) => {
        updateUser({
          ...user,
          ...response.data,
          id_rol: response.data.role.id_rol,
          oldEmail: response.data.email,
        });
        setUserExist(true);
      })
      .catch((err) => {
        setUserExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRoles = async () => {
    await axios.get("/api/roles").then((response) => {
      console.log(response.data)
      setRoles(response.data);
    });
  };

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/users/${id_usuario}`, { ...user })
      .then((response) => {
        if (response.status === 200) {
          router.push("/nx-admin/usuarios/?showNotifyEdit=true");
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
      .finally(() => setLoadingSubmit(false));
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
    <div className="p-5 w-full">
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <div className="w-full bg-gray-50 shadow-md rounded-md">
        <TitleForm title="Editar usuario" route={"/usuarios"} />
        <form className="" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid mx-6 my-4 grid-cols-1 md:grid-cols-2 gap-x-4">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {isUserExist ? (
                  <>
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
                    <InputSelect
                      label="Rol de acceso"
                      id="id_rol"
                      options={roles}
                      value={user.id_rol}
                      onChange={handleUser}
                    />
                    <InputSwitch
                      label="Estado"
                      name="is_active"
                      value={user.is_active}
                      onChange={handleUser}
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center py-5 gap-4">
                    <FaceFrownIcon
                      className={"w-12 fill-indigo-500 text-indigo-50"}
                    />
                    <p className="text-center text-gray-600 font-medium">
                      Este registro no existe o fue eliminado
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {isUserExist && (
            <FooterForm
              isLoadingData={isLoadingSubmit}
              title={"Actualizar usuario"}
              typeForm="edit"
            >
              <ChangePassword
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                id_usuario={id_usuario}
                notify={notify}
              />
            </FooterForm>
          )}
        </form>
      </div>
    </div>
  );
}
