"use client";
import React, { ChangeEvent, useState } from "react";
import "./index.css";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-midnight text-white">
        <div className="container">
          <h2 className="text-center text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
            Azeroth te espera <br />
          </h2>

          <div className="items-center pt-4">
            <form className="mt-4 flex flex-col">
              <label htmlFor="text" className="mb-2">
                Ingresa tu username
              </label>
              <input
                className="mb-4 px-4 py-2 border rounded-md text-black"
                type="text"
                placeholder="Cuenta"
              />
              <label htmlFor="text" className="mb-2">
                Contrasena
              </label>
              <input
                className="mb-4 px-4 py-2 border rounded-md text-black"
                type="password"
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
