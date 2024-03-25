"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import { useUserContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import PageCounter from "@/components/register/pageCounter";

import TitleWow from "@/components/register/titleWow";
import {
  CountryModel,
  getCountry,
} from "@/components/services/apis/resources/country";

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "es", site: "wow" },
];

const Register = () => {
  const { user, setUser } = useUserContext();
  const [country, setCountry] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [countryOptions, setCountryOptions] = useState<CountryModel[]>(
    defaultCountryOptions
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountryOptions = await getCountry();
        setCountryOptions(fetchedCountryOptions);
      } catch (error) {
        setCountryOptions(defaultCountryOptions);
      }
    };
    fetchData();
  }, []);

  const handleFechaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };

  const handleCountryChange = (selectedOption: CountryModel | null) => {
    setCountry(selectedOption ? selectedOption.value : "");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validación de los campos antes de enviar el formulario
    if (!country.trim()) {
      toast.error("Por favor, selecciona un país válido.");
      return;
    }

    if (!fecha) {
      toast.error("Por favor, ingresa una fecha de nacimiento válida.");
      return;
    }

    // Actualizar el estado del usuario y redirigir a la siguiente página
    if (user) {
      setUser({
        ...user,
        country: country,
        date_of_birth: new Date(fecha),
      });
    }
    router.push("/register/know-you");
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
    <div className="bg-midnight text-white min-h-screen flex items-center justify-center">
      <div className="min-h-1/2 max-h-90vh w-full ">
        <TitleWow
          title=" Registrarme en "
          description="¡Toda la información que nos compartas en Wow Libre es como el
          ingrediente especial de tu experiencia alucinante! Cuanto más sepamos,
          mejor podremos hacerte vivir algo realmente extraordinario. Así que,
          ¡compártenos esos datos y prepárate para algo fuera de serie!"
        />

        <div className="items-center pt-2 container">
          <form className="mt-2 flex flex-col " onSubmit={handleFormSubmit}>
            <label htmlFor="countrySelect" className="mb-2">
              Selecciona el país
            </label>
            <Select
              instanceId={"wsad123wqwe"}
              className="mb-3  border rounded-md text-black"
              options={countryOptions}
              value={countryOptions.find((option) => option.value === country)}
              onChange={handleCountryChange}
              placeholder="Selecciona el país"
              isSearchable
            />
            <label htmlFor="fechaInput" className="mb-2">
              Fecha de Nacimiento
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black"
              type="date"
              id="fechaInput"
              name="fechaInput"
              value={fecha}
              onChange={handleFechaChange}
            />

            <PageCounter currentSection={1} totalSections={7} />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8"
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
