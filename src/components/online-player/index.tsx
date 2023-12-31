import React from "react";

const Onlyplayers = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">Jugadores Online</h2>
        <hr className="border my-2" />
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="mb-4 flex items-center">
          <img
            src="../resources/logo-aliance.png"
            alt="Icono Alianza"
            className="w-8 h-8 mr-2"
          />
          <div className="pl-2">
            <h3 className="text-xl font-bold">Jugadores de la Alianza</h3>
            <p>Cantidad: [Número de jugadores de la Alianza]</p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="../resources/logo-horde.png"
            alt="Icono Horda"
            className="w-8 h-8 mr-2"
          />
          <div className="pl-2">
            <h3 className=" text-xl font-bold">Jugadores de la Horda</h3>
            <p>Cantidad: [Número de jugadores de la Horda]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onlyplayers;
