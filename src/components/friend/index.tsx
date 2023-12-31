import React from "react";

const Friend = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lista de Amigos</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Ejemplo de amigo */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Avatar de amigo"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-semibold">Nombre del Amigo</h3>
          <p className="text-gray-500">Correo: ejemplo@correo.com</p>
          {/* Agrega más detalles si es necesario */}
        </div>

        {/* Repite este bloque para cada amigo */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Friend;
