"use client";
import PageCounter from "@/components/page-counter";
import TitleRegister from "@/components/register-title";
import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import {
  RegistrationData,
  registerUser,
} from "@/components/services/register/ApiService";
import { decryptPassword } from "@/components/Security";
const crypto = require("crypto");

const AccountFinalStep = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName.trim()) {
      toast.error("Ingrese un usuario.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
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
    console.log("decryptPassword", decryptPassword(user?.password || ""));
    console.log("Username", userName);

    const verifier = computeVerifier(
      params.trinitycore,
      Buffer.from(salt),
      userName.toUpperCase(),
      decryptPassword(user?.password || "").toUpperCase()
    );

    console.log(
      "Trinity Core Verifier:",
      Buffer.from(verifier).toString("hex")
    );
    console.log("Trinity Core SALT:", Buffer.from(salt).toString("hex"));

    try {
      const userDateOfBirth: Date | null | undefined = user?.date_of_birth;
      const formattedDateOfBirth: string | undefined =
        userDateOfBirth instanceof Date
          ? userDateOfBirth.toISOString().split("T")[0]
          : undefined;

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

      const registrationSuccessful = await registerUser(requestBody);

      if (registrationSuccessful) {
        //router.push("/congrats");
      } else {
        // Manejar errores en caso de fallo en el registro
        toast.error("xxxx.", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al intentar registrar los datos.", {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast-message",
      });
    }
    // router.push("/congrats");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="bg-midnight text-white register-container">
      <div className="container">
        <TitleRegister
          title=" Registrarme en "
          description="Este nombre será tu identidad pública. Podrás cambiarlo una vez de manera gratuita."
        />

        <div className="items-center pt-4">
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

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AccountFinalStep;
