"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleRegister from "@/components/register-title";
import PageCounter from "@/components/page-counter";

const KnowYou = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const router = useRouter();

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    if (
      !lastName.trim() ||
      lastName.trim().length < 5 ||
      lastName.trim().length > 50
    ) {
      toast.error("Por favor, ingrese sus nombres validos.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    if (
      !firstName.trim() ||
      firstName.trim().length < 5 ||
      firstName.trim().length > 50
    ) {
      toast.error("Por favor, ingrese sus apellidos validos.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    // Actualizar los datos del usuario en el contexto
    if (user) {
      setUser({
        ...user,
        last_name: lastName,
        first_name: firstName,
      });
    }
    router.push("/register/contact-means");
  };

  const handleVolverClick = () => {
    router.back();
  };

  useEffect(() => {
    if (user) {
      setLastName(user.last_name || "");
      setFirstName(user.first_name || "");
    }
  }, [setUser]);

  return (
    <div className="bg-midnight text-white container-heigth">
      <div className="container">
        <div className="mt-20">
          <TitleRegister
            title=" Registrarme en "
            description=" Es posible que se utilice tu nombre real en el 
          futuro para verificar tu identidad cuando te pongas en contacto con WowLibre. 
          Por defecto, tu nombre real permanecerá oculto para otros usuarios."
          />
        </div>
        <div className="items-center pt-4">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="lastNameInput" className="mb-2">
              Ingrese su nombre
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese sus nombres"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <label htmlFor="firstNameInput" className="mb-2">
              Ingrese sus apellidos
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese sus apellidos"
              value={firstName}
              onChange={handleFirstNameChange}
            />

            <PageCounter currentSection={2} totalSections={7} />

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

export default KnowYou;
