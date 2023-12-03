"use client";

import { loginUser } from "@/components/services/register/ApiService";
import { useUserContext } from "@/context/UserContext";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

    const response = await loginUser(userName, password);

    if (user) {
      setUser({
        ...user,
        username: userName,
        token: response.data.jwt,
        expiration_date: response.data.expirationDate,
        refresh_token: response.data.refreshToken,
        logged_in: true,
      });
    }
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-midnight text-white register-container">
        <img
          src="/resources/login.png"
          alt="Ejemplo"
          className="w-50 h-auto"
          draggable="false"
          style={{ outline: "none" }}
          onDragStart={(e) => e.preventDefault()}
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
