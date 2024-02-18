"use client";
import PageCounter from "@/components/register/pageCounter";
import TitleRegister from "@/components/register/titleWow";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { encryptPassword } from "@/components/security";

const AccountWeb = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const router = useRouter();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden ", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    if (!password.trim()) {
      toast.error("Las contraseñas están vacías.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      toast.error(
        "La contraseña debe ser superior a 5 caracteres e inferior a 30 caracteres.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        }
      );
      return;
    }

    if (user) {
      setUser({
        ...user,
        password_web: encryptPassword(password),
      });
    }
    router.push("/register/account-final-step");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="bg-midnight text-white container-heigth">
      <div className="container">
        <div className="mt-20">
          <TitleRegister
            title=" Registrarme en "
            description="Protege tu cuenta y elige una contraseña segura para la web administrativa."
          />
        </div>
        <div className="items-center pt-4">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="passwordInput" className="mb-2">
              Contraseña para la web
            </label>
            <input
              id="passwordInput"
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
            />

            <label htmlFor="confirmPasswordInput" className="mb-2">
              Confirmar Contraseña para la web
            </label>
            <input
              id="confirmPasswordInput"
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <PageCounter currentSection={6} totalSections={7} />

            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
              type="submit"
            >
              Continuar
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
              type="button"
              onClick={handleVolverClick}
            >
              Volver
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AccountWeb;
