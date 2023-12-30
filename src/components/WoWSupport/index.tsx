import React from "react";

const WoWSupport: React.FC = () => {
  return (
    <div className="bg-black p-6 rounded-md shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Soporte World of Warcraft</h2>
      <div className="border-2 border-gray-800 p-4 rounded-md mb-4">
        <h3 className="text-xl font-semibold mb-2">Mensajes de Soporte</h3>
        {/* Aquí podrías agregar una lista de mensajes de soporte */}
        <div className="text-sm italic text-gray-400">
          No hay mensajes de soporte actualmente.
        </div>
      </div>
      <div className="border-2 border-gray-800 p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Responder Mensaje</h3>
        <textarea
          placeholder="Escribe tu respuesta..."
          className="w-full h-24 p-2 mt-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
        ></textarea>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Enviar Respuesta
        </button>
        <button className="mt-4 ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Hacer publico
        </button>
      </div>
    </div>
  );
};

export default WoWSupport;
