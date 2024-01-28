import { UserModel } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  faSave,
  faTimes,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { gameChangePassword } from "@/components/services/auth/auth-service";
import {
  ErrorResponseImpl,
  GenericError,
  GenericResponseImpl,
} from "@/components/services/dto/generic";
const crypto = require("crypto");

interface ProfileSecurityProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
}

const ProfileSecurityIngame = ({ user, setUser }: ProfileSecurityProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { computeVerifier, params } = require(`trinitycore-srp6`);
  const [passwordWeb, setPasswordWeb] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordWeb(event.target.value);
  };

  const handleEditPasswordInGame = (event: ChangeEvent<HTMLInputElement>) => {
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
    const salt = crypto.randomBytes(32);

    const verifier = computeVerifier(
      params.trinitycore,
      Buffer.from(salt),
      user.username.toUpperCase(),
      password.toUpperCase()
    );

    const userSecurity = {
      salt: Buffer.from(salt).toString("hex"),
      verifier: Buffer.from(verifier).toString("hex"),
      password: passwordWeb,
    };

    try {
      await gameChangePassword(user.token, userSecurity);

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
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <h2 className="mb-10 font-bold text-1xl">
          Fortalece las defensas de tu reino digital con una contraseña sólida y
          segura.
          <br /> Sé el protagonista de tu epopeya en World of Warcraft,
          resguardando tus tesoros virtuales con una llave impenetrable.
        </h2>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-500 mb-2">
            Status: Activo
          </h3>

          <p className="text-gray-700">
            El cliente ha sido inhabilitado debido a acciones que violan
            nuestras políticas. Por favor, contacta con nuestro soporte para
            resolver este inconveniente.
          </p>
        </div>
      </div>
      {/* Línea horizontal */}
      <hr className="border-t-1 border-gray-300 my-4 mx-8" />
      <div className="bg-white   px-8 pt-6 pb-8 mb-9">
        {/* Agrupando cada dos inputs en columnas */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {/* Input password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña web
              <span className="text-blue-500 ml-2">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
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
              <div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Ingrese su contraseña web"
                    onChange={handleEditOtp}
                    className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Ingresa la contraseña de tu cuenta para confirmar los cambios.
                </p>
              </div>
            )}
          </div>

          {/* Input  new password*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nueva Contraseña
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Ingrese su nueva contraseña"
                  onChange={handleEditPasswordInGame}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Input  confirm password*/}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Confirme su nueva contraseña"
                  onChange={handleConfirmPassword}
                  className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Actualizar
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

export default ProfileSecurityIngame;