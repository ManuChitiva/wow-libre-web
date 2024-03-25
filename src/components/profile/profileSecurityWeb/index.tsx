import { UserModel } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import { faSave, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { webChangePassword } from "@/components/services/apis/auth/account/security";
import { GenericError } from "@/components/services/dto/generic";

interface ProfileSecurityProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

const ProfileSecurityWeb = ({ user, setUser }: ProfileSecurityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleEditPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coinciden",
        text: "Por favor, verifique que las contraseñas coincidan.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "La contraseña es vacia",
        text: "Por favor, verifique  que la contraseña no este vacia.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña invalida",
        text: "Por favor, verifique que la contraseña sea mayor a 5 caracteres e inferior a 30 caracteres.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const webUserModelSecurity = {
      password: password,
      oldPassword: oldPassword,
    };
    try {
      await webChangePassword(user.token, webUserModelSecurity);

      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "La contraseña ha sido actualizada con exito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
    } catch (error: any) {
      if (error instanceof GenericError && error.statusCode === 400) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          text: error.message, // Muestra el mensaje de error del servidor
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Entendido",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error inesperado",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Entendido",
        });
      }
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="mx-auto mt-8">
      {/* Texto introductorio */}
      <div className="text-center">
        <h2 className="mb-10 font-bold">
          Protege tu imperio digital con una contraseña fuerte y segura. <br />{" "}
          ¡Sé el héroe de tu propia historia en World of Warcraft y defiende tus
          tesoros virtuales con una clave invulnerable!
        </h2>
      </div>

      {/* Línea horizontal */}
      <hr className="border-t-1 border-gray-300 my-4 mx-8" />

      {/* Formulario de contraseña */}
      <div className="bg-white px-8 pt-6 pb-8 mb-9">
        {/* Inputs en una sola columna en pantallas pequeñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {/* Input Contraseña web actual */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña web actual
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*********</span>
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Editar
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={handleEditOldPassword}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input Nueva Contraseña Web */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nueva Contraseña Web
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={handleEditPassword}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input Confirmar Contraseña Web */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña Web
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  onChange={handleConfirmPassword}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Guardar
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSecurityWeb;
