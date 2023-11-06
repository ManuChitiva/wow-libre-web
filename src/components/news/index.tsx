"use client";
import React, { useState } from "react";
import "./index.css";
import Announcement from "../information";
import Announcement2 from "../information/index copy";

const News = () => {
  const [selectedLink, setSelectedLink] = useState("noticias");

  const renderComponent = () => {
    if (selectedLink === "noticias") {
      return <Announcement />;
    } else if (selectedLink === "jugadores") {
      return <Announcement2 />;
    } else if (selectedLink === "recursos") {
      return <Announcement />;
    }
  };

  return (
    <div className="seccion-news">
      <div className="news-carrousel text-white">
        <ul className="news-carrousel-items">
          <li className="item-navbar-carrousel">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("noticias")}
            >
              Noticias
            </a>
          </li>
          <li className="item-navbar-carrousel">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("jugadores")}
            >
              Jugadores Online
            </a>
          </li>
          <li className="item-navbar-carrousel">
            <a
              className={"selected-link"}
              onClick={() => setSelectedLink("recursos")}
            >
              Recursos
            </a>
          </li>
        </ul>
      </div>

      {/* Div para contenido a la derecha (horizontal) */}
      <div id="noticias" className="w-5/6 md:w-2/3 text-white news-container">
        {renderComponent()}
      </div>
      <div className="w-5/6 md:w-2/3 text-white news-container">
        <img
          src="https://i.postimg.cc/CL9xmRM5/3shots-so-1.png"
          className="rounded-lg"
          style={{
            maxWidth: "100%",
            maxHeight: "32rem", // Limita la altura máxima de la imagen
          }}
        />
      </div>
    </div>
  );
};

export default News;
