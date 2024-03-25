"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleRegister from "@/components/register/titleWow";
import PageCounter from "@/components/register/pageCounter";
import {
  existEmail,
  InformationModel,
} from "@/components/services/apis/resources/register";

const ContactMeans = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCellPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCellPhone(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    if (!email.trim()) {
      toast.error("Por favor, ingrese su correo electrónico.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Por favor, ingrese un correo electrónico válido.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    try {
      const response: InformationModel = await existEmail(email);

      if (response.exist) {
        toast.error(
          "El correo electrónico ingresado ya está registrado. Por favor, ingrese otro correo electrónico.",
          {
            position: toast.POSITION.BOTTOM_LEFT,
            className: "toast-message",
          }
        );
        return;
      }
    } catch (error) {
      toast.error(
        "No fue posible validar su información, por favor intente nuevamente más tarde.",
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
        email: email,
        cell_phone: cellPhone,
      });
    }
    router.push("/register/terms-and-conditions");
  };

  const handleVolverClick = () => {
    router.back();
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setCellPhone(user.cell_phone || "");
    }
  }, [setUser]);

  return (
    <div className="bg-midnight text-white min-h-screen flex items-center justify-center">
      <div className="min-h-1/2 max-h-90vh w-full">
        <TitleRegister
          title=" Registrarme en "
          description="Esto es lo que utilizarás cuando inicies sesión en los sitios web y aplicaciones móviles."
        />
        <div className="items-center pt-2 container">
          <form className="mt-2 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="lastNameInput" className="mb-2">
              Correo Electronico
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese su correo electronico"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="firstNameInput" className="mb-2">
              (Opcional) Número de teléfono
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese un telefono de contacto."
              value={cellPhone}
              onChange={handleCellPhoneChange}
            />

            <PageCounter currentSection={3} totalSections={7} />

            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
              type="submit"
            >
              Continuar
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
              type="button" // Asegúrate de cambiar el tipo a "button"
              onClick={handleVolverClick} // Agrega el evento onClick
            >
              Volver
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMeans;
