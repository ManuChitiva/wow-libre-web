"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "./index.css";
import DropDown from "../dropdown";
import { useUserContext } from "@/context/UserContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId: NodeJS.Timeout;
  const { user, setUser } = useUserContext();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 3000); // Modifica este valor según el tiempo que consideres adecuado
  };

  return (
    <nav className="bg-midnight text-tahiti p-4 sm:text-center">
      <div className="bg-midnight text-tahiti container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/resources/logo.png"
              alt="Descripción de la imagen"
              width={60}
              height={60}
            />
            <span className="ml-2 title-wow text-4xl pt-5 flex items-center text-white">
              Wow Libre
            </span>
          </div>
        </Link>
        <ul className="text-white lg:flex lg:space-x-8 lg:items-center space-y-3 sm:space-y-1 sm:space-x-4 sm:flex-row sm:text-center">
          {/* Opciones del menú */}
          <li className="hidden lg:block hover:text-orange-400">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hidden lg:block hover:text-orange-400">
            <Link href="/community">Comunidad</Link>
          </li>
          <li className="hidden lg:block hover:text-orange-400">
            <Link href="/support">Soporte</Link>
          </li>
          <li className="hidden lg:block hover:text-orange-400">
            <Link href="/statistics">Estadísticas</Link>
          </li>
          <li className="hidden lg:block hover:text-orange-400">
            <Link href="/store">Tienda</Link>
          </li>
          {/* Botón de conexión para dispositivos móviles */}
          <li className="relative">
            <button
              className="bg-btnPrimary text-white rounded-lg px-4 py-2 font-bold"
              onClick={toggleDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Conexión
            </button>
            {/* Menú desplegable */}
            {showDropdown && <DropDown />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
