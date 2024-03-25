"use client";
import PageCounter from "@/components/register/pageCounter";
import TitleRegister from "@/components/register/titleWow";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import {
  ErrorBadRequest,
  GenericResponse,
  RegistrationData,
  convertToErrorBadRequest,
  registerUser,
} from "@/components/services/register/ApiService";
import { decryptPassword } from "@/components/security";
import Swal from "sweetalert2";
const crypto = require("crypto");

const AccountFinalStep = () => {
  const { user, setUser, clearUserData } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un usuario.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (userName.trim().length < 5 || userName.trim().length > 40) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 40 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        username: userName,
      });
    }

    const salt = crypto.randomBytes(32);

    const verifier = computeVerifier(
      params.trinitycore,
      Buffer.from(salt),
      userName.toUpperCase(),
      decryptPassword(user.password).toUpperCase()
    );

    try {
      const userDateOfBirth = user.date_of_birth;

      const formattedDateOfBirth = userDateOfBirth
        ? !isNaN(new Date(userDateOfBirth).getTime())
          ? new Date(userDateOfBirth).toISOString().split("T")[0]
          : undefined
        : undefined;

      console.log("formattedDateOfBirth", formattedDateOfBirth);

      const requestBody: RegistrationData = {
        username: userName,
        salt: Buffer.from(salt).toString("hex"),
        verifier: Buffer.from(verifier).toString("hex"),
        country: user?.country,
        date_of_birth: formattedDateOfBirth,
        first_name: user?.first_name,
        last_name: user?.last_name,
        cell_phone: user?.cell_phone,
        email: user?.email,
        password: decryptPassword(user?.password_web || ""),
      };

      const registrationResult = await registerUser(requestBody);

      if (registrationResult.code == 201) {
        router.push(`/congrats?email=${user?.email}`);
        clearUserData();
      } else if (registrationResult.code == 400) {
        const errorResponse = convertToErrorBadRequest(registrationResult);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${
            errorResponse.message
          }: ${errorResponse.data.valuesInvalid.join(", ")}`,
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            registrationResult.message ||
            "Ocurrió un error al intentar registrar los datos.",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al intentar registrar los datos2.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="bg-midnight text-white min-h-screen flex items-center justify-center">
      <div className="min-h-1/2 max-h-90vh w-full">
        <TitleRegister
          title=" Registrarme en "
          description="Este nombre será tu identidad pública. Podrás cambiarlo una vez de manera gratuita."
        />
        <div className="items-center pt-4 container">
          <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
            <label htmlFor="usernameInput" className="mb-2">
              Usuario
            </label>
            <input
              id="username"
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              placeholder="Ingrese un usuario"
              value={userName}
              onChange={handleUserNameChange}
            />

            <PageCounter currentSection={7} totalSections={7} />

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
        </div>
      </div>
    </div>
  );
};

export default AccountFinalStep;
