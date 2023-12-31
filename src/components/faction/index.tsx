import React from "react";

const Faction = () => {
  return (
    <div className="container pt-20 flex flex-col items-center text-white">
      <h2 className="pt-20 font-bold text-2xl lg:text-3xl">
        LA FACION DOMINANTE
      </h2>
      <p className="pt-3 text-sm lg:text-base text-center">
        El símbolo que glorificará nuestra página principal será determinado por
        la facción que triunfe en la contienda de los Campos de Batalla. <br />{" "}
        <br /> ¡Únete a la batalla, defiende tu facción y asegura que su emblema
        sea el estandarte de la victoria en nuestro mundo! Juntos, construyamos
        un legado legendario que resonará a través de las eras. ¡Adelante,
        valientes guerreros, demostremos el poder y la grandeza de nuestra
        facción!
      </p>
      <img
        src="../resources/logo-aliance.png"
        className="image-container inset-0 opacity-70 pt-20 max-w-sm max-h-full z-10 rounded-lg"
        alt="Imagen dinámica"
      />
    </div>
  );
};

export default Faction;
