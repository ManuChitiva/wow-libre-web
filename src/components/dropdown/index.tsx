import React from "react";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

const DropDown = () => {
  const { user, clearUserData } = useUserContext();
  const logged_in = user.logged_in;

  const handleLogout = () => {
    clearUserData();
  };

  return (
    <div className="relative positionAbsolut">
      <div className="relative z-10">
        <button className="focus:outline-none absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Contenido del menú desplegable */}
      {logged_in ? (
        <ul className="absolute right-0 mt-10 w-48 bg-white rounded-lg shadow-md py-2">
          <li>
            <Link
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              href="/profile"
            >
              Mi Perfil
            </Link>
          </li>
          <li>
            <a
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Cerrar Sesión
            </a>
          </li>
        </ul>
      ) : (
        <ul className="absolute right-0 mt-10 w-48 bg-white rounded-lg shadow-md py-2">
          <li>
            <Link
              className="block px-4 py-2 text-gray-800 hover:bg-orange-400"
              href="/login"
            >
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-gray-800 hover:bg-orange-400"
              href="/register"
            >
              Registrarse
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
