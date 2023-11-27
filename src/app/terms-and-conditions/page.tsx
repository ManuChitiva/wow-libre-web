"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleRegister from "@/components/register-title";
import PageCounter from "@/components/page-counter";

const ContactMeans = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [selectedOptions, setSelectedOptions] = useState({
    option1: false,
    option2: false,
    // Agrega más opciones de checkbox según sea necesario
  });
  const router = useRouter();

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedOptions.option1 || !selectedOptions.option2) {
      // Mostrar un mensaje de error o realizar alguna acción si los checkboxes no están activos
      toast.error("Por favor, selecciona todas las opciones.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return; // Evitar la redirección si los checkboxes no están activos
    }
    router.push("/register-password");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="bg-midnight text-white register-container">
      <div className="container">
        <TitleRegister
          title=" Registrarme en "
          description="Esto es lo que utilizarás cuando inicies sesión en los sitios web y aplicaciones móviles."
        />

        <div className="pt-4">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="option1"
                checked={selectedOptions.option1}
                onChange={handleCheckboxChange}
                className="h-5 w-5 rounded border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-sm font-medium text-gray-100">
                El correo de la cuenta recibirá ofertas especiales, noticias y
                demás de Wow Libre
              </span>
            </label>
            <br />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="option2"
                checked={selectedOptions.option2}
                onChange={handleCheckboxChange}
                className="h-5 w-5 rounded border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-sm font-medium text-gray-100">
                He leído y acepto lo siguiente:{" "}
                <a href="/login" className="underline">
                  Términos y condiciones
                </a>
              </span>
            </label>
            <br />
            <PageCounter currentSection={4} totalSections={7} />
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
