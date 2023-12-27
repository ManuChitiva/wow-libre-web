"use client";
import React from "react";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

const Support = () => {
  const { user } = useUserContext();

  return (
    <div className="bg-midnight min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {!user.logged_in ? (
          <div className="not-logged-in text-center">
            <img
              src="https://www.mundodeportivo.com/alfabeta/hero/2021/10/World-of-Warcraft.jpg?width=1200"
              alt="World of Warcraft"
              className="mb-6 rounded-lg"
            />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              ¡Bienvenido a nuestro soporte de World of Warcraft!
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Para acceder a nuestra asistencia, por favor inicia sesión.
            </p>
            <Link legacyBehavior href="/login" replace>
              <a className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                inicia sesión
              </a>
            </Link>
          </div>
        ) : (
          <div className="logged-in">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Soporte para usuarios logueados
            </h2>
            {/* ... Otro contenido para usuarios logueados */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
