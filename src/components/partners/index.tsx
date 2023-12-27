"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const Partners = () => {
  const initialPartners = [
    {
      id: 1,
      name: "Warmane",
      description: "XXXXX",
      backgroundImage:
        "https://scontent.fbog11-1.fna.fbcdn.net/v/t39.30808-6/292633890_726810068592100_755955628419423819_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=f-aaCR_fT_kAX9THR_5&_nc_ht=scontent.fbog11-1.fna&oh=00_AfB1HF_9_pSjR3OUMLOe_cnpMDMpSPy6MaqX9hhnrq2YIw&oe=658E6747",
    },
    {
      id: 2,
      name: "Nombre del Socio 2",
      description: "Descripción 2",
      backgroundImage:
        "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/hbo/widget/HBOMax_widgetmulti_mobdsk_mco_@2x.jpg",
      icon: "URL_imagen_icono_2",
    },
    {
      id: 3,
      name: "Nombre del Socio 3",
      description: "Descripción 3",
      backgroundImage:
        "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/paramount/widgets/paramount_widgetmulti_mobdsk_colombia_@2x.jpg",
      icon: "URL_imagen_icono_3",
    },
    {
      id: 1,
      name: "Nombre del Socio 4",
      description: "Descripción 4",
      backgroundImage:
        "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/disney/hub-widget-disney-star/Widget_Multicontent_Latam_768-x-566px.jpg",
      icon: "URL_imagen_icono_4",
    },
    {
      id: 2,
      name: "Nombre del Socio 5",
      description: "Descripción 5",
      backgroundImage:
        "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/hbo/widget/HBOMax_widgetmulti_mobdsk_mco_@2x.jpg",
      icon: "URL_imagen_icono_5",
    },
    {
      id: 3,
      name: "Nombre del Socio 6",
      description: "Descripción 6",
      backgroundImage:
        "https://http2.mlstatic.com/resources/frontend/statics/loyal/partners/paramount/widgets/paramount_widgetmulti_mobdsk_colombia_@2x.jpg",
      icon: "URL_imagen_icono_6",
    },
    // ... Agrega más objetos de socio si es necesario
  ];

  const [partners, setPartners] = useState(initialPartners);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className="container bg-midnight">
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.id}>
            <div
              className="partner-card"
              style={{
                backgroundImage: `url(${partner.backgroundImage})`,
                width: "20rem", // Ancho de la tarjeta
                height: "30rem", // Alto de la tarjeta
              }}
            >
              <div className="partner-details">
                <div className="partner-info">
                  <div className="partner-image">
                    <img src={partner.icon} alt="Icono del socio" />
                  </div>
                  <div className="partner-text">
                    <h3>{partner.name}</h3>
                    <p>{partner.description}</p>
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

export default Partners;
