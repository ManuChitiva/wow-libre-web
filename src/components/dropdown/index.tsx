import React from "react";
import Link from "next/link";

const DropDown = () => {
  return (
    <>
      <ul className="absolute top-full bg-white  text-midnight rounded-lg py-2 px-5 mt-1 positionAbsolut">
        <li className="p-2">
          <Link href="/login">Iniciar sesión</Link>
        </li>
        <li className="p-2">
          <Link href="/register">Registrarse</Link>
        </li>
      </ul>
    </>
  );
};

export default DropDown;
