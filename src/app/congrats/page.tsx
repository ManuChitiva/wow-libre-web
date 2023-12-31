"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Congrats = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("email");
  return (
    <div className="bg-midnight register-container flex flex-col items-center justify-center">
      <img
        src="/resources/logo.png"
        alt="Ejemplo"
        className="w-32 h-auto mb-5"
      />

      <h2 className="text-white text-center mb-6 text-1xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold">
        Bienvenido a <br /> WOW LIBRE
      </h2>

      <div className="text-white text-center ">
        <p className="pt-2  text-1xl">Se ha creado la siguiente cuenta</p>
        <p className="text-green-500 pt-2 mb-6  text-4xl">{search}</p>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md mt-11"
          type="button"
        >
          Descargar Cliente
        </button>
      </div>
    </div>
  );
};

export default Congrats;
