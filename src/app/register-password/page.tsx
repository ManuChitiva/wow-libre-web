"use client";
import PageCounter from "@/components/page-counter";
import TitleRegister from "@/components/register-title";
import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { encryptPassword } from "@/components/Security";

const RegisterPassword = () => {
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

    if (user) {
      const encryptedPassword = encryptPassword(password);

      setUser({
        ...user,
        password: encryptedPassword,
      });
    }
    router.push("/account-web");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="bg-midnight text-white register-container">
      <div className="container">
        <TitleRegister
          title=" Registrarme en "
          description="Protege tu cuenta y elige una contraseña segura para el juego."
        />

        <div className="items-center pt-4">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="passwordInput" className="mb-2">
              Contraseña para el juego
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
              Confirmar Contraseña{" "}
            </label>
            <input
              id="confirmPasswordInput"
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />

            <PageCounter currentSection={5} totalSections={7} />

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

export default RegisterPassword;
