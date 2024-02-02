import Link from "next/link";
import React from "react";
const REALMLIST = "set realmlist wowlibre.com";

const ResourcesServer = () => {
  return (
    <div className="max-w-2xl mx-auto p-6  rounded-md">
      <h2 className="text-2xl font-bold ">Cómo Conectar a Mundo de Warcraft</h2>
      <hr className="border my-2 mb-4" />
      <ol className="list-decimal pl-4 mb-4 ">
        <div className="mt-2">
          <li className="mb-2">
            En primer lugar, debes crear una cuenta. La cuenta se utiliza para
            iniciar sesión tanto en el juego como en nuestro sitio web. <br />
            <Link
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {" "}
              Haga clic aquí para abrir la página de registro.
            </Link>
          </li>
          <li className="mb-2">
            Instale Mundo de Warcraft. Puedes descargarlo (legalmente) desde
            aquí:
            <a
              href="link_descarga_windows"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Windows . Cliente 2.4.3 (compilación 8606).
            </a>
          </li>
          <li className="mb-2">
            Establezca la lista de reinos: <code>{REALMLIST}</code>
          </li>
        </div>
      </ol>
      <p>
        ¡Ya puedes empezar a jugar! Si necesita ayuda, no dude en crear un
        ticket de soporte.
      </p>
    </div>
  );
};

export default ResourcesServer;
