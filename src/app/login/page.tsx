"use client";

import { loginUser } from "@/components/services/register/ApiService";
import { useUserContext } from "@/context/UserContext";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login = () => {
  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim() && !password.trim()) {
      Swal.fire({
        imageUrl:
          "https://static.actugaming.net/media/2022/07/world-of-warcraft-lich-king-classic-889x500.jpg",
        imageHeight: 200,
        title: "Error de Inicio de Sesión",
        text: "Por favor, complete todos los campos obligatorios para continuar.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
        timer: 4500,
      });
      return;
    }

    try {
      const response = await loginUser(userName, password);
      Cookies.set("jwt", response.data.jwt, { expires: 7 }); // Ajusta la expiración y la ruta según tus necesidades

      if (user) {
        setUser({
          ...user,
          username: userName,
          token: response.data.jwt,
          expiration_date: response.data.expiration_date,
          refresh_token: response.data.refresh_token,
          logged_in: true,
        });
      }

      router.push("/profile");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha podido autenticarse",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  return (
    <>
      {/* Same as */}
      <div className="flex flex-col items-center min-h-screen justify-center bg-midnight text-white ">
        <img
          src="/resources/login.png"
          alt="Ejemplo"
          className="w-60 h-auto"
          style={{ pointerEvents: "none", outline: "none" }}
        />
        <h2 className="title-wow text-center text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-4xl">
          Azeroth te espera <br />
        </h2>

        <div className="container">
          <div className="items-center">
            <form className="mt-4 flex flex-col" onSubmit={handleFormSubmit}>
              <label htmlFor="text" className="mb-2">
                Ingresa tu username
              </label>
              <input
                className="mb-4 px-4 py-2 border rounded-md text-black"
                type="text"
                placeholder="Username"
                onChange={handleUserNameChange}
              />
              <label htmlFor="text" className="mb-2">
                Ingresa tu Password
              </label>
              <input
                className="mb-4 px-4 py-2 border rounded-md text-black"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />

              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 "
                type="submit"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
