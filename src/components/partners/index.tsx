"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { BenefitModel, getBenefit } from "../services/resources/ApiBenefits";

const Benefits = () => {
  const [partners, setPartners] = useState<BenefitModel[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la llamada a la API y obtén los datos
        const response = await getBenefit();
        console.log(response);
        // Actualiza el estado con los datos obtenidos de la API
        setPartners(response);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    // Llama a la función para obtener datos cuando el componente se monta
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  if (!partners || partners.length === 0) {
    // Si partners es null o está vacío, no renderizar nada
    return null;
  }

  return (
    <div className="container bg-midnight">
      <div className="partners-header">
        <div className="flex items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-500 mr-4">
            Beneficios de Wow Libre
          </h2>
          <p className="text-sm text-gray-600">
            <a
              href="/todos-los-beneficios"
              className="text-blue-500 hover:underline"
            >
              Ver todos los beneficios
            </a>
          </p>
        </div>
      </div>
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.id}>
            <div
              className="partner-card rounded-lg bg-paper-image transform transition-transform duration-300 ease-in-out hover:scale-110"
              style={{
                backgroundImage: `url(${partner.background_image})`,
                width: "24rem", // Ancho de la tarjeta
                backgroundPosition: "center",
                height: "35rem", // Alto de la tarjeta
              }}
            >
              <div className="partner-details">
                <div className="partner-info">
                  <div className="partner-image">
                    <img
                      className="rounded-full"
                      src={partner.icon}
                      alt="Icono del socio"
                    />
                  </div>
                  <div className="partner-text ">
                    <h3 className="font-bold ">{partner.name}</h3>
                    <p className="text-justify p-1 text-gray-300">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Benefits;
