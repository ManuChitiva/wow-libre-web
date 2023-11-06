import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-midnight text-tahiti p-4 sm:text-center">
      <div className="bg-midnight text-tahiti container mx-auto flex justify-between items-center">
        <Link className="text-white lg:space-x-0" href="/">
          <div className="flex items-center">
            <Image
              src="/resources/logo.png"
              alt="Descripción de la imagen"
              width={60}
              height={0}
            />
            <span className="ml-2 title-wow text-4xl pt-5 flex items-center">
              Wow Libre
            </span>
          </div>
        </Link>
        <ul className="text-white lg:flex lg:space-x-8 lg:items-center space-y-3 sm:space-y-1 sm:space-x-4 sm:flex-row sm:text-center">
          {/* Opción para dispositivos móviles */}
          <li className="hidden lg:block">
            <Link href="/">Inicio</Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/comunity">Comunidad</Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/support">Soporte</Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/statistics">Estadística</Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/store">Tienda</Link>
          </li>
          {/* Botón de conexión para dispositivos móviles */}
          <li>
            <button className="bg-btnPrimary text-white rounded-lg px-4 py-2 font-bold">
              Conexión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
