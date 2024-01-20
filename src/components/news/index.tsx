"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Announcement from "../announcement";
import Onlyplayers from "../online-player";
import ResourcesServer from "../resources-server";

const News = () => {
  const [selectedLink, setSelectedLink] = useState("noticias");
  const [imageSrc, setImageSrc] = useState(
    "https://i.postimg.cc/CL9xmRM5/3shots-so-1.png"
  );

  const renderComponent = () => {
    if (selectedLink === "noticias") {
      return <Announcement />;
    } else if (selectedLink === "jugadores") {
      return <Onlyplayers />;
    } else if (selectedLink === "recursos") {
      return <ResourcesServer />;
    }
  };

  useEffect(() => {
    // Cambia la imagen basada en el componente seleccionado
    if (selectedLink === "noticias") {
      setImageSrc("../resources/notice-4.jpg");
    } else if (selectedLink === "jugadores") {
      setImageSrc("../resources/notice-6.jpg");
    } else if (selectedLink === "recursos") {
      setImageSrc("../resources/notice-5.jpg");
    }
  }, [selectedLink]);

  return (
    <div className="seccion-news container">
      <div className="news-carrousel text-white">
        <ul className="news-carrousel-items">
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("noticias")}
            >
              Anuncio
            </a>
          </li>
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("jugadores")}
            >
              Jugadores Online
            </a>
          </li>
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("recursos")}
            >
              Conexion
            </a>
          </li>
        </ul>
      </div>

      {/* Div para contenido a la Izquierda  */}
      <div id="noticias" className="w-full md:w-2/3  text-white news-container">
        {renderComponent()}
      </div>

      {/* Div para contenido a la derecha  */}
      <div className="hidden md:block w-1/3 text-white news-container">
        <div className="image-container absolute inset-0 opacity-70 rounded-full">
          <img
            src={imageSrc}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            alt="Imagen dinámica"
            className="z-10 relative rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default News;
