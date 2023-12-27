import React from "react";

const ResourcesServer = () => {
  return (
    <div className="max-w-2xl mx-auto p-6  rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        Cómo Conectar a Mundo de Warcraft
      </h2>
      <ol className="list-decimal pl-4 mb-4">
        <li className="mb-2">
          En primer lugar, debes crear una cuenta. La cuenta se utiliza para
          iniciar sesión tanto en el juego como en nuestro sitio web.{" "}
          <a
            href="link_a_pagina_de_registro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Haga clic aquí para abrir la página de registro.
          </a>
        </li>
        <li className="mb-2">
          Instale Mundo de Warcraft. Puedes descargarlo (legalmente) desde aquí:
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
          Establezca la lista de reinos: <code>set realmlist wowlibre.com</code>
        </li>
      </ol>
      <p>
        ¡Ya puedes empezar a jugar! Si necesita ayuda, no dude en crear un
        ticket de soporte.
      </p>
    </div>
  );
};

export default ResourcesServer;
