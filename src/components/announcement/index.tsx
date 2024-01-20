import React from "react";
import "./index.css";

const Announcement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        WOW <span id="libre">LIBRE</span>
      </h2>
      <hr className="border my-2 mb-4" />

      <p className="announcement-text mt-5">
        Wow Libre va más allá de ser simplemente un servidor de World of
        Warcraft. Es un entorno completamente libre y de código abierto,
        meticulosamente diseñado para fortalecer la comunidad de jugadores. En
        este servidor, te esperan herramientas valiosas disponibles de manera
        gratuita para otros servidores. <br /> <br />
        La premisa fundamental de Wow Libre es proporcionar un espacio donde la
        comunidad pueda contribuir y liderar el servidor sin estar condicionada
        por la intervención o intereses individuales. Aquí, la fuerza motriz es
        la colaboración colectiva, permitiendo que los jugadores influyan y den
        forma al destino del mundo de WoW de manera conjunta. <br /> <br />{" "}
        Únete a nosotros para ser parte de esta experiencia donde la comunidad
        es el latido del servidor, creando un entorno donde la elegancia se
        encuentra en la colaboración y la comunidad es el corazón pulsante de la
        experiencia de WoW.
      </p>
    </div>
  );
};

export default Announcement;
