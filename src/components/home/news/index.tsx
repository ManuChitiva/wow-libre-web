"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import Announcement from "../announcement";
import Onlyplayers from "../onlinePlayer";
import ResourcesServer from "../resourcesServer";

const ANNOUNCEMENT = "announcement";
const ONLINE_PLAYERS = "onlinePlayers";
const RESOURCES = "resources";

const News = () => {
  const [selectedSection, setSelectedSection] = useState(ANNOUNCEMENT);
  const [resourceImg, setImageSrc] = useState("");

  const renderComponent = () => {
    if (selectedSection === ANNOUNCEMENT) {
      return <Announcement />;
    } else if (selectedSection === ONLINE_PLAYERS) {
      return <Onlyplayers />;
    } else if (selectedSection === RESOURCES) {
      return <ResourcesServer />;
    }
  };

  useEffect(() => {
    // Cambia la imagen basada en el componente seleccionado
    if (selectedSection === ANNOUNCEMENT) {
      setImageSrc("../resources/seccion/notice-4.jpg");
    } else if (selectedSection === ONLINE_PLAYERS) {
      setImageSrc("../resources/seccion/notice-6.jpg");
    } else if (selectedSection === RESOURCES) {
      setImageSrc("../resources/seccion/notice-5.jpg");
    }
  }, [selectedSection]);

  return (
    <div className="seccion-news container">
      <div className="news-carrousel text-white">
        <ul className="news-carrousel-items">
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedSection(ANNOUNCEMENT)}
            >
              Anuncio
            </a>
          </li>
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedSection(ONLINE_PLAYERS)}
            >
              Jugadores Online
            </a>
          </li>
          <li className="item-navbar-carrousel hover:text-orange-400">
            <a
              className={"selected-link"}
              onClick={() => setSelectedSection(RESOURCES)}
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
            src={resourceImg}
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
