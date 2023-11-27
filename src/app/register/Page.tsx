"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleRegister from "@/components/register-title";
import PageCounter from "@/components/page-counter";

const Register = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [country, setCountry] = useState("");
  const [fecha, setFecha] = useState("");
  const router = useRouter();

  const handleFechaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    if (!country.trim()) {
      toast.error("Por favor, ingresa un país válido.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    if (!fecha) {
      toast.error("Por favor, ingresa una fecha de nacimiento válida.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
      return;
    }

    // Actualizar los datos del usuario en el contexto
    if (user) {
      setUser({
        ...user,
        country: country,
        date_of_birth: new Date(fecha),
      });
    }
    router.push("/know-you");
  };

  useEffect(() => {
    if (user) {
      setCountry(user.country || "");
      setFecha(
        user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : ""
      );
    }
  }, [setUser]);

  return (
    <div className="bg-midnight text-white register-container">
      <div className="container">
        <TitleRegister
          title=" Registrarme en "
          description="  ¡Toda la información que nos compartas en WowLibre es como el
          ingrediente especial de tu experiencia alucinante! Cuanto más sepamos,
          mejor podremos hacerte vivir algo realmente extraordinario. Así que,
          ¡compártenos esos datos y prepárate para algo fuera de serie!"
        />

        <div className="items-center pt-4">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="fechaInput" className="mb-2">
              Ingrese el pais
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese el país"
              value={country}
              onChange={handleCountryChange}
            />
            <label htmlFor="fechaInput" className="mb-2">
              Fecha de Nacimiento
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="date"
              id="fechaInput"
              name="fechaInput"
              value={fecha}
              onChange={handleFechaChange}
            />

            <PageCounter currentSection={1} totalSections={7} />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
              type="submit"
            >
              Continuar
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;